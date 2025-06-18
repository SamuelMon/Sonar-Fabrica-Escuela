import { render, fireEvent, screen } from "@testing-library/react";
import InputText from "@/components/atoms/InputText";

describe("InputText Component", () => {
  test("renderiza el input correctamente", () => {
    render(<InputText placeholder="Correo" />);
    expect(screen.getByPlaceholderText("Correo")).toBeInTheDocument();
  });

  test("maneja cambios en el valor", () => {
    const mockChange = jest.fn();
    render(<InputText value="" onChange={mockChange} placeholder="Correo" />);
    fireEvent.change(screen.getByPlaceholderText("Correo"), {
      target: { value: "nuevo valor" },
    });
    expect(mockChange).toHaveBeenCalled();
  });

  test("renderiza el input deshabilitado", () => {
    render(<InputText placeholder="Deshabilitado" disabled />);
    expect(screen.getByPlaceholderText("Deshabilitado")).toBeDisabled();
  });

  test("usa el tipo correcto", () => {
    render(<InputText placeholder="Contraseña" type="password" />);
    expect(screen.getByPlaceholderText("Contraseña")).toHaveAttribute(
      "type",
      "password"
    );
  });

  test("renderiza con name", () => {
    render(<InputText placeholder="Nombre" name="nombre" />);
    expect(screen.getByPlaceholderText("Nombre")).toHaveAttribute(
      "name",
      "nombre"
    );
  });
});
