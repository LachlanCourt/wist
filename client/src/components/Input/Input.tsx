interface InputProps {
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const Input = ({ placeholder, onChange }: InputProps) => {
  return (
    <input
      className="border-1 py-0.5 px-2 border-gray-800 focus:border-blue-600 rounded-sm focus-visible:outline-none placeholder:text-gray-400"
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};
