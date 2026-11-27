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
 * @file text.ts
 * @description TextComponent (`[ohmyuiText]`): the typography scale, from
 * display to caption, with color, weight, alignment, decoration, truncation,
 * line clamp and gradient modifiers.
 *
 * It is applied as an attribute on semantic HTML elements (`h1[ohmyuiText]`,
 * `p[ohmyuiText]` and so on) rather than as a custom tag. Its styles target
 * elements of the consumer's template, which emulated encapsulation cannot
 * reach, so the component uses `ViewEncapsulation.None`.
 */

import {
  Component,
  Input,
  ChangeDetectionStrategy,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

/** Step of the typography scale. */
export type TextVariant =
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body-lg'
  | 'body'
  | 'body-sm'
  | 'caption'
  | 'label'
  | 'overline'
  | 'code';
/** Text color, from the semantic tokens. */
export type TextColor =
  | 'default'
  | 'muted'
  | 'subtle'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'white'
  | 'inherit';
/** Font weight. */
export type TextWeight =
  'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
/** Text alignment. */
export type TextAlign = 'left' | 'center' | 'right' | 'justify';

/** Typography styles applied to a semantic HTML element. */
@Component({
  selector:
    'h1[ohmyuiText], h2[ohmyuiText], h3[ohmyuiText], h4[ohmyuiText], ' +
    'h5[ohmyuiText], h6[ohmyuiText], p[ohmyuiText], span[ohmyuiText], ' +
    'small[ohmyuiText], label[ohmyuiText], strong[ohmyuiText], ' +
    'em[ohmyuiText], blockquote[ohmyuiText], div[ohmyuiText], ' +
    'ohmyui-text',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './text.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextComponent {
  /** Step of the typography scale. */
  @Input() variant: TextVariant = 'body';
  /** Text color. */
  @Input() color: TextColor = 'default';
  /** Font weight. When empty, the weight of the variant is used. */
  @Input() weight: TextWeight | '' = '';
  /** Text alignment. When empty, the text inherits it. */
  @Input() align: TextAlign | '' = '';
  /** Whether the text is italic. */
  @Input() italic = false;
  /** Whether the text is underlined. */
  @Input() underline = false;
  /** Whether the text stays on one line and ends with an ellipsis. */
  @Input() truncate = false;
  /** Whether the text stays on one line. */
  @Input() noWrap = false;
  /**
   * Whether the text is filled with a gradient of its color, primary by
   * default.
   */
  @Input() gradient = false;
  /** Maximum number of visible lines, from 1 to 6. 0 shows every line. */
  @Input() lineClamp = 0;
  /** Extra CSS classes added to the element. */
  @Input() extraClass = '';

  /** CSS classes of the host element. */
  @HostBinding('class')
  get hostClasses(): string {
    const c: string[] = [
      'ohmyui-text',
      `ohmyui-text--${this.variant}`,
      `ohmyui-text--color-${this.color}`,
    ];
    if (this.weight) c.push(`ohmyui-text--weight-${this.weight}`);
    if (this.align) c.push(`ohmyui-text--align-${this.align}`);
    if (this.italic) c.push('ohmyui-text--italic');
    if (this.underline) c.push('ohmyui-text--underline');
    if (this.truncate) c.push('ohmyui-text--truncate');
    if (this.noWrap) c.push('ohmyui-text--nowrap');
    if (this.gradient) c.push('ohmyui-text--gradient');
    if (this.lineClamp > 0) c.push(`ohmyui-text--clamp-${this.lineClamp}`);
    if (this.extraClass) c.push(this.extraClass);
    return c.join(' ');
  }
}
