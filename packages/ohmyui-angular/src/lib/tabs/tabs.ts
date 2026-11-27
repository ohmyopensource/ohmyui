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
 * @file tabs.ts
 * @description TabsComponent (`ohmyui-tabs`): a tab list in four styles (line,
 * pill, card, underline), seven variants and three sizes, horizontal or
 * vertical, with optional icons and badges and keyboard navigation.
 */

import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewChildren,
  QueryList,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideDynamicIcon, LucideIconData } from '@lucide/angular';

/** Tab of a tab list. */
export interface TabItem {
  /** Id of the tab, emitted by `tabChange`. */
  id: string;
  /** Text of the tab. */
  label: string;
  /** Lucide icon shown before the label. */
  icon?: LucideIconData;
  /** Value shown in a badge after the label. */
  badge?: number | string;
  /** Whether the tab is disabled. */
  disabled?: boolean;
}
/** Color of the active tab in a tab list. */
export type TabVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';
/** Size of a tab list. */
export type TabSize = 'sm' | 'md' | 'lg';
/**
 * Look of the tabs: a line under the active tab (`line`), a filled pill
 * (`pill`), cards with border and background (`card`) or an animated
 * underline under the text (`underline`).
 */
export type TabStyle = 'line' | 'pill' | 'card' | 'underline';

/**
 * Tab list for switching between views.
 *
 * It follows the WAI-ARIA tabs pattern with automatic activation: the arrow
 * keys move the focus to the next or previous enabled tab and select it, Home
 * and End to the first and last enabled tab. It does not change `activeTab`
 * itself: update it from `tabChange`.
 */
@Component({
  selector: 'ohmyui-tabs',
  standalone: true,
  imports: [CommonModule, LucideDynamicIcon],
  templateUrl: './tabs.html',
  styleUrl: './tabs.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {
  @ViewChildren('tabButton') private tabButtons?: QueryList<
    ElementRef<HTMLButtonElement>
  >;

  /** Tabs to show. */
  @Input() tabs: TabItem[] = [];
  /** Id of the active tab. */
  @Input() activeTab = '';
  /** Look of the tabs. */
  @Input() tabStyle: TabStyle = 'line';
  /** Color of the active tab. */
  @Input() variant: TabVariant = 'primary';
  /** Size of the tabs. */
  @Input() size: TabSize = 'md';
  /** Whether the tabs share the width of the container equally. */
  @Input() fullWidth = false;
  /** Whether the tabs are stacked vertically. */
  @Input() vertical = false;

  /** Emitted with the id of the tab that the user selects. */
  @Output() tabChange = new EventEmitter<string>();

  /**
   * Emits `tabChange` with the id of the tab, unless it is disabled or
   * already active.
   *
   * @param tab Tab to select.
   */
  selectTab(tab: TabItem): void {
    if (tab.disabled || tab.id === this.activeTab) return;
    this.tabChange.emit(tab.id);
  }

  /** Whether the tab is the active one. */
  isActive(tab: TabItem): boolean {
    return tab.id === this.activeTab;
  }

  /** Size in pixels of the icons for the current size. */
  get iconSize(): number {
    return { sm: 14, md: 16, lg: 18 }[this.size];
  }

  /** CSS classes of the tab list. */
  get wrapperClasses(): string {
    return [
      'ohmyui-tabs',
      `ohmyui-tabs--${this.tabStyle}`,
      `ohmyui-tabs--${this.variant}`,
      `ohmyui-tabs--${this.size}`,
      this.fullWidth ? 'ohmyui-tabs--full' : '',
      this.vertical ? 'ohmyui-tabs--vertical' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  /** CSS classes of a tab. */
  tabClasses(tab: TabItem): string {
    return [
      'ohmyui-tabs__tab',
      this.isActive(tab) ? 'ohmyui-tabs__tab--active' : '',
      tab.disabled ? 'ohmyui-tabs__tab--disabled' : '',
      this.fullWidth || this.vertical ? 'ohmyui-tabs__tab--full' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  /** CSS classes of the badge of a tab. */
  badgeClasses(tab: TabItem): string {
    return [
      'ohmyui-tabs__badge',
      this.isActive(tab) ? 'ohmyui-tabs__badge--active' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  /** Tracking key of a tab. */
  trackById(_: number, tab: TabItem): string {
    return tab.id;
  }

  /**
   * Whether the tab is reached with the Tab key: the active tab or, without
   * one, the first enabled tab. The arrow keys reach the others.
   */
  isTabStop(tab: TabItem): boolean {
    if (tab.disabled) return false;
    if (this.tabs.some((t) => this.isActive(t))) return this.isActive(tab);
    return (
      this.firstEnabledIndex() !== null &&
      this.tabs[this.firstEnabledIndex() as number] === tab
    );
  }

  /**
   * Moves the focus with the arrow keys, Home and End, and selects the
   * focused tab.
   *
   * @param event Key press on a tab.
   * @param index Index of the tab.
   */
  onKeydown(event: KeyboardEvent, index: number): void {
    const forward = this.vertical ? 'ArrowDown' : 'ArrowRight';
    const backward = this.vertical ? 'ArrowUp' : 'ArrowLeft';

    if (event.key === forward) {
      event.preventDefault();
      this.focusAndSelect(this.nextEnabledIndex(index, 1));
    } else if (event.key === backward) {
      event.preventDefault();
      this.focusAndSelect(this.nextEnabledIndex(index, -1));
    } else if (event.key === 'Home') {
      event.preventDefault();
      this.focusAndSelect(this.firstEnabledIndex());
    } else if (event.key === 'End') {
      event.preventDefault();
      this.focusAndSelect(this.lastEnabledIndex());
    }
  }

  /**
   * Index of the next enabled tab in the direction, wrapping around, or null.
   */
  private nextEnabledIndex(from: number, direction: 1 | -1): number | null {
    const count = this.tabs.length;
    if (count === 0) return null;
    for (let step = 1; step <= count; step++) {
      const idx = (from + direction * step + count) % count;
      if (!this.tabs[idx].disabled) return idx;
    }
    return null;
  }

  /** Index of the first enabled tab, or null. */
  private firstEnabledIndex(): number | null {
    const idx = this.tabs.findIndex((t) => !t.disabled);
    return idx === -1 ? null : idx;
  }

  /** Index of the last enabled tab, or null. */
  private lastEnabledIndex(): number | null {
    for (let i = this.tabs.length - 1; i >= 0; i--) {
      if (!this.tabs[i].disabled) return i;
    }
    return null;
  }

  /** Focuses the tab at the index and selects it. */
  private focusAndSelect(index: number | null): void {
    if (index === null || !this.tabButtons) return;
    const target = this.tabButtons.get(index);
    const tab = this.tabs[index];
    if (target && tab) {
      target.nativeElement.focus();
      this.selectTab(tab);
    }
  }
}
