import React from "react";
import { render, screen, act } from "@testing-library/react";
import {
  NotificationProvider,
  useNotification,
} from "@/context/NotificationContext";

function TestComponent() {
  const { showNotification } = useNotification();
  return (
    <button
      onClick={() =>
        showNotification({ text: "¡Hola!", icon: "ic:outline-info" })
      }
    >
      Notificar
    </button>
  );
}

describe("NotificationContext", () => {
  test("muestra la notificación y la oculta después de 3.3s", () => {
    jest.useFakeTimers();
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );

    // No debe haber notificación al inicio
    expect(screen.queryByText("¡Hola!")).not.toBeInTheDocument();

    // Dispara la notificación
    act(() => {
      screen.getByText("Notificar").click();
    });

    // Ahora debe aparecer la notificación
    expect(screen.getByText("¡Hola!")).toBeInTheDocument();

    // Avanza el tiempo para ocultarla
    act(() => {
      jest.advanceTimersByTime(3300);
    });

    // Ya no debe estar la notificación
    expect(screen.queryByText("¡Hola!")).not.toBeInTheDocument();

    jest.useRealTimers();
  });

  test("lanza error si se usa fuera del provider", () => {
    // Componente que usa el hook fuera del provider
    function BrokenComponent() {
      useNotification();
      return null;
    }
    // Debe lanzar error
    expect(() => render(<BrokenComponent />)).toThrow(
      "useNotification debe usarse dentro de NotificationProvider"
    );
  });
});
