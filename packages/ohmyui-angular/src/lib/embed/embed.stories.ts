import type { Meta, StoryObj } from '@storybook/angular';
import { EmbedComponent } from './embed';

const meta: Meta<EmbedComponent> = {
  title: 'Components/Embed',
  component: EmbedComponent,
  argTypes: {
    variant: {
      control: 'select',
      options: ['flat', 'bordered', 'shadow', 'shadow-md', 'shadow-lg'],
    },
    shape: { control: 'select', options: ['square', 'rounded'] },
    ratio: {
      control: 'select',
      options: ['1/1', '4/3', '16/9', '3/4', 'auto'],
    },
    sandbox: {
      control: 'select',
      options: ['strict', 'safe', 'forms', 'popups', 'full', 'none'],
    },
    allowCamera: { control: 'boolean' },
    allowMicrophone: { control: 'boolean' },
    allowFullscreen: { control: 'boolean' },
    allowAutoplay: { control: 'boolean' },
    src: { control: 'text' },
    title: { control: 'text' },
    errorMessage: { control: 'text' },
    height: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<EmbedComponent>;

/* ── Playground ──────────────────────────────── */

export const Playground: Story = {
  args: {
    src: 'https://www.openstreetmap.org/export/embed.html?bbox=12.4,41.8,12.6,42.0&layer=mapnik',
    title: 'OpenStreetMap — Rome',
    variant: 'bordered',
    shape: 'rounded',
    ratio: '16/9',
    sandbox: 'safe',
    allowFullscreen: true,
  },
};

/* ── Real world examples ─────────────────────── */

export const YouTubeEmbed: Story = {
  name: 'Example / YouTube',
  args: {
    src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    title: 'YouTube video player',
    variant: 'shadow-md',
    shape: 'rounded',
    ratio: '16/9',
    sandbox: 'safe',
    allowFullscreen: true,
    allowAutoplay: false,
  },
};

export const MapEmbed: Story = {
  name: 'Example / OpenStreetMap',
  args: {
    src: 'https://www.openstreetmap.org/export/embed.html?bbox=9.1,45.4,9.3,45.6&layer=mapnik',
    title: 'OpenStreetMap — Milan',
    variant: 'bordered',
    shape: 'rounded',
    ratio: '4/3',
    sandbox: 'safe',
    allowFullscreen: true,
  },
};

export const CodeSandbox: Story = {
  name: 'Example / CodeSandbox',
  args: {
    src: 'https://codesandbox.io/embed/new?codemirror=1',
    title: 'CodeSandbox playground',
    variant: 'shadow-lg',
    shape: 'rounded',
    ratio: '16/9',
    sandbox: 'full',
    allowFullscreen: true,
    height: 500,
  },
};

/* ── States ──────────────────────────────────── */

export const ErrorState: Story = {
  name: 'State / Error',
  args: {
    src: 'https://blocked.example.com/embed',
    title: 'Blocked content',
    variant: 'bordered',
    shape: 'rounded',
    ratio: '16/9',
    errorMessage:
      'This content could not be loaded. The source may have blocked embedding.',
  },
};

export const NoSrc: Story = {
  name: 'State / No src',
  args: {
    src: '',
    title: '',
    variant: 'bordered',
    shape: 'rounded',
    ratio: '16/9',
  },
};

/* ── Variants ────────────────────────────────── */

export const Flat: Story = {
  name: 'Variant / Flat',
  args: {
    src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    title: 'Video',
    variant: 'flat',
    shape: 'rounded',
    ratio: '16/9',
    sandbox: 'safe',
  },
};

export const Bordered: Story = {
  name: 'Variant / Bordered',
  args: {
    src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    title: 'Video',
    variant: 'bordered',
    shape: 'rounded',
    ratio: '16/9',
    sandbox: 'safe',
  },
};

export const ShadowLg: Story = {
  name: 'Variant / Shadow LG',
  args: {
    src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    title: 'Video',
    variant: 'shadow-lg',
    shape: 'rounded',
    ratio: '16/9',
    sandbox: 'safe',
  },
};

/* ── Sandbox levels ──────────────────────────── */

export const SandboxStrict: Story = {
  name: 'Sandbox / Strict',
  args: {
    src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    title: 'Strict sandbox',
    variant: 'bordered',
    ratio: '16/9',
    sandbox: 'strict',
  },
};

export const SandboxFull: Story = {
  name: 'Sandbox / Full (use with caution)',
  args: {
    src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    title: 'Full sandbox',
    variant: 'bordered',
    ratio: '16/9',
    sandbox: 'full',
    allowFullscreen: true,
  },
};

/* ── Custom height ───────────────────────────── */

export const CustomHeight: Story = {
  name: 'Feature / Custom height',
  args: {
    src: 'https://www.openstreetmap.org/export/embed.html?bbox=12.4,41.8,12.6,42.0&layer=mapnik',
    title: 'Map with custom height',
    variant: 'shadow-md',
    shape: 'rounded',
    ratio: 'auto',
    height: 400,
    sandbox: 'safe',
  },
};
