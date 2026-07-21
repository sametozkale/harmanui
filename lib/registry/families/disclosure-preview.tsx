"use client";

import { useState } from "react";
import type { Key } from "@heroui/react";
import { Button, Disclosure, DisclosureGroup, Separator } from "@heroui/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { AppleIcon, QrCode01Icon } from "@hugeicons/core-free-icons";
import type { SpecCtx } from "./_spec";
import {
  DISCLOSURE_PREVIEW_COPY,
  HEROUI_NATIVE_QR_SRC,
} from "./disclosure-content";

function HeroNativeDisclosureBody({
  variant,
}: {
  variant: "preview" | "download";
}) {
  const copy =
    variant === "preview"
      ? {
          lead: DISCLOSURE_PREVIEW_COPY.previewLead,
          footnote: DISCLOSURE_PREVIEW_COPY.previewFootnote,
          cta: DISCLOSURE_PREVIEW_COPY.previewCta,
          icon: QrCode01Icon,
        }
      : {
          lead: DISCLOSURE_PREVIEW_COPY.downloadLead,
          footnote: DISCLOSURE_PREVIEW_COPY.downloadFootnote,
          cta: DISCLOSURE_PREVIEW_COPY.downloadCta,
          icon: AppleIcon,
        };

  return (
    <Disclosure.Body className="mx-2 flex flex-col items-center gap-2 p-4 text-center">
      <p className="text-sm text-muted">{copy.lead}</p>
      <img
        alt="Expo Go QR Code"
        className="aspect-square w-full max-w-54 object-cover"
        src={HEROUI_NATIVE_QR_SRC}
      />
      <p className="text-sm text-muted">{copy.footnote}</p>
      <Button className="mt-4" variant="primary">
        <HugeiconsIcon icon={copy.icon} className="size-4" />
        {copy.cta}
      </Button>
    </Disclosure.Body>
  );
}

function GroupDisclosureTrigger({
  id,
  title,
  icon,
  expandedKeys,
}: {
  id: string;
  title: string;
  icon: typeof QrCode01Icon;
  expandedKeys: Set<Key>;
}) {
  const isExpanded = expandedKeys.has(id);

  return (
    <Button
      slot="trigger"
      variant={isExpanded ? "secondary" : "tertiary"}
      className={`w-full border-none ${isExpanded ? "" : "bg-transparent"}`}
    >
      <div className="flex w-full items-center justify-start gap-2">
        <HugeiconsIcon icon={icon} className="size-4" />
        {title}
      </div>
      <Disclosure.Indicator className="text-muted" />
    </Button>
  );
}

export function DisclosurePreview({ ctx }: { ctx: SpecCtx }) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div
      style={ctx.style}
      className={`w-full max-w-md text-center ${ctx.className}`}
    >
      <Disclosure isExpanded={isExpanded} onExpandedChange={setIsExpanded}>
        <Disclosure.Heading>
          <Button slot="trigger" variant="secondary">
            <HugeiconsIcon icon={QrCode01Icon} className="size-4" />
            {DISCLOSURE_PREVIEW_COPY.previewTitle}
            <Disclosure.Indicator />
          </Button>
        </Disclosure.Heading>
        <Disclosure.Content>
          <HeroNativeDisclosureBody variant="preview" />
        </Disclosure.Content>
      </Disclosure>
    </div>
  );
}

export function DisclosureGroupPreview({ ctx }: { ctx: SpecCtx }) {
  const [expandedKeys, setExpandedKeys] = useState<Set<Key>>(new Set(["preview"]));

  return (
    <div
      style={ctx.style}
      className={`w-full max-w-md ${ctx.className}`}
    >
      <div className="flex flex-col gap-4 bg-transparent p-4">
        <DisclosureGroup
          expandedKeys={expandedKeys}
          onExpandedChange={setExpandedKeys}
        >
          <Disclosure
            aria-label={DISCLOSURE_PREVIEW_COPY.previewTitle}
            id="preview"
          >
            <Disclosure.Heading>
              <GroupDisclosureTrigger
                id="preview"
                title={DISCLOSURE_PREVIEW_COPY.previewTitle}
                icon={QrCode01Icon}
                expandedKeys={expandedKeys}
              />
            </Disclosure.Heading>
            <Disclosure.Content>
              <HeroNativeDisclosureBody variant="preview" />
            </Disclosure.Content>
          </Disclosure>
          <Separator className="my-2" />
          <Disclosure
            aria-label={DISCLOSURE_PREVIEW_COPY.downloadTitle}
            id="download"
          >
            <Disclosure.Heading aria-label={DISCLOSURE_PREVIEW_COPY.downloadTitle}>
              <GroupDisclosureTrigger
                id="download"
                title={DISCLOSURE_PREVIEW_COPY.downloadTitle}
                icon={AppleIcon}
                expandedKeys={expandedKeys}
              />
            </Disclosure.Heading>
            <Disclosure.Content>
              <HeroNativeDisclosureBody variant="download" />
            </Disclosure.Content>
          </Disclosure>
        </DisclosureGroup>
      </div>
    </div>
  );
}
