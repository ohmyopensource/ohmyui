import type { Meta, StoryObj } from '@storybook/angular';
import { SwitchComponent } from './switch';

const meta: Meta<SwitchComponent> = {
  title: 'Components/Switch',
  component: SwitchComponent,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    status: { control: 'select', options: ['default', 'error', 'success'] },
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
    label: { control: 'text' },
    labelOn: { control: 'text' },
    labelOff: { control: 'text' },
    hint: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<SwitchComponent>;

export const Playground: Story = {
  args: { label: 'Enable notifications', size: 'md', status: 'default' },
};

export const Off: Story = {
  name: 'State / Off',
  args: { label: 'Dark mode', checked: false, size: 'md' },
};
export const On: Story = {
  name: 'State / On',
  args: { label: 'Dark mode', checked: true, size: 'md' },
};

export const Disabled: Story = {
  name: 'State / Disabled',
  args: { label: 'Disabled', disabled: true, size: 'md' },
};

export const DisabledOn: Story = {
  name: 'State / Disabled + On',
  args: { label: 'Disabled on', disabled: true, checked: true, size: 'md' },
};

export const SizeSm: Story = {
  name: 'Size / SM',
  args: { label: 'Small', size: 'sm', checked: true },
};
export const SizeMd: Story = {
  name: 'Size / MD',
  args: { label: 'Medium', size: 'md', checked: true },
};
export const SizeLg: Story = {
  name: 'Size / LG',
  args: { label: 'Large', size: 'lg', checked: true },
};

export const StatusError: Story = {
  name: 'Status / Error',
  args: {
    label: 'Two-factor auth',
    hint: 'This setting is required.',
    status: 'error',
    size: 'md',
  },
};

export const StatusSuccess: Story = {
  name: 'Status / Success',
  args: {
    label: 'Email verified',
    hint: 'Enabled successfully.',
    status: 'success',
    checked: true,
    size: 'md',
  },
};

export const DynamicLabel: Story = {
  name: 'Feature / Dynamic label (on/off)',
  args: {
    labelOn: 'Enabled',
    labelOff: 'Disabled',
    size: 'md',
    checked: false,
  },
};

export const WithHint: Story = {
  name: 'Feature / With hint',
  args: {
    label: 'Marketing emails',
    hint: 'Receive occasional product updates and news.',
    size: 'md',
  },
};

export const NoLabel: Story = {
  name: 'Feature / No label',
  args: { size: 'md', checked: true },
};
