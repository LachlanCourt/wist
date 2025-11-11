using Microsoft.AspNetCore.Authorization;

namespace Api.Init;

public static class GameplayEndpoints {
    public static void MapGameplayEndpoints(this IEndpointRouteBuilder app) {
        app.MapPost("/placebet", (IGamePlayService gamePlayService, HttpContext context, PlaceBetData data) => {
            var success = gamePlayService.PlaceBet(data.Bet);
            return new { Success = success };
        });
    }
}