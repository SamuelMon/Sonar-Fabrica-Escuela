import React from "react";
import { Icon } from "@iconify/react";

const Index = ({ text, icon }: { text: string; icon: string }) => {
  return (
    <div className="flex items-center justify-between hover:cursor-pointer w-60">
      <h2>{text}</h2>
      <Icon icon={icon} width="20" height="20" />
    </div>
  );
};

export default Index;
