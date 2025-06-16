import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import LoginOrg from "@/components/organisms/LoginOrg";

describe("LoginOrg Component", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  test("maneja el envío del formulario correctamente", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ token: "test-token" }),
    });

    render(<LoginOrg />);

    fireEvent.change(screen.getByPlaceholderText("Correo"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Iniciar Sesión"));

    await waitFor(() => {
      expect(screen.getByText(/test-token/)).toBeInTheDocument();
    });
  });

  test("muestra error cuando las credenciales son incorrectas", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Credenciales incorrectas")
    );

    render(<LoginOrg />);

    fireEvent.click(screen.getByText("Iniciar Sesión"));

    await waitFor(() => {
      expect(screen.getByText(/Credenciales incorrectas/)).toBeInTheDocument();
    });
  });
});
