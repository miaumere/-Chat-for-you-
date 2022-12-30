using Chat.API.Persistance;

namespace Chat.API.Models
{
    public class UserDto
    {
        public int Id { get; set; } = 0;
        public string Username { get; set; } = "";
        public string Token { get; set; } = "";

        public UserDto(User userFromDb, string token) {
            Id = userFromDb.Id;
            Username = userFromDb.Name;
            Token = token;
        }
    }
}
