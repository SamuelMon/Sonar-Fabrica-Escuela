import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "@/components/atoms/Button";

describe("Button Component", () => {
  test("renderiza con el texto correcto", () => {
    render(<Button text="Prueba" />);
    expect(screen.getByText("Prueba")).toBeInTheDocument();
  });

  test("ejecuta onClick cuando se hace clic", () => {
    const mockClick = jest.fn();
    render(<Button text="Clic" onClick={mockClick} />);
    fireEvent.click(screen.getByText("Clic"));
    expect(mockClick).toHaveBeenCalled();
  });

  test("se deshabilita correctamente", () => {
    render(<Button text="Deshabilitado" disabled={true} />);
    expect(screen.getByText("Deshabilitado")).toBeDisabled();
  });
});
