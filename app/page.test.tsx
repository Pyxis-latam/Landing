import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

it("switches the whole page to English when the language toggle is clicked", async () => {
  const user = userEvent.setup();
  render(
    <LanguageProvider>
      <Home />
    </LanguageProvider>
  );

  const toggles = screen.getAllByRole("button", { name: /toggle language/i });
  await user.click(toggles[0]);

  expect(screen.getByText("zero-person operations")).toBeInTheDocument();
  expect(screen.getByText("a bottleneck")).toBeInTheDocument();
});

it("wires every header nav link to a real section id on the page", () => {
  const { container } = render(
    <LanguageProvider>
      <Home />
    </LanguageProvider>
  );

  for (const href of ["#problem", "#how-it-works", "#vision", "#team"]) {
    expect(container.querySelector(`a[href="${href}"]`)).not.toBeNull();
    expect(container.querySelector(href)).not.toBeNull();
  }
});
