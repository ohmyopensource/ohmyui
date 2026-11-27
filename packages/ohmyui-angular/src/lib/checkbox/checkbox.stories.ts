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
 * @file checkbox.stories.ts
 * @description Storybook stories of CheckboxComponent: variants, sizes, states,
 * description, error, label position and the accessibility notes.
 */

import type { Meta, StoryObj } from '@storybook/angular';
import { CheckboxComponent } from './checkbox';

const meta: Meta<CheckboxComponent> = {
  title: 'Components/Checkbox',
  component: CheckboxComponent,
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
        'neutral',
      ],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    labelPosition: { control: 'select', options: ['left', 'right'] },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
    errorMessage: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<CheckboxComponent>;

/* Playground */
export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    label: 'I accept the terms of service',
    checked: true,
  },
};

/* Variants */
export const Primary: Story = {
  args: { variant: 'primary', label: 'Primary', checked: true },
};
export const Secondary: Story = {
  args: { variant: 'secondary', label: 'Secondary', checked: true },
};
export const Tertiary: Story = {
  args: { variant: 'tertiary', label: 'Tertiary', checked: true },
};
export const Success: Story = {
  args: { variant: 'success', label: 'Success', checked: true },
};
export const Warning: Story = {
  args: { variant: 'warning', label: 'Warning', checked: true },
};
export const Error: Story = {
  args: { variant: 'error', label: 'Error', checked: true },
};
export const Info: Story = {
  args: { variant: 'info', label: 'Info', checked: true },
};
export const Neutral: Story = {
  args: { variant: 'neutral', label: 'Neutral', checked: true },
};

/* Sizes */
export const SizeXs: Story = {
  name: 'Size / XS',
  args: { variant: 'primary', size: 'xs', label: 'Extra small', checked: true },
};
export const SizeSm: Story = {
  name: 'Size / SM',
  args: { variant: 'primary', size: 'sm', label: 'Small', checked: true },
};
export const SizeMd: Story = {
  name: 'Size / MD',
  args: { variant: 'primary', size: 'md', label: 'Medium', checked: true },
};
export const SizeLg: Story = {
  name: 'Size / LG',
  args: { variant: 'primary', size: 'lg', label: 'Large', checked: true },
};

/* States */
export const Unchecked: Story = {
  args: { variant: 'primary', label: 'Unchecked' },
};
export const Indeterminate: Story = {
  args: { variant: 'primary', label: 'Select all', indeterminate: true },
};
export const Disabled: Story = {
  args: { variant: 'primary', label: 'Disabled', disabled: true },
};
export const DisabledChecked: Story = {
  name: 'Disabled (checked)',
  args: {
    variant: 'primary',
    label: 'Disabled and checked',
    disabled: true,
    checked: true,
  },
};
export const WithDescription: Story = {
  name: 'With description',
  args: {
    variant: 'primary',
    label: 'Email notifications',
    description: 'Get a weekly summary by email.',
  },
};
export const WithError: Story = {
  name: 'With error',
  args: {
    variant: 'primary',
    label: 'I accept the terms',
    error: true,
    errorMessage: 'You must accept the terms to continue.',
    required: true,
  },
};
export const LabelLeft: Story = {
  name: 'Label position / Left',
  args: {
    variant: 'primary',
    label: 'Label on the left',
    labelPosition: 'left',
    checked: true,
  },
};

/* Accessibility */
export const AccessibleRequired: Story = {
  name: 'Accessibility / Required field',
  args: { variant: 'primary', label: 'I accept the terms', required: true },
  parameters: {
    docs: {
      description: {
        story:
          'The `required` attribute goes to the real native `<input>`, not only to the asterisk on screen: the browser handles form validation, with nothing to reimplement.',
      },
    },
  },
};
export const AccessibleError: Story = {
  name: 'Accessibility / Error announces via aria-invalid',
  args: {
    variant: 'primary',
    label: 'I accept the terms',
    error: true,
    errorMessage: 'This field is required.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'When `error` is true, the field gets `aria-invalid="true"` and is linked to the error message through `aria-describedby`, and the message has `role="alert"`. Screen readers announce both that the field is invalid and why, not only a change of border color.',
      },
    },
  },
};
export const AccessibleIndeterminate: Story = {
  name: 'Accessibility / Indeterminate is not a form value',
  args: { variant: 'primary', label: 'Select all', indeterminate: true },
  parameters: {
    docs: {
      description: {
        story:
          '`indeterminate` is only visual: it is a DOM property, not an HTML attribute. The value sent with the form has no third state and stays `checked` true or false. A click or a key press on the checkbox always clears the indeterminate state, as browsers do natively.',
      },
    },
  },
};
