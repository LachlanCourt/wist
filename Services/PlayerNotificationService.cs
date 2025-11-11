using Sockets;
using System.Text.Json;


public class PlayerNotificationService : IPlayerNotificationService {
    private readonly MessageHub _messageHub;
    private readonly IUserService _userService;

    public PlayerNotificationService(MessageHub messageHub, IUserService userService) {
        _messageHub = messageHub;
        _userService = userService;
    }

    public void NotifyPlayersWithGameUpdate(Game game, bool notifyCurrentUser = true) {
        var stringGame = JsonSerializer.Serialize(game);
       
        foreach(Player player in game.Players) {
            if (!notifyCurrentUser && player.UserId == game.Players.Last().UserId) continue;
            var uniqueGame = JsonSerializer.Deserialize<Game>(stringGame);
            uniqueGame.RemoveHandsFromOtherPlayers(player.UserId);
            string jsonString = JsonSerializer.Serialize(uniqueGame, new JsonSerializerOptions { WriteIndented = true, PropertyNamingPolicy = JsonNamingPolicy.CamelCase });
            _messageHub.SendMessageAsync(player.UserId, jsonString).GetAwaiter().GetResult();
        }
    }
}