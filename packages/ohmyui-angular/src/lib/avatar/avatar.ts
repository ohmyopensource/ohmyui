/**
 * Copyright 2026 The OhMyOpenSource! Authors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * SPDX-License-Identifier: MPL-2.0
 */

import { Component, Input, OnChanges } from '@angular/core';
import { LucideUser } from '@lucide/angular';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'circle' | 'square';
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'none';
export type AvatarVariant = 'image' | 'initials' | 'icon';
export type AvatarColor =
  'primary' | 'teal' | 'success' | 'warning' | 'error' | 'neutral';
export type AvatarRing =
  | 'none'
  | 'primary'
  | 'teal'
  | 'success'
  | 'warning'
  | 'error'
  | 'neutral'
  | 'white';

@Component({
  selector: 'ohmyui-avatar',
  standalone: true,
  imports: [LucideUser],
  templateUrl: './avatar.html',
  styleUrl: './avatar.css',
})
export class AvatarComponent implements OnChanges {
  @Input() size: AvatarSize = 'md';
  @Input() shape: AvatarShape = 'circle';
  @Input() status: AvatarStatus = 'none';
  @Input() src?: string;
  @Input() alt = '';
  @Input() name = '';
  @Input() color: AvatarColor = 'primary';
  @Input() ring: AvatarRing = 'none';

  imageError = false;
  resolvedVariant: AvatarVariant = 'icon';

  get initials(): string {
    if (!this.name) return '';
    return this.name
      .split(' ')
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase();
  }

  get wrapperClass(): string {
    return [
      'ohmyui-avatar__wrapper',
      `ohmyui-avatar__wrapper--${this.size}`,
    ].join(' ');
  }

  get avatarClass(): string {
    return [
      'ohmyui-avatar',
      `ohmyui-avatar--${this.size}`,
      `ohmyui-avatar--${this.shape}`,
      `ohmyui-avatar--color-${this.color}`,
      this.ring !== 'none' ? `ohmyui-avatar--ring-${this.ring}` : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  ngOnChanges(): void {
    this.imageError = false;
    this.resolveVariant();
  }

  onImageError(): void {
    this.imageError = true;
    this.resolveVariant();
  }

  private resolveVariant(): void {
    if (this.src && !this.imageError) {
      this.resolvedVariant = 'image';
    } else if (this.name) {
      this.resolvedVariant = 'initials';
    } else {
      this.resolvedVariant = 'icon';
    }
  }
}
