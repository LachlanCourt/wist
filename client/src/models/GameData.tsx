import type { GameState } from "../constants/GameState";
import type { RoundState } from "../constants/RoundState";
import type { Player } from "./Player";

export interface GameData {
  gameCode: string;
  players: Array<Player>;
  roundNumber: number;
  trickNumber: number;
  hostId: string;
  currentGameState: GameState;
  currentRoundState: RoundState;
  currentPlayer: string;
  currentBetTotal: number;
  validBetsThisRound: Array<number>;
  validBetsThisTurn: Array<number>;
  cardsThisRound: number;
}
