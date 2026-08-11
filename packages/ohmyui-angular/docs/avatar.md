# OhMyUI Avatar — Angular

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
import { AvatarComponent } from '@ohmyopensource/angular';

@Component({
  standalone: true,
  imports: [AvatarComponent],
  template: `
    <ohmyui-avatar
      src="https://example.com/photo.jpg"
      alt="John Doe"
      size="md"
      shape="circle"
    />
  `,
})
export class MyComponent {}
```

## API

| Input    | Type                                                                  | Default   | Description                                     |
| -------- | --------------------------------------------------------------------- | --------- | ----------------------------------------------- |
| `src`    | `string`                                                              | —         | Image URL. Falls back to initials, then icon    |
| `alt`    | `string`                                                              | `''`      | Alt text for the image                          |
| `name`   | `string`                                                              | `''`      | Full name — used for initials and fallback      |
| `size`   | `xs` `sm` `md` `lg` `xl`                                              | `md`      | Avatar size                                     |
| `shape`  | `circle` `square`                                                     | `circle`  | Border radius style                             |
| `color`  | `primary` `teal` `success` `warning` `error` `neutral`                | `primary` | Background color for initials and icon variants |
| `ring`   | `none` `primary` `teal` `success` `warning` `error` `neutral` `white` | `none`    | Outer ring color                                |
| `status` | `none` `online` `offline` `busy`                                      | `none`    | Status dot shown at bottom-right                |

## Content resolution

The avatar resolves its content automatically in this order:

1. **Image** — if `src` is provided and loads successfully
2. **Initials** — if `src` fails or is absent but `name` is provided
3. **Icon** — fallback when neither image nor name is available

## Examples

```html
<!-- Image with online status -->
<ohmyui-avatar
  src="https://example.com/photo.jpg"
  alt="John Doe"
  size="md"
  status="online"
/>

<!-- Initials with color and ring -->
<ohmyui-avatar name="John Doe" size="lg" color="teal" ring="teal" />

<!-- Square shape with busy status -->
<ohmyui-avatar
  src="https://example.com/photo.jpg"
  size="lg"
  shape="square"
  status="busy"
/>

<!-- Ring + status combined -->
<ohmyui-avatar
  src="https://example.com/photo.jpg"
  size="xl"
  ring="primary"
  status="online"
/>

<!-- Icon fallback with warning color -->
<ohmyui-avatar size="md" color="warning" />

<!-- Broken image → falls back to initials -->
<ohmyui-avatar
  src="https://broken.invalid/img.jpg"
  name="John Doe"
  size="md"
  color="neutral"
/>
```

## Dark mode

Automatic via `@media (prefers-color-scheme: dark)` — no extra configuration needed.
