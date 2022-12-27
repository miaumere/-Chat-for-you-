namespace Chat.API.Models
{
    public class Room
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Author { get; set; } = "";

        public Room(Chat.API.Persistance.Room roomFromDb)
        {
            Id = roomFromDb.Id;
            Name = roomFromDb.Name;
            Author = roomFromDb.Author;
        }
    }
}
