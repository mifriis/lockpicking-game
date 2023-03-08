using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

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
    
    //POST GameState and Save in memory
}
