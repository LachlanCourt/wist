public interface ISaveGameService {
    public void SaveGame(Game game);

    public Game? LoadGame(string gameCode);
}