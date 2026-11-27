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
import {
  LucideHouse,
  LucideSettings,
  LucideBell,
  LucideUser,
} from '@lucide/angular';
import { TabsComponent, TabItem } from './tabs';

const basicTabs: TabItem[] = [
  { id: 'overview', label: 'Panoramica' },
  { id: 'activity', label: 'Attività' },
  { id: 'settings', label: 'Impostazioni' },
];

const iconTabs: TabItem[] = [
  { id: 'home', label: 'Home', icon: LucideHouse.icon },
  { id: 'notifications', label: 'Notifiche', icon: LucideBell.icon, badge: 3 },
  { id: 'profile', label: 'Profilo', icon: LucideUser.icon },
  { id: 'settings', label: 'Impostazioni', icon: LucideSettings.icon },
];

const withDisabled: TabItem[] = [
  { id: 'overview', label: 'Panoramica' },
  { id: 'activity', label: 'Attività', disabled: true },
  { id: 'settings', label: 'Impostazioni' },
];

const meta: Meta<TabsComponent> = {
  title: 'Components/Tabs',
  component: TabsComponent,
  argTypes: {
    tabStyle: {
      control: 'select',
      options: ['line', 'pill', 'card', 'underline'],
    },
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
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    fullWidth: { control: 'boolean' },
    vertical: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<TabsComponent>;

/* ── Playground ──────────────────────────────── */
export const Playground: Story = {
  args: { tabs: basicTabs, activeTab: 'overview', tabStyle: 'line' },
};

/* ── Styles ──────────────────────────────────── */
export const StyleLine: Story = {
  name: 'Style / Line',
  args: { tabs: basicTabs, activeTab: 'overview', tabStyle: 'line' },
};
export const StylePill: Story = {
  name: 'Style / Pill',
  args: { tabs: basicTabs, activeTab: 'overview', tabStyle: 'pill' },
};
export const StyleCard: Story = {
  name: 'Style / Card',
  args: { tabs: basicTabs, activeTab: 'overview', tabStyle: 'card' },
};
export const StyleUnderline: Story = {
  name: 'Style / Underline',
  args: { tabs: basicTabs, activeTab: 'overview', tabStyle: 'underline' },
};

/* ── Variants ────────────────────────────────── */
export const Success: Story = {
  args: {
    tabs: basicTabs,
    activeTab: 'overview',
    tabStyle: 'line',
    variant: 'success',
  },
};
export const Error: Story = {
  args: {
    tabs: basicTabs,
    activeTab: 'overview',
    tabStyle: 'pill',
    variant: 'error',
  },
};

/* ── Sizes ───────────────────────────────────── */
export const SizeSm: Story = {
  name: 'Size / SM',
  args: { tabs: basicTabs, activeTab: 'overview', size: 'sm' },
};
export const SizeLg: Story = {
  name: 'Size / LG',
  args: { tabs: basicTabs, activeTab: 'overview', size: 'lg' },
};

/* ── Features ────────────────────────────────── */
export const WithIconsAndBadge: Story = {
  name: 'With icons and badge',
  args: { tabs: iconTabs, activeTab: 'home', tabStyle: 'pill' },
};
export const FullWidth: Story = {
  args: { tabs: basicTabs, activeTab: 'overview', fullWidth: true },
};
export const Vertical: Story = {
  args: { tabs: iconTabs, activeTab: 'home', vertical: true, tabStyle: 'pill' },
};
export const WithDisabledTab: Story = {
  name: 'With a disabled tab',
  args: { tabs: withDisabled, activeTab: 'overview' },
};

/* ── Accessibility ────────────────────────────── */
export const AccessibleKeyboardNav: Story = {
  name: 'Accessibility / Arrow key navigation',
  args: { tabs: basicTabs, activeTab: 'overview' },
  parameters: {
    docs: {
      description: {
        story:
          "Aggiunto in fase di porting — l'originale gestiva solo il click. Con il focus su una tab: Freccia destra/sinistra passa alla tab successiva/precedente (giù/su se `vertical`), Home/End saltano rispettivamente alla prima/ultima tab abilitata. Le tab disabilitate vengono saltate automaticamente. Attivazione automatica: spostare il focus seleziona subito la tab, senza bisogno di premere Invio.",
      },
    },
  },
};
export const AccessibleRovingTabindex: Story = {
  name: 'Accessibility / Roving tabindex',
  args: { tabs: basicTabs, activeTab: 'activity' },
  parameters: {
    docs: {
      description: {
        story:
          'Solo la tab attiva è raggiungibile premendo Tab da fuori il gruppo — le altre si raggiungono con le frecce una volta dentro, come da pattern WAI-ARIA "tablist". Se nessuna tab è attiva, il fallback è la prima tab abilitata: il gruppo non deve mai restare irraggiungibile da tastiera.',
      },
    },
  },
};
export const AccessibleVariantAwareDarkMode: Story = {
  name: 'Accessibility / Dark mode respects the chosen variant',
  args: {
    tabs: basicTabs,
    activeTab: 'overview',
    tabStyle: 'line',
    variant: 'success',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Bug corretto in fase di porting: nell\'originale, in dark mode il testo della tab attiva tornava sempre "primary" indipendentemente dalla variante scelta (un solo override CSS non scoped alla variante). Ora ogni variante mantiene il proprio colore anche in dark mode.',
      },
    },
  },
};
