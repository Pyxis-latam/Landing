import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { SocialProof } from "./SocialProof";

it("renders a live status label followed by the qualitative proof line", () => {
  render(
    <LanguageProvider>
      <SocialProof />
    </LanguageProvider>
  );
  expect(screen.getByText("En operación")).toBeInTheDocument();
  expect(
    screen.getByText(
      "Pyxis Labs ya opera dentro de un retail de más de 100 personas. Hermes ya distribuye insumos de oficina en Chile."
    )
  ).toBeInTheDocument();
});
