import type { Meta, StoryObj } from '@storybook/angular';
import { AccordionComponent, AccordionItem } from './accordion';

const meta: Meta<AccordionComponent> = {
  title: 'Components/Accordion',
  component: AccordionComponent,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'filled', 'ghost'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    multi: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<AccordionComponent>;

const baseItems: AccordionItem[] = [
  {
    id: '1',
    title: 'What is OhMyUI?',
    content:
      'OhMyUI is an open-source component library built for Angular, React, and Flutter. It provides a consistent design system with tokens, theming, and fully accessible components.',
  },
  {
    id: '2',
    title: 'Is it free to use?',
    content:
      'Yes, OhMyUI is completely free and open-source, released under the MIT license. You can use it in personal and commercial projects without any restrictions.',
  },
  {
    id: '3',
    title: 'Does it support dark mode?',
    content:
      'Dark mode is built-in and automatic via CSS custom properties and @media (prefers-color-scheme: dark). No extra configuration needed.',
  },
  {
    id: '4',
    title: 'How do I customize the tokens?',
    content:
      'All design tokens (colors, spacing, typography, shadows) are defined in JSON files and compiled with Style Dictionary. Change the values, rebuild, and all components update automatically.',
  },
];

const itemsWithBadges: AccordionItem[] = [
  {
    id: '1',
    title: 'Installation',
    content: 'Run npm install @ohmyopensource/angular to get started.',
    badge: 'New',
    badgeVariant: 'primary',
  },
  {
    id: '2',
    title: 'Configuration',
    content: 'Import the tokens CSS and add the components to your module.',
    badge: 'Required',
    badgeVariant: 'warning',
  },
  {
    id: '3',
    title: 'Advanced usage',
    content:
      'Learn how to extend tokens, create custom variants, and contribute.',
    badge: 'Pro',
    badgeVariant: 'teal',
  },
];

const itemsWithDisabled: AccordionItem[] = [
  {
    id: '1',
    title: 'Available feature',
    content: 'This section is fully available and can be expanded.',
  },
  {
    id: '2',
    title: 'Disabled feature',
    content: 'This content cannot be seen.',
    disabled: true,
  },
  {
    id: '3',
    title: 'Another available feature',
    content: 'This section is also fully available.',
  },
];

/* ── Playground ──────────────────────────────── */

export const Playground: Story = {
  args: {
    items: baseItems,
    variant: 'default',
    size: 'md',
    multi: false,
    defaultOpen: ['1'],
  },
};

/* ── Variants ────────────────────────────────── */

export const Default: Story = {
  name: 'Variant / Default',
  args: {
    items: baseItems,
    variant: 'default',
    size: 'md',
    defaultOpen: ['1'],
  },
};

export const Bordered: Story = {
  name: 'Variant / Bordered',
  args: {
    items: baseItems,
    variant: 'bordered',
    size: 'md',
    defaultOpen: ['1'],
  },
};

export const Filled: Story = {
  name: 'Variant / Filled',
  args: { items: baseItems, variant: 'filled', size: 'md', defaultOpen: ['1'] },
};

export const Ghost: Story = {
  name: 'Variant / Ghost',
  args: { items: baseItems, variant: 'ghost', size: 'md', defaultOpen: ['1'] },
};

/* ── Sizes ───────────────────────────────────── */

export const SizeSm: Story = {
  name: 'Size / SM',
  args: {
    items: baseItems,
    variant: 'bordered',
    size: 'sm',
    defaultOpen: ['1'],
  },
};

export const SizeMd: Story = {
  name: 'Size / MD',
  args: {
    items: baseItems,
    variant: 'bordered',
    size: 'md',
    defaultOpen: ['1'],
  },
};

export const SizeLg: Story = {
  name: 'Size / LG',
  args: {
    items: baseItems,
    variant: 'bordered',
    size: 'lg',
    defaultOpen: ['1'],
  },
};

/* ── Behavior ────────────────────────────────── */

export const SingleOpen: Story = {
  name: 'Behavior / Single open',
  args: {
    items: baseItems,
    variant: 'default',
    size: 'md',
    multi: false,
    defaultOpen: ['1'],
  },
};

export const MultiOpen: Story = {
  name: 'Behavior / Multi open',
  args: {
    items: baseItems,
    variant: 'default',
    size: 'md',
    multi: true,
    defaultOpen: ['1', '2'],
  },
};

export const AllClosed: Story = {
  name: 'Behavior / All closed',
  args: { items: baseItems, variant: 'bordered', size: 'md', defaultOpen: [] },
};

export const WithDisabled: Story = {
  name: 'Behavior / Disabled item',
  args: {
    items: itemsWithDisabled,
    variant: 'bordered',
    size: 'md',
    defaultOpen: ['1'],
  },
};

/* ── Features ────────────────────────────────── */

export const WithBadges: Story = {
  name: 'Feature / With badges',
  args: {
    items: itemsWithBadges,
    variant: 'bordered',
    size: 'md',
    defaultOpen: ['1'],
  },
};

/* ── Combined ────────────────────────────────── */

export const FilledMulti: Story = {
  name: 'Combined / Filled + Multi',
  args: {
    items: baseItems,
    variant: 'filled',
    size: 'md',
    multi: true,
    defaultOpen: ['1', '3'],
  },
};

export const GhostSm: Story = {
  name: 'Combined / Ghost + SM',
  args: { items: baseItems, variant: 'ghost', size: 'sm', defaultOpen: ['2'] },
};

export const BorderedLg: Story = {
  name: 'Combined / Bordered + LG',
  args: {
    items: itemsWithBadges,
    variant: 'bordered',
    size: 'lg',
    defaultOpen: ['1'],
  },
};
