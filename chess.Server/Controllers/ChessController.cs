using Microsoft.AspNetCore.Mvc;
using chess.Server.Models;

namespace chess.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChessController : ControllerBase
    {

        private readonly ILogger<ChessController> _logger;

        public ChessController(ILogger<ChessController> logger)
        {
            _logger = logger;
        }

        [HttpGet("getNextMove")]
        public ActionResult<string> Get()
        {
            return "guh my man, im so zooted right now";


        }

    }
}
