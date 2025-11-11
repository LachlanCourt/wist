using System.IO;
using System.Text.Json;

public class SaveGameService : ISaveGameService {
    private static readonly string filepathPrefix = "savegames/";

    private readonly IPlayerNotificationService _playerNotificationService;

    public SaveGameService(IPlayerNotificationService playerNotificationService) {
        _playerNotificationService = playerNotificationService;
    }


    public void SaveGame(Game game, bool notifyCurrentUser = true) {
        string jsonString = JsonSerializer.Serialize(game, new JsonSerializerOptions { WriteIndented = true });
        var filepath = $"{filepathPrefix}{game.GameCode}.json";
        File.WriteAllText(filepath, jsonString);

        _playerNotificationService.NotifyPlayersWithGameUpdate(game, notifyCurrentUser);
    }

    public Game? LoadGame(string gameCode) {
        var filepath = $"{filepathPrefix}{gameCode}.json";
        if (!File.Exists(filepath)) return null;
        
        var jsonString = File.ReadAllText(filepath);
        var game = JsonSerializer.Deserialize<Game>(jsonString, new JsonSerializerOptions { IncludeFields = true });

        return game;
    }
}