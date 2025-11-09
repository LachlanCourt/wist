import { createContext, useContext, type PropsWithChildren } from "react";
import type { GameData } from "../models/GameData";

type GameContextType = GameData & {};

const GameContext = createContext<GameContextType | null>(null);

export const useGameContext = (): GameContextType => {
  const value = useContext(GameContext);
  if (value === null) {
    throw new Error("GameContext not found");
  }

  return value;
};

export const GameContextProvider = ({
  children,
  ...props
}: PropsWithChildren<GameData>) => {
  return <GameContext.Provider value={props}>{children}</GameContext.Provider>;
};
