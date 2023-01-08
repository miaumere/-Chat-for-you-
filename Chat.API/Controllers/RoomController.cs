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
    public class RoomController : ControllerBase
    {
        private RoomService _roomService { get; init; }

        public RoomController(RoomService chatService)
        {
            _roomService = chatService;
        }

        [HttpGet, Route("")]
        public async Task<List<RoomDto>> GetRooms()
        {
            return await _roomService.GetRooms();
        }

        
        [HttpGet("{id}")]
        public async Task<RoomBaseDto> GetRoomDetails([FromRoute] int id)
        {
            return await _roomService.GetRoomDetailsById(id);
        }


        [HttpPost, Route("")]
        public async Task<bool> CreateRoom([FromBody] RoomRequest request)
        {
            return await _roomService.CreateRoom(request);
        }

        [HttpDelete, Route("")]
        public async Task<bool> DeleteRoom([FromQuery] int roomId)
        {
            return await _roomService.DeleteRoom(roomId);
        }
    }
}