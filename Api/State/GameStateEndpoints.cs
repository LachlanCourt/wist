using Microsoft.AspNetCore.Authorization;

namespace Api.Init;


public static class GameStateEndpoints {
    public static void MapGameStateEndpoints(this IEndpointRouteBuilder app) {
        app.MapGet("/state/{gameCode}", [Authorize] (string gameCode, IGameStateService gameStateService, IUserService userService) => {
            var game = gameStateService.GetGameState(gameCode);
            game.RemoveHandsFromOtherPlayers(userService.UserId);
            return game;
        });
    }

    
}