import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import { useRouter } from "next/router";
import Notification from "@/components/molecules/Notification";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  showNotification: (message: string, type?: "success" | "error") => void;
  notifications: Notification[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface Notification {
  id: number;
  mensaje: string;
  fechaCreacion: string;
  tipo: string;
}

export function AuthProvider({ children }: { readonly children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notification, setNotification] = useState<{
    message: string;
    type: string;
  } | null>(null);
  const router = useRouter();

  // Efecto para cargar el historial de eventos
  useEffect(() => {
    const fetchEventHistory = async () => {
      if (!token) return;

      try {
        const response = await fetch(
          "https://inno4-production.up.railway.app/api/eventos/historial",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setNotifications(data);
        }
      } catch (error) {
        console.error("Error al obtener historial de eventos:", error);
      }
    };

    if (token) {
      fetchEventHistory();
    }
  }, [token]);

  // Efecto para SSE
  useEffect(() => {
    if (!token) return;

    const eventSource = new EventSource(
      `https://inno4-production.up.railway.app/api/notificaciones/suscripcion?token=${encodeURIComponent(
        token
      )}`
    );

    eventSource.onmessage = (event) => {
      const newNotification = JSON.parse(event.data);
      setNotifications((prev) => [newNotification, ...prev]);
      showNotification(newNotification.mensaje, newNotification.tipo);
    };

    eventSource.onerror = (error) => {
      console.error("Error en la conexión SSE:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [token]);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    router.push("/login");
  };
  const showNotification = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const contextValue = useMemo(
    () => ({
      isAuthenticated: !!token,
      token,
      login,
      logout,
      showNotification,
      notifications, // Exportamos las notificaciones
    }),
    [token, notifications]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
      {notification && (
        <Notification
          text={notification.message}
          icon={notification.type === "success" ? "check-circle" : "error"}
        />
      )}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
