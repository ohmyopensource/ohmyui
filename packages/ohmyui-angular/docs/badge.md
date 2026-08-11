# OhMyUI Badge — Angular

## Installazione

```bash
npm install @ohmyopensource/angular
```

Carica font e token nel tuo `index.html`:

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

## Utilizzo base

```typescript
import { BadgeComponent } from '@ohmyopensource/angular';

@Component({
  standalone: true,
  imports: [BadgeComponent],
  template: ` <ohmyui-badge variant="success" size="md" label="Completato" /> `,
})
export class MyComponent {}
```

## API

| Input     | Tipo                                                                                                                                                                 | Default   | Descrizione             |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------------------- |
| `variant` | `neutral` `primary` `success` `warning` `error` `info` `teal` `outline-neutral` `outline-primary` `outline-success` `outline-warning` `outline-error` `outline-info` | `neutral` | Stile visivo            |
| `size`    | `xs` `sm` `md` `lg`                                                                                                                                                  | `md`      | Dimensione              |
| `shape`   | `pill` `rounded` `square`                                                                                                                                            | `pill`    | Forma degli angoli      |
| `label`   | `string`                                                                                                                                                             | `''`      | Testo del badge         |
| `dot`     | `boolean`                                                                                                                                                            | `false`   | Mostra pallino colorato |

## Esempi scenari comuni

```html
<!-- Stato ordine -->
<ohmyui-badge variant="success" label="Consegnato" />
<ohmyui-badge variant="warning" label="In attesa" />
<ohmyui-badge variant="error" label="Annullato" />

<!-- Con pallino di stato -->
<ohmyui-badge variant="success" label="Online" [dot]="true" />
<ohmyui-badge variant="neutral" label="Assente" [dot]="true" />
<ohmyui-badge variant="error" label="Offline" [dot]="true" />

<!-- Outline per contesti più discreti -->
<ohmyui-badge variant="outline-primary" label="Beta" size="sm" />
<ohmyui-badge variant="outline-neutral" label="Draft" size="sm" />

<!-- Shape square per tag tecnici -->
<ohmyui-badge variant="teal" shape="square" label="v2.4.1" size="sm" />
<ohmyui-badge variant="neutral" shape="square" label="GET" size="xs" />
<ohmyui-badge variant="success" shape="square" label="POST" size="xs" />

<!-- Combinazioni size + shape -->
<ohmyui-badge variant="primary" size="lg" shape="rounded" label="Novità" />
<ohmyui-badge variant="info" size="xs" shape="pill" label="Info" />
```

## Dark mode

Automatico via `@media (prefers-color-scheme: dark)` — nessuna configurazione necessaria.
