import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CheckboxGroupComponent } from './checkbox-group';
import { CheckboxComponent } from './checkbox';

const meta: Meta<CheckboxGroupComponent> = {
  title: 'Components/CheckboxGroup',
  component: CheckboxGroupComponent,
  decorators: [
    moduleMetadata({
      imports: [CheckboxComponent],
    }),
  ],
  argTypes: {
    orientation: { control: 'select', options: ['vertical', 'horizontal'] },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
    errorMessage: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<CheckboxGroupComponent>;

/* ── Playground ──────────────────────────────── */
export const Playground: Story = {
  args: { label: 'Preferenze notifiche', orientation: 'vertical' },
  render: (args) => ({
    props: args,
    template: `
      <ohmyui-checkbox-group
        [label]="label" [description]="description" [orientation]="orientation"
        [required]="required" [disabled]="disabled" [error]="error" [errorMessage]="errorMessage">
        <ohmyui-checkbox label="Email" [checked]="true"></ohmyui-checkbox>
        <ohmyui-checkbox label="SMS"></ohmyui-checkbox>
        <ohmyui-checkbox label="Notifiche push"></ohmyui-checkbox>
      </ohmyui-checkbox-group>
    `,
  }),
};

/* ── Orientation ─────────────────────────────── */
export const Vertical: Story = {
  args: { label: 'Interessi', orientation: 'vertical' },
  render: (args) => ({
    props: args,
    template: `
      <ohmyui-checkbox-group [label]="label" [orientation]="orientation">
        <ohmyui-checkbox label="Design" [checked]="true"></ohmyui-checkbox>
        <ohmyui-checkbox label="Sviluppo" [checked]="true"></ohmyui-checkbox>
        <ohmyui-checkbox label="Marketing"></ohmyui-checkbox>
      </ohmyui-checkbox-group>
    `,
  }),
};
export const Horizontal: Story = {
  args: { label: 'Interessi', orientation: 'horizontal' },
  render: (args) => ({
    props: args,
    template: `
      <ohmyui-checkbox-group [label]="label" [orientation]="orientation">
        <ohmyui-checkbox label="Design" [checked]="true"></ohmyui-checkbox>
        <ohmyui-checkbox label="Sviluppo" [checked]="true"></ohmyui-checkbox>
        <ohmyui-checkbox label="Marketing"></ohmyui-checkbox>
      </ohmyui-checkbox-group>
    `,
  }),
};

/* ── States ──────────────────────────────────── */
export const Disabled: Story = {
  args: { label: 'Preferenze', disabled: true },
  render: (args) => ({
    props: args,
    template: `
      <ohmyui-checkbox-group [label]="label" [disabled]="disabled">
        <ohmyui-checkbox label="Email" [checked]="true"></ohmyui-checkbox>
        <ohmyui-checkbox label="SMS"></ohmyui-checkbox>
      </ohmyui-checkbox-group>
    `,
  }),
};
export const WithError: Story = {
  name: 'With error',
  args: {
    label: "Seleziona almeno un'opzione",
    error: true,
    errorMessage: 'Devi selezionare almeno una preferenza.',
    required: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <ohmyui-checkbox-group
        [label]="label" [error]="error" [errorMessage]="errorMessage" [required]="required">
        <ohmyui-checkbox label="Email"></ohmyui-checkbox>
        <ohmyui-checkbox label="SMS"></ohmyui-checkbox>
      </ohmyui-checkbox-group>
    `,
  }),
};

/* ── Accessibility ────────────────────────────── */
export const AccessibleFieldset: Story = {
  name: 'Accessibility / Native fieldset semantics',
  args: { label: 'Preferenze notifiche', description: 'Scegli come vuoi essere contattato.' },
  render: (args) => ({
    props: args,
    template: `
      <ohmyui-checkbox-group [label]="label" [description]="description">
        <ohmyui-checkbox label="Email" [checked]="true"></ohmyui-checkbox>
        <ohmyui-checkbox label="SMS"></ohmyui-checkbox>
      </ohmyui-checkbox-group>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Il gruppo usa un vero `<fieldset>`/`<legend>` nativo: uno screen reader annuncia automaticamente il nome del gruppo quando il focus entra su una qualsiasi checkbox al suo interno, senza bisogno di `aria-labelledby` manuale su ciascun input.',
      },
    },
  },
};
export const AccessibleDisabledCascade: Story = {
  name: 'Accessibility / Disabled cascades to every checkbox',
  args: { label: 'Preferenze (bloccate)', disabled: true },
  render: (args) => ({
    props: args,
    template: `
      <ohmyui-checkbox-group [label]="label" [disabled]="disabled">
        <ohmyui-checkbox label="Email" [checked]="true"></ohmyui-checkbox>
        <ohmyui-checkbox label="SMS"></ohmyui-checkbox>
        <ohmyui-checkbox label="Push"></ohmyui-checkbox>
      </ohmyui-checkbox-group>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          '`disabled` sul gruppo disabilita ogni checkbox proiettata automaticamente, via comportamento nativo di `<fieldset disabled>` — non serve propagare manualmente lo stato a ciascun figlio con del codice.',
      },
    },
  },
};
