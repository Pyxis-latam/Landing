import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import Home from "./page";

it("renders every section of the landing page", () => {
  render(
    <LanguageProvider>
      <Home />
    </LanguageProvider>
  );

  expect(screen.getAllByText("PYXIS").length).toBeGreaterThan(0);
  expect(screen.getByText("cero personas")).toBeInTheDocument();
  expect(screen.getByText("un cuello de botella")).toBeInTheDocument();
  expect(screen.getByText("Detectamos")).toBeInTheDocument();
  expect(screen.getByText("Piloto")).toBeInTheDocument();
  expect(screen.getByText("Vicente Pareja")).toBeInTheDocument();
});
