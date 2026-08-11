import type { Meta, StoryObj } from '@storybook/angular';
import { ImageComponent } from './image';

const meta: Meta<ImageComponent> = {
  title: 'Components/Image',
  component: ImageComponent,
  argTypes: {
    variant: {
      control: 'select',
      options: ['flat', 'bordered', 'shadow', 'shadow-md', 'shadow-lg'],
    },
    shape: { control: 'select', options: ['square', 'rounded', 'circle'] },
    ratio: {
      control: 'select',
      options: ['1/1', '4/3', '16/9', '3/4', 'auto'],
    },
    fit: { control: 'select', options: ['cover', 'contain'] },
    src: { control: 'text' },
    alt: { control: 'text' },
    caption: { control: 'text' },
    description: { control: 'text' },
    lazy: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<ImageComponent>;

const IMG = 'https://picsum.photos/seed/ohmyui/800/600';
const IMG_TALL = 'https://picsum.photos/seed/ohmyui2/600/800';
const IMG_BROKEN = 'https://broken.invalid/img.jpg';

/* ── Playground ──────────────────────────────── */

export const Playground: Story = {
  args: {
    src: IMG,
    alt: 'A beautiful landscape photo',
    variant: 'flat',
    shape: 'rounded',
    ratio: '16/9',
    fit: 'cover',
    lazy: true,
  },
};

/* ── States ──────────────────────────────────── */

export const Loaded: Story = {
  name: 'State / Loaded',
  args: {
    src: IMG,
    alt: 'Loaded image',
    variant: 'flat',
    shape: 'rounded',
    ratio: '16/9',
  },
};

export const Loading: Story = {
  name: 'State / Loading (spinner)',
  args: {
    src: 'https://picsum.photos/seed/slow/800/600',
    alt: 'Loading image',
    variant: 'flat',
    shape: 'rounded',
    ratio: '16/9',
  },
};

export const Error: Story = {
  name: 'State / Error (placeholder)',
  args: {
    src: IMG_BROKEN,
    alt: 'Broken image',
    variant: 'flat',
    shape: 'rounded',
    ratio: '16/9',
  },
};

export const NoSrc: Story = {
  name: 'State / No src (placeholder)',
  args: { src: '', alt: '', variant: 'flat', shape: 'rounded', ratio: '16/9' },
};

/* ── Variants ────────────────────────────────── */

export const Flat: Story = {
  name: 'Variant / Flat',
  args: {
    src: IMG,
    alt: 'Flat image',
    variant: 'flat',
    shape: 'rounded',
    ratio: '16/9',
  },
};

export const Bordered: Story = {
  name: 'Variant / Bordered',
  args: {
    src: IMG,
    alt: 'Bordered image',
    variant: 'bordered',
    shape: 'rounded',
    ratio: '16/9',
  },
};

export const Shadow: Story = {
  name: 'Variant / Shadow SM',
  args: {
    src: IMG,
    alt: 'Shadow image',
    variant: 'shadow',
    shape: 'rounded',
    ratio: '16/9',
  },
};

export const ShadowMd: Story = {
  name: 'Variant / Shadow MD',
  args: {
    src: IMG,
    alt: 'Shadow MD image',
    variant: 'shadow-md',
    shape: 'rounded',
    ratio: '16/9',
  },
};

export const ShadowLg: Story = {
  name: 'Variant / Shadow LG',
  args: {
    src: IMG,
    alt: 'Shadow LG image',
    variant: 'shadow-lg',
    shape: 'rounded',
    ratio: '16/9',
  },
};

/* ── Shapes ──────────────────────────────────── */

export const ShapeSquare: Story = {
  name: 'Shape / Square',
  args: {
    src: IMG,
    alt: 'Square image',
    variant: 'shadow',
    shape: 'square',
    ratio: '16/9',
  },
};

export const ShapeRounded: Story = {
  name: 'Shape / Rounded',
  args: {
    src: IMG,
    alt: 'Rounded image',
    variant: 'shadow',
    shape: 'rounded',
    ratio: '16/9',
  },
};

export const ShapeCircle: Story = {
  name: 'Shape / Circle',
  args: {
    src: IMG,
    alt: 'Circle image',
    variant: 'shadow',
    shape: 'circle',
    ratio: '1/1',
  },
};

/* ── Ratios ──────────────────────────────────── */

export const Ratio1x1: Story = {
  name: 'Ratio / 1:1',
  args: {
    src: IMG,
    alt: 'Square ratio image',
    variant: 'bordered',
    shape: 'rounded',
    ratio: '1/1',
  },
};

export const Ratio4x3: Story = {
  name: 'Ratio / 4:3',
  args: {
    src: IMG,
    alt: '4:3 ratio image',
    variant: 'bordered',
    shape: 'rounded',
    ratio: '4/3',
  },
};

export const Ratio16x9: Story = {
  name: 'Ratio / 16:9',
  args: {
    src: IMG,
    alt: '16:9 ratio image',
    variant: 'bordered',
    shape: 'rounded',
    ratio: '16/9',
  },
};

export const Ratio3x4: Story = {
  name: 'Ratio / 3:4 (portrait)',
  args: {
    src: IMG_TALL,
    alt: 'Portrait ratio image',
    variant: 'bordered',
    shape: 'rounded',
    ratio: '3/4',
  },
};

/* ── Fit ─────────────────────────────────────── */

export const FitCover: Story = {
  name: 'Fit / Cover',
  args: {
    src: IMG,
    alt: 'Cover fit image',
    variant: 'bordered',
    shape: 'rounded',
    ratio: '16/9',
    fit: 'cover',
  },
};

export const FitContain: Story = {
  name: 'Fit / Contain',
  args: {
    src: IMG,
    alt: 'Contain fit image',
    variant: 'bordered',
    shape: 'rounded',
    ratio: '16/9',
    fit: 'contain',
  },
};

/* ── With caption ────────────────────────────── */

export const WithCaption: Story = {
  name: 'Feature / With caption',
  args: {
    src: IMG,
    alt: 'A beautiful landscape photo',
    caption: 'Photo courtesy of Lorem Picsum',
    variant: 'shadow-md',
    shape: 'rounded',
    ratio: '16/9',
  },
};

/* ── With description (SEO/a11y) ─────────────── */

export const WithDescription: Story = {
  name: 'Feature / With aria description',
  args: {
    src: IMG,
    alt: 'Mountain landscape at sunset',
    description:
      'A wide-angle photograph of a mountain range during golden hour, with warm orange and pink hues reflecting off snow-capped peaks.',
    caption: 'Golden hour over the mountains',
    variant: 'shadow-lg',
    shape: 'rounded',
    ratio: '16/9',
  },
};
