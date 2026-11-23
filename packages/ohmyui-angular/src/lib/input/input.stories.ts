import type { Meta, StoryObj } from '@storybook/angular';
import { LucideSearch, LucideMail, LucideEuro } from '@lucide/angular';
import { InputComponent } from './input';

const meta: Meta<InputComponent> = {
  title: 'Components/Input',
  component: InputComponent,
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'tel', 'number', 'url', 'search', 'textarea', 'select'],
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    hint: { control: 'text' },
    errorMessage: { control: 'text' },
    successMessage: { control: 'text' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    required: { control: 'boolean' },
    clearable: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<InputComponent>;

/* ── Playground ──────────────────────────────── */
export const Playground: Story = {
  args: { label: 'Nome utente', placeholder: 'mario_rossi', type: 'text' },
};

/* ── Types ───────────────────────────────────── */
export const Text: Story = {
  args: { label: 'Nome', type: 'text', placeholder: 'Il tuo nome' },
};
export const Email: Story = {
  args: { label: 'Email', type: 'email', placeholder: 'nome@esempio.it', iconLeft: LucideMail.icon },
};
export const Password: Story = {
  args: { label: 'Password', type: 'password', placeholder: 'Almeno 8 caratteri' },
};
export const Number: Story = {
  args: { label: 'Quantità', type: 'number', placeholder: '0' },
};
export const Search: Story = {
  args: { label: 'Cerca', type: 'search', placeholder: 'Cerca nel sito...', iconLeft: LucideSearch.icon, clearable: true },
};
export const Textarea: Story = {
  args: { label: 'Messaggio', type: 'textarea', placeholder: 'Scrivi qui...', rows: 4 },
};
export const Select: Story = {
  args: {
    label: 'Paese',
    type: 'select',
    selectPlaceholder: 'Seleziona un paese',
    options: [
      { label: 'Italia', value: 'it' },
      { label: 'Francia', value: 'fr' },
      { label: 'Germania', value: 'de' },
    ],
  },
};

/* ── Sizes ───────────────────────────────────── */
export const SizeSm: Story = {
  name: 'Size / SM',
  args: { label: 'Small', size: 'sm', placeholder: 'Piccolo' },
};
export const SizeMd: Story = {
  name: 'Size / MD',
  args: { label: 'Medium', size: 'md', placeholder: 'Medio' },
};
export const SizeLg: Story = {
  name: 'Size / LG',
  args: { label: 'Large', size: 'lg', placeholder: 'Grande' },
};

/* ── Validation ──────────────────────────────── */
export const WithError: Story = {
  name: 'Validation / Error',
  args: { label: 'Email', type: 'email', errorMessage: 'Inserisci un indirizzo email valido.' },
};
export const WithSuccess: Story = {
  name: 'Validation / Success',
  args: { label: 'Username', successMessage: 'Username disponibile.' },
};
export const WithHint: Story = {
  name: 'Validation / Hint',
  args: { label: 'Password', type: 'password', hint: 'Almeno 8 caratteri, una maiuscola e un numero.' },
};

/* ── Prefix / Suffix / Icons ─────────────────── */
export const WithPrefix: Story = {
  args: { label: 'Sito web', prefix: 'https://', placeholder: 'tuosito.it' },
};
export const WithSuffix: Story = {
  args: { label: 'Prezzo', type: 'number', suffix: '€', placeholder: '0.00' },
};
export const WithIconLeft: Story = {
  name: 'With icon (left)',
  args: { label: 'Prezzo', type: 'number', iconLeft: LucideEuro.icon, placeholder: '0.00' },
};
export const Clearable: Story = {
  args: { label: 'Ricerca', clearable: true, placeholder: 'Scrivi per vedere il pulsante Svuota' },
};

/* ── States ──────────────────────────────────── */
export const Disabled: Story = {
  args: { label: 'Campo disabilitato', disabled: true, placeholder: 'Non modificabile' },
};
export const Readonly: Story = {
  args: { label: 'Campo in sola lettura', readonly: true, placeholder: 'Valore fisso' },
};
export const Required: Story = {
  args: { label: 'Campo obbligatorio', required: true, placeholder: 'Compila questo campo' },
};

/* ── Accessibility ────────────────────────────── */
export const AccessibleMinZero: Story = {
  name: 'Accessibility / min=0 is respected',
  args: { label: 'Quantità minima 0', type: 'number', min: 0, max: 10 },
  parameters: {
    docs: {
      description: {
        story:
          "Bug corretto in fase di porting: l'originale calcolava l'attributo `min` con `min || null`, e in JavaScript `0 || null` vale `null` — un `min={0}` (caso comunissimo: quantità minima zero) spariva silenziosamente. Ora il controllo è `min !== '' ? min : null`, che distingue correttamente \"non impostato\" da \"impostato a zero\".",
      },
    },
  },
};
export const AccessibleErrorAnnounced: Story = {
  name: 'Accessibility / Error is announced and linked',
  args: { label: 'Email', type: 'email', errorMessage: 'Formato email non valido.' },
  parameters: {
    docs: {
      description: {
        story:
          'Il campo riceve `aria-invalid="true"` e `aria-describedby` collegato al messaggio di errore (con `role="alert"`) — lo screen reader annuncia sia l\'invalidità sia il motivo. La stessa associazione ora funziona anche sul `<select>`, che nell\'originale non aveva `aria-describedby` collegato all\'hint.',
      },
    },
  },
};
export const AccessiblePasswordToggle: Story = {
  name: 'Accessibility / Password visibility has a real label',
  args: { label: 'Password', type: 'password', placeholder: 'Digita la password per testare il toggle' },
  parameters: {
    docs: {
      description: {
        story:
          'Il pulsante per mostrare/nascondere la password ha un `aria-label` che cambia in base allo stato corrente ("Mostra password" / "Nascondi password") — non un\'icona muta, uno screen reader sa sempre cosa succederà al click.',
      },
    },
  },
};
