import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { Footer } from "./Footer";

function renderFooter() {
  return render(
    <LanguageProvider>
      <Footer />
    </LanguageProvider>
  );
}

it("renders contact email and current year", () => {
  renderFooter();
  expect(screen.getByText("pyxis.latam@gmail.com")).toHaveAttribute(
    "href",
    "mailto:pyxis.latam@gmail.com"
  );
  expect(
    screen.getByText(new RegExp(`© ${new Date().getFullYear()}`))
  ).toBeInTheDocument();
});

it("links to both divisions and states where Pyxis is based", () => {
  const { container } = renderFooter();
  expect(container.querySelector('a[href="#labs"]')).not.toBeNull();
  expect(container.querySelector('a[href="#ventures"]')).not.toBeNull();
  expect(screen.getByText("Santiago, Chile")).toBeInTheDocument();
});
