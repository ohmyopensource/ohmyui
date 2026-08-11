import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LucideCheck, LucideMinus } from '@lucide/angular';

export type CheckboxSize = 'sm' | 'md' | 'lg';
export type CheckboxVariant = 'default' | 'filled';
export type CheckboxStatus = 'default' | 'error' | 'success';

@Component({
  selector: 'ohmyui-checkbox',
  standalone: true,
  imports: [LucideCheck, LucideMinus],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() hint = '';
  @Input() size: CheckboxSize = 'md';
  @Input() variant: CheckboxVariant = 'default';
  @Input() status: CheckboxStatus = 'default';
  @Input() disabled = false;
  @Input() indeterminate = false;
  @Input() checked = false;

  @Output() checkedChange = new EventEmitter<boolean>();

  inputId = `ohmyui-checkbox-${Math.random().toString(36).slice(2, 7)}`;
  hintId = `ohmyui-checkbox-hint-${Math.random().toString(36).slice(2, 7)}`;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChange = (_: boolean) => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouched = () => {};

  get wrapperClass(): string {
    return [
      'ohmyui-checkbox',
      `ohmyui-checkbox--${this.size}`,
      `ohmyui-checkbox--${this.variant}`,
      `ohmyui-checkbox--${this.status}`,
      this.disabled ? 'ohmyui-checkbox--disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  toggle(): void {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.indeterminate = false;
    this.checkedChange.emit(this.checked);
    this.onChange(this.checked);
    this.onTouched();
  }

  writeValue(val: boolean): void {
    this.checked = !!val;
  }
  registerOnChange(fn: (_: boolean) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }
}
