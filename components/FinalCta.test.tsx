import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { FinalCta } from "./FinalCta";

it("renders the closing statement and mailto CTA", () => {
  render(
    <LanguageProvider>
      <FinalCta />
    </LanguageProvider>
  );
  expect(screen.getByText("sin ser más grande")).toBeInTheDocument();
  expect(screen.getByText("Hablemos").closest("a")).toHaveAttribute(
    "href",
    expect.stringContaining("mailto:pyxis.latam@gmail.com")
  );
});
