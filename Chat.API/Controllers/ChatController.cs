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
    public class ChatController : ControllerBase
    {
        private ChatService _chatService { get; init; }

        public ChatController(ChatService chatService)
        {
            _chatService = chatService;
        }

        [HttpGet, Route("rooms")]
        public async Task<List<Models.Room>> GetRooms()
        {
            return await _chatService.GetRooms();
        }

        [HttpPost, Route("rooms")]
        public async Task<List<Models.Room>> AddNewRoom()
        {
            return await _chatService.GetRooms();
        }
    }
}