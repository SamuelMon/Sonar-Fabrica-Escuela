import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import RegisterOrg from "@/components/organisms/RegiterOrg";

describe("RegisterOrg Component", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  test("maneja el registro correctamente", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ message: "Registro exitoso" }),
    });

    render(<RegisterOrg />);

    // Llenar el formulario
    fireEvent.change(screen.getByPlaceholderText("Correo"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
      target: { value: "password123" },
    });
    // ...más campos

    fireEvent.click(screen.getByText("Registrarse"));

    await waitFor(() => {
      expect(screen.getByText(/Registro exitoso/)).toBeInTheDocument();
    });
  });
});
