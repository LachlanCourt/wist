import type { CardData } from "../../models/CardData";
import { Card } from "../Card/Card";

interface HandProps {
  cards: Array<CardData>;
}

export const Hand = ({ cards }: HandProps) => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-5 xl:grid-cols-10 justify-items-center gap-4 pt-6">
      {cards.map((card) => (
        <Card {...card} />
      ))}
    </div>
  );
};
