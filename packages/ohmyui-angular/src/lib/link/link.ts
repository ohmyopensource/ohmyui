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
 * @file link.ts
 * @description LinkComponent (`ohmyui-link`): an inline link, internal or
 * external, in four color variants and three sizes, with an optional trailing
 * icon for external links.
 */

import {
  Component,
  Input,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideDynamicIcon, LucideIconData, LucideLink } from '@lucide/angular';
import { OhmyuiI18n, interpolate } from '../i18n/i18n';

/**
 * Kind of link: a router link (`internal`) or a link to another site
 * (`external`).
 */
export type LinkMode = 'internal' | 'external';
/** Color variant of a link. */
export type LinkVariant = 'primary' | 'secondary' | 'neutral' | 'ghost';
/** Size of a link. */
export type LinkSize = 'sm' | 'md' | 'lg';

/**
 * Inline link, on its own or inside body text.
 *
 * It imports RouterModule for internal links, so it requires `@angular/router`
 * even when only `mode="external"` is used.
 */
@Component({
  selector: 'ohmyui-link',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideDynamicIcon],
  templateUrl: './link.html',
  styleUrl: './link.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent {
  private readonly i18n = inject(OhmyuiI18n);

  /** Icon shown after the text of an external link. */
  readonly externalIcon: LucideIconData = LucideLink.icon;

  /**
   * Destination of the link: the router path when `mode` is `internal`, or
   * the URL when `mode` is `external`.
   */
  @Input({ required: true }) href = '';
  /** Text of the link. */
  @Input() label = '';
  /** Kind of link. */
  @Input() mode: LinkMode = 'internal';
  /** Browsing context of an external link. */
  @Input() target: '_self' | '_blank' = '_blank';
  /** Color variant. */
  @Input() variant: LinkVariant = 'primary';
  /** Size of the text and the icon. */
  @Input() size: LinkSize = 'md';
  /**
   * Whether an external link shows the trailing icon. Internal links never
   * show it.
   */
  @Input() showExternalIcon = true;

  /** Whether the trailing icon is shown. */
  get displayExternalIcon(): boolean {
    return this.mode === 'external' && this.showExternalIcon;
  }

  /**
   * `rel` of an external link: `noopener noreferrer` when it opens a new tab,
   * against reverse tabnabbing.
   */
  get externalRel(): string {
    return this.target === '_blank' ? 'noopener noreferrer' : '';
  }

  /**
   * Accessible label of an external link that opens a new tab: the label
   * followed by a note about the new tab, in the current language. Null for
   * the other links.
   */
  get accessibleLabel(): string | null {
    if (this.mode === 'external' && this.target === '_blank') {
      return interpolate(this.i18n.messages().link.opensInNewTab, {
        label: this.label,
      });
    }
    return null;
  }

  /** CSS classes of the link element. */
  get linkClasses(): Record<string, boolean> {
    return {
      'ohmyui-inline-link': true,
      [`ohmyui-inline-link--${this.variant}`]: true,
      [`ohmyui-inline-link--${this.size}`]: true,
    };
  }
}
