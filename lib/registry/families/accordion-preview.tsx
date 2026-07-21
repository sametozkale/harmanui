"use client";

import { use } from "react";
import { Accordion } from "@heroui/react";
import { DisclosureStateContext } from "react-aria-components";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon, ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { motion } from "framer-motion";
import type { SpecCtx } from "./_spec";
import { harmanAccordionPreviewCtx } from "./_spec";
import { ACCORDION_ITEMS } from "./accordion-content";

const PANEL_TRANSITION = { duration: 0.26, ease: [0.2, 0, 0, 1] as const };
const ICON_TRANSITION = {
  type: "spring" as const,
  stiffness: 480,
  damping: 33,
  mass: 0.55,
};

function AccordionMotionPanel({ children }: { children: React.ReactNode }) {
  const state = use(DisclosureStateContext);
  const isExpanded = state?.isExpanded ?? false;

  return (
    <Accordion.Panel className="harman-accordion__panel">
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={PANEL_TRANSITION}
        style={{ overflow: "hidden", width: "100%" }}
      >
        {children}
      </motion.div>
    </Accordion.Panel>
  );
}

function AccordionIconMotion({
  expanded,
  rotateTo,
  children,
}: {
  expanded: boolean;
  rotateTo: number;
  children: React.ReactNode;
}) {
  return (
    <motion.span
      animate={{ rotate: expanded ? rotateTo : 0 }}
      transition={ICON_TRANSITION}
      className="harman-accordion__icon inline-flex origin-center"
      aria-hidden
    >
      {children}
    </motion.span>
  );
}

function SplittedIndicator() {
  const isExpanded = use(DisclosureStateContext)?.isExpanded ?? false;

  return (
    <span className="ml-auto shrink-0 text-primary">
      <AccordionIconMotion expanded={isExpanded} rotateTo={45}>
        <HugeiconsIcon icon={Add01Icon} className="size-4" strokeWidth={2} />
      </AccordionIconMotion>
    </span>
  );
}

function SurfaceIndicator() {
  const isExpanded = use(DisclosureStateContext)?.isExpanded ?? false;

  return (
    <span className="ml-auto shrink-0 text-primary">
      <AccordionIconMotion expanded={isExpanded} rotateTo={180}>
        <HugeiconsIcon icon={ArrowDown01Icon} className="size-4" strokeWidth={2} />
      </AccordionIconMotion>
    </span>
  );
}

function AccordionItems({ variant }: { variant: "splitted" | "surface" }) {
  return ACCORDION_ITEMS.map((entry) => (
    <Accordion.Item key={entry.id} id={entry.id}>
      <Accordion.Heading>
        <Accordion.Trigger>
          {entry.title}
          {variant === "splitted" ? <SplittedIndicator /> : <SurfaceIndicator />}
        </Accordion.Trigger>
      </Accordion.Heading>
      <AccordionMotionPanel>
        <Accordion.Body>{entry.body}</Accordion.Body>
      </AccordionMotionPanel>
    </Accordion.Item>
  ));
}

export function AccordionPreview({
  variant,
  ctx,
}: {
  variant: "splitted" | "surface";
  ctx: SpecCtx;
}) {
  const previewCtx = harmanAccordionPreviewCtx(ctx);
  const className = [
    "harman-accordion text-left",
    variant === "splitted" ? "harman-accordion--splitted" : "harman-accordion--surface",
    previewCtx.className,
  ]
    .filter(Boolean)
    .join(" ");

  if (variant === "surface") {
    return (
      <Accordion variant="surface" style={previewCtx.style} className={className}>
        <AccordionItems variant="surface" />
      </Accordion>
    );
  }

  return (
    <Accordion allowsMultipleExpanded style={previewCtx.style} className={className}>
      <AccordionItems variant="splitted" />
    </Accordion>
  );
}
