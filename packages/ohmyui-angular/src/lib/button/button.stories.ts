import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: { variant: 'primary', size: 'md', label: 'Click me' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', size: 'md', label: 'Click me' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', size: 'md', label: 'Click me' },
};

export const Small: Story = {
  args: { variant: 'primary', size: 'sm', label: 'Small' },
};

export const Large: Story = {
  args: { variant: 'primary', size: 'lg', label: 'Large' },
};

export const Disabled: Story = {
  args: { variant: 'primary', size: 'md', disabled: true, label: 'Disabled' },
};
