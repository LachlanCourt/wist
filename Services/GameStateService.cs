public class GameStateService : IGameStateService {
    private readonly ISaveGameService _saveGameService;

    public GameStateService(ISaveGameService saveGameService) {
        _saveGameService = saveGameService;
    }

    public Game GetGameState(string gameCode) {
        var game = _saveGameService.LoadGame(gameCode);
        return game;
    }
}