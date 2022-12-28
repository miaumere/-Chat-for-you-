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
        private ChatService _chatService { get; init; }

        public LoginController(ChatService chatService)
        {
            _chatService = chatService;
        }


        [HttpPost, Route("")]
        public async Task<List<Models.Room>> AddNewRoom()
        {
            return await _chatService.GetRooms();
        }
    }
}