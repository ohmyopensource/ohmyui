# OhMyUI Modal — Angular

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
import { ModalComponent } from '@ohmyopensource/angular';

@Component({
  standalone: true,
  imports: [ModalComponent],
  template: `
    <ohmyui-button label="Open" (clicked)="isOpen = true" />

    <ohmyui-modal
      [open]="isOpen"
      title="Hello"
      confirmLabel="OK"
      (closed)="isOpen = false"
    >
      <div slot="body">
        <p>This is the modal content.</p>
      </div>
    </ohmyui-modal>
  `,
})
export class MyComponent {
  isOpen = false;
}
```

## API

| Input            | Type                                          | Default    | Description                                          |
| ---------------- | --------------------------------------------- | ---------- | ---------------------------------------------------- |
| `open`           | `boolean`                                     | `false`    | Controls visibility                                  |
| `title`          | `string`                                      | `''`       | Header title (optional)                              |
| `size`           | `sm` `md` `lg` `xl` `fullscreen`              | `md`       | Panel width                                          |
| `position`       | `center` `top` `bottom` `left` `right`        | `center`   | Where the panel appears                              |
| `closable`       | `boolean`                                     | `true`     | Shows the × button                                   |
| `closeOnOverlay` | `boolean`                                     | `true`     | Click outside closes the modal                       |
| `closeOnEsc`     | `boolean`                                     | `true`     | ESC key closes the modal                             |
| `confirmLabel`   | `string`                                      | `''`       | If set, shows a predefined footer with Cancel + this |
| `cancelLabel`    | `string`                                      | `'Cancel'` | Label for the cancel button in predefined footer     |
| `confirmVariant` | `primary` `confirm` `danger` `warning` `info` | `primary`  | Variant for the confirm button                       |

| Output      | Type                 | Description                            |
| ----------- | -------------------- | -------------------------------------- |
| `closed`    | `EventEmitter<void>` | Emitted when the modal closes          |
| `confirmed` | `EventEmitter<void>` | Emitted when confirm button is clicked |

## Slots

| Slot      | Description                                        |
| --------- | -------------------------------------------------- |
| `body`    | Main content area                                  |
| `actions` | Custom footer buttons (replaces predefined footer) |

## Examples

```html
<!-- Info modal — predefined footer -->
<ohmyui-modal
  [open]="isOpen"
  title="Success"
  size="sm"
  confirmLabel="Got it"
  confirmVariant="primary"
  (closed)="isOpen = false"
>
  <div slot="body">
    <p>Your changes have been saved.</p>
  </div>
</ohmyui-modal>

<!-- Delete confirmation -->
<ohmyui-modal
  [open]="isOpen"
  title="Delete item"
  size="sm"
  confirmLabel="Delete"
  cancelLabel="Cancel"
  confirmVariant="danger"
  (closed)="isOpen = false"
  (confirmed)="onDelete()"
>
  <div slot="body">
    <p>This action cannot be undone.</p>
  </div>
</ohmyui-modal>

<!-- Custom actions via slot -->
<ohmyui-modal
  [open]="isOpen"
  title="New user"
  size="lg"
  (closed)="isOpen = false"
>
  <div slot="body">
    <!-- form fields -->
  </div>
  <div slot="actions">
    <ohmyui-button variant="cancel" label="Cancel" (clicked)="isOpen = false" />
    <ohmyui-button
      variant="confirm"
      label="Create user"
      (clicked)="onCreate()"
    />
  </div>
</ohmyui-modal>

<!-- Bottom sheet (mobile) -->
<ohmyui-modal
  [open]="isOpen"
  title="Actions"
  position="bottom"
  confirmLabel="Confirm"
  (closed)="isOpen = false"
>
  <div slot="body"><p>Choose an action.</p></div>
</ohmyui-modal>

<!-- Right drawer -->
<ohmyui-modal
  [open]="isOpen"
  title="Details"
  size="sm"
  position="right"
  (closed)="isOpen = false"
>
  <div slot="body"><p>Detail panel content.</p></div>
</ohmyui-modal>

<!-- Required action — cannot be dismissed -->
<ohmyui-modal
  [open]="isOpen"
  title="Terms of service"
  [closable]="false"
  [closeOnOverlay]="false"
  [closeOnEsc]="false"
  confirmLabel="Accept"
  cancelLabel="Decline"
  (confirmed)="onAccept()"
  (closed)="onDecline()"
>
  <div slot="body"><p>Please read and accept the terms.</p></div>
</ohmyui-modal>
```

## Dark mode

Automatic via `@media (prefers-color-scheme: dark)` — no extra configuration needed.
