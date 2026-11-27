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
 * @file badge.stories.tsx
 * @description Storybook stories of the React Badge, one for each variant and
 * size.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'warning', 'error', 'info', 'neutral'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Success: Story = {
  args: { variant: 'success', size: 'md', label: 'Success' },
};

export const Warning: Story = {
  args: { variant: 'warning', size: 'md', label: 'Warning' },
};

export const Error: Story = {
  args: { variant: 'error', size: 'md', label: 'Error' },
};

export const Info: Story = {
  args: { variant: 'info', size: 'md', label: 'Info' },
};

export const Neutral: Story = {
  args: { variant: 'neutral', size: 'md', label: 'Neutral' },
};

export const Small: Story = {
  args: { variant: 'success', size: 'sm', label: 'Small' },
};
