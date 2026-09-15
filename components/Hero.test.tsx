import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { Hero } from "./Hero";

function renderHero() {
  return render(
    <LanguageProvider>
      <Hero />
    </LanguageProvider>
  );
}

it("renders the Spanish headline and CTA", () => {
  renderHero();
  expect(screen.getByText("sin personas")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Hablemos" })).toHaveAttribute(
    "href",
    expect.stringContaining("mailto:")
  );
});

it("names both divisions above the headline instead of repeating the wordmark", () => {
  renderHero();
  expect(screen.getByText("Labs y Ventures")).toBeInTheDocument();
  expect(screen.queryByText("PYXIS")).not.toBeInTheDocument();
});

it("offers a scroll cue that points to the first section", () => {
  renderHero();
  expect(screen.getByRole("link", { name: /bajar/i })).toHaveAttribute(
    "href",
    "#divisions"
  );
});
