import type { Meta, StoryObj } from '@storybook/angular';
import { SelectComponent } from './select';
import type { SelectOption } from './select';

const meta: Meta<SelectComponent> = {
  title: 'Components/Select',
  component: SelectComponent,
  argTypes: {
    variant: { control: 'select', options: ['default', 'filled', 'ghost'] },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    status: { control: 'select', options: ['default', 'error', 'success'] },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    clearable: { control: 'boolean' },
    searchable: { control: 'boolean' },
    multiple: { control: 'boolean' },
    label: { control: 'text' },
    hint: { control: 'text' },
    placeholder: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<SelectComponent>;

const fruits: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'durian', label: 'Durian', disabled: true },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
  { value: 'grape', label: 'Grape' },
];

const grouped: SelectOption[] = [
  { value: 'react', label: 'React', group: 'Frontend' },
  { value: 'angular', label: 'Angular', group: 'Frontend' },
  { value: 'vue', label: 'Vue', group: 'Frontend' },
  { value: 'node', label: 'Node.js', group: 'Backend' },
  { value: 'django', label: 'Django', group: 'Backend' },
  { value: 'rails', label: 'Rails', group: 'Backend' },
  { value: 'postgres', label: 'PostgreSQL', group: 'Database' },
  { value: 'mongo', label: 'MongoDB', group: 'Database' },
];

/* ── Playground ──────────────────────────────── */

export const Playground: Story = {
  args: {
    options: fruits,
    label: 'Favourite fruit',
    placeholder: 'Select a fruit',
    variant: 'default',
    size: 'md',
    status: 'default',
    clearable: true,
    searchable: false,
    multiple: false,
  },
};

/* ── Variants ────────────────────────────────── */

export const Default: Story = {
  name: 'Variant / Default',
  args: { options: fruits, label: 'Default', variant: 'default', size: 'md' },
};

export const Filled: Story = {
  name: 'Variant / Filled',
  args: { options: fruits, label: 'Filled', variant: 'filled', size: 'md' },
};

export const Ghost: Story = {
  name: 'Variant / Ghost',
  args: { options: fruits, label: 'Ghost', variant: 'ghost', size: 'md' },
};

/* ── Sizes ───────────────────────────────────── */

export const SizeXs: Story = {
  name: 'Size / XS',
  args: { options: fruits, label: 'Extra small', size: 'xs' },
};
export const SizeSm: Story = {
  name: 'Size / SM',
  args: { options: fruits, label: 'Small', size: 'sm' },
};
export const SizeMd: Story = {
  name: 'Size / MD',
  args: { options: fruits, label: 'Medium', size: 'md' },
};
export const SizeLg: Story = {
  name: 'Size / LG',
  args: { options: fruits, label: 'Large', size: 'lg' },
};
export const SizeXl: Story = {
  name: 'Size / XL',
  args: { options: fruits, label: 'Extra large', size: 'xl' },
};

/* ── Status ──────────────────────────────────── */

export const StatusError: Story = {
  name: 'Status / Error',
  args: {
    options: fruits,
    label: 'Country',
    hint: 'Please select a valid option.',
    status: 'error',
    size: 'md',
  },
};

export const StatusSuccess: Story = {
  name: 'Status / Success',
  args: {
    options: fruits,
    label: 'Country',
    value: 'apple',
    hint: 'Great choice!',
    status: 'success',
    size: 'md',
  },
};

/* ── States ──────────────────────────────────── */

export const Disabled: Story = {
  name: 'State / Disabled',
  args: { options: fruits, label: 'Disabled', disabled: true, size: 'md' },
};

export const Loading: Story = {
  name: 'State / Loading',
  args: {
    options: fruits,
    label: 'Loading options...',
    loading: true,
    size: 'md',
  },
};

export const WithValue: Story = {
  name: 'State / With value',
  args: { options: fruits, label: 'Pre-selected', value: 'banana', size: 'md' },
};

/* ── Features ────────────────────────────────── */

export const Clearable: Story = {
  name: 'Feature / Clearable',
  args: {
    options: fruits,
    label: 'Clearable',
    value: 'cherry',
    clearable: true,
    size: 'md',
  },
};

export const Searchable: Story = {
  name: 'Feature / Searchable',
  args: {
    options: fruits,
    label: 'Searchable',
    searchable: true,
    size: 'md',
    placeholder: 'Search a fruit...',
  },
};

export const Multiple: Story = {
  name: 'Feature / Multiple',
  args: {
    options: fruits,
    label: 'Multiple selection',
    multiple: true,
    size: 'md',
    clearable: true,
  },
};

export const MultipleWithValue: Story = {
  name: 'Feature / Multiple with values',
  args: {
    options: fruits,
    label: 'Multiple (pre-selected)',
    multiple: true,
    value: ['apple', 'cherry', 'grape'],
    clearable: true,
    size: 'md',
  },
};

export const Grouped: Story = {
  name: 'Feature / Grouped options',
  args: {
    options: grouped,
    label: 'Technology stack',
    placeholder: 'Select a technology',
    size: 'md',
    searchable: true,
  },
};

export const WithHint: Story = {
  name: 'Feature / With hint',
  args: {
    options: fruits,
    label: 'Favourite fruit',
    hint: 'Choose the fruit you eat most often.',
    size: 'md',
  },
};

/* ── Combined ────────────────────────────────── */

export const SearchableMultiple: Story = {
  name: 'Combined / Searchable + Multiple',
  args: {
    options: grouped,
    label: 'Technologies',
    placeholder: 'Select technologies...',
    multiple: true,
    searchable: true,
    clearable: true,
    size: 'md',
  },
};

export const FilledSearchable: Story = {
  name: 'Combined / Filled + Searchable',
  args: {
    options: fruits,
    label: 'Fruit',
    variant: 'filled',
    searchable: true,
    clearable: true,
    size: 'md',
  },
};
