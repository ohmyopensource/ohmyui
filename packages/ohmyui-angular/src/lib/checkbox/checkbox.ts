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
 * @file checkbox.ts
 * @description CheckboxComponent (`ohmyui-checkbox`): a native checkbox with a
 * custom look, in eight variants and four sizes, with description, error,
 * indeterminate state and support for Angular forms.
 */

import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import {
  LucideDynamicIcon,
  LucideIconData,
  LucideCheck,
  LucideMinus,
} from '@lucide/angular';

/** Color of a checkbox when checked or indeterminate. */
export type CheckboxVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral';
/** Size of a checkbox. */
export type CheckboxSize = 'xs' | 'sm' | 'md' | 'lg';
/** Side of the box where the label sits. */
export type CheckboxLabelPosition = 'left' | 'right';

let nextCheckboxId = 0;

/**
 * Checkbox built on a native `<input type="checkbox">`, so keyboard, screen
 * readers and form submission work as with any input.
 */
@Component({
  selector: 'ohmyui-checkbox',
  standalone: true,
  imports: [CommonModule, LucideDynamicIcon],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor, AfterViewInit {
  @ViewChild('nativeCheckbox')
  private nativeCheckbox?: ElementRef<HTMLInputElement>;

  /** Icon of the checked state. */
  readonly checkIcon: LucideIconData = LucideCheck.icon;
  /** Icon of the indeterminate state. */
  readonly indeterminateIcon: LucideIconData = LucideMinus.icon;
  /** Id of the native input, unique on the page. */
  readonly inputId = `ohmyui-checkbox-${++nextCheckboxId}`;

  /** Text next to the box. */
  @Input() label = '';
  /** Help text below the label. */
  @Input() description = '';
  /** Color when checked or indeterminate. */
  @Input() variant: CheckboxVariant = 'primary';
  /** Size of the checkbox. */
  @Input() size: CheckboxSize = 'md';
  /** Side of the box where the label sits. */
  @Input() labelPosition: CheckboxLabelPosition = 'right';
  /** Whether the checkbox is required in its form. */
  @Input() required = false;
  /** Whether the checkbox is disabled. */
  @Input() disabled = false;
  /** Whether the checkbox shows the error state. */
  @Input() error = false;
  /** Message shown below the checkbox when `error` is true. */
  @Input() errorMessage = '';
  /** `name` of the native input. */
  @Input() name = '';
  /** `value` of the native input. */
  @Input() value = '';
  /** Accessible label. When empty, the label is used. */
  @Input() ariaLabel = '';

  /** Whether the checkbox is checked. */
  @Input()
  get checked(): boolean {
    return this._checked;
  }
  set checked(value: boolean) {
    this._checked = value;
  }
  private _checked = false;

  /**
   * Whether the checkbox is indeterminate, as a "select all" checkbox when
   * only some options are checked. It changes only the look, not `checked`.
   */
  @Input()
  get indeterminate(): boolean {
    return this._indeterminate;
  }
  set indeterminate(value: boolean) {
    this._indeterminate = value;
    this.syncIndeterminate();
  }
  private _indeterminate = false;

  /** Emitted when the user checks or unchecks the checkbox. */
  @Output() checkedChange = new EventEmitter<boolean>();

  // Placeholders required by ControlValueAccessor: Angular replaces them
  // through registerOnChange and registerOnTouched before they are called.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChangeFn: (value: boolean) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouchedFn: () => void = () => {};

  ngAfterViewInit(): void {
    this.syncIndeterminate();
  }

  /** CSS classes of the checkbox element. */
  get classes(): Record<string, boolean> {
    return {
      'ohmyui-checkbox': true,
      [`ohmyui-checkbox--${this.variant}`]: true,
      [`ohmyui-checkbox--${this.size}`]: true,
      'ohmyui-checkbox--label-left': this.labelPosition === 'left',
      'ohmyui-checkbox--disabled': this.disabled,
      'ohmyui-checkbox--invalid': this.error,
      'ohmyui-checkbox--checked': this.checked && !this.indeterminate,
      'ohmyui-checkbox--indeterminate': this.indeterminate,
    };
  }

  /** Updates `checked` and emits `checkedChange` when the input changes. */
  onNativeChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this._checked = target.checked;
    // Clear the indeterminate state on user interaction, as browsers do.
    this._indeterminate = false;
    this.onChangeFn(this._checked);
    this.checkedChange.emit(this._checked);
  }

  /** Marks the control as touched when the native input loses focus. */
  onNativeBlur(): void {
    this.onTouchedFn();
  }

  /**
   * Sets the `indeterminate` property of the native input, which has no HTML
   * attribute.
   */
  private syncIndeterminate(): void {
    if (this.nativeCheckbox) {
      this.nativeCheckbox.nativeElement.indeterminate = this._indeterminate;
    }
  }

  /** Implemented as part of ControlValueAccessor. */
  writeValue(value: boolean): void {
    this._checked = !!value;
  }

  /** Implemented as part of ControlValueAccessor. */
  registerOnChange(fn: (value: boolean) => void): void {
    this.onChangeFn = fn;
  }

  /** Implemented as part of ControlValueAccessor. */
  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  /** Implemented as part of ControlValueAccessor. */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
