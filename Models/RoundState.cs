using System.Text.Json.Serialization;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum RoundState {
    BETTING,
    TRUMPS,
    PLAYING,
    FINISHED
}