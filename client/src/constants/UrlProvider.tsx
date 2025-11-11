export class UrlProvider {
  public static readonly GetJoinGameUrl = () => "join";

  public static readonly GetSocketUrl = (baseApiUrl: string) => {
    return `${baseApiUrl}/signalr`;
  };

  public static readonly GetStateUrl = (gameCode: string) => {
    return `state/${gameCode}`;
  };

  public static readonly GetStartGameUrl = () => "start";

  public static readonly GetPlaceBetUrl = () => "placebet";
}
