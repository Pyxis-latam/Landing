import { render, screen, fireEvent } from "@testing-library/react";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { Header } from "./Header";

function renderHeader() {
  return render(
    <LanguageProvider>
      <Header />
    </LanguageProvider>
  );
}

describe("Header", () => {
  it("renders nav items in Spanish by default", () => {
    renderHeader();
    expect(screen.getByText("Pyxis Labs")).toBeInTheDocument();
    expect(screen.getByText("Pyxis Ventures")).toBeInTheDocument();
  });

  it("shows a solid background after scrolling", () => {
    renderHeader();
    const header = screen.getByTestId("header");
    expect(header.className).toContain("bg-transparent");

    Object.defineProperty(window, "scrollY", { value: 100, writable: true });
    fireEvent.scroll(window);

    expect(header.className).toContain("backdrop-blur-md");
  });

  it("includes a mailto CTA", () => {
    renderHeader();
    const cta = screen.getByText("Hablemos");
    expect(cta.closest("a")).toHaveAttribute(
      "href",
      expect.stringContaining("mailto:pyxis.latam@gmail.com")
    );
  });
});
