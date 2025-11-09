interface PlayerCardProps {
  userName: string;
}

export const PlayerCard = ({ userName }: PlayerCardProps) => {
  return (
    <div className="bg-gray-700 text-white flex items-center justify-center w-40 h-50 rounded-md shadow-md">
      {userName}
    </div>
  );
};
