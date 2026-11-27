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
 * @file button.tsx
 * @description Button for React (`Button`): a button in three variants and
 * three sizes, with a disabled state.
 */

import styles from './button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  label?: string;
  onClick?: () => void;
}

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  label = '',
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`${styles['ohmyui-btn']} ${styles[`ohmyui-btn--${variant}`]} ${styles[`ohmyui-btn--${size}`]}`}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Button;
