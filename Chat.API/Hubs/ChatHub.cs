using Chat.API.Models;
using Chat.API.Persistance;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Linq;
using System.Runtime.CompilerServices;

namespace Chat.API.Hubs
{
    public class ChatHub : Hub
    {
        private IHttpContextAccessor _httpContextAccessor { get; init; }
        private ApiDbContext _apiDbContext { get; init; }

        private static readonly Dictionary<string, List<UserDto>> RoomsWithUsers = new Dictionary<string, List<UserDto>>();

        public ChatHub(ApiDbContext apiDbContext, IHttpContextAccessor httpContextAccessor)
        {
            _apiDbContext = apiDbContext;
            _httpContextAccessor = httpContextAccessor;
        }

        private async Task<User?> GetUserFromHttpContext()
        {
            int userId = Utils.Utils.GetUserIdFromHttpContext(_httpContextAccessor);
            var user = await _apiDbContext.Users
                .Where(u => u.Id == userId)
                .FirstOrDefaultAsync();

            return user;
        }

        private async Task<Room?> GetRoomFromId(string roomId)
        {
            int roomIdConverted = Convert.ToInt32(roomId);
            var room = await _apiDbContext.Rooms
                .Where(r => r.Id == roomIdConverted)
                .FirstOrDefaultAsync();

            return room;
        }

        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }

        public async Task EnterRoom(string roomId)
        {
            var user = await GetUserFromHttpContext();
            var userDto = new UserDto(user);

            RoomsWithUsers.TryGetValue(roomId, out var currentRoomUsers);

            if (currentRoomUsers is null)
            {
                RoomsWithUsers.TryAdd(roomId, new List<UserDto>() { userDto });
            }
            else
            {
                var isCurrentUserAlreadyExist = currentRoomUsers.Any(x => x.Id == userDto.Id);

                if (isCurrentUserAlreadyExist == false)
                {
                    currentRoomUsers.Add(userDto);
                }
            }

            RoomsWithUsers.TryGetValue(roomId, out var usersList);

            await Clients.All.SendAsync("GetRoomWithUsers", usersList);
        }

        public async Task LeaveRoom(string roomId)
        {
            var user = await GetUserFromHttpContext();
            var userDto = new UserDto(user);

            RoomsWithUsers.TryGetValue(roomId, out var usersList);

            if (userDto != null)
                usersList.Remove(userDto);

            await Clients.All.SendAsync("GetRoomWithUsers", usersList);
        }

        public async Task ProcessMessage(string message, string roomId)
        {
            var user = await GetUserFromHttpContext();

            var room = await GetRoomFromId(roomId);

            var messageEntity = new Message { SentBy = user, Room = room, SentDate = DateTime.UtcNow, Content = message };
            await _apiDbContext.Messages.AddAsync(messageEntity);
            await _apiDbContext.SaveChangesAsync();

            var messageDto = new MessageDto(messageEntity);

            await Clients.All.SendAsync("ReceiveMessage", messageDto);
        }


        public override async Task OnDisconnectedAsync(Exception exception)
        {

            Console.WriteLine("bye");

            await Clients.All.SendAsync("Disconnect", Context.ConnectionId);
            await base.OnDisconnectedAsync(exception);
        }

    }
}
