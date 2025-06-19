import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginOrg from "@/components/organisms/LoginOrg";

// Mock del contexto Auth y el router de Next.js
const loginMock = jest.fn();
const showNotificationMock = jest.fn();
const pushMock = jest.fn();

jest.mock("@/context/AuthContext", () => ({
  useAuth: () => ({
    login: loginMock,
    showNotification: showNotificationMock,
  }),
}));
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

// Mock global de fetch
beforeEach(() => {
  global.fetch = jest.fn();
  loginMock.mockClear();
  showNotificationMock.mockClear();
  pushMock.mockClear();
});

afterEach(() => {
  // @ts-expect-error: clean fetch mock
  global.fetch = undefined;
});

describe("LoginOrg", () => {
  test("renderiza campos de correo y contraseña", () => {
    render(<LoginOrg />);
    expect(screen.getByPlaceholderText(/correo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/contraseña/i)).toBeInTheDocument();
  });

  test("renderiza el botón de login", () => {
    render(<LoginOrg />);
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
  });

  test("permite escribir en los campos", () => {
    render(<LoginOrg />);
    const correo = screen.getByPlaceholderText(/correo/i);
    const password = screen.getByPlaceholderText(/contraseña/i);
    fireEvent.change(correo, { target: { value: "test@mail.com" } });
    fireEvent.change(password, { target: { value: "1234" } });
    expect(correo).toHaveValue("test@mail.com");
    expect(password).toHaveValue("1234");
  });

  test("handleSubmit - login exitoso", async () => {
    // @ts-expect-error: mock fetch for test
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: "abc123" }),
    });

    render(<LoginOrg />);
    fireEvent.change(screen.getByPlaceholderText(/correo/i), {
      target: { value: "test@mail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/contraseña/i), {
      target: { value: "1234" },
    });

    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/auth/login"),
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ correo: "test@mail.com", contrasena: "1234" }),
        })
      );
      expect(loginMock).toHaveBeenCalledWith("abc123");
      expect(showNotificationMock).toHaveBeenCalledWith(
        "¡Inicio de sesión exitoso!",
        "success"
      );
      expect(pushMock).toHaveBeenCalledWith("/");
    });
  });

  test("handleSubmit - login falla y muestra error", async () => {
    // @ts-expect-error: mock fetch for test
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    });

    render(<LoginOrg />);
    fireEvent.change(screen.getByPlaceholderText(/correo/i), {
      target: { value: "test@mail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/contraseña/i), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(() => {
      expect(showNotificationMock).toHaveBeenCalledWith(
        "Credenciales incorrectas",
        "error"
      );
      expect(screen.getByText("Credenciales incorrectas")).toBeInTheDocument();
    });
  });
});
