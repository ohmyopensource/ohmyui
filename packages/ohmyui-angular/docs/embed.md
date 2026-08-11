# OhMyUI Embed — Angular

## Installation

```bash
npm install @ohmyopensource/angular
```

## Basic usage

```typescript
import { EmbedComponent } from '@ohmyopensource/angular';

@Component({
  standalone: true,
  imports: [EmbedComponent],
  template: `
    <ohmyui-embed
      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
      title="My video"
      variant="shadow-md"
      ratio="16/9"
    />
  `,
})
export class MyComponent {}
```

## API

| Input             | Type                                               | Default                               | Description                                    |
| ----------------- | -------------------------------------------------- | ------------------------------------- | ---------------------------------------------- |
| `src`             | `string`                                           | `''`                                  | URL to embed                                   |
| `title`           | `string`                                           | `''`                                  | Accessible title — required for screen readers |
| `variant`         | `flat` `bordered` `shadow` `shadow-md` `shadow-lg` | `bordered`                            | Visual style                                   |
| `shape`           | `square` `rounded`                                 | `rounded`                             | Border radius                                  |
| `ratio`           | `1/1` `4/3` `16/9` `3/4` `auto`                    | `16/9`                                | Aspect ratio                                   |
| `sandbox`         | `strict` `safe` `forms` `popups` `full` `none`     | `safe`                                | Security level (see below)                     |
| `allowCamera`     | `boolean`                                          | `false`                               | Allow camera access                            |
| `allowMicrophone` | `boolean`                                          | `false`                               | Allow microphone access                        |
| `allowFullscreen` | `boolean`                                          | `true`                                | Allow fullscreen                               |
| `allowAutoplay`   | `boolean`                                          | `false`                               | Allow autoplay                                 |
| `height`          | `number`                                           | `0`                                   | Fixed height in px (overrides ratio when set)  |
| `errorMessage`    | `string`                                           | `'This content could not be loaded.'` | Custom error message                           |

## Sandbox levels

| Level    | What it allows                                        |
| -------- | ----------------------------------------------------- |
| `strict` | Nothing — most restrictive                            |
| `safe`   | Same-origin + scripts (default — good for most cases) |
| `forms`  | Safe + form submission                                |
| `popups` | Safe + popups                                         |
| `full`   | Everything — use only with fully trusted sources      |
| `none`   | No sandbox attribute — maximum trust                  |

## Examples

```html
<!-- YouTube video -->
<ohmyui-embed
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="Product demo video"
  variant="shadow-md"
  ratio="16/9"
  [allowFullscreen]="true"
/>

<!-- OpenStreetMap -->
<ohmyui-embed
  src="https://www.openstreetmap.org/export/embed.html?bbox=9.1,45.4,9.3,45.6&layer=mapnik"
  title="Office location on map"
  variant="bordered"
  ratio="4/3"
  sandbox="safe"
/>

<!-- Fixed height instead of ratio -->
<ohmyui-embed
  src="https://codesandbox.io/embed/new"
  title="Code playground"
  variant="shadow-lg"
  ratio="auto"
  [height]="500"
  sandbox="full"
/>

<!-- Custom error message -->
<ohmyui-embed
  src="https://example.com/embed"
  title="External content"
  errorMessage="This content is not available in your region."
/>
```

## Security notes

- Always set `title` — screen readers use it to describe the embedded content
- Default sandbox is `safe` — it blocks forms, popups, and top-navigation by default
- Use `sandbox="none"` only for content you fully control (same domain)
- `referrerpolicy="strict-origin-when-cross-origin"` is always set automatically
- Many sites block embedding via `X-Frame-Options` or `Content-Security-Policy` — in that case the error state will show

## Dark mode

Automatic via `@media (prefers-color-scheme: dark)` — no extra configuration needed.
