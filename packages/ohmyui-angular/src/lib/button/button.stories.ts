import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'ghost',
        'confirm',
        'warning',
        'danger',
        'info',
        'cancel',
        'link',
      ],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    label: { control: 'text' },
    type: { control: 'select', options: ['button', 'submit', 'reset'] },
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

/* ── Playground ──────────────────────────────── */

export const Playground: Story = {
  args: { variant: 'primary', size: 'md', radius: 'md', label: 'Click me' },
};

/* ── Variants ────────────────────────────────── */

export const Primary: Story = {
  args: { variant: 'primary', size: 'md', label: 'Primary' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', size: 'md', label: 'Secondary' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', size: 'md', label: 'Ghost' },
};

export const Confirm: Story = {
  args: { variant: 'confirm', size: 'md', label: 'Confirm' },
};

export const Warning: Story = {
  args: { variant: 'warning', size: 'md', label: 'Warning' },
};

export const Danger: Story = {
  args: { variant: 'danger', size: 'md', label: 'Delete' },
};

export const Info: Story = {
  args: { variant: 'info', size: 'md', label: 'Info' },
};

export const Cancel: Story = {
  args: { variant: 'cancel', size: 'md', label: 'Cancel' },
};

export const Link: Story = {
  args: { variant: 'link', size: 'md', label: 'Learn more' },
};

/* ── Sizes ───────────────────────────────────── */

export const SizeXs: Story = {
  name: 'Size / XS',
  args: { variant: 'primary', size: 'xs', label: 'Extra small' },
};

export const SizeSm: Story = {
  name: 'Size / SM',
  args: { variant: 'primary', size: 'sm', label: 'Small' },
};

export const SizeMd: Story = {
  name: 'Size / MD',
  args: { variant: 'primary', size: 'md', label: 'Medium' },
};

export const SizeLg: Story = {
  name: 'Size / LG',
  args: { variant: 'primary', size: 'lg', label: 'Large' },
};

export const SizeXl: Story = {
  name: 'Size / XL',
  args: { variant: 'primary', size: 'xl', label: 'Extra large' },
};

export const Size2xl: Story = {
  name: 'Size / 2XL',
  args: { variant: 'primary', size: '2xl', label: 'Double extra large' },
};

/* ── Radius ──────────────────────────────────── */

export const RadiusNone: Story = {
  name: 'Radius / None',
  args: { variant: 'primary', size: 'md', radius: 'none', label: 'Sharp' },
};

export const RadiusSm: Story = {
  name: 'Radius / SM',
  args: { variant: 'primary', size: 'md', radius: 'sm', label: 'Subtle' },
};

export const RadiusMd: Story = {
  name: 'Radius / MD',
  args: { variant: 'primary', size: 'md', radius: 'md', label: 'Default' },
};

export const RadiusLg: Story = {
  name: 'Radius / LG',
  args: { variant: 'primary', size: 'md', radius: 'lg', label: 'Rounded' },
};

export const RadiusFull: Story = {
  name: 'Radius / Full',
  args: { variant: 'primary', size: 'md', radius: 'full', label: 'Pill' },
};

/* ── States ──────────────────────────────────── */

export const Disabled: Story = {
  args: { variant: 'primary', size: 'md', disabled: true, label: 'Disabled' },
};

export const Loading: Story = {
  args: { variant: 'primary', size: 'md', loading: true, label: 'Saving...' },
};

export const FullWidth: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    fullWidth: true,
    label: 'Full width',
  },
};
