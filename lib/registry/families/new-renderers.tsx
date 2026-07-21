/**
 * Live preview renderers for new HeroUI v3 families.
 */
"use client";

import type { ReactNode } from "react";
import {
  TextField,
  TextArea,
  Input,
  Label,
  NumberField,
  SearchField,
  InputOTP,
  Select,
  ListBox,
  ComboBox,
  Autocomplete,
  Slider,
  DatePicker,
  DateRangePicker,
  RangeCalendar,
  DateField,
  TimeField,
  Calendar,
  ColorPicker,
  ColorArea,
  ColorSlider,
  ColorSwatch,
  ColorField,
  ColorSwatchPicker,
  CloseButton,
  Form,
  Modal,
  Drawer,
  Popover,
  Tooltip,
  Dropdown,
  AlertDialog,
  Tabs,
  Breadcrumbs,
  Pagination,
  Menu,
  Toolbar,
  Table,
  Badge,
  TagGroup,
  Tag,
  Meter,
  ProgressBar,
  Typography,
  Toast,
  toast,
  EmptyState,
  ScrollShadow,
  Card,
  Accordion,
  Disclosure,
  DisclosureGroup,
  Surface,
  Fieldset,
  Button,
  Checkbox,
  CheckboxGroup,
  Switch,
  SwitchGroup,
  ToggleButton,
  ToggleButtonGroup,
  InputGroup,
  Description,
  ErrorMessage,
  FieldError,
  Header,
} from "@heroui/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { InboxIcon } from "@hugeicons/core-free-icons";
import { PreviewIcon } from "@/components/icons";
import type { PreviewItem } from "@/lib/registry/types";
import { asEnum, buttonGroupPreviewCtx, type SpecCtx } from "./_spec";
import {
  COLOR_PREVIEW_DEFAULT,
  COLOR_PREVIEW_SWATCHES,
} from "./color-preview";

const SELECT_ITEMS = [
  { id: "cat", label: "Cat" },
  { id: "dog", label: "Dog" },
  { id: "bird", label: "Bird" },
];

const TABLE_ROWS = [
  { id: 1, name: "Ada Lovelace", role: "Engineer", status: "Active" },
  { id: 2, name: "Grace Hopper", role: "Scientist", status: "Active" },
  { id: 3, name: "Alan Turing", role: "Researcher", status: "Away" },
];

const TAG_ITEMS = [
  { id: "design", label: "Design" },
  { id: "react", label: "React" },
  { id: "a11y", label: "Accessibility" },
];

function dateFieldInput() {
  return (
    <DateField.Input>
      {(segment) => <DateField.Segment segment={segment} />}
    </DateField.Input>
  );
}

function datePickerFieldGroup(trigger: ReactNode) {
  return (
    <DateField.Group>
      {dateFieldInput()}
      <DateField.Suffix>{trigger}</DateField.Suffix>
    </DateField.Group>
  );
}

function calendarBody() {
  return (
    <>
      <Calendar.Header>
        <Calendar.YearPickerTrigger>
          <Calendar.YearPickerTriggerHeading />
          <Calendar.YearPickerTriggerIndicator />
        </Calendar.YearPickerTrigger>
        <Calendar.NavButton slot="previous" />
        <Calendar.NavButton slot="next" />
      </Calendar.Header>
      <Calendar.Grid>
        <Calendar.GridHeader>
          {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
        </Calendar.GridHeader>
        <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
      </Calendar.Grid>
      <Calendar.YearPickerGrid>
        <Calendar.YearPickerGridBody>
          {({ year }) => <Calendar.YearPickerCell year={year} />}
        </Calendar.YearPickerGridBody>
      </Calendar.YearPickerGrid>
    </>
  );
}

function rangeCalendarBody() {
  return (
    <>
      <RangeCalendar.Header>
        <RangeCalendar.YearPickerTrigger>
          <RangeCalendar.YearPickerTriggerHeading />
          <RangeCalendar.YearPickerTriggerIndicator />
        </RangeCalendar.YearPickerTrigger>
        <RangeCalendar.NavButton slot="previous" />
        <RangeCalendar.NavButton slot="next" />
      </RangeCalendar.Header>
      <RangeCalendar.Grid>
        <RangeCalendar.GridHeader>
          {(day) => <RangeCalendar.HeaderCell>{day}</RangeCalendar.HeaderCell>}
        </RangeCalendar.GridHeader>
        <RangeCalendar.GridBody>
          {(date) => <RangeCalendar.Cell date={date} />}
        </RangeCalendar.GridBody>
      </RangeCalendar.Grid>
    </>
  );
}

function dateRangeFieldGroup(trigger: ReactNode) {
  return (
    <DateField.Group>
      <DateField.InputContainer>
        <DateField.Input slot="start">
          {(segment) => <DateField.Segment segment={segment} />}
        </DateField.Input>
        <DateRangePicker.RangeSeparator />
        <DateField.Input slot="end">
          {(segment) => <DateField.Segment segment={segment} />}
        </DateField.Input>
      </DateField.InputContainer>
      <DateField.Suffix>{trigger}</DateField.Suffix>
    </DateField.Group>
  );
}

function checkboxField(label: string, name?: string, defaultSelected?: boolean) {
  return (
    <Checkbox name={name} defaultSelected={defaultSelected}>
      <Checkbox.Content>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        {label}
      </Checkbox.Content>
    </Checkbox>
  );
}

function listBoxItems(variant?: string) {
  return SELECT_ITEMS.map((item) => (
    <ListBox.Item key={item.id} id={item.id} textValue={item.label} variant={asEnum(variant)}>
      {item.label}
    </ListBox.Item>
  ));
}

function selectPreview(p: PreviewItem["props"], ctx: SpecCtx) {
  return (
    <Select
      aria-label={p.label ?? "Select"}
      variant={asEnum(p.variant)}
      isDisabled={p.isDisabled}
      defaultSelectedKey="dog"
      style={ctx.style}
      className={`w-56 ${ctx.className}`}
    >
      <Label>{p.label ?? "Country"}</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>{listBoxItems()}</ListBox>
      </Select.Popover>
    </Select>
  );
}

function renderTextField(component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  if (component === "TextArea") {
    return (
      <TextField
        isDisabled={p.isDisabled}
        style={ctx.style}
        className={`w-72 ${ctx.className}`}
      >
        <Label>{p.label ?? "Message"}</Label>
        <TextArea
          variant={asEnum(p.variant)}
          disabled={p.isDisabled}
          placeholder="Write your message…"
        />
      </TextField>
    );
  }
  return (
    <TextField
      isDisabled={p.isDisabled}
      style={ctx.style}
      className={`w-72 ${ctx.className}`}
    >
      <Label>{p.label ?? "Email"}</Label>
      <Input
        variant={asEnum(p.variant)}
        disabled={p.isDisabled}
        placeholder="you@example.com"
      />
    </TextField>
  );
}

function renderNumberField(_component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  return (
    <NumberField
      variant={asEnum(p.variant)}
      isDisabled={p.isDisabled}
      defaultValue={p.value ?? 2}
      minValue={0}
      style={ctx.style}
      className={`w-48 ${ctx.className}`}
    >
      <Label>{p.label ?? "Quantity"}</Label>
      <NumberField.Group>
        <NumberField.DecrementButton />
        <NumberField.Input />
        <NumberField.IncrementButton />
      </NumberField.Group>
    </NumberField>
  );
}

function renderSearchField(_component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  return (
    <SearchField
      variant={asEnum(p.variant)}
      isDisabled={p.isDisabled}
      aria-label={p.label ?? "Search"}
      style={ctx.style}
      className={`w-72 ${ctx.className}`}
    >
      <Label>{p.label ?? "Search"}</Label>
      <SearchField.Group>
        <SearchField.SearchIcon />
        <SearchField.Input placeholder="Search…" />
        <SearchField.ClearButton />
      </SearchField.Group>
    </SearchField>
  );
}

function renderInputOtp(_component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  return (
    <InputOTP
      maxLength={6}
      variant={asEnum(p.variant)}
      isDisabled={p.isDisabled}
      style={ctx.style}
      className={ctx.className}
    >
      <InputOTP.Group>
        <InputOTP.Slot index={0} />
        <InputOTP.Slot index={1} />
        <InputOTP.Slot index={2} />
        <InputOTP.Separator />
        <InputOTP.Slot index={3} />
        <InputOTP.Slot index={4} />
        <InputOTP.Slot index={5} />
      </InputOTP.Group>
    </InputOTP>
  );
}

function renderSelect(_component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  return selectPreview(item.props, ctx);
}

function renderComboBox(_component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  return (
    <ComboBox
      aria-label={p.label ?? "Fruit"}
      isDisabled={p.isDisabled}
      defaultSelectedKey="dog"
      style={ctx.style}
      className={`w-72 ${ctx.className}`}
    >
      <Label>{p.label ?? "Fruit"}</Label>
      <ComboBox.InputGroup>
        <Input placeholder="Pick a fruit" />
        <ComboBox.Trigger />
      </ComboBox.InputGroup>
      <ComboBox.Popover>
        <ListBox>{listBoxItems()}</ListBox>
      </ComboBox.Popover>
    </ComboBox>
  );
}

function renderAutocomplete(_component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  return (
    <Autocomplete
      aria-label={p.label ?? "City"}
      variant={asEnum(p.variant)}
      isDisabled={p.isDisabled}
      defaultSelectedKey="dog"
      style={ctx.style}
      className={`w-72 ${ctx.className}`}
    >
      <Label>{p.label ?? "City"}</Label>
      <Autocomplete.Trigger>
        <Autocomplete.Value />
        <Autocomplete.Indicator />
      </Autocomplete.Trigger>
      <Autocomplete.Popover>
        <Autocomplete.Filter>
          <ListBox>{listBoxItems()}</ListBox>
        </Autocomplete.Filter>
      </Autocomplete.Popover>
    </Autocomplete>
  );
}

function renderSlider(_component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  const vertical = p.orientation === "vertical";
  return (
    <div
      className={vertical ? "flex h-40 items-center justify-center" : "w-64"}
      style={ctx.style}
    >
      <Slider
        aria-label="Volume"
        defaultValue={p.value ?? 50}
        orientation={asEnum(p.orientation)}
        className={ctx.className}
      >
        <Slider.Output />
        <Slider.Track>
          <Slider.Fill />
          <Slider.Thumb />
        </Slider.Track>
      </Slider>
    </div>
  );
}

function renderDatePicker(_component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  return (
    <DatePicker
      isDisabled={p.isDisabled}
      style={ctx.style}
      className={`w-72 ${ctx.className}`}
    >
      <Label>{p.label ?? "Start date"}</Label>
      {datePickerFieldGroup(
        <DatePicker.Trigger>
          <DatePicker.TriggerIndicator />
        </DatePicker.Trigger>,
      )}
      <DatePicker.Popover>
        <Calendar aria-label={p.label ?? "Calendar"}>{calendarBody()}</Calendar>
      </DatePicker.Popover>
    </DatePicker>
  );
}

function renderDateRangePicker(_component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  return (
    <DateRangePicker
      isDisabled={p.isDisabled}
      style={ctx.style}
      className={`w-72 ${ctx.className}`}
    >
      <Label>{p.label ?? "Trip dates"}</Label>
      {dateRangeFieldGroup(
        <DateRangePicker.Trigger>
          <DateRangePicker.TriggerIndicator />
        </DateRangePicker.Trigger>,
      )}
      <DateRangePicker.Popover>
        <RangeCalendar aria-label={p.label ?? "Choose trip dates"}>
          {rangeCalendarBody()}
        </RangeCalendar>
      </DateRangePicker.Popover>
    </DateRangePicker>
  );
}

function renderDateField(component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  if (component === "DateInputGroup") return renderDateInputGroup(component, item, ctx);
  const p = item.props;
  return (
    <DateField
      isDisabled={p.isDisabled}
      aria-label={p.label ?? "Birth date"}
      style={ctx.style}
      className={`w-72 ${ctx.className}`}
    >
      <Label>{p.label ?? "Birth date"}</Label>
      <DateField.Group>{dateFieldInput()}</DateField.Group>
    </DateField>
  );
}

function renderDateInputGroup(_component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  return (
    <DateField
      isDisabled={p.isDisabled}
      aria-label={p.label ?? "Birth date"}
      style={ctx.style}
      className={`w-72 ${ctx.className}`}
    >
      <Label>{p.label ?? "Birth date"}</Label>
      <DateField.Group variant={asEnum(p.variant)}>
        <DateField.Prefix>📅</DateField.Prefix>
        <DateField.Input>
          {(segment) => <DateField.Segment segment={segment} />}
        </DateField.Input>
      </DateField.Group>
    </DateField>
  );
}

function renderTimeField(_component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  return (
    <TimeField
      isDisabled={p.isDisabled}
      aria-label={p.label ?? "Meeting time"}
      style={ctx.style}
      className={`w-56 ${ctx.className}`}
    >
      <Label>{p.label ?? "Meeting time"}</Label>
      <TimeField.Group>
        <TimeField.Input>
          {(segment) => <TimeField.Segment segment={segment} />}
        </TimeField.Input>
      </TimeField.Group>
    </TimeField>
  );
}

function renderCalendar(component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  if (component === "RangeCalendar") {
    return (
      <RangeCalendar
        aria-label={p.label ?? "Trip dates"}
        style={ctx.style}
        className={ctx.className}
      >
        {rangeCalendarBody()}
      </RangeCalendar>
    );
  }
  return (
    <Calendar
      aria-label={p.label ?? "Appointment"}
      style={ctx.style}
      className={ctx.className}
    >
      {calendarBody()}
    </Calendar>
  );
}

function renderColorPicker(_component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  return (
    <ColorPicker defaultValue={COLOR_PREVIEW_DEFAULT}>
      <ColorPicker.Trigger
        isDisabled={p.isDisabled}
        style={ctx.style}
        className={ctx.className}
      >
        <ColorSwatch size="lg" />
        <Label>{p.label ?? "Brand color"}</Label>
      </ColorPicker.Trigger>
      <ColorPicker.Popover className="gap-2">
        <ColorArea
          aria-label="Color area"
          className="max-w-full"
          colorSpace="hsb"
          xChannel="saturation"
          yChannel="brightness"
        >
          <ColorArea.Thumb />
        </ColorArea>
        <ColorSlider
          aria-label="Hue slider"
          channel="hue"
          className="gap-1 px-1"
          colorSpace="hsb"
        >
          <Label>Hue</Label>
          <ColorSlider.Output className="text-muted" />
          <ColorSlider.Track>
            <ColorSlider.Thumb />
          </ColorSlider.Track>
        </ColorSlider>
      </ColorPicker.Popover>
    </ColorPicker>
  );
}

function renderColorField(component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  const isInputGroup = component === "ColorInputGroup";
  const group = isInputGroup ? (
    <>
      <ColorField.Prefix>#</ColorField.Prefix>
      <ColorField.Input />
      <ColorField.Suffix>
        <ColorSwatch color={COLOR_PREVIEW_DEFAULT} size="xs" />
      </ColorField.Suffix>
    </>
  ) : (
    <>
      <ColorField.Prefix>
        <ColorSwatch color={COLOR_PREVIEW_DEFAULT} size="xs" />
      </ColorField.Prefix>
      <ColorField.Input />
    </>
  );

  return (
    <ColorField
      defaultValue={COLOR_PREVIEW_DEFAULT}
      isDisabled={p.isDisabled}
      name="brand-color"
      style={ctx.style}
      className={`w-[280px] ${ctx.className}`}
    >
      <Label>{p.label ?? "Brand color"}</Label>
      <ColorField.Group variant={asEnum(p.variant)}>{group}</ColorField.Group>
    </ColorField>
  );
}

function renderColorSwatchPicker(_component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  return (
    <ColorSwatchPicker
      defaultValue={COLOR_PREVIEW_DEFAULT}
      layout={asEnum(p.layout)}
      size={asEnum(p.size)}
      variant={asEnum(p.variant)}
      style={ctx.style}
      className={ctx.className || "justify-center"}
    >
      {COLOR_PREVIEW_SWATCHES.map((color) => (
        <ColorSwatchPicker.Item key={color} color={color}>
          <ColorSwatchPicker.Swatch />
          <ColorSwatchPicker.Indicator />
        </ColorSwatchPicker.Item>
      ))}
    </ColorSwatchPicker>
  );
}

function renderColor(component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  if (component === "ColorField" || component === "ColorInputGroup") {
    return renderColorField(component, item, ctx);
  }
  if (component === "ColorSwatchPicker") {
    return renderColorSwatchPicker(component, item, ctx);
  }
  return renderColorPicker(component, item, ctx);
}

function renderCloseButton(_component: string, _item: PreviewItem, ctx: SpecCtx): ReactNode {
  return (
    <CloseButton
      aria-label="Close"
      style={ctx.style}
      className={ctx.className}
    />
  );
}

function renderFormPrimitives(component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  const shell = `w-72 text-left ${ctx.className}`;

  switch (component) {
    case "Label":
      return (
        <TextField
          isRequired
          name="email"
          style={ctx.style}
          className={shell}
        >
          <Label>{p.label ?? "Email address"}</Label>
          <Input placeholder="you@example.com" />
        </TextField>
      );
    case "Description":
      return (
        <TextField
          name="email"
          style={ctx.style}
          className={shell}
        >
          <Label>Email</Label>
          <Input placeholder="you@example.com" />
          <Description>{p.label ?? "We never share your email."}</Description>
        </TextField>
      );
    case "FieldError":
      return (
        <TextField
          isInvalid
          name="email"
          defaultValue="not-an-email"
          style={ctx.style}
          className={shell}
        >
          <Label>Email</Label>
          <Input />
          <FieldError>{p.label ?? "Enter a valid email address."}</FieldError>
        </TextField>
      );
    case "ErrorMessage":
      return (
        <Form
          validationErrors={{ email: "Enter a valid email address." }}
          style={ctx.style}
          className={`flex flex-col gap-2 ${shell}`}
          onSubmit={(e) => e.preventDefault()}
        >
          <ErrorMessage>{p.label ?? "Please fix the errors below."}</ErrorMessage>
          <TextField isRequired name="email">
            <Label>Email</Label>
            <Input placeholder="you@example.com" />
          </TextField>
        </Form>
      );
    case "Header":
      return (
        <ListBox
          aria-label="Animals"
          selectionMode="single"
          style={ctx.style}
          className={`w-48 outline-none ${ctx.className}`}
        >
          <ListBox.Section>
            <Header>{p.label ?? "Mammals"}</Header>
            <ListBox.Item id="cat" textValue="Cat">
              Cat
            </ListBox.Item>
            <ListBox.Item id="dog" textValue="Dog">
              Dog
            </ListBox.Item>
          </ListBox.Section>
        </ListBox>
      );
    default:
      return null;
  }
}

function renderForm(_component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  return (
    <Form
      style={ctx.style}
      className={`flex w-72 flex-col gap-4 text-left ${ctx.className}`}
      onSubmit={(e) => e.preventDefault()}
    >
      <TextField isRequired name="email">
        <Label>Email</Label>
        <Input placeholder="you@example.com" />
      </TextField>
      <TextField isRequired name="password" type="password">
        <Label>Password</Label>
        <Input type="password" placeholder="••••••••" />
      </TextField>
      <Button type="submit" variant="primary">
        {p.label ?? "Sign in"}
      </Button>
    </Form>
  );
}

function renderModal(_component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  return (
    <Modal>
      <Button variant="secondary" style={ctx.style} className={ctx.className}>
        {p.label ?? "Open modal"}
      </Button>
      <Modal.Backdrop variant={asEnum(p.variant)}>
        <Modal.Container size={asEnum(p.size)}>
          <Modal.Dialog className="sm:max-w-[360px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-default text-foreground">
                <PreviewIcon name="settings" className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Project settings</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p>Make changes to your project. Click save when you are done.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button slot="close" variant="secondary">
                Cancel
              </Button>
              <Button slot="close" variant="primary">
                Save
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}

function renderDrawer(_component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  return (
    <Drawer>
      <Button variant="secondary" style={ctx.style} className={ctx.className}>
        {p.label ?? "Open drawer"}
      </Button>
      <Drawer.Backdrop variant={asEnum(p.variant)}>
        <Drawer.Content placement={asEnum(p.orientation ?? "bottom")}>
          <Drawer.Dialog>
            <Drawer.Handle />
            <Drawer.Header>
              <Drawer.Heading>Filters</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>Adjust filters for your search results.</Drawer.Body>
            <Drawer.Footer>
              <Button slot="close" variant="primary">
                Apply
              </Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger />
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}

function renderPopover(_component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  return (
    <Popover>
      <Button variant="secondary" style={ctx.style} className={ctx.className}>
        {p.label ?? "Open popover"}
      </Button>
      <Popover.Content>
        <Popover.Arrow />
        <Popover.Dialog>
          <Popover.Heading>Dimensions</Popover.Heading>
          <p className="text-sm text-zinc-500">Set the width and height for the layer.</p>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
}

function renderTooltip(_component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  return (
    <Tooltip delay={0}>
      <Tooltip.Trigger>
        <Button variant="secondary" style={ctx.style} className={ctx.className}>
          {p.label ?? "Hover me"}
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content showArrow>
        <Tooltip.Arrow />
        <p>Helpful information appears here.</p>
      </Tooltip.Content>
    </Tooltip>
  );
}

function renderDropdown(_component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  return (
    <Dropdown>
      <Button variant="secondary" style={ctx.style} className={ctx.className}>
        {p.label ?? "Actions"}
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu onAction={() => undefined}>
          <Dropdown.Item id="edit" textValue="Edit">
            Edit
          </Dropdown.Item>
          <Dropdown.Item id="duplicate" textValue="Duplicate">
            Duplicate
          </Dropdown.Item>
          <Dropdown.Item id="delete" textValue="Delete" variant="danger">
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}

function renderAlertDialog(_component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  return (
    <AlertDialog>
      <Button variant="danger" style={ctx.style} className={ctx.className}>
        {p.label ?? "Delete item"}
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container size={asEnum(p.size)}>
          <AlertDialog.Dialog>
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status={asEnum(p.status)} />
              <AlertDialog.Heading>Are you sure?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              This action cannot be undone. This will permanently delete the item.
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="secondary">
                Cancel
              </Button>
              <Button slot="close" variant="danger">
                Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}

function renderTabs(_component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  return (
    <Tabs
      defaultSelectedKey="account"
      variant={asEnum(p.variant)}
      orientation={asEnum(p.orientation)}
      style={ctx.style}
      className={`w-full max-w-md text-left ${ctx.className}`}
    >
      <Tabs.ListContainer>
        <Tabs.List>
          <Tabs.Tab id="account">Account</Tabs.Tab>
          <Tabs.Tab id="password">Password</Tabs.Tab>
          <Tabs.Tab id="billing">Billing</Tabs.Tab>
          <Tabs.Indicator />
        </Tabs.List>
      </Tabs.ListContainer>
      <Tabs.Panel id="account">Manage your account settings.</Tabs.Panel>
      <Tabs.Panel id="password">Update your password.</Tabs.Panel>
      <Tabs.Panel id="billing">Review billing details.</Tabs.Panel>
    </Tabs>
  );
}

function renderBreadcrumbs(_component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  return (
    <Breadcrumbs style={ctx.style} className={ctx.className}>
      <Breadcrumbs.Item href="#">Home</Breadcrumbs.Item>
      <Breadcrumbs.Item href="#">Projects</Breadcrumbs.Item>
      <Breadcrumbs.Item>{p.label ?? "Settings"}</Breadcrumbs.Item>
    </Breadcrumbs>
  );
}

function renderPagination(_component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  return (
    <Pagination
      size={asEnum(p.size)}
      style={ctx.style}
      className={ctx.className}
    >
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous>
            <Pagination.PreviousIcon />
          </Pagination.Previous>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link isActive>1</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link>2</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Ellipsis />
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link>5</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Next>
            <Pagination.NextIcon />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  );
}

function renderMenu(_component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  return (
    <Menu
      aria-label="Actions"
      onAction={() => undefined}
      style={ctx.style}
      className={`w-48 text-left ${ctx.className}`}
    >
      <Menu.Item id="edit" textValue="Edit">
        {p.label ?? "Edit"}
      </Menu.Item>
      <Menu.Item id="share" textValue="Share">
        Share
      </Menu.Item>
      <Menu.Item id="delete" textValue="Delete" variant={asEnum(p.variant === "danger" ? "danger" : "default")}>
        Delete
      </Menu.Item>
    </Menu>
  );
}

function renderToolbar(_component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  return (
    <Toolbar
      orientation={asEnum(p.orientation)}
      isAttached={p.selected}
      aria-label="Formatting"
      style={ctx.style}
      className={ctx.className}
    >
      <Button variant="ghost" size="sm">
        Bold
      </Button>
      <Button variant="ghost" size="sm">
        Italic
      </Button>
      <Button variant="ghost" size="sm">
        Link
      </Button>
    </Toolbar>
  );
}

function renderTable(_component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  return (
    <Table
      aria-label="Team members"
      variant={asEnum(p.variant)}
      style={ctx.style}
      className={`w-full max-w-xl text-left ${ctx.className}`}
    >
      <Table.ScrollContainer>
        <Table.Header>
          <Table.Column isRowHeader>Name</Table.Column>
          <Table.Column>Role</Table.Column>
          <Table.Column>Status</Table.Column>
        </Table.Header>
        <Table.Body>
          {TABLE_ROWS.map((row) => (
            <Table.Row key={row.id}>
              <Table.Cell>{row.name}</Table.Cell>
              <Table.Cell>{row.role}</Table.Cell>
              <Table.Cell>{row.status}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.ScrollContainer>
    </Table>
  );
}

function renderBadge(_component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  return (
    <Badge
      variant={asEnum(p.variant)}
      color={asEnum(p.color)}
      size={asEnum(p.size)}
      style={ctx.style}
      className={ctx.className}
    >
      <Badge.Anchor>
        <PreviewIcon name="bell" className="size-6 text-zinc-600" />
      </Badge.Anchor>
      <Badge.Label>{p.label ?? "3"}</Badge.Label>
    </Badge>
  );
}

function renderListBox(_component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  return (
    <ListBox
      aria-label="Options"
      selectionMode="single"
      defaultSelectedKeys={["dog"]}
      variant={asEnum(p.variant)}
      style={ctx.style}
      className={`w-48 text-left ${ctx.className}`}
    >
      {listBoxItems(p.variant)}
    </ListBox>
  );
}

function renderTagGroup(_component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  return (
    <TagGroup
      aria-label="Tags"
      variant={asEnum(p.variant)}
      size={asEnum(p.size)}
      style={ctx.style}
      className={ctx.className}
    >
      <Label>Tags</Label>
      <TagGroup.List items={TAG_ITEMS}>
        {(item) => (
          <Tag id={item.id} textValue={item.label}>
            {item.label}
          </Tag>
        )}
      </TagGroup.List>
    </TagGroup>
  );
}

function renderMeter(_component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  return (
    <Meter
      value={p.value ?? 60}
      minValue={0}
      maxValue={100}
      color={asEnum(p.color)}
      size={asEnum(p.size)}
      aria-label="Storage used"
      style={ctx.style}
      className={`w-64 ${ctx.className}`}
    >
      <Meter.Output />
      <Meter.Track>
        <Meter.Fill />
      </Meter.Track>
    </Meter>
  );
}

export function renderProgressBar(_component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  return (
    <ProgressBar
      value={p.value ?? 60}
      color={asEnum(p.color)}
      size={asEnum(p.size)}
      aria-label="Upload progress"
      style={ctx.style}
      className={`w-64 ${ctx.className}`}
    >
      <ProgressBar.Output />
      <ProgressBar.Track>
        <ProgressBar.Fill />
      </ProgressBar.Track>
    </ProgressBar>
  );
}

function renderTypography(_component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  const type = p.variant ?? "body";
  if (type === "code") {
    return (
      <Typography.Code color={asEnum(p.color)} style={ctx.style} className={ctx.className}>
        {p.label ?? "npm install"}
      </Typography.Code>
    );
  }
  if (type.startsWith("h")) {
    const level = Number(type.replace("h", "")) as 1 | 2 | 3 | 4 | 5 | 6;
    return (
      <Typography.Heading
        level={level}
        color={asEnum(p.color)}
        style={ctx.style}
        className={ctx.className}
      >
        {p.label ?? "Heading"}
      </Typography.Heading>
    );
  }
  return (
    <Typography.Paragraph color={asEnum(p.color)} style={ctx.style} className={ctx.className}>
      {p.label ?? "Body text for paragraphs."}
    </Typography.Paragraph>
  );
}

function toastHandler(status: string | undefined, message: string) {
  switch (status) {
    case "danger":
      return toast.danger(message);
    case "warning":
      return toast.warning(message);
    case "success":
    default:
      return toast.success(message);
  }
}

function renderToast(_component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  const message = "Your changes have been saved.";
  return (
    <Toast.Provider placement={asEnum(p.orientation ?? "bottom")}>
      <Button
        variant="secondary"
        style={ctx.style}
        className={ctx.className}
        onPress={() => toastHandler(p.status, message)}
      >
        {p.label ?? "Show toast"}
      </Button>
    </Toast.Provider>
  );
}

function renderEmptyState(_component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  const message = p.label ?? "No results found";

  return (
    <ListBox
      aria-label="Empty list"
      style={ctx.style}
      className={`min-h-[180px] w-72 text-left ${ctx.className}`}
      renderEmptyState={() => (
        <EmptyState className="flex h-full w-full flex-col items-center justify-center gap-4 text-center">
          <HugeiconsIcon icon={InboxIcon} className="size-6 text-muted" />
          <span className="text-sm text-muted">{message}</span>
        </EmptyState>
      )}
    >
      {[]}
    </ListBox>
  );
}

const SCROLL_SHADOW_LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam. Morbi accumsan cursus enim, sed ultricies sapien.";

function renderScrollShadow(_component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  const orientation = asEnum(p.orientation) ?? "vertical";

  if (orientation === "horizontal") {
    return (
      <Card
        className={`w-full max-w-sm overflow-hidden p-0 ${ctx.className}`}
        style={ctx.style}
      >
        <ScrollShadow className="rounded-[inherit] p-4" orientation="horizontal">
          <div className="flex flex-row gap-4">
            {Array.from({ length: 10 }, (_, idx) => (
              <Card
                key={`scroll-shadow-card-${idx}`}
                className="flex min-w-[200px] flex-row gap-3 p-3"
                variant="transparent"
              >
                <div className="aspect-square size-16 shrink-0 rounded-xl bg-default" />
                <div className="flex flex-1 flex-col justify-center gap-1 text-left">
                  <Card.Title className="text-sm">Bridging the Future</Card.Title>
                  <Card.Description className="text-xs">Today, 6:30 PM</Card.Description>
                </div>
              </Card>
            ))}
          </div>
        </ScrollShadow>
      </Card>
    );
  }

  return (
    <Card
      className={`w-full max-w-sm overflow-hidden p-0 ${ctx.className}`}
      style={ctx.style}
    >
      <ScrollShadow
        className="max-h-[240px] rounded-[inherit] p-4"
        orientation="vertical"
      >
        <div className="space-y-4">
          {Array.from({ length: 10 }, (_, idx) => (
            <p key={`scroll-shadow-lorem-${idx}`} className="text-left text-sm text-muted">
              {SCROLL_SHADOW_LOREM}
            </p>
          ))}
        </div>
      </ScrollShadow>
    </Card>
  );
}

function renderAccordion(_component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  return (
    <Accordion
      variant={asEnum(p.variant)}
      style={ctx.style}
      className={`w-80 text-left ${ctx.className}`}
    >
      <Accordion.Item id="shipping">
        <Accordion.Heading>
          <Accordion.Trigger>
            Shipping
            <Accordion.Indicator />
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body>Arrives in 3–5 business days.</Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item id="returns">
        <Accordion.Heading>
          <Accordion.Trigger>
            Returns
            <Accordion.Indicator />
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body>Free returns within 30 days.</Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

function disclosurePanel(label: string, body: string) {
  return (
    <Disclosure style={{ width: "100%" }}>
      <Disclosure.Heading>
        <Disclosure.Trigger>
          {label}
          <Disclosure.Indicator />
        </Disclosure.Trigger>
      </Disclosure.Heading>
      <Disclosure.Content>
        <Disclosure.Body>{body}</Disclosure.Body>
      </Disclosure.Content>
    </Disclosure>
  );
}

function renderDisclosure(component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  if (component === "DisclosureGroup") {
    return (
      <DisclosureGroup
        style={ctx.style}
        className={`flex w-80 flex-col gap-2 text-left ${ctx.className}`}
      >
        {disclosurePanel("Shipping details", "Orders ship within 2 business days.")}
        {disclosurePanel("Returns", "Free returns within 30 days.")}
      </DisclosureGroup>
    );
  }
  return (
    <Disclosure style={ctx.style} className={`w-80 text-left ${ctx.className}`}>
      <Disclosure.Heading>
        <Disclosure.Trigger>
          {p.label ?? "Shipping details"}
          <Disclosure.Indicator />
        </Disclosure.Trigger>
      </Disclosure.Heading>
      <Disclosure.Content>
        <Disclosure.Body>Orders ship within 2 business days.</Disclosure.Body>
      </Disclosure.Content>
    </Disclosure>
  );
}

function renderSurface(_component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  return (
    <Surface
      variant={asEnum(p.variant)}
      style={ctx.style}
      className={`w-72 rounded-xl p-4 text-left ${ctx.className}`}
    >
      <Typography.Heading level={5}>Surface</Typography.Heading>
      <Description>Content grouped on a neutral surface.</Description>
    </Surface>
  );
}

function renderFieldset(_component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  return (
    <Fieldset
      disabled={p.isDisabled}
      style={ctx.style}
      className={`w-72 text-left ${ctx.className}`}
    >
      <Fieldset.Legend>{p.label ?? "Account"}</Fieldset.Legend>
      <Fieldset.Group>
        {checkboxField("Email newsletter", undefined, true)}
        {checkboxField("Product updates", "updates")}
      </Fieldset.Group>
      <Fieldset.Actions>
        <Button type="submit" variant="primary" size="sm">
          Save
        </Button>
      </Fieldset.Actions>
    </Fieldset>
  );
}

export function renderCheckboxGroup(_component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  return (
    <CheckboxGroup
      variant={asEnum(p.variant)}
      defaultValue={["newsletter"]}
      style={ctx.style}
      className={ctx.className}
    >
      <Label>{p.label ?? "Preferences"}</Label>
      <Checkbox value="newsletter">
        <Checkbox.Content>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          Email newsletter
        </Checkbox.Content>
      </Checkbox>
      <Checkbox value="updates">
        <Checkbox.Content>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          Product updates
        </Checkbox.Content>
      </Checkbox>
    </CheckboxGroup>
  );
}

export function renderSwitchGroup(_component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  return (
    <SwitchGroup style={ctx.style} className={ctx.className}>
      <Label>{p.label ?? "Notifications"}</Label>
      <Switch defaultSelected>
        <Switch.Content>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          Push notifications
        </Switch.Content>
      </Switch>
      <Switch>
        <Switch.Content>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          Email digests
        </Switch.Content>
      </Switch>
    </SwitchGroup>
  );
}

export function renderToggleButtonGroup(_component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  const groupCtx = buttonGroupPreviewCtx(ctx);
  const variant = asEnum(p.variant ?? "default");
  return (
    <ToggleButtonGroup
      size={asEnum(p.size)}
      defaultSelectedKeys={["center"]}
      style={groupCtx.style}
      className={groupCtx.className}
    >
      <ToggleButton id="left" variant={variant}>
        Left
      </ToggleButton>
      <ToggleButtonGroup.Separator />
      <ToggleButton id="center" variant={variant}>
        Center
      </ToggleButton>
      <ToggleButtonGroup.Separator />
      <ToggleButton id="right" variant={variant}>
        Right
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export function renderInputGroup(_component: string, item: PreviewItem, ctx: SpecCtx): ReactNode {
  const p = item.props;
  return (
    <InputGroup
      variant={asEnum(p.variant)}
      style={ctx.style}
      className={`w-72 ${ctx.className}`}
    >
      <InputGroup.Prefix>https://</InputGroup.Prefix>
      <InputGroup.Input placeholder={p.label ?? "example.com"} disabled={p.isDisabled} />
    </InputGroup>
  );
}

export const NEW_RENDERERS: Record<
  string,
  (component: string, item: PreviewItem, ctx: SpecCtx) => ReactNode
> = {
  "close-button": renderCloseButton,
  input: (component, item, ctx) => {
    if (component === "InputGroup") return renderInputGroup(component, item, ctx);
    return renderTextField(component, item, ctx);
  },
  textarea: renderTextField,
  "number-field": renderNumberField,
  "search-field": renderSearchField,
  "input-otp": renderInputOtp,
  select: renderSelect,
  "combo-box": renderComboBox,
  autocomplete: renderAutocomplete,
  slider: renderSlider,
  "date-picker": renderDatePicker,
  "date-range-picker": renderDateRangePicker,
  "date-field": renderDateField,
  "time-field": renderTimeField,
  calendar: renderCalendar,
  color: renderColor,
  form: renderForm,
  "form-primitives": renderFormPrimitives,
  modal: renderModal,
  drawer: renderDrawer,
  popover: renderPopover,
  tooltip: renderTooltip,
  dropdown: renderDropdown,
  "alert-dialog": renderAlertDialog,
  tabs: renderTabs,
  breadcrumbs: renderBreadcrumbs,
  pagination: renderPagination,
  menu: renderMenu,
  toolbar: renderToolbar,
  table: renderTable,
  badge: renderBadge,
  "list-box": renderListBox,
  "tag-group": renderTagGroup,
  meter: renderMeter,
  typography: renderTypography,
  toast: renderToast,
  "empty-state": renderEmptyState,
  "scroll-shadow": renderScrollShadow,
  accordion: renderAccordion,
  disclosure: renderDisclosure,
  surface: renderSurface,
  fieldset: renderFieldset,
};
