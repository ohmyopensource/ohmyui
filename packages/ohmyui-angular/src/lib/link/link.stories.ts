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
import { LinkComponent } from './link';

const meta: Meta<LinkComponent> = {
  title: 'Components/Link',
  component: LinkComponent,
  argTypes: {
    mode: { control: 'select', options: ['internal', 'external'] },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'neutral', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    target: { control: 'select', options: ['_self', '_blank'] },
    href: { control: 'text' },
    label: { control: 'text' },
    showExternalIcon: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<LinkComponent>;

/* ── Playground ──────────────────────────────── */
export const Playground: Story = {
  args: {
    mode: 'external',
    href: 'https://github.com/ohmyopensource',
    label: 'Vai su GitHub',
  },
};

/* ── Mode ────────────────────────────────────── */
export const Internal: Story = {
  args: { mode: 'internal', href: '/docs', label: 'Leggi la documentazione' },
};
export const External: Story = {
  args: {
    mode: 'external',
    href: 'https://github.com/ohmyopensource',
    label: 'Vai su GitHub',
  },
};

/* ── Variants ────────────────────────────────── */
export const Primary: Story = {
  args: { mode: 'external', href: '#', variant: 'primary', label: 'Primary' },
};
export const Secondary: Story = {
  args: {
    mode: 'external',
    href: '#',
    variant: 'secondary',
    label: 'Secondary',
  },
};
export const Neutral: Story = {
  args: { mode: 'external', href: '#', variant: 'neutral', label: 'Neutral' },
};
export const Ghost: Story = {
  args: { mode: 'external', href: '#', variant: 'ghost', label: 'Ghost' },
};

/* ── Sizes ───────────────────────────────────── */
export const SizeSm: Story = {
  name: 'Size / SM',
  args: { mode: 'external', href: '#', size: 'sm', label: 'Small' },
};
export const SizeMd: Story = {
  name: 'Size / MD',
  args: { mode: 'external', href: '#', size: 'md', label: 'Medium' },
};
export const SizeLg: Story = {
  name: 'Size / LG',
  args: { mode: 'external', href: '#', size: 'lg', label: 'Large' },
};

/* ── States ──────────────────────────────────── */
export const NoExternalIcon: Story = {
  name: 'External without icon',
  args: {
    mode: 'external',
    href: 'https://github.com/ohmyopensource',
    label: 'Vai su GitHub',
    showExternalIcon: false,
  },
};
export const SameTab: Story = {
  name: 'External / Same tab',
  args: {
    mode: 'external',
    href: 'https://github.com/ohmyopensource',
    label: 'Vai su GitHub',
    target: '_self',
  },
};

/* ── Accessibility ────────────────────────────── */
export const AccessibleInternalNoIcon: Story = {
  name: 'Accessibility / Internal links never show the external icon',
  args: { mode: 'internal', href: '/docs', label: 'Leggi la documentazione' },
  parameters: {
    docs: {
      description: {
        story:
          "Nella versione originale l'icona \"link esterno\" veniva mostrata anche sui link interni (bug nel template, il flag `displayExternalIcon` era calcolato ma mai usato) — un link di navigazione interna con l'icona di link esterno confonde l'utente, facendogli credere che stia per lasciare il sito. Corretto: l'icona ora compare solo quando `mode` è `external`.",
      },
    },
  },
};
export const AccessibleNewTabAnnouncement: Story = {
  name: 'Accessibility / New tab is announced',
  args: {
    mode: 'external',
    href: 'https://github.com/ohmyopensource',
    label: 'Vai su GitHub',
    target: '_blank',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Quando un link esterno apre `target="_blank"`, riceve un `aria-label` che include "(si apre in una nuova scheda)" — uno screen reader avvisa l\'utente prima del click, non solo dopo. Aggiunto in fase di porting: l\'originale non lo prevedeva.',
      },
    },
  },
};
