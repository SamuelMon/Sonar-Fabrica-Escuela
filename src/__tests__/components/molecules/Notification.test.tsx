import { render, screen, act } from "@testing-library/react";
import Notification from "@/components/molecules/Notification";

describe("Notification Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("renderiza el mensaje y el icono", () => {
    render(<Notification text="Test notification" icon="test-icon" />);
    expect(screen.getByText("Test notification")).toBeInTheDocument();
  });

  test("se muestra y oculta correctamente", () => {
    const { container } = render(<Notification text="Test" icon="icon" />);

    // Verificamos el estado inicial
    act(() => {
      jest.advanceTimersByTime(0);
    });

    const notificationContainer = container.firstChild as HTMLElement;
    expect(notificationContainer).toHaveClass("translate-x-0");

    // Avanzamos el tiempo y actualizamos el estado
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    // Esperamos a que se complete la transición
    expect(notificationContainer).toHaveClass("translate-x-full");
  });
});
