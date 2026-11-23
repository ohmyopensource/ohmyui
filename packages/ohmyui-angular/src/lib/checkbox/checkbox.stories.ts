import type { Meta, StoryObj } from '@storybook/angular';
import { CheckboxComponent } from './checkbox';

const meta: Meta<CheckboxComponent> = {
  title: 'Components/Checkbox',
  component: CheckboxComponent,
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'success',
        'warning',
        'error',
        'info',
        'neutral',
      ],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    labelPosition: { control: 'select', options: ['left', 'right'] },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
    errorMessage: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<CheckboxComponent>;

/* ── Playground ──────────────────────────────── */
export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    label: 'Accetto i termini di servizio',
    checked: true,
  },
};

/* ── Variants ────────────────────────────────── */
export const Primary: Story = {
  args: { variant: 'primary', label: 'Primary', checked: true },
};
export const Secondary: Story = {
  args: { variant: 'secondary', label: 'Secondary', checked: true },
};
export const Tertiary: Story = {
  args: { variant: 'tertiary', label: 'Tertiary', checked: true },
};
export const Success: Story = {
  args: { variant: 'success', label: 'Success', checked: true },
};
export const Warning: Story = {
  args: { variant: 'warning', label: 'Warning', checked: true },
};
export const Error: Story = {
  args: { variant: 'error', label: 'Error', checked: true },
};
export const Info: Story = {
  args: { variant: 'info', label: 'Info', checked: true },
};
export const Neutral: Story = {
  args: { variant: 'neutral', label: 'Neutral', checked: true },
};

/* ── Sizes ───────────────────────────────────── */
export const SizeXs: Story = {
  name: 'Size / XS',
  args: { variant: 'primary', size: 'xs', label: 'Extra small', checked: true },
};
export const SizeSm: Story = {
  name: 'Size / SM',
  args: { variant: 'primary', size: 'sm', label: 'Small', checked: true },
};
export const SizeMd: Story = {
  name: 'Size / MD',
  args: { variant: 'primary', size: 'md', label: 'Medium', checked: true },
};
export const SizeLg: Story = {
  name: 'Size / LG',
  args: { variant: 'primary', size: 'lg', label: 'Large', checked: true },
};

/* ── States ──────────────────────────────────── */
export const Unchecked: Story = {
  args: { variant: 'primary', label: 'Non selezionato' },
};
export const Indeterminate: Story = {
  args: { variant: 'primary', label: 'Seleziona tutto', indeterminate: true },
};
export const Disabled: Story = {
  args: { variant: 'primary', label: 'Disabilitato', disabled: true },
};
export const DisabledChecked: Story = {
  name: 'Disabled (checked)',
  args: {
    variant: 'primary',
    label: 'Disabilitato e selezionato',
    disabled: true,
    checked: true,
  },
};
export const WithDescription: Story = {
  name: 'With description',
  args: {
    variant: 'primary',
    label: 'Notifiche email',
    description: 'Ricevi un riepilogo settimanale via email.',
  },
};
export const WithError: Story = {
  name: 'With error',
  args: {
    variant: 'primary',
    label: 'Accetto i termini',
    error: true,
    errorMessage: 'Devi accettare i termini per continuare.',
    required: true,
  },
};
export const LabelLeft: Story = {
  name: 'Label position / Left',
  args: {
    variant: 'primary',
    label: 'Etichetta a sinistra',
    labelPosition: 'left',
    checked: true,
  },
};

/* ── Accessibility ────────────────────────────── */
export const AccessibleRequired: Story = {
  name: 'Accessibility / Required field',
  args: { variant: 'primary', label: 'Accetto i termini', required: true },
  parameters: {
    docs: {
      description: {
        story:
          "L'attributo `required` viene passato al vero `<input>` nativo (non solo mostrato visivamente con l'asterisco): la validazione del form la gestisce il browser, non serve reimplementarla.",
      },
    },
  },
};
export const AccessibleError: Story = {
  name: 'Accessibility / Error announces via aria-invalid',
  args: {
    variant: 'primary',
    label: 'Accetto i termini',
    error: true,
    errorMessage: 'Campo obbligatorio.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Quando `error` è true, il campo riceve `aria-invalid="true"` e viene collegato al messaggio di errore tramite `aria-describedby` (con `role="alert"` sul messaggio) — uno screen reader annuncia sia l\'invalidità sia il motivo, non solo un cambio di colore del bordo.',
      },
    },
  },
};
export const AccessibleIndeterminate: Story = {
  name: 'Accessibility / Indeterminate is not a form value',
  args: { variant: 'primary', label: 'Seleziona tutto', indeterminate: true },
  parameters: {
    docs: {
      description: {
        story:
          '`indeterminate` è puramente visivo (proprietà DOM, non attributo HTML, sincronizzata via ViewChild): non esiste un "terzo stato" nel valore inviato dal form — resta sempre `checked` true/false. Interagire con la checkbox (click o tastiera) risolve sempre lo stato indeterminate, comportamento nativo dei browser.',
      },
    },
  },
};
