import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";
import Notification from "@/components/molecules/Notification";

interface NotificationData {
  text: string;
  icon: string;
}

interface NotificationContextProps {
  showNotification: (data: NotificationData) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
);

export const useNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx)
    throw new Error(
      "useNotification debe usarse dentro de NotificationProvider"
    );
  return ctx;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<NotificationData | null>(
    null
  );

  const showNotification = (data: NotificationData) => {
    setNotification(data);
    setTimeout(() => setNotification(null), 3300);
  };

  // Envolvemos el valor del contexto en useMemo
  const contextValue = useMemo(
    () => ({
      showNotification,
    }),
    [] // El array vacío porque showNotification no cambia
  );

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      {notification && (
        <Notification text={notification.text} icon={notification.icon} />
      )}
    </NotificationContext.Provider>
  );
};
