/** Shared accordion copy — preview + codegen. */

export const ACCORDION_ITEMS = [
  {
    id: "lorem-1",
    title: "Lorem ipsum dolor sit amet?",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "lorem-2",
    title: "Consectetur adipiscing elit?",
    body: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
] as const;

export const ACCORDION_MOTION_PREAMBLE = [
  `import { motion } from "framer-motion";`,
  `import { use } from "react";`,
  `import { DisclosureStateContext } from "react-aria-components";`,
] as const;

export const ACCORDION_ICON_TRANSITION = `{
    type: "spring",
    stiffness: 480,
    damping: 33,
    mass: 0.55,
  }`;

export const ACCORDION_MOTION_PANEL_HELPER = `function AccordionMotionPanel({ children }: { children: React.ReactNode }) {
  const { isExpanded } = use(DisclosureStateContext);

  return (
    <Accordion.Panel className="harman-accordion__panel">
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.26, ease: [0.2, 0, 0, 1] }}
        style={{ overflow: "hidden", width: "100%" }}
      >
        {children}
      </motion.div>
    </Accordion.Panel>
  );
}`;

export const ACCORDION_SPLITTED_INDICATOR_HELPER = `function SplittedAccordionIndicator() {
  const { isExpanded } = use(DisclosureStateContext);

  return (
    <span className="ml-auto shrink-0 text-primary">
      <motion.span
        animate={{ rotate: isExpanded ? 45 : 0 }}
        transition=${ACCORDION_ICON_TRANSITION}
        className="harman-accordion__icon inline-flex origin-center"
        aria-hidden
      >
        <HugeiconsIcon icon={Add01Icon} className="size-4" strokeWidth={2} />
      </motion.span>
    </span>
  );
}`;

export const ACCORDION_SURFACE_INDICATOR_HELPER = `function SurfaceAccordionIndicator() {
  const { isExpanded } = use(DisclosureStateContext);

  return (
    <span className="ml-auto shrink-0 text-primary">
      <motion.span
        animate={{ rotate: isExpanded ? 180 : 0 }}
        transition=${ACCORDION_ICON_TRANSITION}
        className="harman-accordion__icon inline-flex origin-center"
        aria-hidden
      >
        <HugeiconsIcon icon={ArrowDown01Icon} className="size-4" strokeWidth={2} />
      </motion.span>
    </span>
  );
}`;

export function accordionItemsJsx(variant: "splitted" | "surface"): string {
  const indicator =
    variant === "splitted"
      ? "              <SplittedAccordionIndicator />"
      : "              <SurfaceAccordionIndicator />";

  return ACCORDION_ITEMS.map(
    (item) =>
      `        <Accordion.Item id="${item.id}">\n` +
      `          <Accordion.Heading>\n` +
      `            <Accordion.Trigger>\n` +
      `              ${item.title}\n` +
      `${indicator}\n` +
      `            </Accordion.Trigger>\n` +
      `          </Accordion.Heading>\n` +
      `          <AccordionMotionPanel>\n` +
      `            <Accordion.Body>${item.body}</Accordion.Body>\n` +
      `          </AccordionMotionPanel>\n` +
      `        </Accordion.Item>`,
  ).join("\n");
}

/** @deprecated Use {@link ACCORDION_ITEMS} */
export const FUSSIONARY_ACCORDION_ITEMS = ACCORDION_ITEMS;

/** @deprecated Use {@link accordionItemsJsx} */
export function fussionaryAccordionItemsJsx(): string {
  return accordionItemsJsx("splitted");
}
