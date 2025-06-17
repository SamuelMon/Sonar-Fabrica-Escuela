import Button from "@/components/atoms/Button";
import NotificationsHistory from "@/components/molecules/NotificationsHistory";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function Home() {
  const { notifications } = useAuth();
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-lightGraySecondary relative gap-3">
      <div className="flex gap-2">
        <Button
          text={`Notifications (${notifications?.length || 0})`}
          onClick={() => setShow(!show)}
        />
      </div>

      <NotificationsHistory notifications={notifications || []} show={show} />
    </div>
  );
}
