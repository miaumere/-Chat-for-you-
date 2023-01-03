using Chat.API.Models;
using Chat.API.Persistance;
using Microsoft.AspNetCore.SignalR;

namespace Chat.API.Hubs
{
    public class ChatHub : Hub
    {
        private static readonly List<UserDto> Users = new List<UserDto>();

        public override Task OnConnectedAsync()
        {
            // var user = new UserDto { ConnectionId = Context.ConnectionId };
            // Users.Add(user);
            Console.WriteLine("OnConnectedAsync");
            return base.OnConnectedAsync();
        }

        public async void ProcessMessage(string message)
        {
            Console.WriteLine(message);

           
            await Clients.All.SendAsync("ReceiveMessage", message);
        }

        public async Task SendMessageToAll()
        {
            await Clients.All.SendAsync("xxxx");
        }

    }
}
