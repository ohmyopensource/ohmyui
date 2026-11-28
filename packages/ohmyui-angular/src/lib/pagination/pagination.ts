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
 * @file pagination.ts
 * @description PaginationComponent (`ohmyui-pagination`): page navigation with
 * first, previous, next and last buttons, a page size selector, a jump-to-page
 * field and a range summary, in seven variants, three emphasis styles and four
 * sizes.
 */

import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  LucideChevronLeft,
  LucideChevronRight,
  LucideChevronsLeft,
  LucideChevronsRight,
  LucideDynamicIcon,
  LucideIconData,
} from '@lucide/angular';
import { OhmyuiI18n, interpolate } from '../i18n/i18n';
import { OhmyuiMessages } from '../i18n/messages';

/** Color of the current page in a pagination. */
export type PaginationVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';
/** Size of a pagination. */
export type PaginationSize = 'xs' | 'sm' | 'md' | 'lg';
/**
 * Emphasis of the current page: a filled button with a shadow (`filled`), a
 * tinted button (`soft`) or colored text only (`minimal`).
 */
export type PaginationEmphasis = 'filled' | 'soft' | 'minimal';
/** Entry of the page list: a page or an ellipsis for skipped pages. */
export type PageItem =
  { type: 'page'; value: number } | { type: 'ellipsis'; id: string };

/**
 * Page navigation for a list split into pages.
 *
 * It does not change `currentPage` and `pageSize` itself: update them from
 * `pageChange` and `pageSizeChange`.
 */
@Component({
  selector: 'ohmyui-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideDynamicIcon],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnChanges {
  private readonly i18n = inject(OhmyuiI18n);

  /** Icon of the first page button. */
  readonly iconFirst: LucideIconData = LucideChevronsLeft.icon;
  /** Icon of the previous page button. */
  readonly iconPrev: LucideIconData = LucideChevronLeft.icon;
  /** Icon of the next page button. */
  readonly iconNext: LucideIconData = LucideChevronRight.icon;
  /** Icon of the last page button. */
  readonly iconLast: LucideIconData = LucideChevronsRight.icon;

  /** Total number of items. */
  @Input() totalItems = 0;
  /** Number of items per page. */
  @Input() pageSize = 10;
  /** Current page, starting from 1. */
  @Input() currentPage = 1;
  /** Choices of the page size selector. */
  @Input() pageSizeOptions: number[] = [10, 25, 50, 100];
  /**
   * Highest number of page buttons, first and last page included. Ellipses
   * replace the other pages.
   */
  @Input() maxVisiblePages = 5;
  /** Whether the page size selector is shown. */
  @Input() showPageSizeSelector = true;
  /** Whether the range summary is shown. */
  @Input() showInfo = true;
  /** Whether the first and last page buttons are shown. */
  @Input() showFirstLast = true;
  /** Whether the jump-to-page field is shown. */
  @Input() showJumpToPage = false;
  /** Whether every control is disabled. */
  @Input() disabled = false;
  /** Color of the current page. */
  @Input() variant: PaginationVariant = 'primary';
  /** Size of the pagination. */
  @Input() size: PaginationSize = 'md';
  /** Emphasis of the current page. */
  @Input() emphasis: PaginationEmphasis = 'filled';
  /**
   * Whether the first and last page buttons are also shown on small screens.
   */
  @Input() showFirstLastOnMobile = false;

  /**
   * Emitted with the page to show: the chosen page, 1 after a page size
   * change, or the last page when `currentPage` is past it.
   */
  @Output() pageChange = new EventEmitter<number>();
  /** Emitted with the page size chosen in the selector. */
  @Output() pageSizeChange = new EventEmitter<number>();

  /** Value of the jump-to-page field. */
  jumpValue: number | null = null;

  /** Number of pages, at least 1. */
  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalItems / this.pageSize));
  }

  /** Whether the current page is the first one. */
  get isFirst(): boolean {
    return this.currentPage <= 1;
  }

  /** Whether the current page is the last one. */
  get isLast(): boolean {
    return this.currentPage >= this.totalPages;
  }

  /** Position of the first item of the current page, or 0 without items. */
  get rangeStart(): number {
    return this.totalItems === 0
      ? 0
      : (this.currentPage - 1) * this.pageSize + 1;
  }

  /** Position of the last item of the current page. */
  get rangeEnd(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalItems);
  }

  /**
   * Entries of the page list: the first and last page, the pages around the
   * current one, and an ellipsis for each range of skipped pages.
   */
  get pageItems(): PageItem[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const max = this.maxVisiblePages;
    if (total <= max) {
      return this.range(1, total).map((v) => ({
        type: 'page' as const,
        value: v,
      }));
    }
    const inner = max - 2;
    const half = Math.floor(inner / 2);
    let start = Math.max(2, current - half);
    let end = start + inner - 1;
    if (end >= total) {
      end = total - 1;
      start = Math.max(2, end - inner + 1);
    }
    const items: PageItem[] = [];
    items.push({ type: 'page', value: 1 });
    if (start > 2) items.push({ type: 'ellipsis', id: 'left' });
    for (const v of this.range(start, end)) {
      items.push({ type: 'page', value: v });
    }
    if (end < total - 1) items.push({ type: 'ellipsis', id: 'right' });
    items.push({ type: 'page', value: total });
    return items;
  }

  /** Texts of the pagination in the current language. */
  get texts(): OhmyuiMessages['pagination'] {
    return this.i18n.messages().pagination;
  }

  /**
   * Accessible label of the button of a page, in the current language.
   *
   * @param page Page of the button.
   */
  pageLabel(page: number): string {
    return interpolate(this.texts.page, { page });
  }

  /** CSS classes of the navigation element. */
  get hostClasses(): Record<string, boolean> {
    return {
      'ohmyui-pagination': true,
      [`ohmyui-pagination--${this.size}`]: true,
      [`ohmyui-pagination--${this.variant}`]: true,
      [`ohmyui-pagination--${this.emphasis}`]: true,
      'ohmyui-pagination--disabled': this.disabled,
      'ohmyui-pagination--hide-first-last-mobile': !this.showFirstLastOnMobile,
    };
  }

  /**
   * Clears the jump-to-page field when the number of pages can change, and
   * emits the last page when `currentPage` is past it.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalItems'] || changes['pageSize']) {
      this.jumpValue = null;
    }
    if (this.currentPage > this.totalPages) {
      // Defer the emit: the parent is still running change detection.
      setTimeout(() => this.goTo(this.totalPages));
    }
  }

  /**
   * Emits `pageChange` with the page, kept within the existing pages, unless
   * it is the current page or the pagination is disabled.
   *
   * @param page Page to go to.
   */
  goTo(page: number): void {
    if (this.disabled) return;
    const clamped = Math.max(1, Math.min(page, this.totalPages));
    if (clamped === this.currentPage) return;
    this.pageChange.emit(clamped);
  }

  /** Goes to the first page. */
  goFirst(): void {
    this.goTo(1);
  }

  /** Goes to the previous page. */
  goPrev(): void {
    this.goTo(this.currentPage - 1);
  }

  /** Goes to the next page. */
  goNext(): void {
    this.goTo(this.currentPage + 1);
  }

  /** Goes to the last page. */
  goLast(): void {
    this.goTo(this.totalPages);
  }

  /** Goes to the page typed in the jump-to-page field and clears it. */
  onJump(): void {
    if (this.jumpValue == null) return;
    this.goTo(this.jumpValue);
    this.jumpValue = null;
  }

  /** Goes to the typed page on Enter. */
  onJumpKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') this.onJump();
  }

  /** Emits `pageSizeChange` with the chosen size and `pageChange` with 1. */
  onPageSizeChange(event: Event): void {
    if (this.disabled) return;
    const value = Number((event.target as HTMLSelectElement).value);
    this.pageSizeChange.emit(value);
    this.pageChange.emit(1);
  }

  /** Whether the entry is an ellipsis. */
  isEllipsis(item: PageItem): item is { type: 'ellipsis'; id: string } {
    return item.type === 'ellipsis';
  }

  /** Whether the entry is a page. */
  isPageItem(item: PageItem): item is { type: 'page'; value: number } {
    return item.type === 'page';
  }

  /** Integers from `from` to `to`, both included. */
  private range(from: number, to: number): number[] {
    return Array.from({ length: to - from + 1 }, (_, i) => from + i);
  }

  /** Tracking key of an entry of the page list. */
  trackByItem(_: number, item: PageItem): string {
    return item.type === 'page' ? `page-${item.value}` : `ellipsis-${item.id}`;
  }
}
