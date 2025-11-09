public class Player {
    public string UserName { get; set; }
    public string UserId { get; set; }
    public List<Card> Cards { get; set; }

    public Player() {}

    public Player(string userName, string userId) {
        UserName = userName;
        UserId = userId;
    }


    public void SetCards(List<Card> cards) {
        Cards =  cards;
    }
}