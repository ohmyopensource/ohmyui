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
 * @file badge.ts
 * @description BadgeComponent (`ohmyui-badge`): a short label, a counter or a
 * status dot, with an optional icon and remove button, in eleven variants,
 * four sizes and three shapes.
 */

import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideDynamicIcon, LucideIconData, LucideX } from '@lucide/angular';
import { OhmyuiI18n, interpolate } from '../i18n/i18n';

/** Color variant of a badge. */
export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'ghost'
  | 'outline'
  | 'flat'
  | 'neutral';
/** Size of a badge. */
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';
/** Shape of a badge. */
export type BadgeShape = 'pill' | 'rounded' | 'square';
/** Side of the content where the icon sits. */
export type BadgeIconPosition = 'left' | 'right';

/** Badge with a label, a counter or a status dot. */
@Component({
  selector: 'ohmyui-badge',
  standalone: true,
  imports: [CommonModule, LucideDynamicIcon],
  templateUrl: './badge.html',
  styleUrl: './badge.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
  private readonly i18n = inject(OhmyuiI18n);

  /** Icon of the remove button. */
  readonly closeIcon: LucideIconData = LucideX.icon;

  /** Text of the badge. */
  @Input() label = '';
  /** Number shown instead of the label when greater than zero. */
  @Input() count = 0;
  /** Highest number shown: a larger count appears as `maxCount+`. */
  @Input() maxCount = 99;
  /** Color variant. */
  @Input() variant: BadgeVariant = 'primary';
  /** Size of the badge. */
  @Input() size: BadgeSize = 'md';
  /** Shape of the badge. */
  @Input() shape: BadgeShape = 'pill';
  /** Lucide icon shown next to the content. */
  @Input() icon: LucideIconData | null = null;
  /** Side of the content where the icon sits. */
  @Input() iconPosition: BadgeIconPosition = 'left';
  /**
   * Whether a status dot is shown. Without label and count, the badge is
   * only the dot.
   */
  @Input() dot = false;
  /** Whether the badge has a remove button. */
  @Input() removable = false;
  /**
   * Accessible label. When empty, the label is used: set it for a badge
   * without text, such as a dot or a counter.
   */
  @Input() ariaLabel = '';

  /** Emitted when the remove button is clicked. */
  @Output() removed = new EventEmitter<void>();

  /** Accessible label of the remove button, in the current language. */
  get removeLabel(): string {
    const texts = this.i18n.messages().badge;
    return this.label
      ? interpolate(texts.remove, { label: this.label })
      : texts.removeUnlabeled;
  }

  /** Text of the counter, capped at `maxCount+`. */
  get displayCount(): string {
    return this.count > this.maxCount ? `${this.maxCount}+` : `${this.count}`;
  }

  /** Whether the badge shows a counter. */
  get isCountMode(): boolean {
    return this.count > 0;
  }

  /** Whether the badge is only a status dot. */
  get isDotOnly(): boolean {
    return this.dot && !this.label && !this.isCountMode;
  }

  /** CSS classes of the badge element. */
  get classes(): Record<string, boolean> {
    return {
      'ohmyui-badge': true,
      [`ohmyui-badge--${this.variant}`]: true,
      [`ohmyui-badge--${this.size}`]: true,
      [`ohmyui-badge--${this.shape}`]: true,
      'ohmyui-badge--dot-only': this.isDotOnly,
      'ohmyui-badge--count': this.isCountMode && !this.dot,
      'ohmyui-badge--removable': this.removable,
      'ohmyui-badge--icon-right':
        this.icon !== null && this.iconPosition === 'right',
    };
  }

  /**
   * Emits `removed` without passing the click on to the parent elements.
   *
   * @param event Click on the remove button.
   */
  onRemove(event: MouseEvent): void {
    event.stopPropagation();
    this.removed.emit();
  }
}
