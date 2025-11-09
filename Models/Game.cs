public class Game {
    public string GameCode { get; set; }
    public List<Player> Players { get; set; }
    public int RoundNumber { get; set; }
    public int TrickNumber { get; set; }
    public string HostId { get; set; }
    public GameState CurrentGameState { get; set; }
    public RoundState CurrentRoundState { get; set; }
    public string CurrentPlayer { get; set; }

    public Game() {}

    public Game(string gameCode, string hostUserName, string hostUserId) {
        GameCode = gameCode;
        Players = new List<Player>();
        AddNewPlayer(hostUserName, hostUserId);
        RoundNumber = 1;
        TrickNumber = 1;
        HostId = hostUserId;
        CurrentGameState = GameState.LOBBY;
        CurrentRoundState = RoundState.BETTING;
    }

    public void AddNewPlayer(string userName, string userId) {
        Players.Add(new Player(userName, userId));
    }

    public void DealCards() {
        var deck = new Deck();
        deck.Shuffle();

        var cardsPerRound = new [] { 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
        var cardsThisRound = cardsPerRound[RoundNumber - 1];

        for (var i = 0; i < Players.Count; i++) {
            Players[i].SetCards(deck.DealHand(i, cardsThisRound));
        }
    }

    public void RemoveHandsFromOtherPlayers(string userId) {
        foreach(var player in Players) {
            if(player.UserId != userId) {
                player.Cards = null;
            }
        }
    }
}