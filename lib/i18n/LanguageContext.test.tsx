import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LanguageProvider, useLanguage } from "./LanguageContext";

function Probe() {
  const { lang, t, toggleLang } = useLanguage();
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <span data-testid="headline">{t.hero.headlineEmphasis}</span>
      <button onClick={toggleLang}>toggle</button>
    </div>
  );
}

describe("LanguageContext", () => {
  it("defaults to Spanish", () => {
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>
    );
    expect(screen.getByTestId("lang")).toHaveTextContent("es");
    expect(screen.getByTestId("headline")).toHaveTextContent("sin personas");
  });

  it("toggles to English and back", async () => {
    const user = userEvent.setup();
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>
    );

    await user.click(screen.getByText("toggle"));
    expect(screen.getByTestId("lang")).toHaveTextContent("en");
    expect(screen.getByTestId("headline")).toHaveTextContent(
      "without people"
    );

    await user.click(screen.getByText("toggle"));
    expect(screen.getByTestId("lang")).toHaveTextContent("es");
  });
});
