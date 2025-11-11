public interface ISaveGameService {
    public void SaveGame(Game game, bool notifyCurrentUser = true);

    public Game? LoadGame(string gameCode);
}