using Chat.API.Persistance;
using Microsoft.EntityFrameworkCore;

namespace Chat.API.Services
{
    public class ExampleService
    {
        private ApiDbContext _apiDbContext { get; init; }


        public ExampleService(ApiDbContext apiDbContext)
        {
            _apiDbContext = apiDbContext;
        }

        public async Task<bool> HandleAsync()
        {
            var blog = new Blog()
            {
                Url = "url",
            };

            var post = new Post()
            {
                Title = "title",
                Content = "TEST",
                Blog = blog
            };

            _apiDbContext.Update(post);


            await _apiDbContext.SaveChangesAsync();



            return true;
        }

    }
}
