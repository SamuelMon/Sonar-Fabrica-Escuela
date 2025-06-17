import NotificationsHistoryItem from "@/components/atoms/NotificationsHistoryItem";
import React from "react";

interface Notification {
  id: number;
  mensaje: string;
  fechaCreacion: string;
  tipo: string;
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
      {notifications.length === 0 ? (
        <p className="text-gray-500 text-sm">No hay notificaciones</p>
      ) : (
        notifications.map(({ id, mensaje, tipo, fechaCreacion }) => (
          <div key={id} className="w-full p-2 shadow-md rounded-lg bg-white">
            <NotificationsHistoryItem
              text={mensaje}
              icon={
                tipo === "success"
                  ? "ic:outline-check-circle"
                  : "ic:outline-info"
              }
              date={new Date(fechaCreacion).toLocaleString()}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Index;
