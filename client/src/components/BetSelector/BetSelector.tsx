import { useState } from "react";
import { useGameContext } from "../../context/GameContext";
import { BetTile } from "../BetTile/BetTile";
import { QueryType, useQuery } from "../../hooks/useQuery/useQuery";
import { UrlProvider } from "../../constants/UrlProvider";

interface BetSelectorProps {}

export const BetSelector = ({}: BetSelectorProps) => {
  const { validBetsThisRound, validBetsThisTurn } = useGameContext();

  const [candidateBet, setCandidateBet] = useState<number | null>(null);

  const { fetch: playBet } = useQuery({
    query: UrlProvider.GetPlaceBetUrl(),
    type: QueryType.POST,
    body: JSON.stringify({ bet: candidateBet })
  });

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
            candidateBet={candidateBet}
            setCandidateBet={setCandidateBet}
          />
        ))}
      </div>
      {candidateBet !== null && (
        <div className="flex justify-center items-center gap-10">
          Select {candidateBet}?
          <div
            role="button"
            className="bg-green-400 text-xl py-2.5 px-4.5 rounded-md shadow-md cursor-pointer"
            onClick={playBet}
          >
            &#x2713;
          </div>
          <div
            className="bg-red-200 text-black py-3 px-4 rounded-md shadow-md cursor-pointer"
            role="button"
            onClick={() => setCandidateBet(null)}
          >
            &#x274c;
          </div>
        </div>
      )}
    </div>
  );
};
