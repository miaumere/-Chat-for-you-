using Chat.API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace Chat.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private ExampleService _exampleService { get; init; }

        public WeatherForecastController(ExampleService exampleService)
        {
            _exampleService = exampleService;
        }

        [HttpGet, Route("xxx")]
        public async Task<string> Get()
        {
           await _exampleService.HandleAsync();

            return "string";
        }
    }
}