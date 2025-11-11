interface BetTileProps {
  value: number;
  isDisabled: boolean;
}

export const BetTile = ({ value, isDisabled }: BetTileProps) => {
  return (
    <div
      className={`bg-gray-100 flex justify-center items-center py-10 px-8 rounded-md shadow-md ${isDisabled ? "cursor-not-allowed text-gray-400" : ""}`}
      title={
        isDisabled
          ? "Total bets cannot equal the total cards dealt for this round"
          : `${value}`
      }
    >
      {value}
    </div>
  );
};
