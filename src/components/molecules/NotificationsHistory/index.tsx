import NotificationsHistoryItem from "@/components/atoms/NotificationsHistoryItem";
import React from "react";

interface Props {
  notifications: Array<{
    id: number;
    mensaje: string;
    fechaCreacion: string;
    tipo: string;
  }>;
  show: boolean;
}

const Index = ({ notifications, show }: Props) => {
  return (
    <div
      className={`
        fixed top-20 left-4 w-80
        bg-white rounded-lg shadow-md
        transition-all duration-300 ease-in-out
        ${
          show
            ? "opacity-100 max-h-[80vh] p-4 overflow-y-auto"
            : "opacity-0 max-h-0 overflow-hidden p-0"
        }
      `}
    >
      {show && (
        <>
          {notifications.length === 0 ? (
            <p className="text-gray-500 text-sm">No hay notificaciones</p>
          ) : (
            notifications.map(({ id, mensaje, tipo, fechaCreacion }) => (
              <div key={id} className="mb-2 last:mb-0">
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
        </>
      )}
    </div>
  );
};

export default Index;
