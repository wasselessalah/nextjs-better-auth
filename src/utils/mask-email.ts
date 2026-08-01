export function maskEmail(email: string) {
  const [name, domain] = email.split("@");

  if (!name || !domain) return email;

  const visible = name.slice(0, 2);
  const hidden = "*".repeat(Math.max(name.length - 2, 2));

  return `${visible}${hidden}@${domain}`;
}