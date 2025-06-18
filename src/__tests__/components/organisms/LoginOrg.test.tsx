import { render, screen, fireEvent } from "@testing-library/react";
import LoginOrg from "@/components/organisms/LoginOrg";

// Mock del contexto Auth y el router de Next.js
jest.mock("@/context/AuthContext", () => ({
  useAuth: () => ({
    login: jest.fn(),
    showNotification: jest.fn(),
  }),
}));
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

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
});
