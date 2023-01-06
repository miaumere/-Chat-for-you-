using Chat.API.Enums;
using Chat.API.Persistance;

namespace Chat.API.Models
{
    public class RoomDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public Colors Color { get; set; } = Colors.Transparent;

        public RoomDto(Room roomFromDb)
        {
            Id = roomFromDb.Id;
            Name = roomFromDb.Name;
            Color = roomFromDb.Color;
        }

        public RoomDto()
        {
        }
    }
}
