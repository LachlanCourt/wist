interface BetTileProps {
  value: number;
  isDisabled: boolean;
  candidateBet: number | null;
  setCandidateBet: React.Dispatch<React.SetStateAction<number | null>>;
}

export const BetTile = ({
  value,
  isDisabled,
  candidateBet,
  setCandidateBet
}: BetTileProps) => {
  const getAdditionalStyles = () => {
    let styles = "";
    if (isDisabled) {
      styles += " cursor-not-allowed text-gray-400 ";
    } else {
      styles += " cursor-pointer ";
    }

    if (value === candidateBet) {
      styles += " border-2 border-green-500 ";
    }

    return styles;
  };

  return (
    <div
      className={`bg-gray-100 flex justify-center items-center py-10 px-8 rounded-md shadow-md ${getAdditionalStyles()}`}
      title={
        isDisabled
          ? "Total bets cannot equal the total cards dealt for this round"
          : `${value}`
      }
      onClick={() => !isDisabled && setCandidateBet(value)}
    >
      {value}
    </div>
  );
};
