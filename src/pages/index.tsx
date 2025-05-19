import Button from "@/components/atoms/Button";
import Notification from "@/components/molecules/Notification";
import NotificationsHistory from "@/components/molecules/NotificationsHistory";
import { useState } from "react";

export default function Home() {
  const [notification, setNotification] = useState(false);
  const [show, setShow] = useState(false);
  const [notifications, setNotifications] = useState(
    Array.from({ length: 20 }, (_, i) => `Notification ${i + 1}`)
  );

  const handleShowNotification = () => {
    setNotification(true);
    setTimeout(() => {
      setNotification(false);
    }, 3300);
  };

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-lightGraySecondary relative gap-3">
      <Button text="Click Me" onClick={handleShowNotification} />
      {notification && (
        <Notification
          text="This is a notification."
          icon="ic:baseline-notifications"
        />
      )}
      <Button text="Notifications" onClick={handleShow} />
      {show && (
        <NotificationsHistory notifications={notifications} show={show} />
      )}
      <Button text="algo" onClick={() => setNotifications([])} />
    </div>
  );
}
