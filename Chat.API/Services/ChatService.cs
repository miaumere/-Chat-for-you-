using Chat.API.Models;
using Chat.API.Persistance;
using Microsoft.EntityFrameworkCore;
using Room = Chat.API.Models.Room;

namespace Chat.API.Services
{
    public class ChatService
    {
        private ApiDbContext _apiDbContext { get; init; }
  
        public ChatService(ApiDbContext apiDbContext)
        {
            _apiDbContext = apiDbContext;
        }

 
        public async Task<List<Room>> GetRooms()
        {
            var rooms = new List<Room>();

            var roomsFromDb = await _apiDbContext.Rooms.ToListAsync();

            foreach (var roomFromDb in roomsFromDb)
            {
                rooms.Add(new Room(roomFromDb));
            }
            return rooms;
        }


         public async Task<bool> AddNewRoom()
        {
            // TODO
/*            var blog = new Blog()
            {
                Url = "url",
            };


            _apiDbContext.Update(post);


            await _apiDbContext.SaveChangesAsync();*/

            return true;
        }

    }
}
