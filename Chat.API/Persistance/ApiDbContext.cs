using Microsoft.EntityFrameworkCore;

namespace Chat.API.Persistance
{
    public class ApiDbContext : DbContext
    {
        public DbSet<Room> Rooms { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Message> Messages { get; set; }
        public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options) {}
    }
}
