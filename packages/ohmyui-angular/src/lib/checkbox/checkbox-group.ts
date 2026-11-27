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
 * @file checkbox-group.ts
 * @description CheckboxGroupComponent (`ohmyui-checkbox-group`): a native
 * `<fieldset>` with a `<legend>` that groups the projected checkboxes, with
 * description, error message and vertical or horizontal layout.
 */

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Direction of the checkboxes in a group. */
export type CheckboxGroupOrientation = 'vertical' | 'horizontal';

let nextCheckboxGroupId = 0;

/**
 * Group of related checkboxes. `disabled` disables every checkbox inside it
 * through the native `<fieldset>`.
 */
@Component({
  selector: 'ohmyui-checkbox-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox-group.html',
  styleUrl: './checkbox-group.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxGroupComponent {
  /** Id of the group, unique on the page. */
  readonly groupId = `ohmyui-checkbox-group-${++nextCheckboxGroupId}`;

  /** Name of the group, shown in the `<legend>`. */
  @Input() label = '';
  /** Help text below the name of the group. */
  @Input() description = '';
  /** Direction of the checkboxes. */
  @Input() orientation: CheckboxGroupOrientation = 'vertical';
  /** Whether the group is required in its form. */
  @Input() required = false;
  /** Whether every checkbox in the group is disabled. */
  @Input() disabled = false;
  /** Whether the group shows the error state. */
  @Input() error = false;
  /** Message shown below the group when `error` is true. */
  @Input() errorMessage = '';

  /** CSS classes of the group element. */
  get classes(): Record<string, boolean> {
    return {
      'ohmyui-checkbox-group': true,
      'ohmyui-checkbox-group--horizontal': this.orientation === 'horizontal',
      'ohmyui-checkbox-group--error': this.error,
    };
  }
}
