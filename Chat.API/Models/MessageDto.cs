using Chat.API.Persistance;

namespace Chat.API.Models
{
    public class MessageDto
    {
        public int Id { get; set; }
        public UserDto SentBy { get; set; }
        public DateTime SentDate { get; set; }
        public string Content { get; set; }

        public MessageDto(Message message) {
            Id = message.Id;
            SentBy = new UserDto(message.SentBy);
            SentDate = message.SentDate;
            Content = message.Content;
        }
    }
}
