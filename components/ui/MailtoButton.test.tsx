import { render, screen } from "@testing-library/react";
import { MailtoButton } from "./MailtoButton";

describe("MailtoButton", () => {
  it("renders a plain mailto link without a subject", () => {
    render(<MailtoButton email="pyxis.latam@gmail.com" label="Hablemos" />);
    expect(screen.getByText("Hablemos")).toHaveAttribute(
      "href",
      "mailto:pyxis.latam@gmail.com"
    );
  });

  it("encodes the subject when provided", () => {
    render(
      <MailtoButton
        email="pyxis.latam@gmail.com"
        label="Hablemos"
        subject="Hola Pyxis"
      />
    );
    expect(screen.getByText("Hablemos")).toHaveAttribute(
      "href",
      "mailto:pyxis.latam@gmail.com?subject=Hola%20Pyxis"
    );
  });
});
