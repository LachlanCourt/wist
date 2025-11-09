using Sockets;
using System.Text.Json;


public class PlayerNotificationService : IPlayerNotificationService {
    private readonly MessageHub _messageHub;

    public PlayerNotificationService(MessageHub messageHub) {
        _messageHub = messageHub;
    }

    public void NotifyPlayersWithGameUpdate(Game game) {
        var stringGame = JsonSerializer.Serialize(game);
        foreach(Player player in game.Players) {
            var uniqueGame = JsonSerializer.Deserialize<Game>(stringGame);
            uniqueGame.RemoveHandsFromOtherPlayers(player.UserId);
            string jsonString = JsonSerializer.Serialize(uniqueGame, new JsonSerializerOptions { WriteIndented = true, PropertyNamingPolicy = JsonNamingPolicy.CamelCase });
            _messageHub.SendMessageAsync(player.UserId, jsonString).GetAwaiter().GetResult();
        }
    }
}