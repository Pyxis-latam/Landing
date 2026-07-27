import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { Footer } from "./Footer";

it("renders contact email and current year", () => {
  render(
    <LanguageProvider>
      <Footer />
    </LanguageProvider>
  );
  expect(screen.getByText("pyxis.latam@gmail.com")).toHaveAttribute(
    "href",
    "mailto:pyxis.latam@gmail.com"
  );
  expect(
    screen.getByText(new RegExp(`© ${new Date().getFullYear()}`))
  ).toBeInTheDocument();
});
