public interface IPlayerNotificationService {
    public void NotifyPlayersWithGameUpdate(Game game, bool notifyCurrentUser = true);
}