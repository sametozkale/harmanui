/** HeroUI Typography — shared preview copy and codegen fragments. */

export const TYPOGRAPHY_HEADING_LABELS = {
  h1: "Dashboard",
  h2: "Section title",
  h3: "Subsection title",
  h4: "Group title",
  h5: "Label title",
  h6: "Overline title",
} as const;

export const TYPOGRAPHY_DEMO = {
  heading: "Dashboard",
  section: "Section title",
  paragraph:
    "Convenience primitives are thin wrappers over Typography, so you can choose explicit composition without learning a second styling system.",
  paragraphMuted: "Paragraph supports base, sm, and xs sizes.",
  code: "Typography.Code",
  codeInstall: "npm install @heroui/react",
  truncate:
    "This paragraph is intentionally long so truncation can clip the line with an ellipsis when space is limited.",
} as const;

export function typographyProseJsx(): string {
  return (
    `<Typography.Prose className="flex max-w-xl flex-col gap-4">\n` +
    `        <Typography.Heading level={1}>${TYPOGRAPHY_DEMO.heading}</Typography.Heading>\n` +
    `        <Typography.Paragraph>\n` +
    `          ${TYPOGRAPHY_DEMO.paragraph}\n` +
    `        </Typography.Paragraph>\n` +
    `        <Typography.Paragraph color="muted" size="sm">\n` +
    `          ${TYPOGRAPHY_DEMO.paragraphMuted}\n` +
    `        </Typography.Paragraph>\n` +
    `        <Typography.Code>${TYPOGRAPHY_DEMO.code}</Typography.Code>\n` +
    `      </Typography.Prose>`
  );
}
