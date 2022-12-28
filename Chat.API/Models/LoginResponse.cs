namespace Chat.API.Models
{
    public class LoginResponse
    {
        public User user { get; set; }
        public string token { get; set; }
    }
}
