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
 * @file button.stories.ts
 * @description Storybook stories of ButtonComponent: variants, sizes, corner
 * radii, icons, the disabled, loading, full-width and succeeded states, and the
 * accessibility notes.
 */

import type { Meta, StoryObj } from '@storybook/angular';
import { LucidePlus, LucideTrash2, LucideDownload } from '@lucide/angular';
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
        'tertiary',
        'success',
        'warning',
        'error',
        'info',
        'ghost',
        'outline',
        'outline-error',
        'flat',
      ],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
    },
    iconPosition: { control: 'select', options: ['left', 'right'] },
    succeededStyle: { control: 'select', options: ['filled', 'ghost'] },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    succeeded: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    iconOnly: { control: 'boolean' },
    label: { control: 'text' },
    type: { control: 'select', options: ['button', 'submit', 'reset'] },
  },
};
export default meta;
type Story = StoryObj<ButtonComponent>;

/* Playground */
export const Playground: Story = {
  args: { variant: 'primary', size: 'md', rounded: 'md', label: 'Click me' },
};

/* Variants */
export const Primary: Story = {
  args: { variant: 'primary', size: 'md', label: 'Primary' },
};
export const Secondary: Story = {
  args: { variant: 'secondary', size: 'md', label: 'Secondary' },
};
export const Tertiary: Story = {
  args: { variant: 'tertiary', size: 'md', label: 'Tertiary' },
};
export const Success: Story = {
  args: { variant: 'success', size: 'md', label: 'Success' },
};
export const Warning: Story = {
  args: { variant: 'warning', size: 'md', label: 'Warning' },
};
export const Error: Story = {
  args: { variant: 'error', size: 'md', label: 'Delete' },
};
export const Info: Story = {
  args: { variant: 'info', size: 'md', label: 'Info' },
};
export const Ghost: Story = {
  args: { variant: 'ghost', size: 'md', label: 'Ghost' },
};
export const Outline: Story = {
  args: { variant: 'outline', size: 'md', label: 'Outline' },
};
export const OutlineError: Story = {
  name: 'Outline / Error',
  args: { variant: 'outline-error', size: 'md', label: 'Remove' },
};
export const Flat: Story = {
  args: { variant: 'flat', size: 'md', label: 'Learn more' },
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

/* Rounded */
export const RoundedNone: Story = {
  name: 'Rounded / None',
  args: { variant: 'primary', size: 'md', rounded: 'none', label: 'Sharp' },
};
export const RoundedSm: Story = {
  name: 'Rounded / SM',
  args: { variant: 'primary', size: 'md', rounded: 'sm', label: 'Subtle' },
};
export const RoundedMd: Story = {
  name: 'Rounded / MD',
  args: { variant: 'primary', size: 'md', rounded: 'md', label: 'Default' },
};
export const RoundedLg: Story = {
  name: 'Rounded / LG',
  args: { variant: 'primary', size: 'md', rounded: 'lg', label: 'Rounded' },
};
export const RoundedFull: Story = {
  name: 'Rounded / Full',
  args: { variant: 'primary', size: 'md', rounded: 'full', label: 'Pill' },
};

/* Icons */
export const WithIconLeft: Story = {
  name: 'With icon (left)',
  args: {
    variant: 'primary',
    label: 'Add item',
    icon: LucidePlus.icon,
    iconPosition: 'left',
  },
};
export const WithIconRight: Story = {
  name: 'With icon (right)',
  args: {
    variant: 'outline',
    label: 'Download',
    icon: LucideDownload.icon,
    iconPosition: 'right',
  },
};
export const IconOnly: Story = {
  name: 'Icon only',
  args: {
    variant: 'error',
    icon: LucideTrash2.icon,
    iconOnly: true,
    ariaLabel: 'Delete',
  },
};

/* States */
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
export const SucceededFilled: Story = {
  name: 'Succeeded / Filled',
  args: {
    variant: 'primary',
    succeeded: true,
    succeededStyle: 'filled',
    label: 'Save',
    succeededLabel: 'Saved!',
  },
};
export const SucceededGhost: Story = {
  name: 'Succeeded / Ghost',
  args: {
    variant: 'outline',
    succeeded: true,
    succeededStyle: 'ghost',
    label: 'Save',
    succeededLabel: 'Saved!',
  },
};

/* Accessibility */
export const AccessibleIconOnly: Story = {
  name: 'Accessibility / Icon-only requires ariaLabel',
  args: {
    variant: 'error',
    icon: LucideTrash2.icon,
    iconOnly: true,
    ariaLabel: 'Delete item',
  },
  parameters: {
    docs: {
      description: {
        story:
          'When `iconOnly` is true, the label `<span class="ohmyui-btn__label">` is not rendered, so the button has no visible text. The `aria-label` is then the only way for a screen reader to tell what the button does: always provide it.',
      },
    },
  },
};
export const AccessibleLoading: Story = {
  name: 'Accessibility / Loading announces busy state',
  args: { variant: 'primary', loading: true, label: 'Sending...' },
  parameters: {
    docs: {
      description: {
        story:
          'While `loading` is true, the button gets `aria-busy="true"` and `aria-disabled="true"`, and a click does not emit `clicked`. The spinner has `aria-hidden="true"`: the meaning comes from the label, not from the animated icon.',
      },
    },
  },
};
export const AccessibleSucceeded: Story = {
  name: 'Accessibility / Succeeded announces pressed state',
  args: {
    variant: 'primary',
    succeeded: true,
    label: 'Save',
    succeededLabel: 'Saved!',
  },
  parameters: {
    docs: {
      description: {
        story:
          'In the `succeeded` state the button gets `aria-pressed="true"` and no longer responds to clicks. When `succeededLabel` is set, it replaces the visible text, and screen readers announce it instead of the label.',
      },
    },
  },
};
