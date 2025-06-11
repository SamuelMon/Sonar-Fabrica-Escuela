import NotificationsHistoryItem from "@/components/atoms/NotificationsHistoryItem";
import React from "react";

interface Notification {
  id: number;
  text: string;
}

interface Props {
  notifications: Notification[];
  show: boolean;
}

const Index = ({ notifications, show }: Props) => {
  return (
    <div
      className={`
        flex flex-col items-center gap-1 bg-white w-80 p-4 rounded-lg shadow-md overflow-y-auto hide-scrollbar absolute top-2 left-20
        transition-all duration-1500
        ${show ? "max-h-96" : "max-h-0 p-0"}
      `}
      style={{ minHeight: 0 }}
    >
      {notifications.map(({ id, text }) => (
        <div key={id} className="p-2 shadow-md rounded-lg bg-white">
          <NotificationsHistoryItem
            text={text}
            icon="ic:outline-arrow-forward"
          />
        </div>
      ))}
    </div>
  );
};

export default Index;
