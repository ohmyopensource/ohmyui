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
 * @file badge.tsx
 * @description Badge for React (`Badge`): a short status label in five semantic
 * variants and two sizes.
 */

import styles from './badge.module.css';

export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  label?: string;
}

export function Badge({
  variant = 'neutral',
  size = 'md',
  label = '',
}: BadgeProps) {
  return (
    <span
      className={`${styles['ohmyui-badge']} ${styles[`ohmyui-badge--${variant}`]} ${styles[`ohmyui-badge--${size}`]}`}
    >
      {label}
    </span>
  );
}

export default Badge;
