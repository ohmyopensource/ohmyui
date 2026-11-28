/**
 * Copyright 2026 The OhMyOpenSource! Authors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * SPDX-License-Identifier: MPL-2.0
 */

/**
 * @file tabs.stories.ts
 * @description Storybook stories of TabsComponent: styles, variants, sizes,
 * icons and badges, full width, vertical layout, a disabled tab and the
 * accessibility notes.
 */

import type { Meta, StoryObj } from '@storybook/angular';
import { useArgs } from 'storybook/preview-api';
import {
  LucideHouse,
  LucideSettings,
  LucideBell,
  LucideUser,
} from '@lucide/angular';
import { TabsComponent, TabItem } from './tabs';

const basicTabs: TabItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'activity', label: 'Activity' },
  { id: 'settings', label: 'Settings' },
];

const iconTabs: TabItem[] = [
  { id: 'home', label: 'Home', icon: LucideHouse.icon },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: LucideBell.icon,
    badge: 3,
  },
  { id: 'profile', label: 'Profile', icon: LucideUser.icon },
  { id: 'settings', label: 'Settings', icon: LucideSettings.icon },
];

const withDisabled: TabItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'activity', label: 'Activity', disabled: true },
  { id: 'settings', label: 'Settings' },
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
    ariaLabel: { control: 'text' },
  },
  render: (args) => {
    // Update activeTab from the event: the component does not change it itself.
    const [, updateArgs] = useArgs();
    return {
      props: {
        ...args,
        tabChange: (id: string) => updateArgs({ activeTab: id }),
      },
    };
  },
};
export default meta;
type Story = StoryObj<TabsComponent>;

/* Playground */
export const Playground: Story = {
  args: { tabs: basicTabs, activeTab: 'overview', tabStyle: 'line' },
};

/* Styles */
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

/* Variants */
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

/* Sizes */
export const SizeSm: Story = {
  name: 'Size / SM',
  args: { tabs: basicTabs, activeTab: 'overview', size: 'sm' },
};
export const SizeLg: Story = {
  name: 'Size / LG',
  args: { tabs: basicTabs, activeTab: 'overview', size: 'lg' },
};

/* Features */
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

/* Accessibility */
export const AccessibleKeyboardNav: Story = {
  name: 'Accessibility / Arrow key navigation',
  args: { tabs: basicTabs, activeTab: 'overview' },
  parameters: {
    docs: {
      description: {
        story:
          'With the focus on a tab, the right and left arrows move to the next and previous tab (down and up when `vertical`), Home and End to the first and last enabled tab. Disabled tabs are skipped. Moving the focus also selects the tab, with no Enter needed, as in the WAI-ARIA tabs pattern with automatic activation.',
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
          'Only the active tab is reached with the Tab key from outside the list; the arrow keys reach the others, as in the WAI-ARIA tabs pattern. Without an active tab, the first enabled tab takes its place, so the list is always reachable from the keyboard.',
      },
    },
  },
};
