import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type RadioSize = 'sm' | 'md' | 'lg';
export type RadioOrientation = 'vertical' | 'horizontal';
export type RadioStatus = 'default' | 'error' | 'success';

export interface RadioOption {
  value: string;
  label: string;
  hint?: string;
  disabled?: boolean;
}

@Component({
  selector: 'ohmyui-radio-group',
  standalone: true,
  imports: [],
  templateUrl: './radio-group.html',
  styleUrl: './radio-group.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true,
    },
  ],
})
export class RadioGroupComponent implements ControlValueAccessor {
  @Input() options: RadioOption[] = [];
  @Input() value = '';
  @Input() label = '';
  @Input() hint = '';
  @Input() size: RadioSize = 'md';
  @Input() orientation: RadioOrientation = 'vertical';
  @Input() status: RadioStatus = 'default';
  @Input() disabled = false;

  @Output() valueChange = new EventEmitter<string>();

  groupId = `ohmyui-radio-${Math.random().toString(36).slice(2, 7)}`;
  hintId = `ohmyui-radio-hint-${Math.random().toString(36).slice(2, 7)}`;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChange = (_: string) => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouched = () => {};

  get groupClass(): string {
    return [
      'ohmyui-radio-group',
      `ohmyui-radio-group--${this.size}`,
      `ohmyui-radio-group--${this.orientation}`,
      `ohmyui-radio-group--${this.status}`,
      this.disabled ? 'ohmyui-radio-group--disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  isSelected(option: RadioOption): boolean {
    return this.value === option.value;
  }

  select(option: RadioOption): void {
    if (this.disabled || option.disabled) return;
    this.value = option.value;
    this.valueChange.emit(this.value);
    this.onChange(this.value);
    this.onTouched();
  }

  optionId(option: RadioOption): string {
    return `${this.groupId}-${option.value}`;
  }

  trackByValue(_: number, option: RadioOption): string {
    return option.value;
  }

  writeValue(val: string): void {
    this.value = val ?? '';
  }
  registerOnChange(fn: (_: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }
}
