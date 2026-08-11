# OhMyUI Image — Angular

## Installation

```bash
npm install @ohmyopensource/angular
```

## Basic usage

```typescript
import { ImageComponent } from '@ohmyopensource/angular';

@Component({
  standalone: true,
  imports: [ImageComponent],
  template: `
    <ohmyui-image
      src="https://example.com/photo.jpg"
      alt="A beautiful landscape"
      variant="shadow-md"
      shape="rounded"
      ratio="16/9"
    />
  `,
})
export class MyComponent {}
```

## API

| Input         | Type                                               | Default   | Description                                            |
| ------------- | -------------------------------------------------- | --------- | ------------------------------------------------------ |
| `src`         | `string`                                           | `''`      | Image URL. Empty or broken → shows placeholder         |
| `alt`         | `string`                                           | `''`      | Alt text — required for accessibility and SEO          |
| `description` | `string`                                           | `''`      | Long description for screen readers (aria-describedby) |
| `caption`     | `string`                                           | `''`      | Visible caption below the image (`<figcaption>`)       |
| `variant`     | `flat` `bordered` `shadow` `shadow-md` `shadow-lg` | `flat`    | Visual style                                           |
| `shape`       | `square` `rounded` `circle`                        | `rounded` | Border radius                                          |
| `ratio`       | `1/1` `4/3` `16/9` `3/4` `auto`                    | `16/9`    | Aspect ratio                                           |
| `fit`         | `cover` `contain`                                  | `cover`   | CSS object-fit strategy                                |
| `lazy`        | `boolean`                                          | `true`    | Native lazy loading (`loading="lazy"`)                 |
| `width`       | `string`                                           | `''`      | Width hint for the browser (e.g. `'800'`)              |
| `height`      | `string`                                           | `''`      | Height hint for the browser                            |

## States

The component manages three states automatically:

- **loading** — while the image is fetching, shows a spinning loader icon
- **loaded** — image rendered successfully, fades in with a smooth transition
- **error** — image failed or `src` is empty, shows a neutral placeholder

## Examples

```html
<!-- Basic -->
<ohmyui-image
  src="/hero.jpg"
  alt="Hero image"
  ratio="16/9"
  variant="shadow-md"
/>

<!-- Circle avatar-style -->
<ohmyui-image
  src="/avatar.jpg"
  alt="John Doe"
  shape="circle"
  ratio="1/1"
  variant="bordered"
/>

<!-- With caption and long description for SEO -->
<ohmyui-image
  src="/mountain.jpg"
  alt="Mountain at sunset"
  description="Wide-angle photo of snow-capped peaks during golden hour with warm orange hues."
  caption="Photo by John Doe — CC BY 4.0"
  variant="shadow-lg"
  shape="rounded"
  ratio="16/9"
/>

<!-- Contain fit — useful for logos or product images -->
<ohmyui-image
  src="/logo.png"
  alt="Company logo"
  fit="contain"
  ratio="4/3"
  variant="bordered"
/>

<!-- Eager load for above-the-fold images -->
<ohmyui-image src="/hero.jpg" alt="Hero" ratio="16/9" [lazy]="false" />
```

## SEO & Accessibility

- `alt` is always rendered on the `<img>` tag — never omit it
- `description` creates a visually hidden `<span>` linked via `aria-describedby` — use it for complex images
- `caption` renders as a semantic `<figcaption>` inside a `<figure>`
- `loading="lazy"` is set by default — disable only for above-the-fold images
- `decoding="async"` is always set for better rendering performance
- Error state renders with `role="img"` and `aria-label` so screen readers still get context

## Dark mode

Automatic via `@media (prefers-color-scheme: dark)` — no extra configuration needed.
