namespace Chat.API.Models
{
    public class User
    {
        public int Id { get; set; } = 0;
        public string Username { get; set; } = "";

        public User(Persistance.User userFromDb) {
            Id = userFromDb.Id;
            Username = userFromDb.Name;
        }
    }
}
