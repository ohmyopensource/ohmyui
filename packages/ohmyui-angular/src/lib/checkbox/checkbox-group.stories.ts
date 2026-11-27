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
 * @file checkbox-group.stories.ts
 * @description Storybook stories of CheckboxGroupComponent: orientation,
 * disabled and error states, and the accessibility notes.
 */

import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CheckboxGroupComponent } from './checkbox-group';
import { CheckboxComponent } from './checkbox';

const meta: Meta<CheckboxGroupComponent> = {
  title: 'Components/CheckboxGroup',
  component: CheckboxGroupComponent,
  decorators: [
    moduleMetadata({
      imports: [CheckboxComponent],
    }),
  ],
  argTypes: {
    orientation: { control: 'select', options: ['vertical', 'horizontal'] },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
    errorMessage: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<CheckboxGroupComponent>;

/* Playground */
export const Playground: Story = {
  args: { label: 'Notification preferences', orientation: 'vertical' },
  render: (args) => ({
    props: args,
    template: `
      <ohmyui-checkbox-group
        [label]="label" [description]="description" [orientation]="orientation"
        [required]="required" [disabled]="disabled" [error]="error" [errorMessage]="errorMessage">
        <ohmyui-checkbox label="Email" [checked]="true"></ohmyui-checkbox>
        <ohmyui-checkbox label="SMS"></ohmyui-checkbox>
        <ohmyui-checkbox label="Push notifications"></ohmyui-checkbox>
      </ohmyui-checkbox-group>
    `,
  }),
};

/* Orientation */
export const Vertical: Story = {
  args: { label: 'Interests', orientation: 'vertical' },
  render: (args) => ({
    props: args,
    template: `
      <ohmyui-checkbox-group [label]="label" [orientation]="orientation">
        <ohmyui-checkbox label="Design" [checked]="true"></ohmyui-checkbox>
        <ohmyui-checkbox label="Development" [checked]="true"></ohmyui-checkbox>
        <ohmyui-checkbox label="Marketing"></ohmyui-checkbox>
      </ohmyui-checkbox-group>
    `,
  }),
};
export const Horizontal: Story = {
  args: { label: 'Interests', orientation: 'horizontal' },
  render: (args) => ({
    props: args,
    template: `
      <ohmyui-checkbox-group [label]="label" [orientation]="orientation">
        <ohmyui-checkbox label="Design" [checked]="true"></ohmyui-checkbox>
        <ohmyui-checkbox label="Development" [checked]="true"></ohmyui-checkbox>
        <ohmyui-checkbox label="Marketing"></ohmyui-checkbox>
      </ohmyui-checkbox-group>
    `,
  }),
};

/* States */
export const Disabled: Story = {
  args: { label: 'Preferences', disabled: true },
  render: (args) => ({
    props: args,
    template: `
      <ohmyui-checkbox-group [label]="label" [disabled]="disabled">
        <ohmyui-checkbox label="Email" [checked]="true"></ohmyui-checkbox>
        <ohmyui-checkbox label="SMS"></ohmyui-checkbox>
      </ohmyui-checkbox-group>
    `,
  }),
};
export const WithError: Story = {
  name: 'With error',
  args: {
    label: 'Select at least one option',
    error: true,
    errorMessage: 'You must select at least one preference.',
    required: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <ohmyui-checkbox-group
        [label]="label" [error]="error" [errorMessage]="errorMessage" [required]="required">
        <ohmyui-checkbox label="Email"></ohmyui-checkbox>
        <ohmyui-checkbox label="SMS"></ohmyui-checkbox>
      </ohmyui-checkbox-group>
    `,
  }),
};

/* Accessibility */
export const AccessibleFieldset: Story = {
  name: 'Accessibility / Native fieldset semantics',
  args: {
    label: 'Notification preferences',
    description: 'Choose how you want to be contacted.',
  },
  render: (args) => ({
    props: args,
    template: `
      <ohmyui-checkbox-group [label]="label" [description]="description">
        <ohmyui-checkbox label="Email" [checked]="true"></ohmyui-checkbox>
        <ohmyui-checkbox label="SMS"></ohmyui-checkbox>
      </ohmyui-checkbox-group>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'The group uses a real native `<fieldset>` and `<legend>`: when focus enters any checkbox in it, screen readers announce the name of the group, with no `aria-labelledby` needed on each input.',
      },
    },
  },
};
export const AccessibleDisabledCascade: Story = {
  name: 'Accessibility / Disabled cascades to every checkbox',
  args: { label: 'Preferences (locked)', disabled: true },
  render: (args) => ({
    props: args,
    template: `
      <ohmyui-checkbox-group [label]="label" [disabled]="disabled">
        <ohmyui-checkbox label="Email" [checked]="true"></ohmyui-checkbox>
        <ohmyui-checkbox label="SMS"></ohmyui-checkbox>
        <ohmyui-checkbox label="Push"></ohmyui-checkbox>
      </ohmyui-checkbox-group>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          '`disabled` on the group disables every projected checkbox through the native behavior of `<fieldset disabled>`, with no code to pass the state to each child.',
      },
    },
  },
};
