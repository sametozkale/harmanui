/**
 * Code-generation templates for new HeroUI v3 families.
 */

import type { PreviewItem } from "@/lib/registry/types";
import { attrs, codeCtx, buttonGroupCodeCtx, toggleButtonGroupChildrenJsx } from "./_code";
import {
  ACCORDION_MOTION_PANEL_HELPER,
  ACCORDION_MOTION_PREAMBLE,
  ACCORDION_SPLITTED_INDICATOR_HELPER,
  ACCORDION_SURFACE_INDICATOR_HELPER,
  accordionItemsJsx,
} from "./accordion-content";
import { harmanAccordionStyleLiteral } from "./accordion-style";
import {
  disclosureGroupJsx,
  disclosureStandaloneJsx,
} from "./disclosure-content";
import { typographyProseJsx, TYPOGRAPHY_DEMO, TYPOGRAPHY_HEADING_LABELS } from "./typography-content";
import {
  COLOR_PREVIEW_DEFAULT,
  colorSwatchPickerItemsJsx,
} from "./color-preview";
import type { CodeBuilt, SpecCtx } from "./_spec";

const SELECT_ITEMS_JSX = `          <ListBox.Item id="cat" textValue="Cat">Cat</ListBox.Item>
          <ListBox.Item id="dog" textValue="Dog">Dog</ListBox.Item>
          <ListBox.Item id="bird" textValue="Bird">Bird</ListBox.Item>`;

const TABLE_ROWS_JSX = `            <Table.Row>
              <Table.Cell>Ada Lovelace</Table.Cell>
              <Table.Cell>Engineer</Table.Cell>
              <Table.Cell>Active</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Grace Hopper</Table.Cell>
              <Table.Cell>Scientist</Table.Cell>
              <Table.Cell>Active</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Alan Turing</Table.Cell>
              <Table.Cell>Researcher</Table.Cell>
              <Table.Cell>Away</Table.Cell>
            </Table.Row>`;

const CALENDAR_JSX = `          <Calendar.Header>
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
            <Calendar.GridBody>
              {(date) => <Calendar.Cell date={date} />}
            </Calendar.GridBody>
          </Calendar.Grid>
          <Calendar.YearPickerGrid>
            <Calendar.YearPickerGridBody>
              {({ year }) => <Calendar.YearPickerCell year={year} />}
            </Calendar.YearPickerGridBody>
          </Calendar.YearPickerGrid>`;

const RANGE_CALENDAR_JSX = `          <RangeCalendar.Header>
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
          </RangeCalendar.Grid>`;

const DATE_SEGMENTS_JSX = `          <DateField.Group>
            <DateField.Input>
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
          </DateField.Group>`;

const DATE_INPUT_GROUP_JSX = `          <DateField.Group>
            <DateField.Prefix>📅</DateField.Prefix>
            <DateField.Input>
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
          </DateField.Group>`;

const DATE_PICKER_FIELD_JSX = `          <DateField.Group>
            <DateField.Input>
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
            <DateField.Suffix>
              <DatePicker.Trigger>
                <DatePicker.TriggerIndicator />
              </DatePicker.Trigger>
            </DateField.Suffix>
          </DateField.Group>`;

const DATE_RANGE_FIELD_JSX = `          <DateField.Group>
            <DateField.InputContainer>
              <DateField.Input slot="start">
                {(segment) => <DateField.Segment segment={segment} />}
              </DateField.Input>
              <DateRangePicker.RangeSeparator />
              <DateField.Input slot="end">
                {(segment) => <DateField.Segment segment={segment} />}
              </DateField.Input>
            </DateField.InputContainer>
            <DateField.Suffix>
              <DateRangePicker.Trigger>
                <DateRangePicker.TriggerIndicator />
              </DateRangePicker.Trigger>
            </DateField.Suffix>
          </DateField.Group>`;

const CHECKBOX_COMPOUND = (label: string, extra = "") =>
  `        <Checkbox${extra}>
          <Checkbox.Content>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            ${label}
          </Checkbox.Content>
        </Checkbox>`;

function textFieldCode(component: string, p: PreviewItem["props"], c: ReturnType<typeof codeCtx>): CodeBuilt {
  if (component === "TextArea") {
    return {
      hero: ["TextField", "Label", "TextArea"],
      jsx:
        `<TextField\n${c.classAttr}\n${c.styleAttr}\n      >\n` +
        `        <Label>${p.label ?? "Message"}</Label>\n` +
        `        <TextArea\n${attrs([["variant", p.variant], ["disabled", p.isDisabled], ["placeholder", "Write your message…"]])}\n        />\n` +
        `      </TextField>`,
    };
  }
  return {
    hero: ["TextField", "Label", "Input"],
    jsx:
      `<TextField\n${c.classAttr}\n${c.styleAttr}\n      >\n` +
      `        <Label>${p.label ?? "Email"}</Label>\n` +
        `        <Input\n${attrs([["variant", p.variant], ["disabled", p.isDisabled], ["placeholder", "you@example.com"]])}\n        />\n` +
      `      </TextField>`,
  };
}

export function buildComponentCode(
  component: string,
  item: PreviewItem,
  ctx: SpecCtx,
): CodeBuilt {
  return build(component, item.props, ctx);
}

function build(component: string, p: PreviewItem["props"], ctx: SpecCtx): CodeBuilt {
  const c = codeCtx(ctx.customization, ctx.motionOptions, ctx.visibility);

  switch (component) {
    case "TextField":
    case "TextArea":
      return textFieldCode(component, p, c);

    case "NumberField":
      return {
        hero: ["NumberField", "Label"],
        jsx:
          `<NumberField\n${attrs([["variant", p.variant], ["isDisabled", p.isDisabled], ["defaultValue", p.value ?? 2], ["minValue", 0]])}\n${c.classAttr}\n${c.styleAttr}\n      >\n` +
          `        <Label>${p.label ?? "Quantity"}</Label>\n` +
          `        <NumberField.Group>\n` +
          `          <NumberField.DecrementButton />\n` +
          `          <NumberField.Input />\n` +
          `          <NumberField.IncrementButton />\n` +
          `        </NumberField.Group>\n` +
          `      </NumberField>`,
      };

    case "SearchField":
      return {
        hero: ["SearchField", "Label"],
        jsx:
          `<SearchField\n${attrs([["variant", p.variant], ["isDisabled", p.isDisabled], ["aria-label", p.label ?? "Search"]])}\n${c.classAttr}\n${c.styleAttr}\n      >\n` +
          `        <Label>${p.label ?? "Search"}</Label>\n` +
          `        <SearchField.Group>\n` +
          `          <SearchField.SearchIcon />\n` +
          `          <SearchField.Input placeholder="Search…" />\n` +
          `          <SearchField.ClearButton />\n` +
          `        </SearchField.Group>\n` +
          `      </SearchField>`,
      };

    case "InputOTP":
      return {
        hero: ["InputOTP"],
        jsx:
          `<InputOTP\n${attrs([["maxLength", 6], ["variant", p.variant], ["isDisabled", p.isDisabled]])}\n${c.classAttr}\n${c.styleAttr}\n      >\n` +
          `        <InputOTP.Group>\n` +
          `          <InputOTP.Slot index={0} />\n` +
          `          <InputOTP.Slot index={1} />\n` +
          `          <InputOTP.Slot index={2} />\n` +
          `          <InputOTP.Separator />\n` +
          `          <InputOTP.Slot index={3} />\n` +
          `          <InputOTP.Slot index={4} />\n` +
          `          <InputOTP.Slot index={5} />\n` +
          `        </InputOTP.Group>\n` +
          `      </InputOTP>`,
      };

    case "Select":
      return {
        hero: ["Select", "Label", "ListBox"],
        jsx:
          `<Select\n${attrs([["aria-label", p.label ?? "Country"], ["variant", p.variant], ["isDisabled", p.isDisabled], ["defaultSelectedKey", "dog"]])}\n${c.classAttr}\n${c.styleAttr}\n      >\n` +
          `        <Label>${p.label ?? "Country"}</Label>\n` +
          `        <Select.Trigger>\n` +
          `          <Select.Value />\n` +
          `          <Select.Indicator />\n` +
          `        </Select.Trigger>\n` +
          `        <Select.Popover>\n` +
          `          <ListBox>\n${SELECT_ITEMS_JSX}\n` +
          `          </ListBox>\n` +
          `        </Select.Popover>\n` +
          `      </Select>`,
      };

    case "ComboBox":
      return {
        hero: ["ComboBox", "Label", "Input", "ListBox"],
        jsx:
          `<ComboBox\n${attrs([["aria-label", p.label ?? "Fruit"], ["isDisabled", p.isDisabled], ["defaultSelectedKey", "dog"]])}\n${c.classAttr}\n${c.styleAttr}\n      >\n` +
          `        <Label>${p.label ?? "Fruit"}</Label>\n` +
          `        <ComboBox.InputGroup>\n` +
          `          <Input placeholder="Pick a fruit" />\n` +
          `          <ComboBox.Trigger />\n` +
          `        </ComboBox.InputGroup>\n` +
          `        <ComboBox.Popover>\n` +
          `          <ListBox>\n${SELECT_ITEMS_JSX}\n` +
          `          </ListBox>\n` +
          `        </ComboBox.Popover>\n` +
          `      </ComboBox>`,
      };

    case "Autocomplete":
      return {
        hero: ["Autocomplete", "Label", "ListBox"],
        jsx:
          `<Autocomplete\n${attrs([["aria-label", p.label ?? "City"], ["variant", p.variant], ["isDisabled", p.isDisabled], ["defaultSelectedKey", "dog"]])}\n${c.classAttr}\n${c.styleAttr}\n      >\n` +
          `        <Label>${p.label ?? "City"}</Label>\n` +
          `        <Autocomplete.Trigger>\n` +
          `          <Autocomplete.Value />\n` +
          `          <Autocomplete.Indicator />\n` +
          `        </Autocomplete.Trigger>\n` +
          `        <Autocomplete.Popover>\n` +
          `          <Autocomplete.Filter>\n` +
          `            <ListBox>\n${SELECT_ITEMS_JSX}\n` +
          `            </ListBox>\n` +
          `          </Autocomplete.Filter>\n` +
          `        </Autocomplete.Popover>\n` +
          `      </Autocomplete>`,
      };

    case "Slider":
      return {
        hero: ["Slider"],
        jsx:
          `<Slider\n${attrs([["aria-label", "Volume"], ["defaultValue", p.value ?? 50], ["orientation", p.orientation]])}\n${c.classAttr}\n${c.styleAttr}\n      >\n` +
          `        <Slider.Output />\n` +
          `        <Slider.Track>\n` +
          `          <Slider.Fill />\n` +
          `          <Slider.Thumb />\n` +
          `        </Slider.Track>\n` +
          `      </Slider>`,
      };

    case "DatePicker":
      return {
        hero: ["DatePicker", "Label", "DateField", "Calendar"],
        jsx:
          `<DatePicker\n${attrs([["isDisabled", p.isDisabled]])}\n${c.classAttr}\n${c.styleAttr}\n      >\n` +
          `        <Label>${p.label ?? "Start date"}</Label>\n` +
          `${DATE_PICKER_FIELD_JSX}\n` +
          `        <DatePicker.Popover>\n` +
          `          <Calendar aria-label="${p.label ?? "Calendar"}">\n${CALENDAR_JSX}\n` +
          `          </Calendar>\n` +
          `        </DatePicker.Popover>\n` +
          `      </DatePicker>`,
      };

    case "DateRangePicker":
      return {
        hero: ["DateRangePicker", "Label", "DateField", "RangeCalendar"],
        jsx:
          `<DateRangePicker\n${attrs([["isDisabled", p.isDisabled]])}\n${c.classAttr}\n${c.styleAttr}\n      >\n` +
          `        <Label>${p.label ?? "Trip dates"}</Label>\n` +
          `${DATE_RANGE_FIELD_JSX}\n` +
          `        <DateRangePicker.Popover>\n` +
          `          <RangeCalendar aria-label="${p.label ?? "Choose trip dates"}">\n${RANGE_CALENDAR_JSX}\n` +
          `          </RangeCalendar>\n` +
          `        </DateRangePicker.Popover>\n` +
          `      </DateRangePicker>`,
      };

    case "CheckboxGroup":
      return {
        hero: ["CheckboxGroup", "Label", "Checkbox"],
        jsx:
          `<CheckboxGroup\n${attrs([["variant", p.variant], ["defaultValue", '["newsletter"]']])}\n${c.classAttr}\n${c.styleAttr}\n      >\n` +
          `        <Label>${p.label ?? "Preferences"}</Label>\n` +
          `${CHECKBOX_COMPOUND("Email newsletter", ' value="newsletter"')}\n` +
          `${CHECKBOX_COMPOUND("Product updates", ' value="updates"')}\n` +
          `      </CheckboxGroup>`,
      };

    case "SwitchGroup":
      return {
        hero: ["SwitchGroup", "Label", "Switch"],
        jsx:
          `<SwitchGroup\n${c.classAttr}\n${c.styleAttr}\n      >\n` +
          `        <Label>${p.label ?? "Notifications"}</Label>\n` +
          `        <Switch defaultSelected>\n` +
          `          <Switch.Content>\n` +
          `            <Switch.Control>\n` +
          `              <Switch.Thumb />\n` +
          `            </Switch.Control>\n` +
          `            Push notifications\n` +
          `          </Switch.Content>\n` +
          `        </Switch>\n` +
          `        <Switch>\n` +
          `          <Switch.Content>\n` +
          `            <Switch.Control>\n` +
          `              <Switch.Thumb />\n` +
          `            </Switch.Control>\n` +
          `            Email digests\n` +
          `          </Switch.Content>\n` +
          `        </Switch>\n` +
          `      </SwitchGroup>`,
      };

    case "ToggleButtonGroup": {
      const c = buttonGroupCodeCtx(ctx.customization, ctx.motionOptions, ctx.visibility);
      return {
        hero: ["ToggleButtonGroup", "ToggleButton"],
        jsx:
          `<ToggleButtonGroup\n${attrs([["size", p.size], ["selectionMode", "single"], ["defaultSelectedKeys", '["center"]']])}${c.styleAttr ? `\n${c.styleAttr}` : ""}\n      >\n` +
          `${toggleButtonGroupChildrenJsx(p.variant)}\n` +
          `      </ToggleButtonGroup>`,
      };
    }

    case "InputGroup":
      return {
        hero: ["InputGroup"],
        jsx:
          `<InputGroup\n${attrs([["variant", p.variant]])}\n${c.classAttr}\n${c.styleAttr}\n      >\n` +
          `        <InputGroup.Prefix>https://</InputGroup.Prefix>\n` +
          `        <InputGroup.Input\n${attrs([["placeholder", p.label ?? "example.com"], ["disabled", p.isDisabled]])}\n        />\n` +
          `      </InputGroup>`,
      };

    case "DateField":
      return {
        hero: ["DateField", "Label"],
        jsx:
          `<DateField\n${attrs([["isDisabled", p.isDisabled], ["aria-label", p.label ?? "Birth date"]])}\n${c.classAttr}\n${c.styleAttr}\n      >\n` +
          `        <Label>${p.label ?? "Birth date"}</Label>\n${DATE_SEGMENTS_JSX}\n` +
          `      </DateField>`,
      };

    case "TimeField":
      return {
        hero: ["TimeField", "Label"],
        jsx:
          `<TimeField\n${attrs([["isDisabled", p.isDisabled], ["aria-label", p.label ?? "Meeting time"]])}\n${c.classAttr}\n${c.styleAttr}\n      >\n` +
          `        <Label>${p.label ?? "Meeting time"}</Label>\n` +
          `        <TimeField.Group>\n` +
          `          <TimeField.Input>\n` +
          `            {(segment) => <TimeField.Segment segment={segment} />}\n` +
          `          </TimeField.Input>\n` +
          `        </TimeField.Group>\n` +
          `      </TimeField>`,
      };

    case "Calendar":
      return {
        hero: ["Calendar"],
        jsx:
          `<Calendar\n${attrs([["aria-label", p.label ?? "Appointment"]])}\n${c.classAttr}\n${c.styleAttr}\n      >\n${CALENDAR_JSX}\n` +
          `      </Calendar>`,
      };

    case "RangeCalendar":
      return {
        hero: ["RangeCalendar"],
        jsx:
          `<RangeCalendar\n${attrs([["aria-label", p.label ?? "Trip dates"]])}\n${c.classAttr}\n${c.styleAttr}\n      >\n${RANGE_CALENDAR_JSX}\n` +
          `      </RangeCalendar>`,
      };

    case "DateInputGroup":
      return {
        hero: ["DateField", "Label"],
        jsx:
          `<DateField\n${attrs([["isDisabled", p.isDisabled], ["aria-label", p.label ?? "Birth date"]])}\n${c.classAttr}\n${c.styleAttr}\n      >\n` +
          `        <Label>${p.label ?? "Birth date"}</Label>\n` +
          `        <DateField.Group\n${attrs([["variant", p.variant]])}\n        >\n` +
          `          <DateField.Prefix>📅</DateField.Prefix>\n` +
          `          <DateField.Input>\n` +
          `            {(segment) => <DateField.Segment segment={segment} />}\n` +
          `          </DateField.Input>\n` +
          `        </DateField.Group>\n` +
          `      </DateField>`,
      };

    case "ColorPicker":
      return {
        hero: ["ColorPicker", "Label", "ColorSwatch", "ColorArea", "ColorSlider"],
        jsx:
          `<ColorPicker\n${attrs([["defaultValue", COLOR_PREVIEW_DEFAULT]])}\n      >\n` +
          `        <ColorPicker.Trigger${p.isDisabled ? " isDisabled" : ""}\n${c.classAttr}\n${c.styleAttr}\n        >\n` +
          `          <ColorSwatch size="lg" />\n` +
          `          <Label>${p.label ?? "Brand color"}</Label>\n` +
          `        </ColorPicker.Trigger>\n` +
          `        <ColorPicker.Popover className="gap-2">\n` +
          `          <ColorArea\n` +
          `            aria-label="Color area"\n` +
          `            className="max-w-full"\n` +
          `            colorSpace="hsb"\n` +
          `            xChannel="saturation"\n` +
          `            yChannel="brightness"\n` +
          `          >\n` +
          `            <ColorArea.Thumb />\n` +
          `          </ColorArea>\n` +
          `          <ColorSlider\n` +
          `            aria-label="Hue slider"\n` +
          `            channel="hue"\n` +
          `            className="gap-1 px-1"\n` +
          `            colorSpace="hsb"\n` +
          `          >\n` +
          `            <Label>Hue</Label>\n` +
          `            <ColorSlider.Output className="text-muted" />\n` +
          `            <ColorSlider.Track>\n` +
          `              <ColorSlider.Thumb />\n` +
          `            </ColorSlider.Track>\n` +
          `          </ColorSlider>\n` +
          `        </ColorPicker.Popover>\n` +
          `      </ColorPicker>`,
      };

    case "ColorField":
      return {
        hero: ["ColorField", "Label", "ColorSwatch"],
        jsx:
          `<ColorField\n${attrs([["defaultValue", COLOR_PREVIEW_DEFAULT], ["isDisabled", p.isDisabled], ["name", "brand-color"]])}\n${c.classAttr}\n${c.styleAttr}\n      >\n` +
          `        <Label>${p.label ?? "Brand color"}</Label>\n` +
          `        <ColorField.Group\n${attrs([["variant", p.variant]])}\n        >\n` +
          `          <ColorField.Prefix>\n` +
          `            <ColorSwatch color="${COLOR_PREVIEW_DEFAULT}" size="xs" />\n` +
          `          </ColorField.Prefix>\n` +
          `          <ColorField.Input />\n` +
          `        </ColorField.Group>\n` +
          `      </ColorField>`,
      };

    case "ColorInputGroup":
      return {
        hero: ["ColorField", "Label", "ColorSwatch"],
        jsx:
          `<ColorField\n${attrs([["defaultValue", COLOR_PREVIEW_DEFAULT], ["isDisabled", p.isDisabled], ["name", "brand-color"]])}\n${c.classAttr}\n${c.styleAttr}\n      >\n` +
          `        <Label>${p.label ?? "Brand color"}</Label>\n` +
          `        <ColorField.Group\n${attrs([["variant", p.variant]])}\n        >\n` +
          `          <ColorField.Prefix>#</ColorField.Prefix>\n` +
          `          <ColorField.Input />\n` +
          `          <ColorField.Suffix>\n` +
          `            <ColorSwatch color="${COLOR_PREVIEW_DEFAULT}" size="xs" />\n` +
          `          </ColorField.Suffix>\n` +
          `        </ColorField.Group>\n` +
          `      </ColorField>`,
      };

    case "ColorSwatchPicker":
      return {
        hero: ["ColorSwatchPicker"],
        jsx:
          `<ColorSwatchPicker\n${attrs([["defaultValue", COLOR_PREVIEW_DEFAULT], ["layout", p.layout], ["size", p.size], ["variant", p.variant]])}\n${c.classAttr}\n${c.styleAttr}\n      >\n` +
          `${colorSwatchPickerItemsJsx()}\n` +
          `      </ColorSwatchPicker>`,
      };

    case "CloseButton":
      return {
        hero: ["CloseButton"],
        jsx: `<CloseButton\n${attrs([["aria-label", "Close"]])}\n${c.classAttr}\n${c.styleAttr}\n      />`,
      };

    case "Label":
      return {
        hero: ["TextField", "Label", "Input"],
        jsx:
          `<TextField isRequired name="email"\n${c.classAttr}\n${c.styleAttr}\n      >\n` +
          `        <Label>${p.label ?? "Email address"}</Label>\n` +
          `        <Input placeholder="you@example.com" />\n` +
          `      </TextField>`,
      };

    case "Description":
      return {
        hero: ["TextField", "Label", "Input", "Description"],
        jsx:
          `<TextField name="email"\n${c.classAttr}\n${c.styleAttr}\n      >\n` +
          `        <Label>Email</Label>\n` +
          `        <Input placeholder="you@example.com" />\n` +
          `        <Description>${p.label ?? "We never share your email."}</Description>\n` +
          `      </TextField>`,
      };

    case "FieldError":
      return {
        hero: ["TextField", "Label", "Input", "FieldError"],
        jsx:
          `<TextField isInvalid name="email" defaultValue="not-an-email"\n${c.classAttr}\n${c.styleAttr}\n      >\n` +
          `        <Label>Email</Label>\n` +
          `        <Input />\n` +
          `        <FieldError>${p.label ?? "Enter a valid email address."}</FieldError>\n` +
          `      </TextField>`,
      };

    case "ErrorMessage":
      return {
        hero: ["Form", "ErrorMessage", "TextField", "Label", "Input"],
        jsx:
          `<Form\n        validationErrors={{ email: "Enter a valid email address." }}\n        onSubmit={(e) => e.preventDefault()}\n${c.classAttr}\n${c.styleAttr}\n      >\n` +
          `        <ErrorMessage>${p.label ?? "Please fix the errors below."}</ErrorMessage>\n` +
          `        <TextField isRequired name="email">\n` +
          `          <Label>Email</Label>\n` +
          `          <Input placeholder="you@example.com" />\n` +
          `        </TextField>\n` +
          `      </Form>`,
      };

    case "Header":
      return {
        hero: ["ListBox", "Header"],
        jsx:
          `<ListBox aria-label="Animals" selectionMode="single"\n${c.classAttr}\n${c.styleAttr}\n      >\n` +
          `        <ListBox.Section>\n` +
          `          <Header>${p.label ?? "Mammals"}</Header>\n` +
          `          <ListBox.Item id="cat" textValue="Cat">Cat</ListBox.Item>\n` +
          `          <ListBox.Item id="dog" textValue="Dog">Dog</ListBox.Item>\n` +
          `        </ListBox.Section>\n` +
          `      </ListBox>`,
      };

    case "Form":
      return {
        hero: ["Form", "TextField", "Label", "Input", "Button"],
        jsx:
          `<Form\n        onSubmit={(e) => e.preventDefault()}\n${c.classAttr}\n${c.styleAttr}\n      >\n` +
          `        <TextField isRequired name="email">\n` +
          `          <Label>Email</Label>\n` +
          `          <Input placeholder="you@example.com" />\n` +
          `        </TextField>\n` +
          `        <TextField isRequired name="password" type="password">\n` +
          `          <Label>Password</Label>\n` +
          `          <Input type="password" placeholder="••••••••" />\n` +
          `        </TextField>\n` +
          `        <Button type="submit" variant="primary">${p.label ?? "Sign in"}</Button>\n` +
          `      </Form>`,
      };

    case "Modal":
      return {
        hero: ["Modal", "Button"],
        icons: ["Settings01Icon"],
        jsx:
          `<Modal>\n` +
          `        <Button variant="secondary"\n${c.classAttr}\n${c.styleAttr}\n        >\n` +
          `          ${p.label ?? "Open modal"}\n` +
          `        </Button>\n` +
          `        <Modal.Backdrop\n${attrs([["variant", p.variant]])}\n        >\n` +
          `          <Modal.Container\n${attrs([["size", p.size]])}\n          >\n` +
          `            <Modal.Dialog className="sm:max-w-[360px]">\n` +
          `              <Modal.CloseTrigger />\n` +
          `              <Modal.Header>\n` +
          `                <Modal.Icon className="bg-default text-foreground">\n` +
          `                  <HugeiconsIcon icon={Settings01Icon} className="size-5" />\n` +
          `                </Modal.Icon>\n` +
          `                <Modal.Heading>Project settings</Modal.Heading>\n` +
          `              </Modal.Header>\n` +
          `              <Modal.Body>\n` +
          `                <p>Make changes to your project. Click save when you are done.</p>\n` +
          `              </Modal.Body>\n` +
          `              <Modal.Footer>\n` +
          `                <Button slot="close" variant="tertiary">Cancel</Button>\n` +
          `                <Button slot="close" variant="primary">Save</Button>\n` +
          `              </Modal.Footer>\n` +
          `            </Modal.Dialog>\n` +
          `          </Modal.Container>\n` +
          `        </Modal.Backdrop>\n` +
          `      </Modal>`,
      };

    case "Drawer":
      return {
        hero: ["Drawer", "Button"],
        jsx:
          `<Drawer>\n` +
          `        <Button variant="secondary"\n${c.classAttr}\n${c.styleAttr}\n        >\n` +
          `          ${p.label ?? "Open drawer"}\n` +
          `        </Button>\n` +
          `        <Drawer.Backdrop\n${attrs([["variant", p.variant]])}\n        >\n` +
          `          <Drawer.Content\n${attrs([["placement", p.orientation ?? "bottom"]])}\n          >\n` +
          `            <Drawer.Dialog>\n` +
          `              <Drawer.Handle />\n` +
          `              <Drawer.Header>\n` +
          `                <Drawer.Heading>Filters</Drawer.Heading>\n` +
          `              </Drawer.Header>\n` +
          `              <Drawer.Body>Adjust filters for your search results.</Drawer.Body>\n` +
          `              <Drawer.Footer>\n` +
          `                <Button slot="close" variant="primary">Apply</Button>\n` +
          `              </Drawer.Footer>\n` +
          `              <Drawer.CloseTrigger />\n` +
          `            </Drawer.Dialog>\n` +
          `          </Drawer.Content>\n` +
          `        </Drawer.Backdrop>\n` +
          `      </Drawer>`,
      };

    case "Popover":
      return {
        hero: ["Popover", "Button"],
        jsx:
          `<Popover>\n` +
          `        <Button variant="secondary"\n${c.classAttr}\n${c.styleAttr}\n        >\n` +
          `          ${p.label ?? "Open popover"}\n` +
          `        </Button>\n` +
          `        <Popover.Content>\n` +
          `          <Popover.Arrow />\n` +
          `          <Popover.Dialog>\n` +
          `            <Popover.Heading>Dimensions</Popover.Heading>\n` +
          `            <p>Set the width and height for the layer.</p>\n` +
          `          </Popover.Dialog>\n` +
          `        </Popover.Content>\n` +
          `      </Popover>`,
      };

    case "Tooltip":
      return {
        hero: ["Tooltip", "Button"],
        jsx:
          `<Tooltip delay={0}>\n` +
          `        <Tooltip.Trigger>\n` +
          `          <Button variant="secondary"\n${c.classAttr}\n${c.styleAttr}\n          >\n` +
          `            ${p.label ?? "Hover me"}\n` +
          `          </Button>\n` +
          `        </Tooltip.Trigger>\n` +
          `        <Tooltip.Content showArrow>\n` +
          `          <Tooltip.Arrow />\n` +
          `          <p>Helpful information appears here.</p>\n` +
          `        </Tooltip.Content>\n` +
          `      </Tooltip>`,
      };

    case "Dropdown":
      return {
        hero: ["Dropdown", "Button"],
        jsx:
          `<Dropdown>\n` +
          `        <Button variant="secondary"\n${c.classAttr}\n${c.styleAttr}\n        >\n` +
          `          ${p.label ?? "Actions"}\n` +
          `        </Button>\n` +
          `        <Dropdown.Popover>\n` +
          `          <Dropdown.Menu>\n` +
          `            <Dropdown.Item id="edit" textValue="Edit">Edit</Dropdown.Item>\n` +
          `            <Dropdown.Item id="duplicate" textValue="Duplicate">Duplicate</Dropdown.Item>\n` +
          `            <Dropdown.Item id="delete" textValue="Delete" variant="danger">Delete</Dropdown.Item>\n` +
          `          </Dropdown.Menu>\n` +
          `        </Dropdown.Popover>\n` +
          `      </Dropdown>`,
      };

    case "AlertDialog":
      return {
        hero: ["AlertDialog", "Button"],
        jsx:
          `<AlertDialog>\n` +
          `        <Button variant="danger"\n${c.classAttr}\n${c.styleAttr}\n        >\n` +
          `          ${p.label ?? "Delete item"}\n` +
          `        </Button>\n` +
          `        <AlertDialog.Backdrop>\n` +
          `          <AlertDialog.Container\n${attrs([["size", p.size]])}\n          >\n` +
          `            <AlertDialog.Dialog>\n` +
          `              <AlertDialog.CloseTrigger />\n` +
          `              <AlertDialog.Header>\n` +
          `                <AlertDialog.Icon\n${attrs([["status", p.status]])}\n                />\n` +
          `                <AlertDialog.Heading>Are you sure?</AlertDialog.Heading>\n` +
          `              </AlertDialog.Header>\n` +
          `              <AlertDialog.Body>\n` +
          `                This action cannot be undone. This will permanently delete the item.\n` +
          `              </AlertDialog.Body>\n` +
          `              <AlertDialog.Footer>\n` +
          `                <Button slot="close" variant="secondary">Cancel</Button>\n` +
          `                <Button slot="close" variant="danger">Delete</Button>\n` +
          `              </AlertDialog.Footer>\n` +
          `            </AlertDialog.Dialog>\n` +
          `          </AlertDialog.Container>\n` +
          `        </AlertDialog.Backdrop>\n` +
          `      </AlertDialog>`,
      };

    case "Tabs":
      return {
        hero: ["Tabs"],
        jsx:
          `<Tabs\n${attrs([["defaultSelectedKey", "account"], ["variant", p.variant], ["orientation", p.orientation]])}\n${c.classAttr}\n${c.styleAttr}\n      >\n` +
          `        <Tabs.ListContainer>\n` +
          `          <Tabs.List>\n` +
          `            <Tabs.Tab id="account">Account</Tabs.Tab>\n` +
          `            <Tabs.Tab id="password">Password</Tabs.Tab>\n` +
          `            <Tabs.Tab id="billing">Billing</Tabs.Tab>\n` +
          `            <Tabs.Indicator />\n` +
          `          </Tabs.List>\n` +
          `        </Tabs.ListContainer>\n` +
          `        <Tabs.Panel id="account">Manage your account settings.</Tabs.Panel>\n` +
          `        <Tabs.Panel id="password">Update your password.</Tabs.Panel>\n` +
          `        <Tabs.Panel id="billing">Review billing details.</Tabs.Panel>\n` +
          `      </Tabs>`,
      };

    case "Breadcrumbs":
      return {
        hero: ["Breadcrumbs"],
        jsx:
          `<Breadcrumbs\n${c.classAttr}\n${c.styleAttr}\n      >\n` +
          `        <Breadcrumbs.Item href="#">Home</Breadcrumbs.Item>\n` +
          `        <Breadcrumbs.Item href="#">Projects</Breadcrumbs.Item>\n` +
          `        <Breadcrumbs.Item>${p.label ?? "Settings"}</Breadcrumbs.Item>\n` +
          `      </Breadcrumbs>`,
      };

    case "Pagination":
      return {
        hero: ["Pagination"],
        jsx:
          `<Pagination\n${attrs([["size", p.size]])}\n${c.classAttr}\n${c.styleAttr}\n      >\n` +
          `        <Pagination.Content>\n` +
          `          <Pagination.Item>\n` +
          `            <Pagination.Previous />\n` +
          `          </Pagination.Item>\n` +
          `          <Pagination.Item>\n` +
          `            <Pagination.Link isActive>1</Pagination.Link>\n` +
          `          </Pagination.Item>\n` +
          `          <Pagination.Item>\n` +
          `            <Pagination.Link>2</Pagination.Link>\n` +
          `          </Pagination.Item>\n` +
          `          <Pagination.Item>\n` +
          `            <Pagination.Ellipsis />\n` +
          `          </Pagination.Item>\n` +
          `          <Pagination.Item>\n` +
          `            <Pagination.Link>5</Pagination.Link>\n` +
          `          </Pagination.Item>\n` +
          `          <Pagination.Item>\n` +
          `            <Pagination.Next />\n` +
          `          </Pagination.Item>\n` +
          `        </Pagination.Content>\n` +
          `      </Pagination>`,
      };

    case "Menu":
      return {
        hero: ["Menu"],
        jsx:
          `<Menu\n${attrs([["aria-label", "Actions"]])}\n${c.classAttr}\n${c.styleAttr}\n      >\n` +
          `        <Menu.Item id="edit" textValue="Edit">${p.label ?? "Edit"}</Menu.Item>\n` +
          `        <Menu.Item id="share" textValue="Share">Share</Menu.Item>\n` +
          `        <Menu.Item id="delete" textValue="Delete" variant="${p.variant === "danger" ? "danger" : "default"}">Delete</Menu.Item>\n` +
          `      </Menu>`,
      };

    case "Toolbar":
      return {
        hero: ["Toolbar", "Button"],
        jsx:
          `<Toolbar\n${attrs([["orientation", p.orientation], ["isAttached", p.selected], ["aria-label", "Formatting"]])}\n${c.classAttr}\n${c.styleAttr}\n      >\n` +
          `        <Button variant="ghost" size="sm">Bold</Button>\n` +
          `        <Button variant="ghost" size="sm">Italic</Button>\n` +
          `        <Button variant="ghost" size="sm">Link</Button>\n` +
          `      </Toolbar>`,
      };

    case "Table":
      return {
        hero: ["Table"],
        jsx:
          `<Table\n${attrs([["aria-label", "Team members"], ["variant", p.variant]])}\n${c.classAttr}\n${c.styleAttr}\n      >\n` +
          `        <Table.ScrollContainer>\n` +
          `          <Table.Header>\n` +
          `            <Table.Column isRowHeader>Name</Table.Column>\n` +
          `            <Table.Column>Role</Table.Column>\n` +
          `            <Table.Column>Status</Table.Column>\n` +
          `          </Table.Header>\n` +
          `          <Table.Body>\n${TABLE_ROWS_JSX}\n` +
          `          </Table.Body>\n` +
          `        </Table.ScrollContainer>\n` +
          `      </Table>`,
      };

    case "Badge":
      return {
        hero: ["Badge"],
        jsx:
          `<Badge\n${attrs([["variant", p.variant], ["color", p.color], ["size", p.size]])}\n${c.classAttr}\n${c.styleAttr}\n      >\n` +
          `        <Badge.Anchor>{/* icon or avatar */}</Badge.Anchor>\n` +
          `        <Badge.Label>${p.label ?? "3"}</Badge.Label>\n` +
          `      </Badge>`,
      };

    case "ListBox":
      return {
        hero: ["ListBox"],
        jsx:
          `<ListBox\n${attrs([["aria-label", "Options"], ["selectionMode", "single"], ["defaultSelectedKeys", '["dog"]'], ["variant", p.variant]])}\n${c.classAttr}\n${c.styleAttr}\n      >\n` +
          `        <ListBox.Item id="cat" textValue="Cat">Cat</ListBox.Item>\n` +
          `        <ListBox.Item id="dog" textValue="Dog">Dog</ListBox.Item>\n` +
          `        <ListBox.Item id="bird" textValue="Bird">Bird</ListBox.Item>\n` +
          `      </ListBox>`,
      };

    case "TagGroup":
      return {
        hero: ["TagGroup", "Label", "Tag"],
        preamble: [
          `const items = [\n  { id: "design", label: "Design" },\n  { id: "react", label: "React" },\n  { id: "a11y", label: "Accessibility" },\n];`,
        ],
        jsx:
          `<TagGroup\n${attrs([["aria-label", "Tags"], ["variant", p.variant], ["size", p.size]])}\n${c.classAttr}\n${c.styleAttr}\n      >\n` +
          `        <Label>Tags</Label>\n` +
          `        <TagGroup.List items={items}>\n` +
          `          {(item) => (\n` +
          `            <Tag id={item.id} textValue={item.label}>\n` +
          `              {item.label}\n` +
          `            </Tag>\n` +
          `          )}\n` +
          `        </TagGroup.List>\n` +
          `      </TagGroup>`,
      };

    case "Meter":
      return {
        hero: ["Meter"],
        jsx:
          `<Meter\n${attrs([["value", p.value ?? 60], ["minValue", 0], ["maxValue", 100], ["color", p.color], ["size", p.size], ["aria-label", "Storage used"]])}\n${c.classAttr}\n${c.styleAttr}\n      >\n` +
          `        <Meter.Output />\n` +
          `        <Meter.Track>\n` +
          `          <Meter.Fill />\n` +
          `        </Meter.Track>\n` +
          `      </Meter>`,
      };

    case "ProgressBar":
      return {
        hero: ["ProgressBar"],
        jsx:
          `<ProgressBar\n${attrs([["value", p.value ?? 60], ["color", p.color], ["size", p.size], ["aria-label", "Upload progress"]])}\n${c.classAttr}\n${c.styleAttr}\n      >\n` +
          `        <ProgressBar.Output />\n` +
          `        <ProgressBar.Track>\n` +
          `          <ProgressBar.Fill />\n` +
          `        </ProgressBar.Track>\n` +
          `      </ProgressBar>`,
      };

    case "Typography": {
      const type = p.variant ?? "body";
      const sharedAttrs = attrs([
        ["color", p.color],
        ["align", p.align],
        ["weight", p.weight],
        ["truncate", p.truncate],
      ]);
      const sharedLines =
        (sharedAttrs ? `${sharedAttrs}\n` : "") + `${c.classAttr}\n${c.styleAttr}`;

      if (type === "prose") {
        return {
          hero: ["Typography"],
          jsx: typographyProseJsx(),
        };
      }

      if (type === "code") {
        return {
          hero: ["Typography"],
          jsx:
            `<Typography.Code\n${sharedLines}      >\n` +
            `        ${p.label ?? TYPOGRAPHY_DEMO.codeInstall}\n` +
            `      </Typography.Code>`,
        };
      }

      if (type.startsWith("h")) {
        const level = Number(type.replace("h", ""));
        return {
          hero: ["Typography"],
          jsx:
            `<Typography.Heading\n${attrs([["level", level]])}\n${sharedLines}      >\n` +
            `        ${p.label ?? TYPOGRAPHY_HEADING_LABELS[`h${level}` as keyof typeof TYPOGRAPHY_HEADING_LABELS]}\n` +
            `      </Typography.Heading>`,
        };
      }

      const paragraphAttrs = attrs([
        ["color", p.color],
        ["align", p.align],
        ["weight", p.weight],
        ["truncate", p.truncate],
        ["size", p.size === "sm" || p.size === "xs" ? p.size : undefined],
      ]);
      const truncateClass = p.truncate ? `        className="max-w-xs"\n` : "";
      const paragraphJsx =
        `<Typography.Paragraph\n${paragraphAttrs}\n${truncateClass || c.classAttr ? `${truncateClass}${c.classAttr}\n` : ""}${c.styleAttr}\n      >\n` +
        `        ${p.label ?? TYPOGRAPHY_DEMO.paragraph}\n` +
        `      </Typography.Paragraph>`;

      if (p.align) {
        return {
          hero: ["Typography"],
          jsx: `<div className="w-full max-w-md">\n        ${paragraphJsx}\n      </div>`,
        };
      }

      return {
        hero: ["Typography"],
        jsx: paragraphJsx,
      };
    }

    case "Toast": {
      const handler =
        p.status === "danger"
          ? "toast.danger"
          : p.status === "warning"
            ? "toast.warning"
            : "toast.success";
      return {
        hero: ["Toast", "Button", "toast"],
        preamble: [`import { toast } from "@heroui/react";`],
        jsx:
          `<Toast.Provider\n${attrs([["placement", p.orientation ?? "bottom"]])}\n      >\n` +
          `        <Button\n` +
          `          variant="secondary"\n` +
          `          onPress={() => ${handler}("Your changes have been saved.")}\n` +
          `        >\n` +
          `          ${p.label ?? "Show toast"}\n` +
          `        </Button>\n` +
          `      </Toast.Provider>`,
        wrapExample: (jsx: string) =>
          `  return (\n    <div\n${c.classAttr}\n${c.styleAttr}\n    >\n      ${jsx}\n    </div>\n  );`,
      };
    }

    case "EmptyState":
      return {
        hero: ["ListBox", "EmptyState"],
        icons: ["InboxIcon"],
        jsx:
          `<ListBox\n` +
          `        aria-label="Empty list"\n` +
          `        className="min-h-[180px] w-72"\n` +
          `${c.classAttr}\n` +
          `${c.styleAttr}\n` +
          `        renderEmptyState={() => (\n` +
          `          <EmptyState className="flex h-full w-full flex-col items-center justify-center gap-4 text-center">\n` +
          `            <HugeiconsIcon icon={InboxIcon} className="size-6 text-muted" />\n` +
          `            <span className="text-sm text-muted">${p.label ?? "No results found"}</span>\n` +
          `          </EmptyState>\n` +
          `        )}\n` +
          `      >\n` +
          `        {[]}\n` +
          `      </ListBox>`,
      };

    case "ScrollShadow": {
      const lorem =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam. Morbi accumsan cursus enim, sed ultricies sapien.";
      const isHorizontal = p.orientation === "horizontal";

      if (isHorizontal) {
        return {
          hero: ["Card", "ScrollShadow"],
          jsx:
            `<Card className="w-full max-w-sm overflow-hidden p-0"\n${c.classAttr}\n${c.styleAttr}\n      >\n` +
            `        <ScrollShadow className="rounded-[inherit] p-4" orientation="horizontal">\n` +
            `          <div className="flex flex-row gap-4">\n` +
            `            {Array.from({ length: 10 }).map((_, idx) => (\n` +
            `              <Card\n` +
            `                key={\`scroll-shadow-card-\${idx}\`}\n` +
            `                className="flex min-w-[200px] flex-row gap-3 p-3"\n` +
            `                variant="transparent"\n` +
            `              >\n` +
            `                <div className="aspect-square size-16 shrink-0 rounded-xl bg-default" />\n` +
            `                <div className="flex flex-1 flex-col justify-center gap-1 text-left">\n` +
            `                  <Card.Title className="text-sm">Bridging the Future</Card.Title>\n` +
            `                  <Card.Description className="text-xs">Today, 6:30 PM</Card.Description>\n` +
            `                </div>\n` +
            `              </Card>\n` +
            `            ))}\n` +
            `          </div>\n` +
            `        </ScrollShadow>\n` +
            `      </Card>`,
        };
      }

      return {
        hero: ["Card", "ScrollShadow"],
        jsx:
          `<Card className="w-full max-w-sm overflow-hidden p-0"\n${c.classAttr}\n${c.styleAttr}\n      >\n` +
          `        <ScrollShadow className="max-h-[240px] rounded-[inherit] p-4" orientation="vertical">\n` +
          `          <div className="space-y-4">\n` +
          `            {Array.from({ length: 10 }).map((_, idx) => (\n` +
          `              <p key={\`scroll-shadow-lorem-\${idx}\`} className="text-left text-sm text-muted">\n` +
          `                ${lorem}\n` +
          `              </p>\n` +
          `            ))}\n` +
          `          </div>\n` +
          `        </ScrollShadow>\n` +
          `      </Card>`,
      };
    }

    case "Accordion": {
      const motionPreamble = [
        ...ACCORDION_MOTION_PREAMBLE,
        ACCORDION_MOTION_PANEL_HELPER,
      ];
      const accordionStyle = harmanAccordionStyleLiteral(ctx.customization, ctx.visibility);

      if (p.variant === "surface") {
        return {
          hero: ["Accordion"],
          icons: ["ArrowDown01Icon"],
          preamble: [...motionPreamble, ACCORDION_SURFACE_INDICATOR_HELPER],
          jsx:
            `<Accordion\n${attrs([["variant", "surface"]])}\n        className="harman-accordion harman-accordion--surface text-left"\n        style={${accordionStyle}}\n      >\n` +
            `${accordionItemsJsx("surface")}\n` +
            `      </Accordion>`,
        };
      }
      return {
        hero: ["Accordion"],
        icons: ["Add01Icon"],
        preamble: [...motionPreamble, ACCORDION_SPLITTED_INDICATOR_HELPER],
        jsx:
          `<Accordion\n${attrs([["allowsMultipleExpanded", true]])}\n        className="harman-accordion harman-accordion--splitted text-left"\n        style={${accordionStyle}}\n      >\n` +
          `${accordionItemsJsx("splitted")}\n` +
          `      </Accordion>`,
      };
    }

    case "Disclosure":
      return {
        hero: ["Disclosure", "Button"],
        icons: ["QrCode01Icon"],
        preamble: [`import { useState } from "react";`],
        jsx: disclosureStandaloneJsx(),
        wrapExample: (jsx) =>
          `  const [isExpanded, setIsExpanded] = useState(true);\n\n` +
          `  return (\n` +
          `    <div className="w-full max-w-md text-center">\n` +
          `      ${jsx}\n` +
          `    </div>\n` +
          `  );`,
      };

    case "DisclosureGroup":
      return {
        hero: ["DisclosureGroup", "Disclosure", "Button", "Separator"],
        icons: ["QrCode01Icon", "AppleIcon"],
        preamble: [`import { useState } from "react";`, `import type { Key } from "@heroui/react";`],
        jsx: disclosureGroupJsx(),
        wrapExample: (jsx) =>
          `  const [expandedKeys, setExpandedKeys] = useState<Set<Key>>(new Set(["preview"]));\n\n` +
          `  return (\n` +
          `    <div className="w-full max-w-md">\n` +
          `      <div className="flex flex-col gap-4 bg-transparent p-4">\n` +
          `        ${jsx}\n` +
          `      </div>\n` +
          `    </div>\n` +
          `  );`,
      };

    case "Surface":
      return {
        hero: ["Surface", "Typography", "Description"],
        jsx:
          `<Surface\n${attrs([["variant", p.variant]])}\n${c.classAttr}\n${c.styleAttr}\n      >\n` +
          `        <Typography.Heading level={5}>Surface</Typography.Heading>\n` +
          `        <Description>Content grouped on a neutral surface.</Description>\n` +
          `      </Surface>`,
      };

    case "Fieldset":
      return {
        hero: ["Fieldset", "Checkbox", "Button"],
        jsx:
          `<Fieldset\n${attrs([["disabled", p.isDisabled]])}\n${c.classAttr}\n${c.styleAttr}\n      >\n` +
          `        <Fieldset.Legend>${p.label ?? "Account"}</Fieldset.Legend>\n` +
          `        <Fieldset.Group>\n` +
          `${CHECKBOX_COMPOUND("Email newsletter", ' name="newsletter" defaultSelected')}\n` +
          `${CHECKBOX_COMPOUND("Product updates", ' name="updates"')}\n` +
          `        </Fieldset.Group>\n` +
          `        <Fieldset.Actions>\n` +
          `          <Button type="submit" variant="primary" size="sm">Save</Button>\n` +
          `        </Fieldset.Actions>\n` +
          `      </Fieldset>`,
      };

    default:
      return { hero: [], jsx: "null" };
  }
}

const FAMILY_COMPONENT: Record<string, string> = {
  "close-button": "CloseButton",
  input: "TextField",
  textarea: "TextArea",
  "number-field": "NumberField",
  "search-field": "SearchField",
  "input-otp": "InputOTP",
  select: "Select",
  "combo-box": "ComboBox",
  autocomplete: "Autocomplete",
  slider: "Slider",
  "date-picker": "DatePicker",
  "date-range-picker": "DateRangePicker",
  "date-field": "DateField",
  "time-field": "TimeField",
  calendar: "Calendar",
  color: "ColorPicker",
  form: "Form",
  "form-primitives": "Label",
  modal: "Modal",
  drawer: "Drawer",
  popover: "Popover",
  tooltip: "Tooltip",
  dropdown: "Dropdown",
  "alert-dialog": "AlertDialog",
  tabs: "Tabs",
  breadcrumbs: "Breadcrumbs",
  pagination: "Pagination",
  menu: "Menu",
  toolbar: "Toolbar",
  table: "Table",
  badge: "Badge",
  "list-box": "ListBox",
  "tag-group": "TagGroup",
  meter: "Meter",
  typography: "Typography",
  toast: "Toast",
  "empty-state": "EmptyState",
  "scroll-shadow": "ScrollShadow",
  accordion: "Accordion",
  disclosure: "Disclosure",
  surface: "Surface",
  fieldset: "Fieldset",
};

export const NEW_CODE: Record<
  string,
  (component: string, item: PreviewItem, ctx: SpecCtx) => CodeBuilt
> = Object.fromEntries(
  Object.entries(FAMILY_COMPONENT).map(([familyId, defaultComponent]) => [
    familyId,
    (component: string, item: PreviewItem, ctx: SpecCtx) =>
      build(component || defaultComponent, item.props, ctx),
  ]),
);
