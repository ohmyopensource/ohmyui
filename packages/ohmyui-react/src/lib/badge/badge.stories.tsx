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
