import type { Meta, StoryObj } from '@storybook/angular';
import { ToastItemComponent } from './toast-item';
import type { Toast } from './toast.service';

const makeToast = (overrides: Partial<Toast> = {}): Toast => ({
  id: 'preview',
  type: 'success',
  title: 'Toast title',
  message: 'This is the toast message body.',
  duration: 4000,
  position: 'top-right',
  closable: true,
  removing: false,
  ...overrides,
});

const meta: Meta<ToastItemComponent> = {
  title: 'Components/Toast',
  component: ToastItemComponent,
  argTypes: {
    toast: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<ToastItemComponent>;

/* ── Types ───────────────────────────────────── */

export const Success: Story = {
  name: 'Type / Success',
  args: {
    toast: makeToast({
      type: 'success',
      title: 'Saved!',
      message: 'Your changes have been saved successfully.',
    }),
  },
};

export const Error: Story = {
  name: 'Type / Error',
  args: {
    toast: makeToast({
      type: 'error',
      title: 'Error',
      message: 'Something went wrong. Please try again.',
    }),
  },
};

export const Warning: Story = {
  name: 'Type / Warning',
  args: {
    toast: makeToast({
      type: 'warning',
      title: 'Warning',
      message: 'This action may affect other users.',
    }),
  },
};

export const Info: Story = {
  name: 'Type / Info',
  args: {
    toast: makeToast({
      type: 'info',
      title: 'Info',
      message: 'A new version is available.',
    }),
  },
};

export const Neutral: Story = {
  name: 'Type / Neutral',
  args: {
    toast: makeToast({
      type: 'neutral',
      title: 'Notice',
      message: 'This is a neutral notification.',
    }),
  },
};

/* ── Content ─────────────────────────────────── */

export const TitleOnly: Story = {
  name: 'Content / Title only',
  args: {
    toast: makeToast({ title: 'Saved successfully!', message: undefined }),
  },
};

export const MessageOnly: Story = {
  name: 'Content / Message only',
  args: {
    toast: makeToast({
      title: undefined,
      message: 'Your session will expire in 5 minutes.',
    }),
  },
};

/* ── Features ────────────────────────────────── */

export const Persistent: Story = {
  name: 'Feature / Persistent (no timer)',
  args: {
    toast: makeToast({
      duration: 0,
      title: 'Persistent',
      message: 'This toast will not auto-dismiss.',
    }),
  },
};

export const NotClosable: Story = {
  name: 'Feature / Not closable',
  args: {
    toast: makeToast({
      closable: false,
      title: 'Error',
      message: 'Auto-dismiss only — no × button.',
    }),
  },
};
