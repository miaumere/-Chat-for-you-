using Chat.API.Enums;
using Chat.API.Persistance;
using System.Drawing;

namespace Chat.API.Models
{
    public class RoomBaseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Color { get; set; }

        public RoomBaseDto(Room roomFromDb)
        {
            Id = roomFromDb.Id;
            Name = roomFromDb.Name;
            Color = roomFromDb.Color != null ? roomFromDb.Color.ToString() : Colors.Transparent.ToString();
        }

        public RoomBaseDto()
        {
        }
    }
}
