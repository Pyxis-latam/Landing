import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { Hero } from "./Hero";

it("renders the Spanish headline, particle background, and CTA", () => {
  render(
    <LanguageProvider>
      <Hero />
    </LanguageProvider>
  );
  expect(screen.getByText("sin personas")).toBeInTheDocument();
  expect(screen.getByTestId("particle-field")).toBeInTheDocument();
  expect(screen.getByText("Hablemos").closest("a")).toHaveAttribute(
    "href",
    expect.stringContaining("mailto:")
  );
});
