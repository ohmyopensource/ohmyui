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
 * @description Reusable tabs component supporting multiple visual styles,
 * color variants, sizes, icons, badges, dark theme support, and controlled
 * tab selection through input/output bindings.
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

/** Represents a single tab configuration. */
export interface TabItem {
  id: string;
  label: string;
  icon?: LucideIconData;
  badge?: number | string;
  disabled?: boolean;
}
/** Available color variants for active tab states and highlights. */
export type TabVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';
/** Available tab sizes. */
export type TabSize = 'sm' | 'md' | 'lg';
/**
 * Defines the visual presentation style of the tabs component.
 * - line: active indicator displayed as a bottom border
 * - pill: rounded filled active state
 * - card: card-like appearance with borders and background
 * - underline: text-focused style with animated underline
 */
export type TabStyle = 'line' | 'pill' | 'card' | 'underline';

/**
 * Flexible tabs component used for navigation and content switching.
 *
 * Implementa il pattern WAI-ARIA "tabs" (automatic activation): le frecce
 * spostano il focus tra le tab abilitate e le attivano immediatamente,
 * Home/End saltano rispettivamente alla prima/ultima tab abilitata.
 * L'originale gestiva solo il click — la navigazione da tastiera è un
 * requisito standard per role="tablist", non un extra.
 *
 * Selection state is controlled externally through the activeTab input,
 * while tab changes are emitted via the tabChange output.
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

  /** Collection of tabs to render. */
  @Input() tabs: TabItem[] = [];
  /**
   * Identifier of the currently active tab.
   * This value is controlled externally by the parent component.
   */
  @Input() activeTab = '';
  /** Visual style used to render tabs. */
  @Input() tabStyle: TabStyle = 'line';
  /** Color variant applied to active states and highlights. */
  @Input() variant: TabVariant = 'primary';
  /** Size applied to tabs, icons, and spacing. */
  @Input() size: TabSize = 'md';
  /** Expands tabs to occupy the available width equally. */
  @Input() fullWidth = false;
  /** Renders tabs stacked vertically instead of horizontally. */
  @Input() vertical = false;

  /**
   * Emitted when the active tab changes.
   * Contains the identifier of the selected tab.
   */
  @Output() tabChange = new EventEmitter<string>();

  /**
   * Selects a tab and emits its identifier when the tab is enabled and
   * differs from the current active tab.
   */
  selectTab(tab: TabItem): void {
    if (tab.disabled || tab.id === this.activeTab) return;
    this.tabChange.emit(tab.id);
  }

  /** Checks whether the provided tab matches the currently active tab. */
  isActive(tab: TabItem): boolean {
    return tab.id === this.activeTab;
  }

  /** Resolves the icon size associated with the configured tab size. */
  get iconSize(): number {
    return { sm: 14, md: 16, lg: 18 }[this.size];
  }

  /** Builds the CSS class list applied to the tabs container. */
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

  /** Builds the CSS class list for an individual tab element. */
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

  /** Builds the CSS class list for a tab badge. */
  badgeClasses(tab: TabItem): string {
    return [
      'ohmyui-tabs__badge',
      this.isActive(tab) ? 'ohmyui-tabs__badge--active' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  /** TrackBy function used by Angular to optimize @for rendering. */
  trackById(_: number, tab: TabItem): string {
    return tab.id;
  }

  /**
   * Determines the roving tabindex for a tab: 0 for the active tab (or,
   * when no tab is active, the first enabled one — otherwise the whole
   * tablist would be unreachable via Tab), -1 for every other tab.
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
   * Handles keyboard navigation on a tab button, implementing the WAI-ARIA
   * tablist pattern with automatic activation: arrow keys move focus AND
   * select the tab immediately (no separate Enter/Space activation step),
   * matching the behavior of lightweight, low-cost-to-switch tab groups.
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

  /** Finds the next enabled tab index, wrapping around, in the given direction. */
  private nextEnabledIndex(from: number, direction: 1 | -1): number | null {
    const count = this.tabs.length;
    if (count === 0) return null;
    for (let step = 1; step <= count; step++) {
      const idx = (from + direction * step + count) % count;
      if (!this.tabs[idx].disabled) return idx;
    }
    return null;
  }

  /** Finds the first enabled tab index. */
  private firstEnabledIndex(): number | null {
    const idx = this.tabs.findIndex((t) => !t.disabled);
    return idx === -1 ? null : idx;
  }

  /** Finds the last enabled tab index. */
  private lastEnabledIndex(): number | null {
    for (let i = this.tabs.length - 1; i >= 0; i--) {
      if (!this.tabs[i].disabled) return i;
    }
    return null;
  }

  /** Moves DOM focus to the tab at the given index and selects it. */
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
