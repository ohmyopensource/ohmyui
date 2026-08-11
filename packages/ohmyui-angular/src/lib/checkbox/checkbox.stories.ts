import type { Meta, StoryObj } from '@storybook/angular';
import { CheckboxComponent } from './checkbox';

const meta: Meta<CheckboxComponent> = {
  title: 'Components/Checkbox',
  component: CheckboxComponent,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    variant: { control: 'select', options: ['default', 'filled'] },
    status: { control: 'select', options: ['default', 'error', 'success'] },
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    label: { control: 'text' },
    hint: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<CheckboxComponent>;

export const Playground: Story = {
  args: {
    label: 'Accept terms and conditions',
    size: 'md',
    variant: 'default',
    status: 'default',
  },
};

export const Unchecked: Story = {
  name: 'State / Unchecked',
  args: { label: 'Unchecked', checked: false, size: 'md' },
};

export const Checked: Story = {
  name: 'State / Checked',
  args: { label: 'Checked', checked: true, size: 'md' },
};

export const Indeterminate: Story = {
  name: 'State / Indeterminate',
  args: { label: 'Indeterminate', indeterminate: true, size: 'md' },
};

export const Disabled: Story = {
  name: 'State / Disabled',
  args: { label: 'Disabled', disabled: true, size: 'md' },
};

export const DisabledChecked: Story = {
  name: 'State / Disabled + Checked',
  args: {
    label: 'Disabled checked',
    disabled: true,
    checked: true,
    size: 'md',
  },
};

export const SizeSm: Story = {
  name: 'Size / SM',
  args: { label: 'Small checkbox', size: 'sm', checked: true },
};
export const SizeMd: Story = {
  name: 'Size / MD',
  args: { label: 'Medium checkbox', size: 'md', checked: true },
};
export const SizeLg: Story = {
  name: 'Size / LG',
  args: { label: 'Large checkbox', size: 'lg', checked: true },
};

export const StatusError: Story = {
  name: 'Status / Error',
  args: {
    label: 'Required field',
    hint: 'This field is required.',
    status: 'error',
    size: 'md',
  },
};

export const StatusSuccess: Story = {
  name: 'Status / Success',
  args: {
    label: 'Verified',
    hint: 'Your email has been verified.',
    status: 'success',
    checked: true,
    size: 'md',
  },
};

export const WithHint: Story = {
  name: 'Feature / With hint',
  args: {
    label: 'Subscribe to newsletter',
    hint: 'We will send you updates once a week.',
    size: 'md',
  },
};

export const NoLabel: Story = {
  name: 'Feature / No label',
  args: { size: 'md', checked: true },
};
