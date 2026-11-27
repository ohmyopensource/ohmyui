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
import { PaginationComponent } from './pagination';

const meta: Meta<PaginationComponent> = {
  title: 'Components/Pagination',
  component: PaginationComponent,
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'success',
        'warning',
        'error',
        'info',
      ],
    },
    emphasis: { control: 'select', options: ['filled', 'soft', 'minimal'] },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
    totalItems: { control: 'number' },
    pageSize: { control: 'number' },
    currentPage: { control: 'number' },
    maxVisiblePages: { control: 'number' },
    showPageSizeSelector: { control: 'boolean' },
    showInfo: { control: 'boolean' },
    showFirstLast: { control: 'boolean' },
    showJumpToPage: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<PaginationComponent>;

/* ── Playground ──────────────────────────────── */
export const Playground: Story = {
  args: { totalItems: 237, pageSize: 10, currentPage: 4 },
};

/* ── Variants ────────────────────────────────── */
export const Primary: Story = {
  args: { totalItems: 237, currentPage: 4, variant: 'primary' },
};
export const Secondary: Story = {
  args: { totalItems: 237, currentPage: 4, variant: 'secondary' },
};
export const Success: Story = {
  args: { totalItems: 237, currentPage: 4, variant: 'success' },
};
export const Error: Story = {
  args: { totalItems: 237, currentPage: 4, variant: 'error' },
};

/* ── Emphasis ────────────────────────────────── */
export const EmphasisFilled: Story = {
  name: 'Emphasis / Filled',
  args: { totalItems: 237, currentPage: 4, emphasis: 'filled' },
};
export const EmphasisSoft: Story = {
  name: 'Emphasis / Soft',
  args: { totalItems: 237, currentPage: 4, emphasis: 'soft' },
};
export const EmphasisMinimal: Story = {
  name: 'Emphasis / Minimal',
  args: { totalItems: 237, currentPage: 4, emphasis: 'minimal' },
};

/* ── Sizes ───────────────────────────────────── */
export const SizeXs: Story = {
  name: 'Size / XS',
  args: { totalItems: 237, currentPage: 4, size: 'xs' },
};
export const SizeLg: Story = {
  name: 'Size / LG',
  args: { totalItems: 237, currentPage: 4, size: 'lg' },
};

/* ── Ellipsis behavior ───────────────────────── */
export const ManyPages: Story = {
  name: 'Many pages (ellipsis in the middle)',
  args: {
    totalItems: 5000,
    pageSize: 10,
    currentPage: 250,
    maxVisiblePages: 7,
  },
};
export const NearStart: Story = {
  name: 'Near start (ellipsis only on the right)',
  args: { totalItems: 5000, pageSize: 10, currentPage: 2, maxVisiblePages: 7 },
};
export const NearEnd: Story = {
  name: 'Near end (ellipsis only on the left)',
  args: {
    totalItems: 5000,
    pageSize: 10,
    currentPage: 499,
    maxVisiblePages: 7,
  },
};
export const FewPages: Story = {
  name: 'Few pages (no ellipsis needed)',
  args: { totalItems: 35, pageSize: 10, currentPage: 2 },
};

/* ── Features ────────────────────────────────── */
export const WithJumpToPage: Story = {
  name: 'With jump-to-page',
  args: {
    totalItems: 5000,
    pageSize: 10,
    currentPage: 250,
    showJumpToPage: true,
  },
};
export const NoPageSizeSelector: Story = {
  name: 'Without page size selector',
  args: { totalItems: 237, currentPage: 4, showPageSizeSelector: false },
};
export const NoFirstLast: Story = {
  name: 'Without first/last buttons',
  args: { totalItems: 237, currentPage: 4, showFirstLast: false },
};

/* ── States ──────────────────────────────────── */
export const Disabled: Story = {
  args: { totalItems: 237, currentPage: 4, disabled: true },
};
export const EmptyResults: Story = {
  name: 'Empty results',
  args: { totalItems: 0, currentPage: 1 },
};

/* ── Accessibility ────────────────────────────── */
export const AccessibleCurrentPage: Story = {
  name: 'Accessibility / Current page is announced',
  args: { totalItems: 237, currentPage: 4 },
  parameters: {
    docs: {
      description: {
        story:
          'Il bottone della pagina corrente riceve `aria-current="page"` — uno screen reader annuncia qual è la pagina attiva senza dover dedurlo dallo stile visivo. Il gruppo di controlli ha `role="group"` con `aria-label` proprio, e ogni bottone icona ha un `aria-label` descrittivo ("Pagina precedente", non solo un\'icona muta).',
      },
    },
  },
};
export const AccessibleTypeSafety: Story = {
  name: 'Accessibility / Type restricted to visually supported variants',
  args: { totalItems: 237, currentPage: 4, variant: 'primary' },
  parameters: {
    docs: {
      description: {
        story:
          'L\'originale importava il tipo `ButtonVariant` (11 valori) dal componente Button, ma il CSS di Pagination implementa lo stile "active" solo per 7 di quei valori — impostare `variant="ghost"` avrebbe compilato senza errori ma senza alcun effetto visivo. Il tipo `PaginationVariant`, locale a questo componente, espone solo le varianti realmente supportate dal CSS.',
      },
    },
  },
};
