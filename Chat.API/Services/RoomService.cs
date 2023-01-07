using Chat.API.Models;
using Chat.API.Persistance;
using Chat.API.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

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

        public async Task<RoomsResponse> GetRooms()
        {
            var response = new RoomsResponse();

            var roomsFromDb = await _apiDbContext
                .Rooms
                .Include(r => r.CreatedBy)
                .ToListAsync();

            int userId = Utils.Utils.GetUserIdFromHttpContext(_httpContextAccessor);

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

        public async Task<RoomDto> GetRoomDetailsById(int roomId)
        {

            var roomsFromDb = await _apiDbContext
                .Rooms
                .Where(r => r.Id == roomId)
                .FirstOrDefaultAsync();

            var response = new RoomDto(roomsFromDb);
            
            return response;
        }


        public async Task<bool> CreateRoom(RoomRequest roomRequest)
        {
            int userId = Utils.Utils.GetUserIdFromHttpContext(_httpContextAccessor);

            var user = await _apiDbContext
                .Users
                .Where(user => user.Id == userId)
                .SingleOrDefaultAsync();

            if(user == null)
            {
                return false;
            }

            var room = new Room() {CreatedBy = user, Name = roomRequest.Name };

            _apiDbContext.Add(room);
            await _apiDbContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteRoom(int roomId)
        {

            int userId = Utils.Utils.GetUserIdFromHttpContext(_httpContextAccessor);

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
