import type { Meta, StoryObj } from '@storybook/angular';
import { ModalComponent } from './modal';
import { ButtonComponent } from '../button/button';

const meta: Meta<ModalComponent> = {
  title: 'Components/Modal',
  component: ModalComponent,
  argTypes: {
    open: { control: 'boolean' },
    title: { control: 'text' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'fullscreen'],
    },
    position: {
      control: 'select',
      options: ['center', 'top', 'bottom', 'left', 'right'],
    },
    closable: { control: 'boolean' },
    closeOnOverlay: { control: 'boolean' },
    closeOnEsc: { control: 'boolean' },
    confirmLabel: { control: 'text' },
    cancelLabel: { control: 'text' },
    confirmVariant: {
      control: 'select',
      options: ['primary', 'confirm', 'danger', 'warning', 'info'],
    },
  },
};

export default meta;
type Story = StoryObj<ModalComponent>;

/* ── Playground ──────────────────────────────── */

export const Playground: Story = {
  args: {
    open: true,
    title: 'Modal title',
    size: 'md',
    position: 'center',
    closable: true,
    closeOnOverlay: true,
    closeOnEsc: true,
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel',
    confirmVariant: 'primary',
  },
  render: (args) => ({
    props: {
      ...args,
      closed: () => console.log('closed'),
      confirmed: () => console.log('confirmed'),
    },
    imports: [ModalComponent],
    template: `
      <ohmyui-modal
        [open]="open"
        [title]="title"
        [size]="size"
        [position]="position"
        [closable]="closable"
        [closeOnOverlay]="closeOnOverlay"
        [closeOnEsc]="closeOnEsc"
        [confirmLabel]="confirmLabel"
        [cancelLabel]="cancelLabel"
        [confirmVariant]="confirmVariant"
        (closed)="closed()"
        (confirmed)="confirmed()"
      >
        <div slot="body">
          <p>This is the modal content. You can put any element here.</p>
        </div>
      </ohmyui-modal>
    `,
  }),
};

/* ── Predefined patterns ─────────────────────── */

export const InfoModal: Story = {
  name: 'Pattern / Info',
  render: () => ({
    imports: [ModalComponent],
    template: `
      <ohmyui-modal
        [open]="true"
        title="Information"
        size="sm"
        position="center"
        confirmLabel="Got it"
        confirmVariant="primary"
      >
        <div slot="body">
          <p>Your changes have been saved successfully.</p>
        </div>
      </ohmyui-modal>
    `,
  }),
};

export const ConfirmModal: Story = {
  name: 'Pattern / Confirm',
  render: () => ({
    imports: [ModalComponent],
    template: `
      <ohmyui-modal
        [open]="true"
        title="Save changes?"
        size="sm"
        position="center"
        confirmLabel="Save"
        cancelLabel="Discard"
        confirmVariant="confirm"
      >
        <div slot="body">
          <p>You have unsaved changes. Do you want to save them before leaving?</p>
        </div>
      </ohmyui-modal>
    `,
  }),
};

export const DeleteModal: Story = {
  name: 'Pattern / Delete',
  render: () => ({
    imports: [ModalComponent],
    template: `
      <ohmyui-modal
        [open]="true"
        title="Delete item"
        size="sm"
        position="center"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        confirmVariant="danger"
      >
        <div slot="body">
          <p>Are you sure you want to delete this item? This action cannot be undone.</p>
        </div>
      </ohmyui-modal>
    `,
  }),
};

export const WarningModal: Story = {
  name: 'Pattern / Warning',
  render: () => ({
    imports: [ModalComponent],
    template: `
      <ohmyui-modal
        [open]="true"
        title="Proceed with caution"
        size="sm"
        position="center"
        confirmLabel="Proceed"
        cancelLabel="Go back"
        confirmVariant="warning"
      >
        <div slot="body">
          <p>This operation may affect other users. Are you sure you want to continue?</p>
        </div>
      </ohmyui-modal>
    `,
  }),
};

/* ── Custom slot actions ─────────────────────── */

export const CustomActions: Story = {
  name: 'Pattern / Custom actions',
  render: () => ({
    imports: [ModalComponent, ButtonComponent],
    template: `
      <ohmyui-modal [open]="true" title="New user" size="lg" position="center">
        <div slot="body" style="display:flex;flex-direction:column;gap:16px;">
          <div>
            <label style="display:block;margin-bottom:4px;font-weight:600;font-size:13px;">Name</label>
            <input type="text" placeholder="John" style="width:100%;padding:8px 12px;border:1px solid #d1d5db;border-radius:8px;font-size:15px;box-sizing:border-box;" />
          </div>
          <div>
            <label style="display:block;margin-bottom:4px;font-weight:600;font-size:13px;">Email</label>
            <input type="email" placeholder="john@example.com" style="width:100%;padding:8px 12px;border:1px solid #d1d5db;border-radius:8px;font-size:15px;box-sizing:border-box;" />
          </div>
        </div>
        <div slot="actions">
          <ohmyui-button variant="cancel"  size="md" label="Cancel" />
          <ohmyui-button variant="confirm" size="md" label="Create user" />
        </div>
      </ohmyui-modal>
    `,
  }),
};

/* ── Positions ───────────────────────────────── */

export const PositionTop: Story = {
  name: 'Position / Top',
  render: () => ({
    imports: [ModalComponent],
    template: `
      <ohmyui-modal [open]="true" title="Notification" size="md" position="top"
        confirmLabel="OK" confirmVariant="primary">
        <div slot="body"><p>Modal positioned at the top of the screen.</p></div>
      </ohmyui-modal>
    `,
  }),
};

export const PositionBottom: Story = {
  name: 'Position / Bottom (sheet)',
  render: () => ({
    imports: [ModalComponent],
    template: `
      <ohmyui-modal [open]="true" title="Actions" size="md" position="bottom"
        confirmLabel="Confirm" cancelLabel="Cancel" confirmVariant="primary">
        <div slot="body"><p>Bottom sheet — great for mobile action menus.</p></div>
      </ohmyui-modal>
    `,
  }),
};

export const PositionLeft: Story = {
  name: 'Position / Left (drawer)',
  render: () => ({
    imports: [ModalComponent],
    template: `
      <ohmyui-modal [open]="true" title="Navigation" size="sm" position="left">
        <div slot="body"><p>Left drawer — useful for navigation or filters.</p></div>
      </ohmyui-modal>
    `,
  }),
};

export const PositionRight: Story = {
  name: 'Position / Right (drawer)',
  render: () => ({
    imports: [ModalComponent],
    template: `
      <ohmyui-modal [open]="true" title="Details" size="sm" position="right">
        <div slot="body"><p>Right drawer — useful for details or settings panels.</p></div>
      </ohmyui-modal>
    `,
  }),
};

export const Fullscreen: Story = {
  name: 'Size / Fullscreen',
  render: () => ({
    imports: [ModalComponent],
    template: `
      <ohmyui-modal [open]="true" title="Fullscreen" size="fullscreen" position="center"
        confirmLabel="Close" confirmVariant="primary">
        <div slot="body"><p>Fullscreen modal — takes up the entire viewport.</p></div>
      </ohmyui-modal>
    `,
  }),
};

/* ── Behavior ────────────────────────────────── */

export const NotClosable: Story = {
  name: 'Behavior / Required action',
  render: () => ({
    imports: [ModalComponent],
    template: `
      <ohmyui-modal
        [open]="true"
        title="Action required"
        size="sm"
        position="center"
        [closable]="false"
        [closeOnOverlay]="false"
        [closeOnEsc]="false"
        confirmLabel="Accept"
        cancelLabel="Decline"
        confirmVariant="primary"
      >
        <div slot="body">
          <p>This modal requires an explicit choice — it cannot be dismissed any other way.</p>
        </div>
      </ohmyui-modal>
    `,
  }),
};

/* ── Trigger example ─────────────────────────── */

export const WithTrigger: Story = {
  name: 'Usage / Opened by button',
  render: () => ({
    imports: [ModalComponent, ButtonComponent],
    props: { isOpen: false },
    template: `
      <div style="padding: 40px;">
        <ohmyui-button
          variant="primary"
          size="md"
          label="Open modal"
          (clicked)="isOpen = true"
        />
        <ohmyui-modal
          [open]="isOpen"
          title="Opened by button"
          size="md"
          position="center"
          confirmLabel="Confirm"
          cancelLabel="Cancel"
          confirmVariant="primary"
          (closed)="isOpen = false"
          (confirmed)="isOpen = false"
        >
          <div slot="body">
            <p>This modal was opened by clicking the button above. This is the standard usage pattern.</p>
          </div>
        </ohmyui-modal>
      </div>
    `,
  }),
};
