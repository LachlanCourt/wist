import { useMemo } from "react";
import type { CardData } from "../../models/CardData";
import * as svgs from "./svgs";
import { useGameContext } from "../../context/GameContext";
import { useAuthorizationToken } from "../../hooks/useAuthorizationToken";
import { RoundState } from "../../constants/RoundState";

interface CardProps extends CardData {}

export const Card = ({ suit, value }: CardProps) => {
  const mappedValue = useMemo<string>(() => {
    const maps: { [key: number]: string } = {
      1: "A",
      11: "J",
      12: "Q",
      13: "K"
    };
    return maps[value] ?? `${value}`;
  }, [value]);

  const { userId } = useAuthorizationToken().loadTokenData();
  const { currentRoundState, currentPlayer } = useGameContext();

  const getAdditionalStyles = () => {
    let styles = "";
    if (currentRoundState !== RoundState.PLAYING || currentPlayer !== userId) {
      styles += "cursor-not-allowed";
    } else {
      styles += "cursor-pointer";
    }

    return styles;
  };

  return (
    <div
      role="button"
      className={`w-[100px] h-[150px] bg-gray-100 rounded-md shadow-xl p-3 ${getAdditionalStyles()}`}
    >
      <div>{mappedValue}</div>
      <img
        //@ts-ignore
        src={svgs[suit]}
      />
      <div className="flex justify-end">{mappedValue}</div>
    </div>
  );
};
