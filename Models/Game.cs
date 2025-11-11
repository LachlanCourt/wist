using System.Text.Json.Serialization;

public class Game {
    public string GameCode { get; set; }
    public List<Player> Players { get; set; }
    public int RoundNumber { get; set; }
    public int TrickNumber { get; set; }
    public string HostId { get; set; }
    public GameState CurrentGameState { get; set; }
    public RoundState CurrentRoundState { get; set; }
    public string CurrentPlayer { get; set; }
    public List<int> ValidBetsThisRound { get; set; }
    public List<int> ValidBetsThisTurn { get; set; }
    public int CurrentBetTotal { get; set; }
    public int CardsThisRound { get; set; }

    [JsonIgnore]
    private static readonly int[] CARDS_PER_ROUND = new [] { 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };


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
        CurrentBetTotal = 0;
    }

    public void AddNewPlayer(string userName, string userId) {
        Players.Add(new Player(userName, userId));
    }

    public void StartRound() {
        CardsThisRound = CARDS_PER_ROUND[RoundNumber - 1];

        DealCards();
        ResetBet();
        
        StartTurn();

        foreach (var player in Players) {
            player.CurrentBet = null;
        }
    }

    public void StartTurn() {
        CalculateValidBets();
    }

    private void DealCards() {
        var deck = new Deck();
        deck.Shuffle();

        for (var i = 0; i < Players.Count; i++) {
            Players[i].SetCards(deck.DealHand(i * CardsThisRound, CardsThisRound));
        }
    }

    private void ResetBet() {
        CurrentBetTotal = 0;
    }

    private void CalculateValidBets() {
        ValidBetsThisRound = new List<int>();
        ValidBetsThisTurn = new List<int>();
        for (var i = 0; i <= CardsThisRound; i++) {
            ValidBetsThisRound.Add(i);

            var lastPlayer = CurrentPlayer == Players.Last().UserId;
            if (!lastPlayer || CurrentBetTotal + i != CardsThisRound) {
                ValidBetsThisTurn.Add(i);
            };
        }
    }

    public void RemoveHandsFromOtherPlayers(string userId) {
        foreach(var player in Players) {
            if(player.UserId != userId) {
                player.Cards = null;
            }
        }
    }

    public void PlaceBet(int bet, string userId) {
        Players.First(p => p.UserId == userId).CurrentBet = bet;
        CurrentBetTotal += bet;
    }

    public void NextTurn() {
        if (CurrentRoundState == RoundState.BETTING) {
            var currentPlayerIndex = Players.FindIndex(p => p.UserId == CurrentPlayer);
            var nextPlayerIndex = currentPlayerIndex + 1;
            if (nextPlayerIndex == Players.Count) nextPlayerIndex = 0;

            CurrentPlayer = Players[nextPlayerIndex].UserId;

            if (Players[nextPlayerIndex].CurrentBet != null) {
                CurrentRoundState = RoundState.PLAYING;
            }
        }
    }
}