using Chat.API.Enums;
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

        public async Task<List<RoomDto>> GetRooms()
        {
            int userId = Utils.Utils.GetUserIdFromHttpContext(_httpContextAccessor);

            var myRooms = await _apiDbContext
                .Rooms
                .Include(r => r.CreatedBy)
                .Where(r => r.CreatedBy.Id == userId)
                .Select(r => new RoomDto(r))
                .ToListAsync();

            var otherRooms = await _apiDbContext
                .Rooms
                .Include(r => r.CreatedBy)
                 .Where(r => r.CreatedBy.Id != userId)
                .Select(r => new RoomDto(r))
                .ToListAsync();

            var result = myRooms.Concat(otherRooms).ToList();

            return result;
        }

        public async Task<RoomBaseDto> GetRoomDetailsById(int roomId)
        {

            var roomsFromDb = await _apiDbContext
                .Rooms
                .Where(r => r.Id == roomId)
                .FirstOrDefaultAsync();

            var response = new RoomBaseDto(roomsFromDb);
            
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

            var room = new Room() { CreatedBy = user, 
                Name = roomRequest.Name, 
                Color = (Colors)Enum.Parse(typeof(Colors), roomRequest.Color) 
            };

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
