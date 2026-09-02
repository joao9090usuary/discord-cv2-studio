const MAX_TITLE = 180;
const MAX_DESCRIPTION = 3_500;

export function neutralizeMentions(value: string): string {
  return value.replaceAll("@", "@\u200b").trim();
}

export function truncate(value: string, maxLength: number): string {
  const clean = value.trim();
  if (clean.length <= maxLength) return clean;
  return `${clean.slice(0, Math.max(0, maxLength - 1)).trimEnd()}…`;
}

export function sanitizeTitle(value: string): string {
  return truncate(neutralizeMentions(value), MAX_TITLE) || "Novo painel";
}

export function sanitizeDescription(value: string): string {
  return (
    truncate(neutralizeMentions(value), MAX_DESCRIPTION) ||
    "Selecione uma opção no menu abaixo para continuar."
  );
}

export function slugify(value: string): string {
  const slug = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return slug || "opcao";
}

export function normalizeKey(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z]/g, "");
}
