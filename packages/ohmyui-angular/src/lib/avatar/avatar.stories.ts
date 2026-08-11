import type { Meta, StoryObj } from '@storybook/angular';
import { AvatarComponent } from './avatar';

const meta: Meta<AvatarComponent> = {
  title: 'Components/Avatar',
  component: AvatarComponent,
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    shape: { control: 'select', options: ['circle', 'square'] },
    status: {
      control: 'select',
      options: ['none', 'online', 'offline', 'busy'],
    },
    color: {
      control: 'select',
      options: ['primary', 'teal', 'success', 'warning', 'error', 'neutral'],
    },
    ring: {
      control: 'select',
      options: [
        'none',
        'primary',
        'teal',
        'success',
        'warning',
        'error',
        'neutral',
        'white',
      ],
    },
    src: { control: 'text' },
    alt: { control: 'text' },
    name: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<AvatarComponent>;

/* ── Playground ──────────────────────────────── */

export const Playground: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=12',
    size: 'md',
    shape: 'circle',
    status: 'none',
    color: 'primary',
    ring: 'none',
  },
};

/* ── Content variants ────────────────────────── */

export const WithImage: Story = {
  name: 'Content / Image',
  args: {
    src: 'https://i.pravatar.cc/150?img=12',
    alt: 'John Doe',
    size: 'md',
    shape: 'circle',
  },
};

export const WithInitials: Story = {
  name: 'Content / Initials',
  args: { name: 'John Doe', size: 'md', shape: 'circle', color: 'primary' },
};

export const WithIcon: Story = {
  name: 'Content / Icon fallback',
  args: { size: 'md', shape: 'circle', color: 'neutral' },
};

export const ImageFallback: Story = {
  name: 'Content / Image → initials fallback',
  args: {
    src: 'https://broken.invalid/img.jpg',
    name: 'John Doe',
    size: 'md',
    shape: 'circle',
  },
};

/* ── Sizes ───────────────────────────────────── */

export const SizeXs: Story = {
  name: 'Size / XS',
  args: { src: 'https://i.pravatar.cc/150?img=1', size: 'xs', shape: 'circle' },
};
export const SizeSm: Story = {
  name: 'Size / SM',
  args: { src: 'https://i.pravatar.cc/150?img=1', size: 'sm', shape: 'circle' },
};
export const SizeMd: Story = {
  name: 'Size / MD',
  args: { src: 'https://i.pravatar.cc/150?img=1', size: 'md', shape: 'circle' },
};
export const SizeLg: Story = {
  name: 'Size / LG',
  args: { src: 'https://i.pravatar.cc/150?img=1', size: 'lg', shape: 'circle' },
};
export const SizeXl: Story = {
  name: 'Size / XL',
  args: { src: 'https://i.pravatar.cc/150?img=1', size: 'xl', shape: 'circle' },
};

/* ── Shapes ──────────────────────────────────── */

export const ShapeCircle: Story = {
  name: 'Shape / Circle',
  args: {
    src: 'https://i.pravatar.cc/150?img=32',
    size: 'lg',
    shape: 'circle',
  },
};
export const ShapeSquare: Story = {
  name: 'Shape / Square',
  args: {
    src: 'https://i.pravatar.cc/150?img=32',
    size: 'lg',
    shape: 'square',
  },
};

/* ── Colors (initials) ───────────────────────── */

export const ColorPrimary: Story = {
  name: 'Color / Primary',
  args: { name: 'John Doe', size: 'md', shape: 'circle', color: 'primary' },
};
export const ColorTeal: Story = {
  name: 'Color / Teal',
  args: { name: 'John Doe', size: 'md', shape: 'circle', color: 'teal' },
};
export const ColorSuccess: Story = {
  name: 'Color / Success',
  args: { name: 'John Doe', size: 'md', shape: 'circle', color: 'success' },
};
export const ColorWarning: Story = {
  name: 'Color / Warning',
  args: { name: 'John Doe', size: 'md', shape: 'circle', color: 'warning' },
};
export const ColorError: Story = {
  name: 'Color / Error',
  args: { name: 'John Doe', size: 'md', shape: 'circle', color: 'error' },
};
export const ColorNeutral: Story = {
  name: 'Color / Neutral',
  args: { name: 'John Doe', size: 'md', shape: 'circle', color: 'neutral' },
};

/* ── Ring ────────────────────────────────────── */

export const RingPrimary: Story = {
  name: 'Ring / Primary',
  args: {
    src: 'https://i.pravatar.cc/150?img=5',
    size: 'md',
    shape: 'circle',
    ring: 'primary',
  },
};
export const RingTeal: Story = {
  name: 'Ring / Teal',
  args: {
    src: 'https://i.pravatar.cc/150?img=5',
    size: 'md',
    shape: 'circle',
    ring: 'teal',
  },
};
export const RingSuccess: Story = {
  name: 'Ring / Success',
  args: {
    src: 'https://i.pravatar.cc/150?img=5',
    size: 'md',
    shape: 'circle',
    ring: 'success',
  },
};
export const RingWarning: Story = {
  name: 'Ring / Warning',
  args: {
    src: 'https://i.pravatar.cc/150?img=5',
    size: 'md',
    shape: 'circle',
    ring: 'warning',
  },
};
export const RingError: Story = {
  name: 'Ring / Error',
  args: {
    src: 'https://i.pravatar.cc/150?img=5',
    size: 'md',
    shape: 'circle',
    ring: 'error',
  },
};
export const RingNeutral: Story = {
  name: 'Ring / Neutral',
  args: {
    src: 'https://i.pravatar.cc/150?img=5',
    size: 'md',
    shape: 'circle',
    ring: 'neutral',
  },
};

/* ── Status ──────────────────────────────────── */

export const StatusOnline: Story = {
  name: 'Status / Online',
  args: {
    src: 'https://i.pravatar.cc/150?img=5',
    size: 'md',
    shape: 'circle',
    status: 'online',
  },
};
export const StatusOffline: Story = {
  name: 'Status / Offline',
  args: {
    src: 'https://i.pravatar.cc/150?img=5',
    size: 'md',
    shape: 'circle',
    status: 'offline',
  },
};
export const StatusBusy: Story = {
  name: 'Status / Busy',
  args: {
    src: 'https://i.pravatar.cc/150?img=5',
    size: 'md',
    shape: 'circle',
    status: 'busy',
  },
};

export const StatusOnlineXl: Story = {
  name: 'Status / Online XL',
  args: {
    src: 'https://i.pravatar.cc/150?img=8',
    size: 'xl',
    shape: 'circle',
    status: 'online',
  },
};

export const StatusWithSquare: Story = {
  name: 'Status / Square shape',
  args: {
    src: 'https://i.pravatar.cc/150?img=8',
    size: 'lg',
    shape: 'square',
    status: 'online',
  },
};

/* ── Ring + Status combined ──────────────────── */

export const RingAndStatus: Story = {
  name: 'Combined / Ring + Status',
  args: {
    src: 'https://i.pravatar.cc/150?img=10',
    size: 'lg',
    shape: 'circle',
    ring: 'primary',
    status: 'online',
  },
};

export const RingAndInitials: Story = {
  name: 'Combined / Ring + Initials',
  args: {
    name: 'John Doe',
    size: 'lg',
    shape: 'circle',
    color: 'teal',
    ring: 'teal',
  },
};
