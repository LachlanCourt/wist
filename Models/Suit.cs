using System.Text.Json.Serialization;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum Suit {
    CLUBS,
    SPADES,
    HEARTS,
    DIAMONDS
}