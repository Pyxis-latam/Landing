import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { Team } from "./Team";

it("renders both founders with correct LinkedIn links", () => {
  render(
    <LanguageProvider>
      <Team />
    </LanguageProvider>
  );

  const vicente = screen.getByText("Vicente Pareja").closest("a");
  expect(vicente).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/vicentepareja/"
  );

  const felipe = screen.getByText("Felipe Carvallo Lancellotti").closest("a");
  expect(felipe).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/felipe-carvallo-lancellotti-228615276/?locale=en"
  );
});
