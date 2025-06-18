import React from "react";
import { render, screen, act } from "@testing-library/react";
import { AuthProvider, useAuth } from "@/context/AuthContext";

// Mock de next/router para evitar navegación real
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

function TestComponent() {
  const { isAuthenticated, login, logout, showNotification, token } = useAuth();
  return (
    <div>
      <span data-testid="auth">
        {isAuthenticated ? "autenticado" : "no-auth"}
      </span>
      <span data-testid="token">{token ?? "sin-token"}</span>
      <button onClick={() => login("abc123")}>Login</button>
      <button onClick={logout}>Logout</button>
      <button onClick={() => showNotification("Mensaje", "success")}>
        Notificar
      </button>
    </div>
  );
}

describe("AuthContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // Mock global de fetch para todos los tests
  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([]), // Devuelve un array vacío o lo que esperes
      })
    ) as jest.Mock;
  });

  afterAll(() => {
    // Limpia el mock después de los tests
    // @ts-expect-error: Resetting global.fetch to undefined for cleanup after tests
    global.fetch = undefined;
  });

  // Mock global de EventSource para todos los tests
  beforeAll(() => {
    // @ts-expect-error: EventSource is not defined in the Node.js test environment, so we mock it here
    global.EventSource = class {
      close() {
        // Método vacío intencionalmente para el mock de EventSource en tests
      }
      addEventListener() {
        // Método vacío intencionalmente para el mock de EventSource en tests
      }
      removeEventListener() {
        // Método vacío intencionalmente para el mock de EventSource en tests
      }
      onmessage = null;
      onerror = null;
      onopen = null;
    };
  });

  test("usuario inicia no autenticado", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    expect(screen.getByTestId("auth")).toHaveTextContent("no-auth");
    expect(screen.getByTestId("token")).toHaveTextContent("sin-token");
  });

  test("login guarda el token y autentica", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    act(() => {
      screen.getByText("Login").click();
    });
    expect(screen.getByTestId("auth")).toHaveTextContent("autenticado");
    expect(screen.getByTestId("token")).toHaveTextContent("abc123");
    expect(localStorage.getItem("token")).toBe("abc123");
  });

  test("logout elimina el token y desautentica", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    act(() => {
      screen.getByText("Login").click();
      screen.getByText("Logout").click();
    });
    expect(screen.getByTestId("auth")).toHaveTextContent("no-auth");
    expect(screen.getByTestId("token")).toHaveTextContent("sin-token");
    expect(localStorage.getItem("token")).toBeNull();
  });

  test("showNotification muestra el mensaje y lo oculta", () => {
    jest.useFakeTimers();
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    act(() => {
      screen.getByText("Notificar").click();
    });
    expect(screen.getByText("Mensaje")).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(screen.queryByText("Mensaje")).not.toBeInTheDocument();
    jest.useRealTimers();
  });

  test("lanza error si se usa fuera del provider", () => {
    function BrokenComponent() {
      useAuth();
      return null;
    }
    expect(() => render(<BrokenComponent />)).toThrow(
      "useAuth debe ser usado dentro de un AuthProvider"
    );
  });
});
