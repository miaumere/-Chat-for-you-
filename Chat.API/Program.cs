using Chat.API.Hubs;
using Chat.API.Persistance;
using Chat.API.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Text;


var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApiDbContext>(options =>
        options.UseNpgsql(builder.Configuration.GetConnectionString("Default")));

builder.Services.AddScoped<RoomService>();
builder.Services.AddScoped<LoginService>();

builder.Services.AddHttpContextAccessor();

builder.Services.AddSignalR();

var secretKey = builder.Configuration.GetValue<string>("SecretKey");
var tokenHandler = new JwtSecurityTokenHandler();
var key = Encoding.ASCII.GetBytes(secretKey);


builder.Services.AddAuthentication(options => {
    options.DefaultAuthenticateScheme = "JwtBearer";
    options.DefaultChallengeScheme = "JwtBearer";
})
.AddJwtBearer("JwtBearer", jwtBearerOptions =>
{
    jwtBearerOptions.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true, 
        ClockSkew = TimeSpan.FromMinutes(5) 
    };
});

var app = builder.Build();

# if DEBUG
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
#endif


app.MapHub<ChatHub>("/chatHub", options =>
{
    options.Transports =
    HttpTransportType.WebSockets;
});

app.UseAuthorization();
app.UseAuthentication();

app.MapControllers();

app.Run();