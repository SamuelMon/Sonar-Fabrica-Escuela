/* eslint-disable @typescript-eslint/no-require-imports */
import { render, screen, fireEvent, act } from "@testing-library/react";
import RegisterOrg from "@/components/organisms/RegiterOrg";

// Mock del router de Next.js
const push = jest.fn();
jest.mock("next/router", () => ({
  useRouter: () => ({ push }),
}));

// Mock de useAuth
const showNotification = jest.fn();
const login = jest.fn();
const logout = jest.fn();

jest.mock("@/context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

beforeEach(() => {
  global.fetch = jest.fn();
  jest.clearAllMocks();
  // Limpia mocks para cada test
  (require("@/context/AuthContext").useAuth as jest.Mock).mockReset();
  push.mockReset();
});

afterEach(() => {
  // @ts-expect-error: clean fetch mock
  global.fetch = undefined;
});

describe("RegisterOrg", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "warn").mockImplementation(() => {});
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  test("renderiza campos de registro", () => {
    (require("@/context/AuthContext").useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      token: null,
      login,
      logout,
      showNotification,
      notifications: [],
    });

    render(<RegisterOrg />);
    expect(screen.getByPlaceholderText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/apellido/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/correo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/documento/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/número telefono/i)).toBeInTheDocument();
  });

  test("renderiza el botón de registro", () => {
    (require("@/context/AuthContext").useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      token: null,
      login,
      logout,
      showNotification,
      notifications: [],
    });

    render(<RegisterOrg />);
    expect(
      screen.getByRole("button", { name: /registrarse/i })
    ).toBeInTheDocument();
  });

  test("permite escribir en los campos", () => {
    (require("@/context/AuthContext").useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      token: null,
      login,
      logout,
      showNotification,
      notifications: [],
    });

    render(<RegisterOrg />);
    fireEvent.change(screen.getByPlaceholderText(/nombre/i), {
      target: { value: "nuevo" },
    });
    fireEvent.change(screen.getByPlaceholderText(/apellido/i), {
      target: { value: "apellido" },
    });
    fireEvent.change(screen.getByPlaceholderText(/correo/i), {
      target: { value: "nuevo@mail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/contraseña/i), {
      target: { value: "clave" },
    });
    fireEvent.change(screen.getByPlaceholderText(/documento/i), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByPlaceholderText(/número telefono/i), {
      target: { value: "5555555" },
    });

    expect(screen.getByPlaceholderText(/nombre/i)).toHaveValue("nuevo");
    expect(screen.getByPlaceholderText(/apellido/i)).toHaveValue("apellido");
    expect(screen.getByPlaceholderText(/correo/i)).toHaveValue(
      "nuevo@mail.com"
    );
    expect(screen.getByPlaceholderText(/contraseña/i)).toHaveValue("clave");
    expect(screen.getByPlaceholderText(/documento/i)).toHaveValue("123456");
    expect(screen.getByPlaceholderText(/número telefono/i)).toHaveValue(
      "5555555"
    );
  });

  test("handleSubmit muestra notificación de éxito y navega al login", async () => {
    // @ts-expect-error: mock fetch for test
    global.fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({}),
    });

    (require("@/context/AuthContext").useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      token: null,
      login,
      logout,
      showNotification,
      notifications: [],
    });

    render(<RegisterOrg />);

    fireEvent.change(screen.getByPlaceholderText(/nombre/i), {
      target: { value: "nuevo" },
    });
    fireEvent.change(screen.getByPlaceholderText(/apellido/i), {
      target: { value: "apellido" },
    });
    fireEvent.change(screen.getByPlaceholderText(/correo/i), {
      target: { value: "nuevo@mail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/contraseña/i), {
      target: { value: "clave" },
    });
    fireEvent.change(screen.getByPlaceholderText(/documento/i), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByPlaceholderText(/número telefono/i), {
      target: { value: "5555555" },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /registrarse/i }));
    });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/auth/register"),
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
    );
    expect(showNotification).toHaveBeenCalledWith(
      "¡Registro exitoso!",
      "success"
    );

    // Avanza los timers y espera a que React procese los efectos
    await act(async () => {
      jest.runAllTimers();
    });

    expect(push).toHaveBeenCalledWith("/login");
  });

  test("handleSubmit muestra notificación de error si el registro falla", async () => {
    // @ts-expect-error: mock fetch for test
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({ message: "Error en el registro" }),
    });

    (require("@/context/AuthContext").useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      token: null,
      login,
      logout,
      showNotification,
      notifications: [],
    });

    render(<RegisterOrg />);

    fireEvent.change(screen.getByPlaceholderText(/nombre/i), {
      target: { value: "nuevo" },
    });
    fireEvent.change(screen.getByPlaceholderText(/apellido/i), {
      target: { value: "apellido" },
    });
    fireEvent.change(screen.getByPlaceholderText(/correo/i), {
      target: { value: "nuevo@mail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/contraseña/i), {
      target: { value: "clave" },
    });
    fireEvent.change(screen.getByPlaceholderText(/documento/i), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByPlaceholderText(/número telefono/i), {
      target: { value: "5555555" },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /registrarse/i }));
    });

    expect(showNotification).toHaveBeenCalledWith(
      "Error en el registro",
      "error"
    );
    expect(screen.getByText("Error en el registro")).toBeInTheDocument();
  });
});
