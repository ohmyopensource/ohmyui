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
 * @file input.stories.ts
 * @description Storybook stories of InputComponent: types, sizes, validation
 * messages, prefix, suffix, icons, clear button, states and the accessibility
 * notes.
 */

import type { Meta, StoryObj } from '@storybook/angular';
import { LucideSearch, LucideMail, LucideEuro } from '@lucide/angular';
import { InputComponent } from './input';

const meta: Meta<InputComponent> = {
  title: 'Components/Input',
  component: InputComponent,
  argTypes: {
    type: {
      control: 'select',
      options: [
        'text',
        'email',
        'password',
        'tel',
        'number',
        'url',
        'search',
        'textarea',
        'select',
      ],
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    hint: { control: 'text' },
    errorMessage: { control: 'text' },
    successMessage: { control: 'text' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    required: { control: 'boolean' },
    clearable: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<InputComponent>;

/* Playground */
export const Playground: Story = {
  args: { label: 'Username', placeholder: 'jane_doe', type: 'text' },
};

/* Types */
export const Text: Story = {
  args: { label: 'Name', type: 'text', placeholder: 'Your name' },
};
export const Email: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'name@example.com',
    iconLeft: LucideMail.icon,
  },
};
export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'At least 8 characters',
  },
};
export const Number: Story = {
  args: { label: 'Quantity', type: 'number', placeholder: '0' },
};
export const Search: Story = {
  args: {
    label: 'Search',
    type: 'search',
    placeholder: 'Search the site',
    iconLeft: LucideSearch.icon,
    clearable: true,
  },
};
export const Textarea: Story = {
  args: {
    label: 'Message',
    type: 'textarea',
    placeholder: 'Write here',
    rows: 4,
  },
};
export const Select: Story = {
  args: {
    label: 'Country',
    type: 'select',
    selectPlaceholder: 'Select a country',
    options: [
      { label: 'Italy', value: 'it' },
      { label: 'France', value: 'fr' },
      { label: 'Germany', value: 'de' },
    ],
  },
};

/* Sizes */
export const SizeSm: Story = {
  name: 'Size / SM',
  args: { label: 'Small', size: 'sm', placeholder: 'Placeholder' },
};
export const SizeMd: Story = {
  name: 'Size / MD',
  args: { label: 'Medium', size: 'md', placeholder: 'Placeholder' },
};
export const SizeLg: Story = {
  name: 'Size / LG',
  args: { label: 'Large', size: 'lg', placeholder: 'Placeholder' },
};

/* Validation */
export const WithError: Story = {
  name: 'Validation / Error',
  args: {
    label: 'Email',
    type: 'email',
    errorMessage: 'Enter a valid email address.',
  },
};
export const WithSuccess: Story = {
  name: 'Validation / Success',
  args: { label: 'Username', successMessage: 'Username available.' },
};
export const WithHint: Story = {
  name: 'Validation / Hint',
  args: {
    label: 'Password',
    type: 'password',
    hint: 'At least 8 characters, one uppercase letter and one number.',
  },
};

/* Prefix, suffix and icons */
export const WithPrefix: Story = {
  args: { label: 'Website', prefix: 'https://', placeholder: 'example.com' },
};
export const WithSuffix: Story = {
  args: { label: 'Price', type: 'number', suffix: '€', placeholder: '0.00' },
};
export const WithIconLeft: Story = {
  name: 'With icon (left)',
  args: {
    label: 'Price',
    type: 'number',
    iconLeft: LucideEuro.icon,
    placeholder: '0.00',
  },
};
export const Clearable: Story = {
  args: {
    label: 'Search',
    clearable: true,
    placeholder: 'Type to show the clear button',
  },
};

/* States */
export const Disabled: Story = {
  args: {
    label: 'Disabled field',
    disabled: true,
    placeholder: 'Not editable',
  },
};
export const Readonly: Story = {
  args: {
    label: 'Read-only field',
    readonly: true,
    placeholder: 'Fixed value',
  },
};
export const Required: Story = {
  args: {
    label: 'Required field',
    required: true,
    placeholder: 'Fill in this field',
  },
};

/* Accessibility */
export const AccessibleErrorAnnounced: Story = {
  name: 'Accessibility / Error is announced and linked',
  args: {
    label: 'Email',
    type: 'email',
    errorMessage: 'Invalid email format.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'The field gets `aria-invalid="true"` and is linked to the error message through `aria-describedby`, and the message has `role="alert"`: screen readers announce both that the field is invalid and why. The textarea and the select are linked to their message in the same way.',
      },
    },
  },
};
export const AccessiblePasswordToggle: Story = {
  name: 'Accessibility / Password visibility has a real label',
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Type a password to try the toggle',
  },
  parameters: {
    docs: {
      description: {
        story:
          'The button that shows or hides the password has an `aria-label` that follows its state, so screen readers always say what a click does instead of announcing an unlabeled icon.',
      },
    },
  },
};
