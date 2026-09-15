import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { Labs } from "./Labs";

function renderLabs() {
  return render(
    <LanguageProvider>
      <Labs />
    </LanguageProvider>
  );
}

it("renders the Labs section under the #labs anchor with its headline", () => {
  const { container } = renderLabs();
  expect(container.querySelector("#labs")).toBeInTheDocument();
  expect(screen.getByText("el mismo tamaño")).toBeInTheDocument();
});

it("renders the three recomposition steps", () => {
  renderLabs();
  expect(screen.getByText("Diagnosticamos")).toBeInTheDocument();
  expect(screen.getByText("Recomponemos")).toBeInTheDocument();
  expect(screen.getByText("Potenciamos")).toBeInTheDocument();
});

it("renders the growth timeline by company size and vertical", () => {
  renderLabs();
  expect(screen.getByText("Retail de 100 personas")).toBeInTheDocument();
  expect(screen.getByText("Mobiliario y construcción")).toBeInTheDocument();
  expect(screen.getByTestId("labs-line")).toBeInTheDocument();
});
