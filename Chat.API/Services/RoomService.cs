using Chat.API.Models;
using Chat.API.Persistance;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using RoomDto = Chat.API.Models.RoomDto;

namespace Chat.API.Services
{
    public class RoomService
    {
        private ApiDbContext _apiDbContext { get; init; }
        private IHttpContextAccessor _httpContextAccessor { get; init; }

        public RoomService(ApiDbContext apiDbContext, IHttpContextAccessor httpContextAccessor)
        {
            _apiDbContext = apiDbContext;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<List<RoomDto>> GetRooms()
        {
            var rooms = new List<RoomDto>();

            var roomsFromDb = await _apiDbContext.Rooms.ToListAsync();

            foreach (var roomFromDb in roomsFromDb)
            {
                var room = new RoomDto(roomFromDb);

                //room.IsCreatedByLoggedUser = true;
                rooms.Add(room);
            }
            return rooms;
        }


         public async Task<bool> CreateRoom(RoomRequest roomRequest)
        {
            var userIdFromHttpContext = _httpContextAccessor.HttpContext?.User?.Identity?.Name;
            int userId = Convert.ToInt32(userIdFromHttpContext);
            var user = await _apiDbContext
                .Users
                .Where(user => user.Id == userId)
                .SingleOrDefaultAsync();

            if(user == null)
            {
                return false;
            }

            var room = new Room();
            room.CreatedBy = user;
            room.Name = roomRequest.Name;

            _apiDbContext.Add(room);
            await _apiDbContext.SaveChangesAsync();
            return true;
        }

    }
}
