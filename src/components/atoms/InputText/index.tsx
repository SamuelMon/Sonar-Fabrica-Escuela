import React from "react";

const Index = ({ placeholder }: { placeholder: string }) => {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        className="w-96 h-11 border-none p-4 rounded-lg shadow-2xl bg-white"
      />
    </div>
  );
};

export default Index;
