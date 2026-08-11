# OhMyUI Button — Angular

## Installazione

```bash
npm install @ohmyopensource/angular
```

Carica i font e i token CSS nel tuo `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link
  href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Quicksand:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
<link
  rel="stylesheet"
  href="node_modules/@ohmyopensource/tokens/build/css/variables.css"
/>
```

## Utilizzo base

```typescript
import { ButtonComponent } from '@ohmyopensource/angular';

@Component({
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <ohmyui-button
      variant="primary"
      size="md"
      radius="md"
      label="Salva"
      (clicked)="onSave($event)"
    />
  `,
})
export class MyComponent {
  onSave(event: MouseEvent) {
    console.log('clicked', event);
  }
}
```

## API

| Input       | Tipo                                                                              | Default   | Descrizione                      |
| ----------- | --------------------------------------------------------------------------------- | --------- | -------------------------------- |
| `variant`   | `primary` `secondary` `ghost` `confirm` `warning` `danger` `info` `cancel` `link` | `primary` | Stile visivo del bottone         |
| `size`      | `xs` `sm` `md` `lg` `xl` `2xl`                                                    | `md`      | Dimensione                       |
| `radius`    | `none` `sm` `md` `lg` `full`                                                      | `md`      | Arrotondamento angoli            |
| `label`     | `string`                                                                          | `''`      | Testo del bottone                |
| `disabled`  | `boolean`                                                                         | `false`   | Disabilita il bottone            |
| `loading`   | `boolean`                                                                         | `false`   | Mostra spinner, disabilita click |
| `fullWidth` | `boolean`                                                                         | `false`   | Espande a tutta larghezza        |
| `type`      | `button` `submit` `reset`                                                         | `button`  | Attributo type nativo            |

| Output    | Tipo                       | Descrizione                                      |
| --------- | -------------------------- | ------------------------------------------------ |
| `clicked` | `EventEmitter<MouseEvent>` | Emesso al click (non emesso se disabled/loading) |

## Esempi scenari comuni

```html
<!-- Form submit -->
<ohmyui-button
  variant="confirm"
  size="lg"
  type="submit"
  label="Conferma ordine"
/>

<!-- Dialog actions -->
<ohmyui-button variant="cancel" size="md" label="Annulla" (clicked)="close()" />
<ohmyui-button
  variant="danger"
  size="md"
  label="Elimina"
  (clicked)="delete()"
/>

<!-- Stato loading -->
<ohmyui-button
  variant="primary"
  [loading]="isSaving"
  [label]="isSaving ? 'Salvataggio...' : 'Salva'"
  (clicked)="save()"
/>

<!-- Pill shape -->
<ohmyui-button variant="info" size="sm" radius="full" label="Novità" />

<!-- Full width su mobile -->
<ohmyui-button
  variant="primary"
  size="lg"
  [fullWidth]="isMobile"
  label="Continua"
/>
```

## Dark mode

Il dark mode è automatico via `@media (prefers-color-scheme: dark)`.
Non serve nessuna configurazione aggiuntiva — i token CSS si adattano da soli.

Se vuoi forzare il tema invece di usare quello di sistema, wrappa i tuoi componenti con una classe e overrida le CSS variables in quella classe (supporto classe `[data-theme]` in arrivo).
