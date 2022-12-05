using Microsoft.EntityFrameworkCore;

namespace Chat.API.Persistance
{
    public class ApiDbContext : DbContext
    {
        public DbSet<Blog> Blogs { get; set; }
        public DbSet<Post> Posts { get; set; }

        public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options) {}
    }


}
