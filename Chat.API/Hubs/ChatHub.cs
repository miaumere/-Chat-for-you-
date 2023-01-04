using Chat.API.Models;
using Chat.API.Persistance;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Linq;

namespace Chat.API.Hubs
{
    public class ChatHub : Hub
    {
        private IHttpContextAccessor _httpContextAccessor { get; init; }
        private ApiDbContext _apiDbContext { get; init; }
        private static readonly List<UserDto> Users = new List<UserDto>();

        public ChatHub(ApiDbContext apiDbContext, IHttpContextAccessor httpContextAccessor)
        {
            _apiDbContext = apiDbContext;
            _httpContextAccessor = httpContextAccessor;
        }

        private User? GetUserFromHttpContext()
        {
            int userId = Utils.Utils.GetUserIdFromHttpContext(_httpContextAccessor);
            var userDto = _apiDbContext.Users
                .Where(u => u.Id == userId)
                .FirstOrDefault();

            return userDto;
        }
        public override Task OnConnectedAsync()
        {
            Users.Add(new UserDto(GetUserFromHttpContext()));
            Console.WriteLine("OnConnectedAsync");
            return base.OnConnectedAsync();
        }

        //public async void ProcessMessage(string message, string roomId)
        public async void ProcessMessage(string message, string roomId)
        {
            Console.WriteLine(message);
            var roomIdConverted = Convert.ToInt32(roomId);
            var user = GetUserFromHttpContext();

            var room = _apiDbContext.Rooms
                .Where(u => u.Id == roomIdConverted)
                .FirstOrDefault();

            var messageEntity = new Message { SentBy = user, Room = room, SentDate = DateTime.UtcNow, Content = message };
            //await _apiDbContext.SaveChangesAsync();

            var messageDto = new MessageDto(messageEntity);
            //JsonConvert.SerializeObject(messageDto);


            await Clients.All.SendAsync("ReceiveMessage", messageDto);
        }

        public async Task SendMessageToAll()
        {
            await Clients.All.SendAsync("xxxx");
        }

        public async Task OnDisconnectedAsync()
        {
            var userDto = new UserDto(GetUserFromHttpContext());
            if (userDto != null)
            Users.Remove(userDto);
            Console.WriteLine("bye");

            await Clients.All.SendAsync("Disconnected", Context.ConnectionId);
        }

    }
}
