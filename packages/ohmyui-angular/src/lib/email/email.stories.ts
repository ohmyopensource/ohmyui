/**
 * Copyright 2026 The OhMyOpenSource! Authors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * SPDX-License-Identifier: MPL-2.0
 */

import type { Meta, StoryObj } from '@storybook/angular';
import { EmailComponent } from './email';

const meta: Meta<EmailComponent> = {
  title: 'Components/Email',
  component: EmailComponent,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'neutral', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    email: { control: 'text' },
    label: { control: 'text' },
    subject: { control: 'text' },
    body: { control: 'text' },
    showIcon: { control: 'boolean' },
    underline: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<EmailComponent>;

/* ── Playground ──────────────────────────────── */
export const Playground: Story = {
  args: { email: 'ciao@ohmyopensource.dev', variant: 'primary', size: 'md' },
};

/* ── Variants ────────────────────────────────── */
export const Primary: Story = {
  args: { email: 'ciao@ohmyopensource.dev', variant: 'primary' },
};
export const Secondary: Story = {
  args: { email: 'ciao@ohmyopensource.dev', variant: 'secondary' },
};
export const Neutral: Story = {
  args: { email: 'ciao@ohmyopensource.dev', variant: 'neutral' },
};
export const Ghost: Story = {
  args: { email: 'ciao@ohmyopensource.dev', variant: 'ghost' },
};

/* ── Sizes ───────────────────────────────────── */
export const SizeSm: Story = {
  name: 'Size / SM',
  args: { email: 'ciao@ohmyopensource.dev', size: 'sm' },
};
export const SizeMd: Story = {
  name: 'Size / MD',
  args: { email: 'ciao@ohmyopensource.dev', size: 'md' },
};
export const SizeLg: Story = {
  name: 'Size / LG',
  args: { email: 'ciao@ohmyopensource.dev', size: 'lg' },
};

/* ── States ──────────────────────────────────── */
export const WithLabel: Story = {
  name: 'With custom label',
  args: { email: 'support@ohmyopensource.dev', label: 'Contatta il supporto' },
};
export const NoIcon: Story = {
  name: 'Without icon',
  args: { email: 'ciao@ohmyopensource.dev', showIcon: false },
};
export const NoUnderline: Story = {
  name: 'Without hover underline',
  args: { email: 'ciao@ohmyopensource.dev', underline: false },
};
export const WithSubjectAndBody: Story = {
  name: 'With prefilled subject/body',
  args: {
    email: 'support@ohmyopensource.dev',
    label: 'Richiedi assistenza',
    subject: 'Richiesta di supporto',
    body: 'Ciao, ho bisogno di aiuto con...',
  },
};

/* ── Accessibility ────────────────────────────── */
export const AccessibleAriaLabel: Story = {
  name: 'Accessibility / Full address always announced',
  args: { email: 'support@ohmyopensource.dev', label: 'Contattaci' },
  parameters: {
    docs: {
      description: {
        story:
          'L\'`aria-label` include sempre l\'indirizzo email completo ("Invia email a support@ohmyopensource.dev"), anche quando il testo visibile è un `label` generico come "Contattaci" — uno screen reader annuncia comunque a chi si sta scrivendo, non solo l\'azione.',
      },
    },
  },
};
export const AccessibleIconDecorative: Story = {
  name: 'Accessibility / Icon is decorative only',
  args: { email: 'ciao@ohmyopensource.dev' },
  parameters: {
    docs: {
      description: {
        story:
          "L'icona della busta ha `aria-hidden=\"true\"`: è puramente decorativa. Il significato del link passa interamente dal testo e dall'`aria-label`, non dall'icona.",
      },
    },
  },
};
