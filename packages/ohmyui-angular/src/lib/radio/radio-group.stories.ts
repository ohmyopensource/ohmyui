import type { Meta, StoryObj } from '@storybook/angular';
import { RadioGroupComponent } from './radio-group';
import type { RadioOption } from './radio-group';

const meta: Meta<RadioGroupComponent> = {
  title: 'Components/RadioGroup',
  component: RadioGroupComponent,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    orientation: { control: 'select', options: ['vertical', 'horizontal'] },
    status: { control: 'select', options: ['default', 'error', 'success'] },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    hint: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<RadioGroupComponent>;

const plans: RadioOption[] = [
  {
    value: 'free',
    label: 'Free',
    hint: 'Up to 3 projects, community support.',
  },
  { value: 'pro', label: 'Pro', hint: 'Unlimited projects, priority support.' },
  {
    value: 'team',
    label: 'Team',
    hint: 'Everything in Pro plus team features.',
  },
  {
    value: 'enterprise',
    label: 'Enterprise',
    hint: 'Custom pricing and SLA.',
    disabled: true,
  },
];

const simple: RadioOption[] = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'maybe', label: 'Maybe' },
];

export const Playground: Story = {
  args: {
    options: plans,
    label: 'Select a plan',
    size: 'md',
    orientation: 'vertical',
  },
};

export const Vertical: Story = {
  name: 'Orientation / Vertical',
  args: { options: plans, label: 'Plan', orientation: 'vertical', size: 'md' },
};

export const Horizontal: Story = {
  name: 'Orientation / Horizontal',
  args: {
    options: simple,
    label: 'Do you agree?',
    orientation: 'horizontal',
    size: 'md',
  },
};

export const SizeSm: Story = {
  name: 'Size / SM',
  args: { options: simple, label: 'Small', size: 'sm' },
};
export const SizeMd: Story = {
  name: 'Size / MD',
  args: { options: simple, label: 'Medium', size: 'md' },
};
export const SizeLg: Story = {
  name: 'Size / LG',
  args: { options: simple, label: 'Large', size: 'lg' },
};

export const WithValue: Story = {
  name: 'State / Pre-selected',
  args: { options: plans, label: 'Plan', value: 'pro', size: 'md' },
};

export const Disabled: Story = {
  name: 'State / Disabled',
  args: {
    options: simple,
    label: 'Disabled group',
    disabled: true,
    size: 'md',
  },
};

export const StatusError: Story = {
  name: 'Status / Error',
  args: {
    options: simple,
    label: 'Required',
    hint: 'Please select an option.',
    status: 'error',
    size: 'md',
  },
};

export const StatusSuccess: Story = {
  name: 'Status / Success',
  args: {
    options: simple,
    label: 'Confirmed',
    value: 'yes',
    hint: 'Selection confirmed.',
    status: 'success',
    size: 'md',
  },
};

export const WithHints: Story = {
  name: 'Feature / Options with hints',
  args: { options: plans, label: 'Pricing plan', size: 'md' },
};
