using Chat.API.Models;
using Chat.API.Persistance;
using Chat.API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using User = Chat.API.Models.User;
using Microsoft.AspNetCore.Http;
using static System.Net.WebRequestMethods;
using Microsoft.AspNetCore.Authorization;

namespace Chat.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private LoginService _loginService { get; init; }


        public LoginController(LoginService loginService)
        {
            _loginService = loginService;
        }

        [HttpPost, Route("")]
        public async Task<User> Login([FromBody] UserRequest request)
        {
                return await _loginService.Login(request);
        }

        [HttpPost, Route("registrate")]
        public async Task<User?> Registrate([FromBody] UserRequest request)
        {
            return await _loginService.Registrate(request);
        }
    }
}