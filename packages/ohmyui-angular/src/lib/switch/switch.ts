import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type SwitchSize = 'sm' | 'md' | 'lg';
export type SwitchStatus = 'default' | 'error' | 'success';

@Component({
  selector: 'ohmyui-switch',
  standalone: true,
  imports: [],
  templateUrl: './switch.html',
  styleUrl: './switch.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true,
    },
  ],
})
export class SwitchComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() labelOn = '';
  @Input() labelOff = '';
  @Input() hint = '';
  @Input() size: SwitchSize = 'md';
  @Input() status: SwitchStatus = 'default';
  @Input() disabled = false;
  @Input() checked = false;

  @Output() checkedChange = new EventEmitter<boolean>();

  inputId = `ohmyui-switch-${Math.random().toString(36).slice(2, 7)}`;
  hintId = `ohmyui-switch-hint-${Math.random().toString(36).slice(2, 7)}`;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChange = (_: boolean) => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouched = () => {};

  get wrapperClass(): string {
    return [
      'ohmyui-switch',
      `ohmyui-switch--${this.size}`,
      `ohmyui-switch--${this.status}`,
      this.disabled ? 'ohmyui-switch--disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  get currentLabel(): string {
    if (this.checked && this.labelOn) return this.labelOn;
    if (!this.checked && this.labelOff) return this.labelOff;
    return this.label;
  }

  toggle(): void {
    if (this.disabled) return;
    this.checked = !this.checked;
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
