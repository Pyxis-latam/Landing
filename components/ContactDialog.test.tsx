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

  it("offers Gmail as the one way to write, addressed to Pyxis, and no mail-app button", () => {
    renderWithDialog();
    fireEvent.click(screen.getByRole("link", { name: "Hablemos" }));

    const gmail = screen.getByRole("link", { name: /gmail/i });
    expect(gmail).toHaveAttribute(
      "href",
      expect.stringContaining("mail.google.com/mail/?view=cm")
    );
    expect(gmail).toHaveAttribute("href", expect.stringContaining("pyxis.latam%40gmail.com"));
    expect(gmail).toHaveAttribute("target", "_blank");

    expect(screen.queryByRole("link", { name: /app de correo|mail app/i })).not.toBeInTheDocument();
    const dialogLinks = screen.getByRole("dialog").querySelectorAll('a[href^="mailto:"]');
    expect(dialogLinks).toHaveLength(0);
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

it("leads with the calendar link inside the panel", () => {
  renderWithDialog();
  fireEvent.click(screen.getByRole("link", { name: "Hablemos" }));
  expect(
    screen.getByRole("dialog").querySelector('a[href^="https://cal.com/vicente-pareja"]')
  ).not.toBeNull();
});
