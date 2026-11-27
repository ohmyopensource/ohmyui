/**
 * Copyright 2026 The OhMyOpenSource! Authors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * SPDX-License-Identifier: MPL-2.0
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
  args: { variant: 'success', dot: true, ariaLabel: 'Stato: online' },
  parameters: {
    docs: {
      description: {
        story:
          'Un badge "dot-only" non ha testo visibile: il componente calcola `aria-label` come `ariaLabel || label || null`, quindi senza un `ariaLabel` esplicito il badge risulterebbe invisibile a uno screen reader. Impostare sempre `ariaLabel` quando si usa `dot` senza `label`.',
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
          'Quando `removable` è true, il badge riceve `role="status"` per annunciare eventuali cambiamenti agli screen reader. Il pulsante di rimozione ha un `aria-label` dedicato ("Rimuovi " + label), indipendente dal testo visivo (una semplice "×").',
      },
    },
  },
};
export const AccessibleCount: Story = {
  name: 'Accessibility / Descriptive label for counters',
  args: { variant: 'error', count: 12, ariaLabel: '12 notifiche non lette' },
  parameters: {
    docs: {
      description: {
        story:
          'In modalità contatore il testo visivo è solo il numero ("12"). Un numero isolato non è sempre comprensibile fuori contesto: fornire un `ariaLabel` descrittivo (es. "12 notifiche non lette") rende l\'annuncio dello screen reader autoesplicativo.',
      },
    },
  },
};
export const AccessibleIcon: Story = {
  name: 'Accessibility / Icon is decorative only',
  args: { variant: 'warning', label: 'In revisione', icon: LucideStar.icon },
  parameters: {
    docs: {
      description: {
        story:
          'L\'icona è sempre marcata `aria-hidden="true"` nel template: è puramente decorativa. Il significato deve passare sempre dal testo (`label`) o da `ariaLabel` — mai affidarsi all\'icona da sola per comunicare informazioni.',
      },
    },
  },
};
