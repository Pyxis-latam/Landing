import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { Problem } from "./Problem";

it("renders the problem section with correct id and copy", () => {
  const { container } = render(
    <LanguageProvider>
      <Problem />
    </LanguageProvider>
  );
  expect(container.querySelector("#problem")).toBeInTheDocument();
  expect(screen.getByText("un cuello de botella")).toBeInTheDocument();
});
