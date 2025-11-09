using Microsoft.AspNetCore.Authorization;

namespace Api.Init;


public static class GameInitEndpoints {
    public static void MapGameInitEndpoints(this IEndpointRouteBuilder app) {
        app.MapPost("/join", (IGameSetupService gameSetupService, HttpContext context, JoinGameData data) => {

            var token = gameSetupService.JoinGame(data);
            
            var options = new CookieOptions {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                
            };
            context.Response.Cookies.Append("token", $"Bearer {token}", options);
            
            return new { token = token, Success = true,  };
        });

        app.MapPost("/start", (IGameSetupService gameSetupService, HttpContext context) => {

            var Success = gameSetupService.StartGame();
            
            return new { Success };
        });
    }
}