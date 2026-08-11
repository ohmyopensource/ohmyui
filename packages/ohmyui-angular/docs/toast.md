# OhMyUI Toast — Angular

## Installation

```bash
npm install @ohmyopensource/angular
```

## Setup — one time only

Add the container **once** in your root component template:

```html
<!-- app.component.html -->
<router-outlet />
<ohmyui-toast-container />
```

```typescript
// app.component.ts
import { ToastContainerComponent } from '@ohmyopensource/angular';

@Component({
  standalone: true,
  imports: [ToastContainerComponent],
})
export class AppComponent {}
```

## Basic usage

Inject `ToastService` anywhere and call the methods:

```typescript
import { ToastService } from '@ohmyopensource/angular';

@Component({ ... })
export class MyComponent {
  private toast = inject(ToastService);

  save(): void {
    this.toast.success('Saved!', 'Your changes have been saved.');
  }

  delete(): void {
    this.toast.error('Error', 'Something went wrong. Please try again.');
  }
}
```

## API — ToastService

### Methods

| Method                                | Description              |
| ------------------------------------- | ------------------------ |
| `success(title?, message?, options?)` | Green success toast      |
| `error(title?, message?, options?)`   | Red error toast          |
| `warning(title?, message?, options?)` | Amber warning toast      |
| `info(title?, message?, options?)`    | Teal info toast          |
| `neutral(title?, message?, options?)` | Grey neutral toast       |
| `dismiss(id: string)`                 | Dismiss a specific toast |
| `dismissAll()`                        | Dismiss all toasts       |
| `configure({ duration?, position? })` | Set global defaults      |

### ToastOptions

| Option     | Type            | Default       | Description                          |
| ---------- | --------------- | ------------- | ------------------------------------ |
| `title`    | `string`        | —             | Bold header text                     |
| `message`  | `string`        | —             | Body text                            |
| `duration` | `number` (ms)   | `4000`        | Auto-dismiss delay. `0` = persistent |
| `position` | `ToastPosition` | `'top-right'` | Where the toast appears              |
| `closable` | `boolean`       | `true`        | Shows the × button                   |

### ToastPosition values

`top-right` `top-left` `top-center` `bottom-right` `bottom-left` `bottom-center`

## Examples

```typescript
// Title only
this.toast.success('Profile updated!');

// Message only
this.toast.info(undefined, 'Your session will expire in 5 minutes.');

// Full
this.toast.warning('Low storage', 'You are running out of disk space.', {
  duration: 6000,
  position: 'bottom-right',
});

// Persistent — must be dismissed manually
const id = this.toast.neutral('Uploading...', 'Please wait.', { duration: 0 });
// later...
this.toast.dismiss(id);

// Not closable — auto-dismiss only
this.toast.error('Session expired', 'You will be redirected.', {
  closable: false,
  duration: 3000,
});

// Change global defaults
this.toast.configure({ duration: 5000, position: 'bottom-center' });
```

## Dark mode

Automatic via `@media (prefers-color-scheme: dark)` — no extra configuration needed.
