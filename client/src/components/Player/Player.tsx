interface PlayerProps {
  isCurrentPlayer: boolean;
  userName: string;
  currentBet?: number;
  currentTricks?: number;
  score: number;
}

export const Player = ({
  isCurrentPlayer,
  userName,
  currentBet,
  currentTricks,
  score
}: PlayerProps) => {
  return (
    <div
      className={`bg-gray-100 p-1 rounded-md shadow-md ${isCurrentPlayer ? "bg-green-200" : ""}`}
    >
      <div>{userName}</div>
      <div>Current Bet: {currentBet}</div>
      <div>Current Tricks: {currentTricks}</div>
      <div>Score: {score}</div>
    </div>
  );
};
