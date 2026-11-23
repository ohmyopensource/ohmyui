/**
 * @file checkbox.ts
 * @description Accessible checkbox component built on top of a native
 * `<input type="checkbox">`, styled visually while preserving native
 * keyboard/screen-reader/form behavior. Supports semantic variants,
 * indeterminate state, validation feedback, and Angular Reactive Forms
 * integration via ControlValueAccessor.
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

/** Available accent variants for the checked/indeterminate state. */
export type CheckboxVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral';
/** Available checkbox sizes. */
export type CheckboxSize = 'xs' | 'sm' | 'md' | 'lg';
/** Position of the label relative to the checkbox control. */
export type CheckboxLabelPosition = 'left' | 'right';

let nextCheckboxId = 0;

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

  readonly checkIcon: LucideIconData = LucideCheck.icon;
  readonly indeterminateIcon: LucideIconData = LucideMinus.icon;
  readonly inputId = `ohmyui-checkbox-${++nextCheckboxId}`;

  /** Label displayed next to the checkbox. */
  @Input() label = '';
  /** Optional helper text displayed below the label. */
  @Input() description = '';
  /** Visual variant applied when the checkbox is checked or indeterminate. */
  @Input() variant: CheckboxVariant = 'primary';
  /** Checkbox size. */
  @Input() size: CheckboxSize = 'md';
  /** Position of the label relative to the checkbox control. */
  @Input() labelPosition: CheckboxLabelPosition = 'right';
  /** Marks the checkbox as required in a form. */
  @Input() required = false;
  /** Disables user interaction with the checkbox. */
  @Input() disabled = false;
  /** Displays validation error styling. */
  @Input() error = false;
  /** Error message displayed below the checkbox when `error` is true. */
  @Input() errorMessage = '';
  /** Native form `name` attribute. */
  @Input() name = '';
  /** Native form `value` attribute. */
  @Input() value = '';
  /** Accessible label announced by assistive technologies, overrides `label`. */
  @Input() ariaLabel = '';

  /** Checked state of the checkbox. */
  @Input()
  get checked(): boolean {
    return this._checked;
  }
  set checked(value: boolean) {
    this._checked = value;
  }
  private _checked = false;

  /**
   * Indeterminate ("mixed") state, typically used by a parent "select all"
   * checkbox when only some of its children are checked. Purely visual:
   * does not affect `checked`.
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

  /** Emitted whenever the checked state changes via user interaction. */
  @Output() checkedChange = new EventEmitter<boolean>();

  // Placeholder no-op richiesti da ControlValueAccessor: Angular li sovrascrive
  // con registerOnChange/registerOnTouched prima che vengano mai invocati
  // realmente. A differenza di un'action dimenticata, qui non c'e' nulla di
  // significativo da eseguire finche' non vengono assegnati.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChangeFn: (value: boolean) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouchedFn: () => void = () => {};

  ngAfterViewInit(): void {
    this.syncIndeterminate();
  }

  /** Returns the CSS classes required for the current checkbox configuration. */
  get classes(): Record<string, boolean> {
    return {
      'ohmyui-checkbox': true,
      [`ohmyui-checkbox--${this.variant}`]: true,
      [`ohmyui-checkbox--${this.size}`]: true,
      'ohmyui-checkbox--label-left': this.labelPosition === 'left',
      'ohmyui-checkbox--disabled': this.disabled,
      'ohmyui-checkbox--error': this.error,
      'ohmyui-checkbox--checked': this.checked && !this.indeterminate,
      'ohmyui-checkbox--indeterminate': this.indeterminate,
    };
  }

  /** Returns the icon size in pixels associated with the current checkbox size. */
  get iconSize(): number {
    const map: Record<CheckboxSize, number> = {
      xs: 10,
      sm: 12,
      md: 14,
      lg: 16,
    };
    return map[this.size];
  }

  /** Handles the native `change` event fired by the underlying input. */
  onNativeChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this._checked = target.checked;
    // A user interaction always resolves an indeterminate state, matching
    // native browser behavior for tri-state "select all" checkboxes.
    this._indeterminate = false;
    this.onChangeFn(this._checked);
    this.checkedChange.emit(this._checked);
  }

  /** Handles the native `blur` event, required by ControlValueAccessor. */
  onNativeBlur(): void {
    this.onTouchedFn();
  }

  /** Syncs the `indeterminate` DOM property, which has no HTML attribute equivalent. */
  private syncIndeterminate(): void {
    if (this.nativeCheckbox) {
      this.nativeCheckbox.nativeElement.indeterminate = this._indeterminate;
    }
  }

  // ── ControlValueAccessor ────────────────────────────────────────────────
  writeValue(value: boolean): void {
    this._checked = !!value;
  }
  registerOnChange(fn: (value: boolean) => void): void {
    this.onChangeFn = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
