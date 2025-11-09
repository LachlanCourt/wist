public class Deck {
    private List<Card> Cards { get; set; }

    public Deck() {
        Cards = new List<Card>();
        foreach (var suit in Enum.GetValues(typeof(Suit)).Cast<Suit>()) {
            Console.WriteLine(suit);
            for (var i = 1; i < 14; i++) {
                Cards.Add(new Card() { Suit = suit, Value = i});
            }
        }
    }

    public void Shuffle() {
        Cards.Shuffle();
    }

    public List<Card> DealHand(int skip, int handSize) {
        return Cards.Skip(skip).Take(handSize).ToList();
    }
}