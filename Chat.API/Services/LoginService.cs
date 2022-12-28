using Chat.API.Models;
using Chat.API.Persistance;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using System.Security.Cryptography;
using System.Text;
using User = Chat.API.Persistance.User;

namespace Chat.API.Services
{
    public class LoginService
    {
        private ApiDbContext _apiDbContext { get; init; }
        private readonly IConfiguration _configuration;

        public LoginService(ApiDbContext apiDbContext, IConfiguration configuration)
        {
            _apiDbContext = apiDbContext;
            _configuration = configuration;
        }

        public async Task<LoginResponse?> Login(UserRequest request)
        {
            var userEntity = await
                _apiDbContext.Users
                .Where(x => x.Name == request.Username && x.Password == HashPassword(request.Password))
                .SingleOrDefaultAsync();

            if (!_apiDbContext.Users.ToList().Where(x => x.Name == request.Username).Any())
            {
                throw new Exception("User does not exist!");
            }

            var userResponse = new Models.User(userEntity);

            var response = new LoginResponse();
            response.user = userResponse;
            response.token = GenerateJWTTokenForUser();

            return response;
        }

        public async Task<LoginResponse?> Registrate(UserRequest request)
        {
            var userEntity = new User() { Name = request.Username };

            var secretKey = _configuration.GetValue<string>("SecretKey");

            if (_apiDbContext.Users.ToList().Where(x => x.Name == request.Username).Any())
            {
                throw new Exception("User of this username exists");
            }
            userEntity.Password = HashPassword(request.Password);

            _apiDbContext.Users.Add(userEntity);
            await _apiDbContext.SaveChangesAsync();


            var response = new LoginResponse();            
            var userResponse = new Models.User(userEntity);
            response.user = userResponse;
            response.token = GenerateJWTTokenForUser();

            return response;
        }

        public string HashPassword(string secret)
        {
            var passKey = _configuration.GetValue<string>("PassKey");
            using var sha256 = SHA256.Create();
            var secretBytes = Encoding.UTF8.GetBytes(secret + passKey);
            var secretHash = sha256.ComputeHash(secretBytes);
            return Convert.ToHexString(secretHash);
        }

        public string GenerateJWTTokenForUser()
        {
            var secretKey = _configuration.GetValue<string>("SecretKey");


            return "";
        }


    }
}
