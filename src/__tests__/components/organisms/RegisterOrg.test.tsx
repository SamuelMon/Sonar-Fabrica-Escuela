import { render, screen, fireEvent } from "@testing-library/react";
import RegisterOrg from "@/components/organisms/RegiterOrg";
import { AuthProvider } from "@/context/AuthContext";

// Mock del router de Next.js
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock del contexto Auth si es necesario
jest.mock("@/context/AuthContext", () => {
  const actual = jest.requireActual("@/context/AuthContext");
  return {
    ...actual,
    useAuth: () => ({
      showNotification: jest.fn(),
    }),
  };
});

function customRender(ui: React.ReactElement) {
  return render(<AuthProvider>{ui}</AuthProvider>);
}

describe("RegisterOrg", () => {
  test("renderiza campos de registro", () => {
    customRender(<RegisterOrg />);
    expect(screen.getByPlaceholderText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/apellido/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/correo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/documento/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/número telefono/i)).toBeInTheDocument();
  });

  test("renderiza el botón de registro", () => {
    customRender(<RegisterOrg />);
    expect(
      screen.getByRole("button", { name: /registrarse/i })
    ).toBeInTheDocument();
  });

  test("permite escribir en los campos", () => {
    customRender(<RegisterOrg />);
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
});
