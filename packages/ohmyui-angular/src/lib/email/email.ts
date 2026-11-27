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
 * @file email.ts
 * @description EmailComponent (`ohmyui-email`): a mailto link with an optional
 * envelope icon and prefilled subject and body, in four color variants and
 * three sizes.
 */

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideDynamicIcon, LucideIconData, LucideMail } from '@lucide/angular';

/** Color variant of an email link. */
export type EmailVariant = 'primary' | 'secondary' | 'neutral' | 'ghost';
/** Size of an email link. */
export type EmailSize = 'sm' | 'md' | 'lg';

/**
 * Mailto link. Its accessible label always contains the full address, even
 * with a custom label.
 */
@Component({
  selector: 'ohmyui-email',
  standalone: true,
  imports: [CommonModule, LucideDynamicIcon],
  templateUrl: './email.html',
  styleUrl: './email.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailComponent {
  /** Envelope icon shown before the text. */
  readonly mailIcon: LucideIconData = LucideMail.icon;

  /** Email address of the link, also shown when `label` is empty. */
  @Input({ required: true }) email = '';
  /** Text shown instead of the address. */
  @Input() label = '';
  /** Subject prefilled in the email. */
  @Input() subject = '';
  /** Body prefilled in the email. */
  @Input() body = '';
  /** Color variant. */
  @Input() variant: EmailVariant = 'primary';
  /** Size of the text and the icon. */
  @Input() size: EmailSize = 'md';
  /** Whether the envelope icon is shown. */
  @Input() showIcon = true;
  /** Whether the text is underlined on hover. */
  @Input() underline = true;

  /** Size in pixels of the icon for the current size. */
  get iconSize(): number {
    const map: Record<EmailSize, number> = { sm: 12, md: 14, lg: 16 };
    return map[this.size];
  }

  /** Visible text: the label, or the address. */
  get displayLabel(): string {
    return this.label || this.email;
  }

  /** `mailto:` URL with the subject and body, if set. */
  get mailtoHref(): string {
    const params = new URLSearchParams();
    if (this.subject) params.set('subject', this.subject);
    if (this.body) params.set('body', this.body);
    const query = params.toString();
    return `mailto:${this.email}${query ? '?' + query : ''}`;
  }

  /** CSS classes of the link element. */
  get emailClasses(): Record<string, boolean> {
    return {
      'ohmyui-email-link': true,
      [`ohmyui-email-link--${this.variant}`]: true,
      [`ohmyui-email-link--${this.size}`]: true,
      'ohmyui-email-link--underline': this.underline,
    };
  }
}
