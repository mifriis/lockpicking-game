using Microsoft.AspNetCore.Mvc;

namespace LockpickingGame.Controllers;

[ApiController]
[Route("[controller]")]
public class GameController : ControllerBase
{
    private readonly ILogger<GameController> _logger;

    public GameController(ILogger<GameController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetState")]
    public GameState Get()
    {
        return new GameState()
        {
            Date = DateTime.Now
        };
    }
}
