import { useEffect, useRef, useState } from "react";
import { Button } from "../../components/Button/Button";
import { useGameContext } from "../../context/GameContext";
import { useAuthorizationToken } from "../../hooks/useAuthorizationToken";
import { PlayerCard } from "./components/PlayerCard";
import { QueryType, useQuery } from "../../hooks/useQuery/useQuery";
import { UrlProvider } from "../../constants/UrlProvider";

export const Lobby = () => {
  const data = useGameContext();
  const { loadTokenData } = useAuthorizationToken();
  const tokenData = loadTokenData();

  const [showCopied, setShowCopied] = useState(false);
  const copiedTimer = useRef<number>(undefined);

  const handleCopy = () => {
    navigator.clipboard.writeText(data.gameCode);
    clearTimeout(copiedTimer.current);
    setShowCopied(true);
    copiedTimer.current = setTimeout(() => {
      setShowCopied(false);
    }, 1000);
  };

  useEffect(() => () => clearTimeout(copiedTimer.current), []);

  const { fetch: startGame } = useQuery({
    query: UrlProvider.GetStartGameUrl(),
    type: QueryType.POST
  });

  return (
    <div className="bg-blue-200 h-full overflow-y-auto">
      <div className="flex justify-center text-gray-800 text-4xl font-bold p-3 shadow-md">
        LOBBY
      </div>
      <div className="flex justify-center items-center pt-5">
        Game Code:
        <div
          className="p-2 ml-2 font-bold bg-blue-400 rounded-md shadow-md cursor-pointer"
          role="button"
          onClick={handleCopy}
          title="Copy"
        >
          {data.gameCode}
        </div>
      </div>

      {tokenData.userId === data.hostId && (
        <div className="flex justify-center p-3">
          <Button onClick={startGame}>Everyone's In!</Button>
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 justify-items-center gap-4 pt-6">
        {data.players.map((player) => (
          <PlayerCard userName={player.userName} key={player.userId} />
        ))}
      </div>
      {showCopied && (
        <div className="bg-gray-400 p-2 rounded-md shadow-md absolute top-[80vh] left-[50%] transform-[translate(-50%, -50%)]">
          Copied!
        </div>
      )}
    </div>
  );
};
