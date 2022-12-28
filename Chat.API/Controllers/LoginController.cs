using Chat.API.Models;
using Chat.API.Persistance;
using Chat.API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;

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
        public async Task<LoginResponse?> Login([FromBody] UserRequest request)
        {
            return await _loginService.Login(request);
        }


        [HttpPost, Route("registrate")]
        public async Task<LoginResponse?> Registrate([FromBody] UserRequest request)
        {
            return await _loginService.Registrate(request);
        }
    }
}