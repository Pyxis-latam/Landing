import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { SocialProof } from "./SocialProof";

it("renders the pilot social proof line", () => {
  render(
    <LanguageProvider>
      <SocialProof />
    </LanguageProvider>
  );
  expect(
    screen.getByText("Ya en operación con wholesalers piloto en Latinoamérica.")
  ).toBeInTheDocument();
});
