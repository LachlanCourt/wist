import type { GameState } from "../constants/GameState";
import type { Player } from "./Player";

export interface GameData {
  gameCode: string;
  players: Array<Player>;
  roundNumber: number;
  trickNumber: number;
  hostId: string;
  currentGameState: GameState;
}
