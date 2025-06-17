import Button from "@/components/atoms/Button";
import Notification from "@/components/molecules/Notification";
import NotificationsHistory from "@/components/molecules/NotificationsHistory";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function Home() {
  const { token } = useAuth();
  const [show, setShow] = useState(false);
  const [notifications, setNotifications] = useState<
    Array<{
      id: number;
      mensaje: string;
      fechaCreacion: string;
      tipo: string;
    }>
  >([]);
  const [currentNotification, setCurrentNotification] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (!token) return;

    const eventSource = new EventSource(
      `https://inno4-production.up.railway.app/api/notificaciones/suscripcion?token=${encodeURIComponent(
        token
      )}`
    );

    eventSource.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      setNotifications((prev) => [...prev, notification]);
      setCurrentNotification(notification.mensaje);

      // Ocultar la notificación después de 3.3 segundos
      setTimeout(() => {
        setCurrentNotification(null);
      }, 3300);
    };

    eventSource.onerror = (error) => {
      console.error("Error en la conexión SSE:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [token]);

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-lightGraySecondary relative gap-3">
      <Button
        text={`Notifications (${notifications.length})`}
        onClick={handleShow}
      />

      {currentNotification && (
        <Notification
          text={currentNotification}
          icon="ic:baseline-notifications"
        />
      )}

      {show && (
        <NotificationsHistory notifications={notifications} show={show} />
      )}
    </div>
  );
}
