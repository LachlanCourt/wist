import * as React from "react";

interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

export const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button
      className="px-3 py-1.5 bg-green-300 text-gray-700 text-lg rounded-md shadow-md cursor-pointer"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
