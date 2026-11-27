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
 * @description Flexible typography component that standardizes text rendering
 * across the application. Supports multiple semantic HTML elements, design-
 * system typography variants, color tokens, and layout modifiers such as
 * alignment, truncation, wrapping, and line clamping.
 *
 * Applicato come attributo su elementi HTML semantici (h1[ohmyuiText],
 * p[ohmyuiText], ecc.) invece che come tag custom: per questo usa
 * ViewEncapsulation.None — gli stili si applicano a elementi del template
 * del CONSUMER, non del proprio, quindi l'incapsulamento emulato (che scopa
 * solo il proprio template) non potrebbe mai funzionare qui.
 */
import {
  Component,
  Input,
  ChangeDetectionStrategy,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

/** Defines the available typography variants mapped to design system styles. */
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
/** Defines the semantic color palette tokens available for text styling. */
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
/** Defines font weight options aligned with the design system typography scale. */
export type TextWeight =
  'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
/** Defines text alignment options. */
export type TextAlign = 'left' | 'center' | 'right' | 'justify';

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
  /** Visual typography variant (maps to design system scale) */
  @Input() variant: TextVariant = 'body';
  /** Semantic or brand color token */
  @Input() color: TextColor = 'default';
  /** Optional font weight override */
  @Input() weight: TextWeight | '' = '';
  /** Optional text alignment override */
  @Input() align: TextAlign | '' = '';
  /** Applies italic styling */
  @Input() italic = false;
  /** Applies underline decoration */
  @Input() underline = false;
  /** Enables text truncation (ellipsis) */
  @Input() truncate = false;
  /** Prevents line wrapping */
  @Input() noWrap = false;
  /** Applies gradient text styling (if supported by theme) */
  @Input() gradient = false;
  /** Limits number of visible lines using CSS line-clamp */
  @Input() lineClamp = 0;
  /**
   * Allows injecting additional custom CSS classes.
   * Use sparingly to avoid breaking design system consistency.
   */
  @Input() extraClass = '';

  /**
   * Computes host CSS classes based on component inputs.
   * This is the core mechanism that maps API → design system styles.
   *
   * NOTA: il tema scuro non è più pilotato da un @Input booleano (rimosso
   * per coerenza con gli altri componenti) — le regole `.dark-theme ...` in
   * text.css si attivano da sole in base alla classe globale sull'app.
   */
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
