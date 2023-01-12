using Chat.API.Enums;
using Chat.API.Persistance;
using System.Drawing;

namespace Chat.API.Models
{
    public class RoomDto: RoomBaseDto
    {
        public bool IsPrivate { get; set; } = false;
        public string Username { get; set; } = "";
        public RoomDto(Room roomFromDb)
        {
            Id = roomFromDb.Id;
            Name = roomFromDb.Name;
            Color = roomFromDb.Color != null ? roomFromDb.Color.ToString() : Colors.Transparent.ToString();
            IsPrivate = roomFromDb.RoomPassword != null && roomFromDb.RoomPassword.Length > 0;
            Username = roomFromDb.CreatedBy?.Name;
        }

        public RoomDto()
        {
        }
    }
}
