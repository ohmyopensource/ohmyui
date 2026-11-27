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
 * @file badge.stories.ts
 * @description Storybook stories of BadgeComponent: variants, sizes, shapes,
 * icons, the count, removable and dot states, and the accessibility notes.
 */

import type { Meta, StoryObj } from '@storybook/angular';
import { LucideHeart, LucideStar } from '@lucide/angular';
import { BadgeComponent } from './badge';

const meta: Meta<BadgeComponent> = {
  title: 'Components/Badge',
  component: BadgeComponent,
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
        'ghost',
        'outline',
        'flat',
        'neutral',
      ],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    shape: {
      control: 'select',
      options: ['pill', 'rounded', 'square'],
    },
    iconPosition: { control: 'select', options: ['left', 'right'] },
    label: { control: 'text' },
    count: { control: 'number' },
    maxCount: { control: 'number' },
    dot: { control: 'boolean' },
    removable: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<BadgeComponent>;

/* Playground */
export const Playground: Story = {
  args: { variant: 'primary', size: 'md', shape: 'pill', label: 'Badge' },
};

/* Variants */
export const Primary: Story = {
  args: { variant: 'primary', label: 'Primary' },
};
export const Secondary: Story = {
  args: { variant: 'secondary', label: 'Secondary' },
};
export const Tertiary: Story = {
  args: { variant: 'tertiary', label: 'Tertiary' },
};
export const Success: Story = {
  args: { variant: 'success', label: 'Success' },
};
export const Warning: Story = {
  args: { variant: 'warning', label: 'Warning' },
};
export const Error: Story = {
  args: { variant: 'error', label: 'Error' },
};
export const Info: Story = {
  args: { variant: 'info', label: 'Info' },
};
export const Neutral: Story = {
  args: { variant: 'neutral', label: 'Neutral' },
};
export const Ghost: Story = {
  args: { variant: 'ghost', label: 'Ghost' },
};
export const Outline: Story = {
  args: { variant: 'outline', label: 'Outline' },
};
export const Flat: Story = {
  args: { variant: 'flat', label: 'Flat' },
};

/* Sizes */
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

/* Shapes */
export const ShapePill: Story = {
  name: 'Shape / Pill',
  args: { variant: 'primary', shape: 'pill', label: 'Pill' },
};
export const ShapeRounded: Story = {
  name: 'Shape / Rounded',
  args: { variant: 'primary', shape: 'rounded', label: 'Rounded' },
};
export const ShapeSquare: Story = {
  name: 'Shape / Square',
  args: { variant: 'primary', shape: 'square', label: 'Square' },
};

/* States */
export const WithIconLeft: Story = {
  name: 'With icon (left)',
  args: {
    variant: 'primary',
    label: 'Featured',
    icon: LucideStar.icon,
    iconPosition: 'left',
  },
};
export const WithIconRight: Story = {
  name: 'With icon (right)',
  args: {
    variant: 'success',
    label: 'Liked',
    icon: LucideHeart.icon,
    iconPosition: 'right',
  },
};
export const Count: Story = {
  args: { variant: 'error', count: 5 },
};
export const CountCapped: Story = {
  name: 'Count (capped)',
  args: { variant: 'error', count: 150, maxCount: 99 },
};
export const Removable: Story = {
  args: { variant: 'secondary', label: 'Removable', removable: true },
};
export const Dot: Story = {
  args: { variant: 'success', dot: true, label: 'Online' },
};
export const DotOnly: Story = {
  name: 'Dot only',
  args: { variant: 'success', dot: true },
};

/* Accessibility */
export const AccessibleDotOnly: Story = {
  name: 'Accessibility / Dot without visible text',
  args: { variant: 'success', dot: true, ariaLabel: 'Status: online' },
  parameters: {
    docs: {
      description: {
        story:
          'A dot-only badge has no visible text. The component sets `aria-label` to `ariaLabel || label || null`, so without an explicit `ariaLabel` a screen reader has nothing to announce. Always set `ariaLabel` when you use `dot` without `label`.',
      },
    },
  },
};
export const AccessibleRemovable: Story = {
  name: 'Accessibility / Removable announces status',
  args: { variant: 'secondary', label: 'React', removable: true },
  parameters: {
    docs: {
      description: {
        story:
          'When `removable` is true, the badge gets `role="status"`, so screen readers announce its changes. The remove button has its own `aria-label`, which names the badge it removes, independent of the visible "×".',
      },
    },
  },
};
export const AccessibleCount: Story = {
  name: 'Accessibility / Descriptive label for counters',
  args: { variant: 'error', count: 12, ariaLabel: '12 unread notifications' },
  parameters: {
    docs: {
      description: {
        story:
          'In count mode the visible text is only the number ("12"), which is not always clear out of context. A descriptive `ariaLabel`, such as "12 unread notifications", makes the screen reader announcement self-explanatory.',
      },
    },
  },
};
export const AccessibleIcon: Story = {
  name: 'Accessibility / Icon is decorative only',
  args: { variant: 'warning', label: 'In review', icon: LucideStar.icon },
  parameters: {
    docs: {
      description: {
        story:
          'The icon always has `aria-hidden="true"` in the template: it is decorative. The meaning must come from the text (`label`) or from `ariaLabel`; never rely on the icon alone.',
      },
    },
  },
};
