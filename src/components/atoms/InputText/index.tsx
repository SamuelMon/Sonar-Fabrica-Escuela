import React from "react";

interface InputTextProps {
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  name?: string;
}

const Index = ({
  placeholder,
  type,
  value,
  onChange,
  name,
  disabled = false,
}: InputTextProps) => {
  return (
    <div>
      <input
        type={type ?? "text"}
        placeholder={placeholder}
        value={value}
        className="w-full h-11 border-2 border-gray-200 p-4 rounded-lg bg-white"
        onChange={onChange}
        disabled={disabled}
        name={name}
        required
      />
    </div>
  );
};

export default Index;
