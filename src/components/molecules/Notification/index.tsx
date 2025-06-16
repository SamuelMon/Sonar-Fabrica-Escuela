import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

interface NotificationProps {
  text: string;
  icon: string;
}

const Index = ({ text, icon }: NotificationProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer: NodeJS.Timeout = setTimeout(() => {
      setShow(false);
    }, 3000);

    // Mostramos la notificación
    setShow(true);

    // Limpiamos el timer al desmontar
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      data-testid="notification"
      className={`flex items-center gap-2 p-4 bg-white rounded-lg shadow-md absolute top-4 right-4 hover:cursor-pointer transition-transform duration-500 ${
        show ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <Icon icon={icon} width="24" height="24" />
      <h2>{text}</h2>
    </div>
  );
};

export default Index;
