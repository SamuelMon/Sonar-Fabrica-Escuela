import React from "react";
interface IndexProps {
  text?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}
const Index = ({ text, onClick, disabled, type }: IndexProps) => {
  return (
    <button
      onClick={onClick}
      className="w-40 h-11 font-extrabold text-lightGraySecondary  bg-mintTeal hover:bg-teal-500 text-sm rounded-2xl shadow-2xl hover:scale-105 cursor-pointer  transition-all duration-300 ease-in-out "
      disabled={disabled}
      type={type}
    >
      {text}
    </button>
  );
};

export default Index;
