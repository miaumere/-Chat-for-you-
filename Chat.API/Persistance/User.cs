using Chat.API.Models;

namespace Chat.API.Persistance
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
    }
}
