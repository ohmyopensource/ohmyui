import type { Meta, StoryObj } from '@storybook/angular';
import { BadgeComponent } from './badge';

const meta: Meta<BadgeComponent> = {
  title: 'Components/Badge',
  component: BadgeComponent,
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'neutral',
        'primary',
        'success',
        'warning',
        'error',
        'info',
        'teal',
        'outline-neutral',
        'outline-primary',
        'outline-success',
        'outline-warning',
        'outline-error',
        'outline-info',
      ],
    },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
    shape: { control: 'select', options: ['pill', 'rounded', 'square'] },
    label: { control: 'text' },
    dot: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<BadgeComponent>;

/* ── Playground ──────────────────────────────── */

export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    shape: 'pill',
    label: 'Badge',
    dot: false,
  },
};

/* ── Solid variants ──────────────────────────── */

export const Neutral: Story = {
  args: { variant: 'neutral', size: 'md', shape: 'pill', label: 'Neutral' },
};

export const Primary: Story = {
  args: { variant: 'primary', size: 'md', shape: 'pill', label: 'Primary' },
};

export const Success: Story = {
  args: { variant: 'success', size: 'md', shape: 'pill', label: 'Success' },
};

export const Warning: Story = {
  args: { variant: 'warning', size: 'md', shape: 'pill', label: 'Warning' },
};

export const Error: Story = {
  args: { variant: 'error', size: 'md', shape: 'pill', label: 'Error' },
};

export const Info: Story = {
  args: { variant: 'info', size: 'md', shape: 'pill', label: 'Info' },
};

export const Teal: Story = {
  args: { variant: 'teal', size: 'md', shape: 'pill', label: 'Teal' },
};

/* ── Outline variants ────────────────────────── */

export const OutlineNeutral: Story = {
  name: 'Outline / Neutral',
  args: {
    variant: 'outline-neutral',
    size: 'md',
    shape: 'pill',
    label: 'Neutral',
  },
};

export const OutlinePrimary: Story = {
  name: 'Outline / Primary',
  args: {
    variant: 'outline-primary',
    size: 'md',
    shape: 'pill',
    label: 'Primary',
  },
};

export const OutlineSuccess: Story = {
  name: 'Outline / Success',
  args: {
    variant: 'outline-success',
    size: 'md',
    shape: 'pill',
    label: 'Success',
  },
};

export const OutlineWarning: Story = {
  name: 'Outline / Warning',
  args: {
    variant: 'outline-warning',
    size: 'md',
    shape: 'pill',
    label: 'Warning',
  },
};

export const OutlineError: Story = {
  name: 'Outline / Error',
  args: { variant: 'outline-error', size: 'md', shape: 'pill', label: 'Error' },
};

export const OutlineInfo: Story = {
  name: 'Outline / Info',
  args: { variant: 'outline-info', size: 'md', shape: 'pill', label: 'Info' },
};

/* ── Sizes ───────────────────────────────────── */

export const SizeXs: Story = {
  name: 'Size / XS',
  args: { variant: 'primary', size: 'xs', shape: 'pill', label: 'Extra small' },
};

export const SizeSm: Story = {
  name: 'Size / SM',
  args: { variant: 'primary', size: 'sm', shape: 'pill', label: 'Small' },
};

export const SizeMd: Story = {
  name: 'Size / MD',
  args: { variant: 'primary', size: 'md', shape: 'pill', label: 'Medium' },
};

export const SizeLg: Story = {
  name: 'Size / LG',
  args: { variant: 'primary', size: 'lg', shape: 'pill', label: 'Large' },
};

/* ── Shapes ──────────────────────────────────── */

export const ShapePill: Story = {
  name: 'Shape / Pill',
  args: { variant: 'primary', size: 'md', shape: 'pill', label: 'Pill' },
};

export const ShapeRounded: Story = {
  name: 'Shape / Rounded',
  args: { variant: 'primary', size: 'md', shape: 'rounded', label: 'Rounded' },
};

export const ShapeSquare: Story = {
  name: 'Shape / Square',
  args: { variant: 'primary', size: 'md', shape: 'square', label: 'Square' },
};

/* ── Dot ─────────────────────────────────────── */

export const WithDotSuccess: Story = {
  name: 'Dot / Success',
  args: {
    variant: 'success',
    size: 'md',
    shape: 'pill',
    label: 'Online',
    dot: true,
  },
};

export const WithDotWarning: Story = {
  name: 'Dot / Warning',
  args: {
    variant: 'warning',
    size: 'md',
    shape: 'pill',
    label: 'Pending',
    dot: true,
  },
};

export const WithDotError: Story = {
  name: 'Dot / Error',
  args: {
    variant: 'error',
    size: 'md',
    shape: 'pill',
    label: 'Offline',
    dot: true,
  },
};

export const WithDotNeutral: Story = {
  name: 'Dot / Neutral',
  args: {
    variant: 'neutral',
    size: 'md',
    shape: 'pill',
    label: 'Idle',
    dot: true,
  },
};
