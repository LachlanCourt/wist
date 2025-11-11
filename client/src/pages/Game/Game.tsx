import { useMemo } from "react";
import { Hand } from "../../components/Hand/Hand";
import { useGameContext } from "../../context/GameContext";
import { useAuthorizationToken } from "../../hooks/useAuthorizationToken";
import { GameState } from "../../constants/GameState";
import { RoundState } from "../../constants/RoundState";
import { BetSelector } from "../../components/BetSelector/BetSelector";
import { Players } from "../../components/Players";

export const Game = () => {
  const { players, currentPlayer, currentRoundState } = useGameContext();
  const { loadTokenData } = useAuthorizationToken();
  const { userId } = loadTokenData();

  const cards = useMemo(() => {
    const player = players.find((player) => player.userId === userId);
    return player?.cards ?? [];
  }, [userId, players]);

  return (
    <div className="bg-purple-200 h-full overflow-y-auto">
      <div className="flex justify-center text-gray-800 text-4xl font-bold p-3 shadow-md">
        WIST
      </div>

      <div>
        <Players />
        {currentPlayer === userId &&
          currentRoundState === RoundState.BETTING && <BetSelector />}
        <Hand cards={cards} />
      </div>
    </div>
  );
};
