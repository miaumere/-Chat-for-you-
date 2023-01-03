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
        public async Task<RoomsResponse> GetRooms()
        {
            return await _roomService.GetRooms();
        }


        [HttpGet, Route("")]
        public async Task<RoomsResponse> GetRoomDetails([FromRoute] int roomId)
        {
            return await _roomService.GetRooms();
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