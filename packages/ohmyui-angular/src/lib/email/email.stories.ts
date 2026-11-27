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
 * @file email.stories.ts
 * @description Storybook stories of EmailComponent: variants, sizes, custom
 * label, icon, underline, prefilled subject and body, and the accessibility
 * notes.
 */

import type { Meta, StoryObj } from '@storybook/angular';
import { EmailComponent } from './email';

const meta: Meta<EmailComponent> = {
  title: 'Components/Email',
  component: EmailComponent,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'neutral', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    email: { control: 'text' },
    label: { control: 'text' },
    subject: { control: 'text' },
    body: { control: 'text' },
    showIcon: { control: 'boolean' },
    underline: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<EmailComponent>;

/* Playground */
export const Playground: Story = {
  args: { email: 'hello@example.com', variant: 'primary', size: 'md' },
};

/* Variants */
export const Primary: Story = {
  args: { email: 'hello@example.com', variant: 'primary' },
};
export const Secondary: Story = {
  args: { email: 'hello@example.com', variant: 'secondary' },
};
export const Neutral: Story = {
  args: { email: 'hello@example.com', variant: 'neutral' },
};
export const Ghost: Story = {
  args: { email: 'hello@example.com', variant: 'ghost' },
};

/* Sizes */
export const SizeSm: Story = {
  name: 'Size / SM',
  args: { email: 'hello@example.com', size: 'sm' },
};
export const SizeMd: Story = {
  name: 'Size / MD',
  args: { email: 'hello@example.com', size: 'md' },
};
export const SizeLg: Story = {
  name: 'Size / LG',
  args: { email: 'hello@example.com', size: 'lg' },
};

/* States */
export const WithLabel: Story = {
  name: 'With custom label',
  args: { email: 'support@example.com', label: 'Contact support' },
};
export const NoIcon: Story = {
  name: 'Without icon',
  args: { email: 'hello@example.com', showIcon: false },
};
export const NoUnderline: Story = {
  name: 'Without hover underline',
  args: { email: 'hello@example.com', underline: false },
};
export const WithSubjectAndBody: Story = {
  name: 'With prefilled subject/body',
  args: {
    email: 'support@example.com',
    label: 'Ask for help',
    subject: 'Support request',
    body: 'Hi, I need help with...',
  },
};

/* Accessibility */
export const AccessibleAriaLabel: Story = {
  name: 'Accessibility / Full address always announced',
  args: { email: 'support@example.com', label: 'Contact us' },
  parameters: {
    docs: {
      description: {
        story:
          'The `aria-label` always includes the full email address, also when the visible text is a generic `label` such as "Contact us": screen readers announce who you are writing to, not only the action.',
      },
    },
  },
};
export const AccessibleIconDecorative: Story = {
  name: 'Accessibility / Icon is decorative only',
  args: { email: 'hello@example.com' },
  parameters: {
    docs: {
      description: {
        story:
          'The envelope icon has `aria-hidden="true"`: it is decorative. The meaning of the link comes entirely from the text and the `aria-label`, not from the icon.',
      },
    },
  },
};
