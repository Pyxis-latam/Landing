import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { HowItWorks } from "./HowItWorks";

it("renders all three steps", () => {
  render(
    <LanguageProvider>
      <HowItWorks />
    </LanguageProvider>
  );
  expect(screen.getByText("Detectamos")).toBeInTheDocument();
  expect(screen.getByText("Construimos")).toBeInTheDocument();
  expect(screen.getByText("Multiplicamos")).toBeInTheDocument();
});
