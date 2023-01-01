using Chat.API.Persistance;

namespace Chat.API.Models
{
    public class RoomDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";

        public RoomDto(Room roomFromDb)
        {
            Id = roomFromDb.Id;
            Name = roomFromDb.Name;
        }
    }
}
