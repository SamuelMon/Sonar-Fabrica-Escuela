import { render, screen } from "@testing-library/react";
import NotificationsHistory from "@/components/molecules/NotificationsHistory";

describe("NotificationsHistory", () => {
  test("muestra mensaje si no hay notificaciones", () => {
    render(<NotificationsHistory notifications={[]} show={true} />);
    expect(screen.getByText("No hay notificaciones")).toBeInTheDocument();
  });

  test("no muestra nada si show es false", () => {
    const { container } = render(
      <NotificationsHistory notifications={[]} show={false} />
    );
    expect(container.textContent).toBe("");
  });

  test("renderiza notificaciones", () => {
    const notificaciones = [
      {
        id: 1,
        mensaje: "Mensaje 1",
        fechaCreacion: "2024-06-18T12:00:00Z",
        tipo: "success",
      },
      {
        id: 2,
        mensaje: "Mensaje 2",
        fechaCreacion: "2024-06-18T13:00:00Z",
        tipo: "info",
      },
    ];
    render(<NotificationsHistory notifications={notificaciones} show={true} />);
    expect(screen.getByText("Mensaje 1")).toBeInTheDocument();
    expect(screen.getByText("Mensaje 2")).toBeInTheDocument();
  });
});
