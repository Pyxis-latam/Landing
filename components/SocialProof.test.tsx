import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { SocialProof } from "./SocialProof";

it("renders the qualitative social proof line for both divisions", () => {
  render(
    <LanguageProvider>
      <SocialProof />
    </LanguageProvider>
  );
  expect(
    screen.getByText("Pyxis Labs ya opera dentro de un retail de más de 100 personas. Hermes ya distribuye insumos de oficina en Chile.")
  ).toBeInTheDocument();
});
