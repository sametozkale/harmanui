/**
 * Live renderers for the original 15 HeroUI families (behavior preserved).
 */
"use client";

import type { ReactNode } from "react";
import {
  Spinner,
  Switch,
  Checkbox,
  RadioGroup,
  Radio,
  Label,
  Chip,
  Avatar,
  Kbd,
  Alert,
  ProgressCircle,
  Separator,
  Skeleton,
  Card,
  Link,
  ToggleButton,
} from "@heroui/react";
import { Button, ButtonGroup } from "@/components/registry/button";
import { PreviewIcon } from "@/components/icons";
import type { PreviewItem } from "@/lib/registry/types";
import { asEnum, buttonGroupPreviewCtx, intrinsicPreviewCtx, type SpecCtx } from "./_spec";
import {
  renderCheckboxGroup,
  renderProgressBar,
  renderSwitchGroup,
  renderToggleButtonGroup,
} from "./new-renderers";

function renderButton(item: PreviewItem, { style, className }: SpecCtx): ReactNode {
  const p = item.props;
  if (p.isIconOnly && p.icon) {
    return (
      <Button
        isIconOnly
        aria-label={item.label}
        variant={asEnum(p.variant)}
        size={asEnum(p.size)}
        isDisabled={p.isDisabled}
        style={style}
        className={className}
      >
        <PreviewIcon name={p.icon} className="size-4" />
      </Button>
    );
  }
  return (
    <Button
      variant={asEnum(p.variant)}
      size={asEnum(p.size)}
      isDisabled={p.isDisabled || p.loading}
      style={style}
      className={className}
    >
      {p.loading && <Spinner size="sm" />}
      {p.loading ? (p.label ?? "Loading") : (p.label ?? "Button")}
    </Button>
  );
}

export const EXISTING_RENDERERS: Record<
  string,
  (component: string, item: PreviewItem, ctx: SpecCtx) => ReactNode
> = {
  button: (component, item, ctx) => {
    const p = item.props;
    if (component === "ButtonGroup") {
      const groupCtx = buttonGroupPreviewCtx(ctx);
      return (
        <ButtonGroup
          variant={asEnum(p.variant)}
          size={asEnum(p.size)}
          style={groupCtx.style}
          className={groupCtx.className}
        >
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      );
    }
    return renderButton(item, ctx);
  },
  "toggle-button": (component, item, ctx) => {
    if (component === "ToggleButtonGroup") {
      return renderToggleButtonGroup(component, item, ctx);
    }
    const p = item.props;
    return (
      <ToggleButton
        variant={asEnum(p.variant)}
        size={asEnum(p.size)}
        defaultSelected={p.selected}
        isDisabled={p.isDisabled}
        style={ctx.style}
        className={ctx.className}
      >
        {p.label}
      </ToggleButton>
    );
  },
  switch: (component, item, ctx) => {
    if (component === "SwitchGroup") {
      return renderSwitchGroup(component, item, ctx);
    }
    const p = item.props;
    const { style, className } = ctx;
    return (
      <Switch
        size={asEnum(p.size)}
        defaultSelected={p.selected}
        isDisabled={p.isDisabled}
        style={style}
        className={className}
      >
        <Switch.Content>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          {p.label}
        </Switch.Content>
      </Switch>
    );
  },
  checkbox: (component, item, ctx) => {
    if (component === "CheckboxGroup") {
      return renderCheckboxGroup(component, item, ctx);
    }
    const p = item.props;
    const { style, className } = ctx;
    return (
      <Checkbox
        variant={asEnum(p.variant)}
        defaultSelected={p.selected}
        isDisabled={p.isDisabled}
        style={style}
        className={className}
      >
        <Checkbox.Content>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          {p.label}
        </Checkbox.Content>
      </Checkbox>
    );
  },
  "radio-group": (_c, item, { style, className }) => {
    const p = item.props;
    return (
      <RadioGroup
        variant={asEnum(p.variant)}
        defaultValue="week"
        aria-label="Billing period"
        style={style}
        className={className}
      >
        <Label>Billing period</Label>
        <Radio value="day">
          <Radio.Content>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            Daily
          </Radio.Content>
        </Radio>
        <Radio value="week">
          <Radio.Content>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            Weekly
          </Radio.Content>
        </Radio>
        <Radio value="month">
          <Radio.Content>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            Monthly
          </Radio.Content>
        </Radio>
      </RadioGroup>
    );
  },
  chip: (_c, item, { style, className }) => {
    const p = item.props;
    return (
      <Chip
        variant={asEnum(p.variant)}
        color={asEnum(p.color)}
        size={asEnum(p.size)}
        style={style}
        className={className}
      >
        {p.label}
      </Chip>
    );
  },
  avatar: (_c, item, ctx) => {
    const { style, className } = intrinsicPreviewCtx(ctx);
    const p = item.props;
    return (
      <Avatar
        variant={asEnum(p.variant ?? "default")}
        color={asEnum(p.color)}
        size={asEnum(p.size ?? "md")}
        style={style}
        className={className}
      >
        {p.src ? <Avatar.Image src={p.src} alt={p.alt ?? p.label ?? ""} /> : null}
        <Avatar.Fallback>{p.label}</Avatar.Fallback>
      </Avatar>
    );
  },
  kbd: (_c, item, ctx) => {
    const { style, className } = intrinsicPreviewCtx(ctx);
    const p = item.props;
    return (
      <Kbd variant={asEnum(p.variant)} style={style} className={className}>
        {p.label}
      </Kbd>
    );
  },
  alert: (_c, item, { style, className }) => {
    const p = item.props;
    return (
      <div className="w-80 max-w-full text-left">
        <Alert status={asEnum(p.status)} style={style} className={className}>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>{p.label}</Alert.Title>
            <Alert.Description>
              Here is some additional context about this message.
            </Alert.Description>
          </Alert.Content>
        </Alert>
      </div>
    );
  },
  spinner: (_c, item, ctx) => {
    const { style, className } = intrinsicPreviewCtx(ctx);
    return (
      <Spinner
        size={asEnum(item.props.size)}
        color={asEnum(item.props.color)}
        style={style}
        className={className}
      />
    );
  },
  "progress-circle": (component, item, ctx) => {
    if (component === "ProgressBar") {
      return renderProgressBar(component, item, ctx);
    }
    const { style, className } = intrinsicPreviewCtx(ctx);
    const p = item.props;
    return (
      <ProgressCircle
        value={p.value ?? 0}
        size={asEnum(p.size)}
        color={asEnum(p.color)}
        aria-label={`${p.value ?? 0}% complete`}
        style={style}
        className={className}
      >
        <ProgressCircle.Track>
          <ProgressCircle.TrackCircle />
          <ProgressCircle.FillCircle />
        </ProgressCircle.Track>
      </ProgressCircle>
    );
  },
  separator: (_c, item, ctx) => {
    const { style, className } = intrinsicPreviewCtx(ctx);
    const p = item.props;
    return (
      <div className="flex w-48 flex-col gap-3 text-[13px] text-zinc-500">
        <span>Section one</span>
        <Separator variant={asEnum(p.variant)} style={style} className={className} />
        <span>Section two</span>
      </div>
    );
  },
  skeleton: (_c, item, { style, className }) => {
    const p = item.props;
    return (
      <div className="flex w-60 flex-col gap-3" style={style}>
        <Skeleton
          animationType={asEnum(p.animationType)}
          className={`h-4 w-full rounded-md ${className}`}
        />
        <Skeleton animationType={asEnum(p.animationType)} className="h-4 w-4/5 rounded-md" />
        <Skeleton animationType={asEnum(p.animationType)} className="h-4 w-3/5 rounded-md" />
      </div>
    );
  },
  card: (_c, item, { style, className }) => {
    const p = item.props;
    return (
      <Card variant={asEnum(p.variant)} style={style} className={`w-72 text-left ${className}`}>
        <Card.Header>
          <Card.Title>Project settings</Card.Title>
          <Card.Description>Manage your team and preferences.</Card.Description>
        </Card.Header>
        <Card.Content>
          Cards group related content and actions on a single surface.
        </Card.Content>
      </Card>
    );
  },
  link: (_c, item, { style, className }) => {
    const p = item.props;
    return (
      <Link href="#" style={style} className={className}>
        {p.label}
        {p.icon && <PreviewIcon name={p.icon} className="ml-1 inline size-3.5" />}
      </Link>
    );
  },
};
