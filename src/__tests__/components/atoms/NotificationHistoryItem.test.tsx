import { render, screen } from "@testing-library/react";
import NotificationsHistoryItem from "@/components/atoms/NotificationsHistoryItem";

// Mock del componente Icon de @iconify/react
jest.mock("@iconify/react", () => ({
  Icon: (props: React.SVGProps<SVGSVGElement>) => (
    <svg data-testid="icon-svg" {...props} />
  ),
}));

describe("NotificationsHistoryItem", () => {
  test("renderiza texto, icono y fecha", () => {
    render(
      <NotificationsHistoryItem
        text="Notificación"
        icon="ic:outline-info"
        date="2024-06-18 12:00"
      />
    );
    expect(screen.getByText("Notificación")).toBeInTheDocument();
    expect(screen.getByText("2024-06-18 12:00")).toBeInTheDocument();
    expect(screen.getByTestId("icon-svg")).toBeInTheDocument();
  });
});
