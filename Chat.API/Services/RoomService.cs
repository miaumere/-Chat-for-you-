using Chat.API.Enums;
using Chat.API.Models;
using Chat.API.Persistance;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
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

        public async Task<ObjectResult> GetRoomDetailsById(int roomId, string password)
        {
            int userId = Utils.Utils.GetUserIdFromHttpContext(_httpContextAccessor);

            var roomFromDb = await _apiDbContext
                .Rooms
                .Include(r => r.CreatedBy)
                .Where(r => r.Id == roomId)
                .FirstOrDefaultAsync();

            if(roomFromDb == null) { return new ObjectResult("Room does not exist!") { StatusCode = 400 }; }
            if(roomFromDb.RoomPassword != null && roomFromDb.RoomPassword.Length > 0 && roomFromDb.CreatedBy.Id != userId)
            {
                byte[] decodedBytes = Convert.FromBase64String(password);
                string decodedString = Encoding.UTF8.GetString(decodedBytes);

                var hashedPassword = _HashPassword(decodedString);
                if(roomFromDb.RoomPassword != hashedPassword)
                {
                    return new ObjectResult("Wrong password") { StatusCode = 400 };
                }
            }

            var response = new RoomBaseDto(roomFromDb);
            
            return new ObjectResult(response) { StatusCode = 200 };

        }

        public async Task<ObjectResult> UpsertRoom(RoomRequest roomRequest)
        {

            int userId = Utils.Utils.GetUserIdFromHttpContext(_httpContextAccessor);

            var user = await _apiDbContext
                .Users
                .Where(user => user.Id == userId)
                .SingleOrDefaultAsync();

            if(user == null)
            {
                return new ObjectResult("User does not exist!" ) { StatusCode = 401 };
            }
            Room room;

            string roomPassword = "";            
            
            if (roomRequest.IsPrivate)
            {
                roomPassword = roomRequest?.Password != null && roomRequest.Password.Length > 0
                ? _HashPassword(roomRequest.Password)
                : null;

            } else
            {
                roomPassword = null;
            }

            if (roomRequest?.Id != null && roomRequest?.Id != 0) {
                var existingRoom = await _apiDbContext
                    .Rooms
                    .Where(r => r.Id == roomRequest.Id)
                    .SingleOrDefaultAsync();
                if(existingRoom == null)
                {
                    return new ObjectResult("Wrong password!") { StatusCode = 401 };
                }
                existingRoom.Name = roomRequest.Name;
                existingRoom.Color = (Colors)Enum.Parse(typeof(Colors), roomRequest.Color);
                existingRoom.RoomPassword = roomPassword;
                _apiDbContext.Update(existingRoom);
            } else
            {
                room = new Room() { 
                    CreatedBy = user, 
                    Name = roomRequest.Name, 
                    Color = (Colors)Enum.Parse(typeof(Colors), roomRequest.Color),
                    RoomPassword =roomPassword
            };
               
                _apiDbContext.Add(room);
            }

            await _apiDbContext.SaveChangesAsync();
            return new ObjectResult("") { StatusCode = 201 };

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
