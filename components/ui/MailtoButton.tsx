type MailtoButtonProps = {
  email: string;
  label: string;
  subject?: string;
};

export function MailtoButton({ email, label, subject }: MailtoButtonProps) {
  const href = subject
    ? `mailto:${email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${email}`;

  return (
    <a
      href={href}
      className="inline-block rounded-full bg-pyxis-accent px-6 py-3 text-sm font-semibold text-pyxis-bg transition-transform hover:scale-105 hover:brightness-110"
    >
      {label}
    </a>
  );
}
