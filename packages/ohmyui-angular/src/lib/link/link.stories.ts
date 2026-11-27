/**
 * Copyright 2026 The OhMyOpenSource! Authors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * SPDX-License-Identifier: MPL-2.0
 */

/**
 * @file link.stories.ts
 * @description Storybook stories of LinkComponent: internal and external modes,
 * variants, sizes, the external link icon, the target and the accessibility
 * notes.
 */

import type { Meta, StoryObj } from '@storybook/angular';
import { LinkComponent } from './link';

const meta: Meta<LinkComponent> = {
  title: 'Components/Link',
  component: LinkComponent,
  argTypes: {
    mode: { control: 'select', options: ['internal', 'external'] },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'neutral', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    target: { control: 'select', options: ['_self', '_blank'] },
    href: { control: 'text' },
    label: { control: 'text' },
    showExternalIcon: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<LinkComponent>;

/* Playground */
export const Playground: Story = {
  args: {
    mode: 'external',
    href: 'https://github.com/ohmyopensource',
    label: 'Go to GitHub',
  },
};

/* Mode */
export const Internal: Story = {
  args: { mode: 'internal', href: '/docs', label: 'Read the documentation' },
};
export const External: Story = {
  args: {
    mode: 'external',
    href: 'https://github.com/ohmyopensource',
    label: 'Go to GitHub',
  },
};

/* Variants */
export const Primary: Story = {
  args: { mode: 'external', href: '#', variant: 'primary', label: 'Primary' },
};
export const Secondary: Story = {
  args: {
    mode: 'external',
    href: '#',
    variant: 'secondary',
    label: 'Secondary',
  },
};
export const Neutral: Story = {
  args: { mode: 'external', href: '#', variant: 'neutral', label: 'Neutral' },
};
export const Ghost: Story = {
  args: { mode: 'external', href: '#', variant: 'ghost', label: 'Ghost' },
};

/* Sizes */
export const SizeSm: Story = {
  name: 'Size / SM',
  args: { mode: 'external', href: '#', size: 'sm', label: 'Small' },
};
export const SizeMd: Story = {
  name: 'Size / MD',
  args: { mode: 'external', href: '#', size: 'md', label: 'Medium' },
};
export const SizeLg: Story = {
  name: 'Size / LG',
  args: { mode: 'external', href: '#', size: 'lg', label: 'Large' },
};

/* States */
export const NoExternalIcon: Story = {
  name: 'External without icon',
  args: {
    mode: 'external',
    href: 'https://github.com/ohmyopensource',
    label: 'Go to GitHub',
    showExternalIcon: false,
  },
};
export const SameTab: Story = {
  name: 'External / Same tab',
  args: {
    mode: 'external',
    href: 'https://github.com/ohmyopensource',
    label: 'Go to GitHub',
    target: '_self',
  },
};

/* Accessibility */
export const AccessibleInternalNoIcon: Story = {
  name: 'Accessibility / Internal links never show the external icon',
  args: { mode: 'internal', href: '/docs', label: 'Read the documentation' },
  parameters: {
    docs: {
      description: {
        story:
          'An internal link never shows the external link icon: the icon appears only when `mode` is `external`, so users do not think they are about to leave the site.',
      },
    },
  },
};
export const AccessibleNewTabAnnouncement: Story = {
  name: 'Accessibility / New tab is announced',
  args: {
    mode: 'external',
    href: 'https://github.com/ohmyopensource',
    label: 'Go to GitHub',
    target: '_blank',
  },
  parameters: {
    docs: {
      description: {
        story:
          'When an external link opens with `target="_blank"`, it gets an `aria-label` that says it opens in a new tab, so screen readers warn users before the click, not after.',
      },
    },
  },
};
