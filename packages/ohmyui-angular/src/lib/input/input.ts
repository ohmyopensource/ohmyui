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
 * @file input.ts
 * @description InputComponent (`ohmyui-input`): a text field, textarea or
 * select with a label, icons, a prefix, a suffix, a clear button, a password
 * toggle, a hint and validation messages, in six accent variants and three
 * sizes, with support for Angular forms.
 */

import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  forwardRef,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import {
  LucideDynamicIcon,
  LucideIconData,
  LucideEye,
  LucideEyeOff,
  LucideX,
  LucideCircleAlert,
  LucideCircleCheck,
} from '@lucide/angular';
import { OhmyuiI18n } from '../i18n/i18n';

let nextInputId = 0;

/**
 * Kind of field: a native input of that type, a textarea (`textarea`) or a
 * select (`select`).
 */
export type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'tel'
  | 'number'
  | 'url'
  | 'search'
  | 'textarea'
  | 'select';
/** Size of an input. */
export type InputSize = 'sm' | 'md' | 'lg';
/** Color of the border and the focus ring of a focused input. */
export type InputVariant =
  'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
/** Validation state of an input, set by its messages. */
export type InputStatus = 'default' | 'success' | 'error';

/** Option of an input of type `select`. */
export interface InputSelectOption {
  /** Text of the option. */
  label: string;
  /** Value of the option. */
  value: string | number;
  /** Whether the option is disabled. */
  disabled?: boolean;
}

/**
 * Form field built on a native `<input>`, `<textarea>` or `<select>`, so
 * keyboard, screen readers and form submission work as with any field.
 */
@Component({
  selector: 'ohmyui-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LucideDynamicIcon],
  templateUrl: './input.html',
  styleUrl: './input.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly i18n = inject(OhmyuiI18n);
  /** Icon of the button that shows the password. */
  readonly iconEye: LucideIconData = LucideEye.icon;
  /** Icon of the button that hides the password. */
  readonly iconEyeOff: LucideIconData = LucideEyeOff.icon;
  /** Icon of the clear button. */
  readonly iconClear: LucideIconData = LucideX.icon;
  /** Icon of the error state. */
  readonly iconError: LucideIconData = LucideCircleAlert.icon;
  /** Icon of the success state. */
  readonly iconSuccess: LucideIconData = LucideCircleCheck.icon;

  /** Kind of field. */
  @Input() type: InputType = 'text';
  /** Text of the label above the field. */
  @Input() label = '';
  /** Text shown in the empty field. */
  @Input() placeholder = '';
  /** Help text below the field. An error or success message replaces it. */
  @Input() hint = '';
  /**
   * Error message below the field. When set, the field is in the error state.
   */
  @Input() errorMessage = '';
  /**
   * Success message below the field. When set without an error message, the
   * field is in the success state.
   */
  @Input() successMessage = '';
  /** Options of a select. */
  @Input() options: InputSelectOption[] = [];
  /**
   * Text of the empty first option of a select. When empty, the text of the
   * current language is used.
   */
  @Input() selectPlaceholder = '';
  /** Color of the border and the focus ring when focused. */
  @Input() variant: InputVariant = 'primary';
  /** Size of the field. */
  @Input() size: InputSize = 'md';
  /** Whether the field fills the width of its container. */
  @Input() fullWidth = true;
  /** Lucide icon shown before the value. */
  @Input() iconLeft: LucideIconData | null = null;
  /**
   * Lucide icon shown after the value, in place of the status icon. The
   * password toggle and the clear button hide it.
   */
  @Input() iconRight: LucideIconData | null = null;
  /** Text shown before the value, such as `https://`. */
  @Input() prefix = '';
  /** Text shown after the value, such as `kg`. */
  @Input() suffix = '';
  /** Whether a clear button is shown when the field has a value. */
  @Input() clearable = false;
  /** Whether the field is disabled. */
  @Input() disabled = false;
  /** Whether the field is read-only. */
  @Input() readonly = false;
  /** Whether the field is required in its form. */
  @Input() required = false;
  /** Number of visible lines of a textarea. */
  @Input() rows = 4;
  /** `autocomplete` of the native field. */
  @Input() autocomplete = 'off';
  /** Id of the native field, unique on the page by default. */
  @Input() inputId = `ohmyui-input-${++nextInputId}`;
  /** `min` of the native input. When empty, the attribute is left out. */
  @Input() min: string | number = '';
  /** `max` of the native input. When empty, the attribute is left out. */
  @Input() max: string | number = '';
  /** Minimum number of characters. 0 sets no minimum. */
  @Input() minLength = 0;
  /** Maximum number of characters. 0 sets no maximum. */
  @Input() maxLength = 0;
  /** `pattern` of the native input. When empty, the attribute is left out. */
  @Input() pattern = '';

  /** Emitted with the new value when the user changes it. */
  @Output() inputChange = new EventEmitter<string | number>();
  /** Emitted when the field receives focus. */
  @Output() inputFocus = new EventEmitter<FocusEvent>();
  /** Emitted when the field loses focus. */
  @Output() inputBlur = new EventEmitter<FocusEvent>();
  /** Emitted when Enter is pressed in a native input. */
  @Output() inputEnter = new EventEmitter<KeyboardEvent>();
  /** Emitted when the clear button is clicked. */
  @Output() cleared = new EventEmitter<void>();

  /** Current value. */
  value: string | number = '';
  /** Whether the field has focus. */
  isFocused = signal(false);
  /** Whether the password is visible. */
  showPassword = signal(false);

  // Placeholders required by ControlValueAccessor: Angular replaces them
  // through registerOnChange and registerOnTouched before they are called.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChange: (val: string | number) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouched: () => void = () => {};

  /** Implemented as part of ControlValueAccessor. */
  writeValue(val: string | number | null): void {
    this.value = val ?? '';
    this.cdr.markForCheck();
  }

  /** Implemented as part of ControlValueAccessor. */
  registerOnChange(fn: (val: string | number) => void): void {
    this.onChange = fn;
  }

  /** Implemented as part of ControlValueAccessor. */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /** Implemented as part of ControlValueAccessor. */
  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
    this.cdr.markForCheck();
  }

  /** Updates the value and emits `inputChange` when the user changes it. */
  onInput(event: Event): void {
    const val = (
      event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    ).value;
    this.value = val;
    this.onChange(val);
    this.inputChange.emit(val);
    this.cdr.markForCheck();
  }

  /** Marks the field as focused and emits `inputFocus`. */
  onFocus(event: FocusEvent): void {
    this.isFocused.set(true);
    this.inputFocus.emit(event);
  }

  /** Marks the control as touched and emits `inputBlur`. */
  onBlur(event: FocusEvent): void {
    this.isFocused.set(false);
    this.onTouched();
    this.inputBlur.emit(event);
  }

  /** Emits `inputEnter` on Enter. */
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') this.inputEnter.emit(event);
  }

  /** Clears the value and emits `cleared`. */
  onClear(): void {
    this.value = '';
    this.onChange('');
    this.onTouched();
    this.cleared.emit();
    this.cdr.markForCheck();
  }

  /** Shows or hides the password. */
  togglePassword(): void {
    this.showPassword.update((v) => !v);
  }

  /** `type` of the native input: `text` while the password is visible. */
  get effectiveType(): string {
    if (this.type === 'password')
      return this.showPassword() ? 'text' : 'password';
    return this.type;
  }

  /**
   * Validation state: `error` with an error message, otherwise `success` with
   * a success message.
   */
  get status(): InputStatus {
    if (this.errorMessage) return 'error';
    if (this.successMessage) return 'success';
    return 'default';
  }

  /** Whether the clear button is shown. */
  get showClearBtn(): boolean {
    return this.clearable && !!this.value && !this.disabled && !this.readonly;
  }

  /** Whether the password toggle is shown. */
  get showPasswordToggle(): boolean {
    return this.type === 'password';
  }

  /** Text of the empty first option of a select. */
  get selectPlaceholderText(): string {
    return (
      this.selectPlaceholder || this.i18n.messages().input.selectPlaceholder
    );
  }

  /** Accessible label of the password toggle, in the current language. */
  get passwordToggleLabel(): string {
    const texts = this.i18n.messages().input;
    return this.showPassword() ? texts.hidePassword : texts.showPassword;
  }

  /** Accessible label of the clear button, in the current language. */
  get clearLabel(): string {
    return this.i18n.messages().input.clear;
  }

  /**
   * Id of the message below the field, for `aria-describedby`, or null
   * without a message.
   */
  get describedById(): string | null {
    return this.hint || this.errorMessage || this.successMessage
      ? `${this.inputId}-hint`
      : null;
  }

  /** CSS classes of the wrapper element. */
  get wrapperClasses(): string {
    return [
      'ohmyui-input-wrapper',
      this.fullWidth ? 'ohmyui-input-wrapper--full' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  /** CSS classes of the field element. */
  get fieldClasses(): string {
    return [
      'ohmyui-input-wrapper__field',
      `ohmyui-input-wrapper__field--${this.size}`,
      `ohmyui-input-wrapper__field--${this.variant}`,
      this.status === 'error' ? 'ohmyui-input-wrapper__field--invalid' : '',
      this.status === 'success' ? 'ohmyui-input-wrapper__field--valid' : '',
      this.isFocused() ? 'ohmyui-input-wrapper__field--focused' : '',
      this.disabled ? 'ohmyui-input-wrapper__field--disabled' : '',
      this.readonly ? 'ohmyui-input-wrapper__field--readonly' : '',
      this.iconLeft ? 'ohmyui-input-wrapper__field--icon-left' : '',
      this.iconRight ||
      this.showClearBtn ||
      this.showPasswordToggle ||
      this.suffix
        ? 'ohmyui-input-wrapper__field--icon-right'
        : '',
      this.prefix ? 'ohmyui-input-wrapper__field--has-prefix' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }
}
