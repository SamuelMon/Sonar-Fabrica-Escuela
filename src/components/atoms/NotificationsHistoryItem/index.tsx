import { Icon } from "@iconify/react";
import React from "react";

interface Props {
  text: string;
  icon: string;
  date: string;
}

const NotificationsHistoryItem = ({ text, icon, date }: Props) => {
  return (
    <div className="flex items-center gap-2 w-full">
      <Icon icon={icon} width="24" height="24" />
      <div className="flex flex-col">
        <p className="text-sm">{text}</p>
        <small className="text-xs text-gray-500">{date}</small>
      </div>
    </div>
  );
};

export default NotificationsHistoryItem;
