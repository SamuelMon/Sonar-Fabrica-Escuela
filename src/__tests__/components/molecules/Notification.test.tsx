import { render, screen } from "@testing-library/react";
import Notification from "@/components/molecules/Notification";

describe("Notification Component", () => {
  test("renderiza el mensaje y el icono", () => {
    render(<Notification text="Test notification" icon="test-icon" />);
    expect(screen.getByText("Test notification")).toBeInTheDocument();
  });

  test("se muestra y oculta correctamente", () => {
    jest.useFakeTimers();
    render(<Notification text="Test" icon="icon" />);

    expect(screen.getByText("Test")).toHaveClass("translate-x-0");

    jest.advanceTimersByTime(3000);

    expect(screen.getByText("Test")).toHaveClass("translate-x-full");
  });
});
