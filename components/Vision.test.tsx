import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { Vision } from "./Vision";

it("renders the three roadmap phases and the animated line", () => {
  render(
    <LanguageProvider>
      <Vision />
    </LanguageProvider>
  );
  expect(screen.getByText("Piloto")).toBeInTheDocument();
  expect(screen.getByText("Expansión")).toBeInTheDocument();
  expect(screen.getByText("Cero personas")).toBeInTheDocument();
  expect(screen.getByTestId("vision-line")).toBeInTheDocument();
});
