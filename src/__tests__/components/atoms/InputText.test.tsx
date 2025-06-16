import { render, fireEvent, screen } from "@testing-library/react";
import InputText from "@/components/atoms/InputText";

describe("InputText Component", () => {
  test("renderiza el input correctamente", () => {
    render(<InputText placeholder="Correo" />);
    expect(screen.getByPlaceholderText("Correo")).toBeInTheDocument();
  });

  test("maneja cambios en el valor", () => {
    const mockChange = jest.fn();
    render(<InputText value="" onChange={mockChange} placeholder={""} />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "test@example.com" },
    });
    expect(mockChange).toHaveBeenCalled();
  });
});
