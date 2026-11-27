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
 * @file button.ts
 * @description ButtonComponent (`ohmyui-button`): a button, an internal router
 * link or an external link with the same look, in eleven variants, four sizes
 * and five corner radii, with icons, a ripple, and loading and succeeded
 * states.
 */

import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Renderer2,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  LucideDynamicIcon,
  LucideIconData,
  LucideLoaderCircle,
  LucideCircleCheck,
} from '@lucide/angular';

/** Color variant of a button. */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'ghost'
  | 'outline'
  | 'outline-error'
  | 'flat';
/** Size of a button. */
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';
/** Corner radius of a button. */
export type ButtonRounded = 'none' | 'sm' | 'md' | 'lg' | 'full';
/**
 * Element rendered by a button: a native `<button>` (`button`), a router link
 * (`link-internal`) or a link to another site (`link-external`).
 */
export type ButtonMode = 'button' | 'link-internal' | 'link-external';
/** Type of the native `<button>`. */
export type ButtonType = 'button' | 'submit' | 'reset';
/** Side of the label where the icon sits. */
export type ButtonIconPosition = 'left' | 'right';
/** Look of a button in the succeeded state. */
export type ButtonSucceededStyle = 'filled' | 'ghost';

/**
 * Button, internal router link or external link with the same look.
 *
 * It imports RouterModule for internal links, so it requires `@angular/router`
 * even when only `mode="button"` is used.
 */
@Component({
  selector: 'ohmyui-button',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideDynamicIcon],
  templateUrl: './button.html',
  styleUrl: './button.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  private renderer = inject(Renderer2);
  /** Icon of the loading state. */
  readonly loaderIcon: LucideIconData = LucideLoaderCircle.icon;
  /** Icon of the succeeded state. */
  readonly succeededIcon: LucideIconData = LucideCircleCheck.icon;

  /** Text of the button. */
  @Input() label = '';
  /** Color variant. */
  @Input() variant: ButtonVariant = 'primary';
  /** Size of the button. */
  @Input() size: ButtonSize = 'md';
  /** Corner radius. */
  @Input() rounded: ButtonRounded = 'md';
  /** Whether the button fills the width of its container. */
  @Input() fullWidth = false;
  /** Lucide icon shown next to the label. */
  @Input() icon: LucideIconData | null = null;
  /** Side of the label where the icon sits. */
  @Input() iconPosition: ButtonIconPosition = 'left';
  /**
   * Whether the button shows only the icon, as a square. Set `ariaLabel` too:
   * the button has no visible text.
   */
  @Input() iconOnly = false;
  /** Whether the button is disabled. */
  @Input() disabled = false;
  /** Whether the button shows a spinner and ignores clicks. */
  @Input() loading = false;
  /**
   * Whether the action of the button completed successfully. The button
   * then shows a check icon and ignores clicks.
   */
  @Input() succeeded = false;
  /** Look of the button in the succeeded state. */
  @Input() succeededStyle: ButtonSucceededStyle = 'filled';
  /** Text shown in the succeeded state. When empty, the label is kept. */
  @Input() succeededLabel = '';
  /** Element rendered: a native button, a router link or an external link. */
  @Input() mode: ButtonMode = 'button';
  /** Type of the native button, used when `mode` is `button`. */
  @Input() type: ButtonType = 'button';
  /**
   * Destination of the link: the router path, with an optional query string,
   * when `mode` is `link-internal`, or the URL when `mode` is `link-external`.
   */
  @Input() href = '';
  /** Browsing context of an external link. */
  @Input() target: '_self' | '_blank' = '_self';
  /** Accessible label. When empty, the visible text is used. */
  @Input() ariaLabel = '';

  /** Emitted on click, unless the button is disabled, loading or succeeded. */
  @Output() clicked = new EventEmitter<MouseEvent>();

  /** Size in pixels of the icon for the current size. */
  get iconSize(): number {
    const map: Record<ButtonSize, number> = { xs: 14, sm: 16, md: 18, lg: 20 };
    return map[this.size];
  }

  /** Whether the button ignores clicks: disabled, loading or succeeded. */
  get isInert(): boolean {
    return this.disabled || this.loading || this.succeeded;
  }

  /** Visible text: the succeeded label in the succeeded state, if set. */
  get displayLabel(): string {
    return this.succeeded && this.succeededLabel
      ? this.succeededLabel
      : this.label;
  }

  /** CSS classes of the button element. */
  get classes(): Record<string, boolean> {
    return {
      'ohmyui-btn': true,
      [`ohmyui-btn--${this.variant}`]: !this.succeeded,
      'ohmyui-btn--succeeded-filled':
        this.succeeded && this.succeededStyle === 'filled',
      'ohmyui-btn--succeeded-ghost':
        this.succeeded && this.succeededStyle === 'ghost',
      [`ohmyui-btn--${this.size}`]: true,
      [`ohmyui-btn--rounded-${this.rounded}`]: true,
      'ohmyui-btn--full-width': this.fullWidth,
      'ohmyui-btn--disabled': this.disabled,
      'ohmyui-btn--loading': this.loading,
      'ohmyui-btn--icon-only': this.iconOnly,
      'ohmyui-btn--icon-right':
        this.icon !== null && this.iconPosition === 'right' && !this.iconOnly,
    };
  }

  /**
   * `rel` of an external link: `noopener noreferrer` when it opens a new tab,
   * against reverse tabnabbing.
   */
  get externalRel(): string {
    return this.target === '_blank' ? 'noopener noreferrer' : '';
  }

  /** Path of `href` without the query string, for `routerLink`. */
  get routerPath(): string {
    return (this.href ?? '').split('?')[0];
  }

  /** Query string of `href` as an object for `queryParams`, or null. */
  get routerQueryParams(): Record<string, string> | null {
    const queryIndex = (this.href ?? '').indexOf('?');
    if (queryIndex === -1) return null;
    const queryString = this.href.slice(queryIndex + 1);
    const params: Record<string, string> = {};
    new URLSearchParams(queryString).forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }

  /**
   * Emits `clicked`, or stops the click when the button is disabled, loading
   * or succeeded.
   */
  onButtonClick(event: MouseEvent): void {
    if (this.isInert) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.clicked.emit(event);
  }

  /**
   * Starts the ripple animation from the click position, unless the button
   * ignores clicks.
   */
  onRipple(event: MouseEvent): void {
    if (this.isInert) return;
    const btn = event.currentTarget as HTMLElement;
    btn
      .querySelectorAll('.ohmyui-btn__ripple')
      .forEach((el) => this.renderer.removeChild(btn, el));
    const circle = this.renderer.createElement('span');
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;
    const rect = btn.getBoundingClientRect();
    this.renderer.setStyle(circle, 'width', `${diameter}px`);
    this.renderer.setStyle(circle, 'height', `${diameter}px`);
    this.renderer.setStyle(
      circle,
      'left',
      `${event.clientX - rect.left - radius}px`,
    );
    this.renderer.setStyle(
      circle,
      'top',
      `${event.clientY - rect.top - radius}px`,
    );
    this.renderer.addClass(circle, 'ohmyui-btn__ripple');
    this.renderer.appendChild(btn, circle);
    circle.addEventListener(
      'animationend',
      () => {
        if (btn.contains(circle)) this.renderer.removeChild(btn, circle);
      },
      { once: true },
    );
    setTimeout(() => {
      if (btn.contains(circle)) this.renderer.removeChild(btn, circle);
    }, 600);
  }
}
