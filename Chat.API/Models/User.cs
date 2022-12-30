namespace Chat.API.Models
{
    public class User
    {
        public int Id { get; set; } = 0;
        public string Username { get; set; } = "";
        public string Token { get; set; } = "";

        public User(Persistance.User userFromDb, string token) {
            Id = userFromDb.Id;
            Username = userFromDb.Name;
            Token = token;
        }
    }
}
