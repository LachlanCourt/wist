import { useGameContext } from "../context/GameContext";
import { Player } from "./Player/Player";

export const Players = () => {
  const { players, currentPlayer } = useGameContext();

  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-2 justify-evenly p-2">
      {players.map((player) => (
        <Player
          userName={player.userName}
          score={0}
          currentBet={player.currentBet}
          currentTricks={0}
          isCurrentPlayer={player.userId === currentPlayer}
        />
      ))}
    </div>
  );
};
