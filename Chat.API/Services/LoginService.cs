using Chat.API.Models;
using Chat.API.Persistance;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
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
            response.token = GenerateJWTTokenForUser(userEntity);

            return response;
        }

        public async Task<LoginResponse?> Registrate(UserRequest request)
        {
            if (_apiDbContext.Users.Where(x => x.Name == request.Username).Any())
            {
                throw new Exception("User of this username exists");
            }            
            var userEntity = new User() { Name = request.Username };

            userEntity.Password = HashPassword(request.Password);

            _apiDbContext.Users.Add(userEntity);
            await _apiDbContext.SaveChangesAsync();


            var response = new LoginResponse();            
            var userResponse = new Models.User(userEntity);
            response.user = userResponse;
            response.token = GenerateJWTTokenForUser(userEntity);

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

        public string GenerateJWTTokenForUser(User user)
        {
            var secretKey = _configuration.GetValue<string>("SecretKey");
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secretKey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()), new Claim("username", user.Name) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }


    }
}
