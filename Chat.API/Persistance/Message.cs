using Chat.API.Models;

namespace Chat.API.Persistance
{
    public class Message
    {
        public int Id { get; set; }
        public User SentBy { get; set; }
        public DateTime SentDate { get; set; }
        public Room Room { get; set; }
        public string Content { get; set; }

    }
}
