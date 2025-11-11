import { useGameContext } from "../../context/GameContext";
import { BetTile } from "../BetTile/BetTile";

interface BetSelectorProps {}

export const BetSelector = ({}: BetSelectorProps) => {
  const { validBetsThisRound, validBetsThisTurn } = useGameContext();

  return (
    <div>
      <div className="flex justify-center bg-gray-100 shadow-md py-2 mb-2">
        Place bet
      </div>
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-1 justify-items-center">
        {validBetsThisRound.map((value) => (
          <BetTile
            key={value}
            value={value}
            isDisabled={!validBetsThisTurn.includes(value)}
          />
        ))}
      </div>
    </div>
  );
};
