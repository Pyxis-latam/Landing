import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { ContactProvider } from "@/lib/contact/ContactContext";
import { ContactDialog } from "./ContactDialog";
import { MailtoButton } from "./ui/MailtoButton";

function renderWithDialog() {
  return render(
    <LanguageProvider>
      <ContactProvider>
        <MailtoButton email="pyxis.latam@gmail.com" label="Hablemos" />
        <ContactDialog />
      </ContactProvider>
    </LanguageProvider>
  );
}

describe("ContactDialog", () => {
  it("stays closed until a contact button is pressed, then shows the email", () => {
    renderWithDialog();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("link", { name: "Hablemos" }));

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveTextContent("pyxis.latam@gmail.com");
  });

  it("offers Gmail and the mail app as ways to write, both addressed to Pyxis", () => {
    renderWithDialog();
    fireEvent.click(screen.getByRole("link", { name: "Hablemos" }));

    const gmail = screen.getByRole("link", { name: /gmail/i });
    expect(gmail).toHaveAttribute(
      "href",
      expect.stringContaining("mail.google.com/mail/?view=cm")
    );
    expect(gmail).toHaveAttribute("href", expect.stringContaining("pyxis.latam%40gmail.com"));
    expect(gmail).toHaveAttribute("target", "_blank");

    const mailApp = screen.getByRole("link", { name: /app de correo/i });
    expect(mailApp).toHaveAttribute("href", expect.stringMatching(/^mailto:pyxis\.latam@gmail\.com/));
  });

  it("copies the email to the clipboard and confirms it", async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });

    renderWithDialog();
    fireEvent.click(screen.getByRole("link", { name: "Hablemos" }));
    fireEvent.click(screen.getByRole("button", { name: /copiar/i }));

    expect(writeText).toHaveBeenCalledWith("pyxis.latam@gmail.com");
    await waitFor(() => expect(screen.getByText("Copiado")).toBeInTheDocument());
  });

  it("closes with Escape and with the close button", async () => {
    renderWithDialog();
    fireEvent.click(screen.getByRole("link", { name: "Hablemos" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());

    fireEvent.click(screen.getByRole("link", { name: "Hablemos" }));
    fireEvent.click(screen.getByRole("button", { name: /cerrar/i }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });
});
