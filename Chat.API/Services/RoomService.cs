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


        public int GetUserIdFromHttpContext()
        {
            var userIdFromHttpContext = _httpContextAccessor.HttpContext?.User?.Identity?.Name;
            return Convert.ToInt32(userIdFromHttpContext);
        }

        public async Task<RoomsResponse> GetRooms()
        {
            var response = new RoomsResponse();

            var roomsFromDb = await _apiDbContext
                .Rooms
                .Include(r => r.CreatedBy)
                .ToListAsync();

            int userId = GetUserIdFromHttpContext();

            foreach (var roomFromDb in roomsFromDb)
            {
                var room = new RoomDto(roomFromDb);
                var id = roomFromDb.CreatedBy.Id;
                if (roomFromDb.CreatedBy.Id == userId)
                {
                    response.RoomsCreatedByMe.Add(room);
                }
                else
                {
                    response.RoomsCreatedByOthers.Add(room);
                }
            }

            return response;
        }


         public async Task<bool> CreateRoom(RoomRequest roomRequest)
        {
            int userId = GetUserIdFromHttpContext();

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

        public async Task<bool> DeleteRoom(int roomId)
        {

            int userId = GetUserIdFromHttpContext();

            var roomToDelete = await _apiDbContext.Rooms
                .Include(r => r.CreatedBy)
                .Where(r => r.Id== roomId && r.CreatedBy.Id == userId)
                .SingleOrDefaultAsync();
            if(roomToDelete == null)
            {
                return false;
            }

            _apiDbContext.Remove(roomToDelete);
            await _apiDbContext.SaveChangesAsync();

            return true;
        }


    }
}
