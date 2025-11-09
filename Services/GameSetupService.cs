using System.Security.Claims;

public class GameSetupService : IGameSetupService {

    private readonly ITokenService _tokenService;
    private readonly ISaveGameService _saveGameService;
    private readonly IUserService _userService;

    private static Random random = new Random();


    public GameSetupService(ITokenService tokenService, ISaveGameService saveGameService, IUserService userService) {
        _tokenService = tokenService;
        _saveGameService = saveGameService;
        _userService = userService;
    }

    public string JoinGame(JoinGameData data) {
        var gameCode = data.GameCode ?? GetNewGameCode();
        var userId = Guid.NewGuid().ToString();
        var userName = data.UserName;

        var claims = new List<Claim> ();
        claims.Add(new Claim("gameCode", gameCode));
        claims.Add(new Claim(ClaimTypes.Name, userName));
        claims.Add(new Claim(ClaimTypes.NameIdentifier, userId));

        var token = _tokenService.GenerateToken(claims);

        var existingGame = _saveGameService.LoadGame(gameCode);

        if (existingGame == null) {
            var game = new Game(gameCode, userName, userId);
            _saveGameService.SaveGame(game);
        } else {
            existingGame.AddNewPlayer(userName, userId);
            _saveGameService.SaveGame(existingGame);
        }
                
        return token;

    }

    public bool StartGame() {
        var gameCode = _userService.GameCode;
        var game = _saveGameService.LoadGame(gameCode);

        if (game == null) return false;
              
        
        var userId = _userService.UserId;
        if (game.HostId != userId) return false;

        if (game.CurrentGameState != GameState.LOBBY) return false;
        
        game.CurrentGameState = GameState.PLAYING;
        game.CurrentRoundState = RoundState.BETTING;

        game.DealCards();

        game.CurrentPlayer = userId;

        _saveGameService.SaveGame(game);
        return true;
    }


    private static string GetNewGameCode() {
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var gameCodeLength = 6;
        return new string(Enumerable.Repeat(chars, gameCodeLength).Select(s => s[random.Next(s.Length)]).ToArray());
    }
 
}