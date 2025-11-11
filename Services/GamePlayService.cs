public class GamePlayService : IGamePlayService {
    private readonly IUserService _userService;
    private readonly ISaveGameService _saveGameService;

    public GamePlayService(IUserService userService, ISaveGameService saveGameService) {
        _userService = userService;
        _saveGameService = saveGameService;
    }


    public bool PlaceBet(int bet) {
        var gameCode = _userService.GameCode;
        var game = _saveGameService.LoadGame(gameCode);
        var userId = _userService.UserId;

        if (
            game.CurrentPlayer != userId
        || game.CurrentGameState != GameState.PLAYING
        || game.CurrentRoundState != RoundState.BETTING
        || !game.ValidBetsThisTurn.Contains(bet)) return false;

        game.PlaceBet(bet, userId);
        game.NextTurn();
        game.StartTurn();

        _saveGameService.SaveGame(game);
        return true;
    }
}