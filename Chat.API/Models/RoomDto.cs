using Chat.API.Persistance;

namespace Chat.API.Models
{
    public class RoomDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Author { get; set; } = "";
        public bool IsCreatedByLoggedUser { get; set; } = false;


        public RoomDto(Room roomFromDb)
        {
            Id = roomFromDb.Id;
            Name = roomFromDb.Name;
        }
    }
}
