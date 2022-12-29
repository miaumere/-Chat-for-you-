using Chat.API.Persistance;
using Chat.API.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApiDbContext>(options =>
        options.UseNpgsql(builder.Configuration.GetConnectionString("Default")));

builder.Services.AddScoped<ChatService>();
builder.Services.AddScoped<LoginService>();

builder.Services.AddHttpContextAccessor();

var app = builder.Build();


# if DEBUG
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
#endif


app.UseAuthorization();
app.MapControllers();

app.Run();