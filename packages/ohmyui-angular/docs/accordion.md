# OhMyUI Accordion — Angular

## Installation

```bash
npm install @ohmyopensource/angular
```

Load fonts and tokens in your `index.html`:

```html
<link
  rel="stylesheet"
  href="node_modules/@ohmyopensource/tokens/build/css/fonts/fonts.css"
/>
<link
  rel="stylesheet"
  href="node_modules/@ohmyopensource/tokens/build/css/variables.css"
/>
```

## Basic usage

```typescript
import { AccordionComponent, AccordionItem } from '@ohmyopensource/angular';

@Component({
  standalone: true,
  imports: [AccordionComponent],
  template: ` <ohmyui-accordion [items]="items" variant="bordered" /> `,
})
export class MyComponent {
  items: AccordionItem[] = [
    { id: '1', title: 'What is this?', content: 'A great UI library.' },
    { id: '2', title: 'Is it free?', content: 'Yes, MIT license.' },
  ];
}
```

## API

| Input         | Type                                  | Default   | Description                              |
| ------------- | ------------------------------------- | --------- | ---------------------------------------- |
| `items`       | `AccordionItem[]`                     | `[]`      | List of accordion items                  |
| `variant`     | `default` `bordered` `filled` `ghost` | `default` | Visual style                             |
| `size`        | `sm` `md` `lg`                        | `md`      | Size of trigger and content              |
| `multi`       | `boolean`                             | `false`   | Allow multiple items open simultaneously |
| `defaultOpen` | `string[]`                            | `[]`      | IDs of items open on first render        |

### AccordionItem interface

| Property       | Type           | Required | Description                       |
| -------------- | -------------- | -------- | --------------------------------- |
| `id`           | `string`       | ✓        | Unique identifier                 |
| `title`        | `string`       | ✓        | Header label                      |
| `content`      | `string`       | ✓        | Body text                         |
| `disabled`     | `boolean`      |          | Prevents interaction on this item |
| `badge`        | `string`       |          | Badge label shown in the header   |
| `badgeVariant` | `BadgeVariant` |          | Color variant for the badge       |

## Examples

```html
<!-- Single open, bordered -->
<ohmyui-accordion
  [items]="faqItems"
  variant="bordered"
  size="md"
  [multi]="false"
  [defaultOpen]="['1']"
/>

<!-- Multi open, filled -->
<ohmyui-accordion
  [items]="faqItems"
  variant="filled"
  [multi]="true"
  [defaultOpen]="['1', '2']"
/>

<!-- With badges -->
<ohmyui-accordion
  [items]="[
    { id: '1', title: 'Installation', content: 'Run npm install...', badge: 'New', badgeVariant: 'primary' },
    { id: '2', title: 'Config',       content: 'Add the tokens...',  badge: 'Required', badgeVariant: 'warning' }
  ]"
  variant="bordered"
/>

<!-- With a disabled item -->
<ohmyui-accordion
  [items]="[
    { id: '1', title: 'Available',    content: 'This works fine.' },
    { id: '2', title: 'Coming soon',  content: 'Not yet.',  disabled: true },
  ]"
  variant="default"
/>

<!-- Ghost, large, multi -->
<ohmyui-accordion [items]="items" variant="ghost" size="lg" [multi]="true" />
```

## Dark mode

Automatic via `@media (prefers-color-scheme: dark)` — no extra configuration needed.
