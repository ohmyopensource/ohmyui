# OhMyUI Select — Angular

## Installation

```bash
npm install @ohmyopensource/angular
```

## Basic usage

```typescript
import { SelectComponent } from '@ohmyopensource/angular';
import type { SelectOption } from '@ohmyopensource/angular';

@Component({
  standalone: true,
  imports: [SelectComponent],
  template: `
    <ohmyui-select
      [options]="options"
      label="Favourite fruit"
      placeholder="Select a fruit"
      [(value)]="selected"
    />
  `,
})
export class MyComponent {
  selected = '';

  options: SelectOption[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
  ];
}
```

## API

| Input         | Type                        | Default              | Description                             |
| ------------- | --------------------------- | -------------------- | --------------------------------------- |
| `options`     | `SelectOption[]`            | `[]`                 | List of options                         |
| `value`       | `string \| string[]`        | `''`                 | Selected value(s)                       |
| `placeholder` | `string`                    | `'Select an option'` | Placeholder when nothing is selected    |
| `label`       | `string`                    | `''`                 | Label above the select                  |
| `hint`        | `string`                    | `''`                 | Helper text below (styled by status)    |
| `variant`     | `default` `filled` `ghost`  | `default`            | Visual style                            |
| `size`        | `xs` `sm` `md` `lg` `xl`    | `md`                 | Size                                    |
| `status`      | `default` `error` `success` | `default`            | Validation state                        |
| `disabled`    | `boolean`                   | `false`              | Disables the select                     |
| `loading`     | `boolean`                   | `false`              | Shows spinner, blocks interaction       |
| `clearable`   | `boolean`                   | `false`              | Shows × button to clear selection       |
| `searchable`  | `boolean`                   | `false`              | Adds a search input inside the dropdown |
| `multiple`    | `boolean`                   | `false`              | Allows multiple selection               |
| `maxHeight`   | `number`                    | `260`                | Max dropdown height in px               |

| Output         | Type                                           | Description                     |
| -------------- | ---------------------------------------------- | ------------------------------- |
| `valueChange`  | `EventEmitter<string \| string[]>`             | Emitted on selection change     |
| `selectChange` | `EventEmitter<SelectOption \| SelectOption[]>` | Emitted with full option object |

### SelectOption interface

| Property   | Type      | Required | Description                    |
| ---------- | --------- | -------- | ------------------------------ |
| `value`    | `string`  | ✓        | Unique identifier              |
| `label`    | `string`  | ✓        | Display text                   |
| `disabled` | `boolean` |          | Prevents selection             |
| `group`    | `string`  |          | Groups options under a heading |

## Examples

```html
<!-- With validation -->
<ohmyui-select
  [options]="countries"
  label="Country"
  hint="Please select your country."
  status="error"
/>

<!-- Clearable + searchable -->
<ohmyui-select
  [options]="fruits"
  label="Fruit"
  [clearable]="true"
  [searchable]="true"
  [(value)]="selected"
/>

<!-- Multiple selection -->
<ohmyui-select
  [options]="tags"
  label="Tags"
  [multiple]="true"
  [clearable]="true"
  [(value)]="selectedTags"
/>

<!-- Grouped options -->
<ohmyui-select
  [options]="groupedOptions"
  label="Technology"
  [searchable]="true"
/>
<!-- where groupedOptions has items like: { value: 'react', label: 'React', group: 'Frontend' } -->

<!-- Loading state while fetching options -->
<ohmyui-select [options]="[]" label="Users" [loading]="isLoading" />

<!-- Filled variant, large size -->
<ohmyui-select
  [options]="options"
  variant="filled"
  size="lg"
  label="Category"
/>
```

## Dark mode

Automatic via `@media (prefers-color-scheme: dark)` — no extra configuration needed.
