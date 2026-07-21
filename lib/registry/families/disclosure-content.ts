/** HeroUI Disclosure / DisclosureGroup — shared copy and codegen fragments. */

export const HEROUI_NATIVE_QR_SRC =
  "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/qr-code-native.png";

export const DISCLOSURE_PREVIEW_COPY = {
  previewTitle: "Preview HeroUI Native",
  previewLead:
    "Scan this QR code with your camera app to preview the HeroUI native components.",
  previewFootnote: "Expo must be installed on your device.",
  previewCta: "Preview on Expo Go",
  downloadTitle: "Download App",
  downloadLead:
    "Download the HeroUI native app to explore our mobile components directly on your device.",
  downloadFootnote: "Available on iOS and Android devices.",
  downloadCta: "Download on App Store",
} as const;

export function disclosurePreviewBodyJsx(variant: "preview" | "download"): string {
  const copy =
    variant === "preview"
      ? {
          lead: DISCLOSURE_PREVIEW_COPY.previewLead,
          footnote: DISCLOSURE_PREVIEW_COPY.previewFootnote,
          cta: DISCLOSURE_PREVIEW_COPY.previewCta,
        }
      : {
          lead: DISCLOSURE_PREVIEW_COPY.downloadLead,
          footnote: DISCLOSURE_PREVIEW_COPY.downloadFootnote,
          cta: DISCLOSURE_PREVIEW_COPY.downloadCta,
        };

  return (
    `            <Disclosure.Body className="mx-2 flex flex-col items-center gap-2 p-4 text-center">\n` +
    `              <p className="text-sm text-muted">\n` +
    `                ${copy.lead}\n` +
    `              </p>\n` +
    `              <img\n` +
    `                alt="Expo Go QR Code"\n` +
    `                className="aspect-square w-full max-w-54 object-cover"\n` +
    `                src="${HEROUI_NATIVE_QR_SRC}"\n` +
    `              />\n` +
    `              <p className="text-sm text-muted">${copy.footnote}</p>\n` +
    `              <Button className="mt-4" variant="primary">\n` +
    `                <HugeiconsIcon icon={${variant === "preview" ? "QrCode01Icon" : "AppleIcon"}} className="size-4" />\n` +
    `                ${copy.cta}\n` +
    `              </Button>\n` +
    `            </Disclosure.Body>`
  );
}

export function disclosureStandaloneJsx(): string {
  return (
    `<Disclosure isExpanded={isExpanded} onExpandedChange={setIsExpanded}>\n` +
    `        <Disclosure.Heading>\n` +
    `          <Button slot="trigger" variant="secondary">\n` +
    `            <HugeiconsIcon icon={QrCode01Icon} className="size-4" />\n` +
    `            ${DISCLOSURE_PREVIEW_COPY.previewTitle}\n` +
    `            <Disclosure.Indicator />\n` +
    `          </Button>\n` +
    `        </Disclosure.Heading>\n` +
    `        <Disclosure.Content>\n` +
    disclosurePreviewBodyJsx("preview") +
    `\n        </Disclosure.Content>\n` +
    `      </Disclosure>`
  );
}

export function disclosureGroupJsx(): string {
  const trigger = (id: "preview" | "download", title: string, icon: string) =>
    `          <Disclosure aria-label="${title}" id="${id}">\n` +
    `            <Disclosure.Heading>\n` +
    `              <Button\n` +
    `                slot="trigger"\n` +
    `                variant={expandedKeys.has("${id}") ? "secondary" : "tertiary"}\n` +
    `                className={\`w-full border-none \${expandedKeys.has("${id}") ? "" : "bg-transparent"}\`}\n` +
    `              >\n` +
    `                <div className="flex w-full items-center justify-start gap-2">\n` +
    `                  <HugeiconsIcon icon={${icon}} className="size-4" />\n` +
    `                  ${title}\n` +
    `                </div>\n` +
    `                <Disclosure.Indicator className="text-muted" />\n` +
    `              </Button>\n` +
    `            </Disclosure.Heading>\n` +
    `            <Disclosure.Content>\n` +
    disclosurePreviewBodyJsx(id) +
    `\n            </Disclosure.Content>\n` +
    `          </Disclosure>`;

  return (
    `<DisclosureGroup expandedKeys={expandedKeys} onExpandedChange={setExpandedKeys}>\n` +
    trigger("preview", DISCLOSURE_PREVIEW_COPY.previewTitle, "QrCode01Icon") +
    `\n          <Separator className="my-2" />\n` +
    trigger("download", DISCLOSURE_PREVIEW_COPY.downloadTitle, "AppleIcon") +
    `\n        </DisclosureGroup>`
  );
}
