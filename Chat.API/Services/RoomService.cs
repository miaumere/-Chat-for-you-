using Chat.API.Enums;
using Chat.API.Models;
using Chat.API.Persistance;
using Microsoft.EntityFrameworkCore;
using System.Drawing;
using System.Security.Cryptography;
using System.Text;

namespace Chat.API.Services
{
    public class RoomService
    {
        private ApiDbContext _apiDbContext { get; init; }
        private IHttpContextAccessor _httpContextAccessor { get; init; }
        private IConfiguration _configuration { get; init; }

        public RoomService(ApiDbContext apiDbContext, IHttpContextAccessor httpContextAccessor, IConfiguration configuration)
        {
            _apiDbContext = apiDbContext;
            _httpContextAccessor = httpContextAccessor;
            _configuration = configuration;
        }

        private string _HashPassword(string secret)
        {
            var passKey = _configuration.GetValue<string>("RoomKey");
            using var sha256 = SHA256.Create();
            var secretBytes = Encoding.UTF8.GetBytes(secret + passKey);
            var secretHash = sha256.ComputeHash(secretBytes);
            return Convert.ToHexString(secretHash);
        }

        public async Task<List<RoomDto>> GetRooms()
        {
            int userId = Utils.Utils.GetUserIdFromHttpContext(_httpContextAccessor);

            var myRooms = await _apiDbContext
                .Rooms
                .Include(r => r.CreatedBy)
                .Where(r => r.CreatedBy.Id == userId)
                .OrderBy(r => r.Name)
                .Select(r => new RoomDto(r))
                .ToListAsync();

            var otherRooms = await _apiDbContext
                .Rooms
                .Include(r => r.CreatedBy)
                .Where(r => r.CreatedBy.Id != userId)
                .OrderBy(r => r.Name)
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


        public async Task<bool> UpsertRoom(RoomRequest roomRequest)
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
            Room room; 
            if (roomRequest?.Id != null) {
                var existingRoom = await _apiDbContext
                    .Rooms
                    .Where(r => r.Id == roomRequest.Id)
                    .SingleOrDefaultAsync();
                if(existingRoom == null)
                {
                    return false;
                }
                existingRoom.Name = roomRequest.Name;
                existingRoom.RoomPassword = roomRequest.Password != null ? _HashPassword(roomRequest.Password) : null;
                existingRoom.Color = (Colors)Enum.Parse(typeof(Colors), roomRequest.Color);
                _apiDbContext.Update(existingRoom);
            } else
            {
                room = new Room() { 
                    CreatedBy = user, 
                    Name = roomRequest.Name, 
                    Color = (Colors)Enum.Parse(typeof(Colors), roomRequest.Color),
                    RoomPassword = roomRequest.Password != null ? _HashPassword(roomRequest.Password) : null 
                };           
                _apiDbContext.Add(room);
            }

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
