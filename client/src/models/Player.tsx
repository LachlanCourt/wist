import type { CardData } from "./CardData";

export type Player = {
  userId: string;
  userName: string;
  cards: Array<CardData>;
};
