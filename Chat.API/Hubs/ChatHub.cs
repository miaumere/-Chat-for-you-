using Chat.API.Models;
using Chat.API.Persistance;
using Microsoft.AspNetCore.SignalR;

namespace Chat.API.Hubs
{
    public class ChatHub : Hub
    {
        private IHttpContextAccessor _httpContextAccessor { get; init; }
        private static readonly List<UserDto> Users = new List<UserDto>();

        public ChatHub(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public override Task OnConnectedAsync()
        {
            // var user = new UserDto { ConnectionId = Context.ConnectionId };
            // Users.Add(user);

            var httpContext = _httpContextAccessor.HttpContext;
            var hubContext = Context.GetHttpContext();



            var q = httpContext?.Request.Headers["Authorization"].ToString();
            var x = hubContext?.Request.Headers["Authorization"].ToString();


            var userIdFromHttpContext = _httpContextAccessor.HttpContext?.User?.Identity?.Name;


            Console.WriteLine("OnConnectedAsync");
            return base.OnConnectedAsync();
        }

        public async void ProcessMessage(string message, string userId)
        {
            Console.WriteLine(message);
            Console.WriteLine(userId);

            await Clients.All.SendAsync("ReceiveMessage", message);
        }

        public async Task SendMessageToAll()
        {
            await Clients.All.SendAsync("xxxx");
        }

    }
}
