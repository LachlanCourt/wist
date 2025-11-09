import { useCallback, useEffect, useRef, useState } from "react";
import { GameState } from "../../constants/GameState";
import { UrlProvider } from "../../constants/UrlProvider";
import { GameContextProvider } from "../../context/GameContext";
import { useAuthorizationToken } from "../../hooks/useAuthorizationToken";
import { QueryType, useQuery } from "../../hooks/useQuery/useQuery";
import { useSocket } from "../../hooks/useSocket/useSocket";
import type { GameData } from "../../models/GameData";
import { Game } from "./Game";
import { Lobby } from "./Lobby";

export const GameController = () => {
  const [gameData, setGameData] = useState<GameData>();

  const { loadTokenData } = useAuthorizationToken();
  const tokenData = loadTokenData();

  const postProcess = useCallback((data: GameData) => {
    const currentGameState = GameState[
      data.currentGameState
    ] as unknown as GameState;
    return { ...data, currentGameState };
  }, []);

  const { data: apiGameData } = useQuery<GameData>({
    query: UrlProvider.GetStateUrl(tokenData.gameCode),
    type: QueryType.GET,
    postProcess
  });

  const socketDataReceived = useRef(false);

  useSocket([
    {
      callback: (message) => {
        socketDataReceived.current = true;
        setGameData(postProcess(JSON.parse(message)));
      }
    }
  ]);

  useEffect(() => {
    if (apiGameData && !socketDataReceived.current) setGameData(apiGameData);
  }, [apiGameData]);

  if (!gameData) return null;

  return (
    <GameContextProvider {...gameData}>
      {gameData.currentGameState === GameState.LOBBY && <Lobby />}
      {gameData.currentGameState === GameState.PLAYING && <Game />}
    </GameContextProvider>
  );
};
