using Chat.API.Hubs;
using Chat.API.Persistance;
using Chat.API.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Text;


var builder = WebApplication.CreateBuilder(args);

const string chatUrn = "/chatHub";

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApiDbContext>(options =>
        options.UseNpgsql(builder.Configuration.GetConnectionString("Default")));

builder.Services.AddScoped<RoomService>();
builder.Services.AddScoped<LoginService>();

builder.Services.AddHttpContextAccessor();

var secretKey = builder.Configuration.GetValue<string>("SecretKey");
var tokenHandler = new JwtSecurityTokenHandler();
var key = Encoding.ASCII.GetBytes(secretKey);

builder.Services.AddAuthentication(options => {
    options.DefaultAuthenticateScheme = "JwtBearer";
    options.DefaultChallengeScheme = "JwtBearer";
})
.AddJwtBearer("JwtBearer", options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true, 
        ClockSkew = TimeSpan.FromMinutes(5) 
    };

    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            var accessToken = context.Request.Query["access_token"];

            // If the request is for our hub...
            var path = context.HttpContext.Request.Path;
            if (!string.IsNullOrEmpty(accessToken) &&
                (path.StartsWithSegments(chatUrn)))
            {
                // Read the token out of the query string
                context.Token = accessToken;
            }
            return Task.CompletedTask;
        }
    };
});

builder.Services.AddSignalR();


var app = builder.Build();

# if DEBUG
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
#endif


app.MapHub<ChatHub>(chatUrn, options =>
{
    options.Transports =
    HttpTransportType.WebSockets;
});

app.UseAuthorization();
app.UseAuthentication();

app.MapControllers();

app.Run();