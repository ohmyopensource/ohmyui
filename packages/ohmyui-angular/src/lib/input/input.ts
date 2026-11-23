/**
 * @file input.ts
 * @description
 * Highly configurable Angular form control supporting multiple input types
 * (text, textarea, select, password, etc.), validation states, icons,
 * prefix/suffix decorations, and full ControlValueAccessor integration.
 *
 * Designed for design system usage with consistent UI/UX behavior,
 * accessibility support, and dark mode compatibility.
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
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  LucideDynamicIcon,
  LucideIconData,
  LucideEye,
  LucideEyeOff,
  LucideX,
  LucideCircleAlert,
  LucideCircleCheck,
} from '@lucide/angular';

/**
 * Genera un id univoco per l'associazione label/input via un contatore
 * incrementale — stesso pattern già usato in CheckboxComponent. Sostituisce
 * l'import originale da '@shared/utils/crypto-rand', un path alias che
 * esiste in OMU ma non in questo workspace: nessuna utility esterna
 * necessaria per un semplice id sequenziale.
 */
let nextInputId = 0;

/**
 * Supported input rendering modes. Determines both HTML element type and
 * internal behavior (e.g. text field, textarea, select, password toggle).
 */
export type InputType = 'text' | 'email' | 'password' | 'tel' | 'number' | 'url' | 'search' | 'textarea' | 'select';
/** Defines the visual size scale of the input component. */
export type InputSize = 'sm' | 'md' | 'lg';
/** Defines the visual accent variant used for focus, borders and states. */
export type InputVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
/** Represents the semantic validation state of the input. */
export type InputStatus = 'default' | 'success' | 'error';

/** Option model used by select-type inputs. */
export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

/**
 * A highly configurable form control supporting multiple input types,
 * validation states, icons, and full integration with Angular Forms API.
 * Implements ControlValueAccessor to behave as a native form control.
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
  readonly iconEye: LucideIconData = LucideEye.icon;
  readonly iconEyeOff: LucideIconData = LucideEyeOff.icon;
  readonly iconClear: LucideIconData = LucideX.icon;
  readonly iconError: LucideIconData = LucideCircleAlert.icon;
  readonly iconSuccess: LucideIconData = LucideCircleCheck.icon;

  /** Defines the input type and its rendering behavior. */
  @Input() type: InputType = 'text';
  /** Primary label displayed above the input field. */
  @Input() label = '';
  /** Placeholder text shown when the field is empty. */
  @Input() placeholder = '';
  /** Helper text displayed below the input for guidance. */
  @Input() hint = '';
  /** Error message used to indicate invalid state. */
  @Input() errorMessage = '';
  /** Success message used to indicate valid state. */
  @Input() successMessage = '';
  /** Options used when rendering a select input. */
  @Input() options: SelectOption[] = [];
  /** Placeholder displayed for select inputs. */
  @Input() selectPlaceholder = 'Seleziona';
  /** Visual variant used for focus and semantic coloring. */
  @Input() variant: InputVariant = 'primary';
  /** Controls the size and density of the input field. */
  @Input() size: InputSize = 'md';
  /** If true, input stretches to fill container width. */
  @Input() fullWidth = true;
  /** Icon displayed on the left side of the input. */
  @Input() iconLeft: LucideIconData | null = null;
  /**
   * Icon displayed on the right side of the input.
   * Ignored when conflicting behaviors (password/clearable) are active.
   */
  @Input() iconRight: LucideIconData | null = null;
  /** Text prefix displayed inside the input (e.g. https://, €). */
  @Input() prefix = '';
  /** Text suffix displayed inside the input (e.g. kg, %). */
  @Input() suffix = '';
  /** Enables clear button when input has a value. */
  @Input() clearable = false;
  /** Disables user interaction with the input. */
  @Input() disabled = false;
  /** Makes input read-only (value cannot be modified). */
  @Input() readonly = false;
  /** Marks the field as required (UI-level indicator only). */
  @Input() required = false;
  /** Number of rows used when type is textarea. */
  @Input() rows = 4;
  /** Native HTML autocomplete attribute. */
  @Input() autocomplete = 'off';
  /** Unique identifier used to bind label and input elements. */
  @Input() inputId = `ohmyui-input-${++nextInputId}`;
  /** Minimum numeric value (for number-based inputs). */
  @Input() min: string | number = '';
  /** Maximum numeric value (for number-based inputs). */
  @Input() max: string | number = '';
  /** Minimum allowed string length. */
  @Input() minLength = 0;
  /** Maximum allowed string length. */
  @Input() maxLength = 0;
  /** Regex pattern used for validation. */
  @Input() pattern = '';

  /** Emitted whenever the input value changes. */
  @Output() inputChange = new EventEmitter<string | number>();
  /** Emitted when input receives focus. */
  @Output() inputFocus = new EventEmitter<FocusEvent>();
  /** Emitted when input loses focus. */
  @Output() inputBlur = new EventEmitter<FocusEvent>();
  /** Emitted when Enter key is pressed. */
  @Output() inputEnter = new EventEmitter<KeyboardEvent>();
  /** Emitted when the clear action is triggered. */
  @Output() cleared = new EventEmitter<void>();

  /** Current value of the control. */
  value: string | number = '';
  /** Tracks focus state for UI styling. */
  isFocused = signal(false);
  /** Controls password visibility toggle state. */
  showPassword = signal(false);

  // Placeholder no-op richiesti da ControlValueAccessor: Angular li sovrascrive
  // con registerOnChange/registerOnTouched prima che vengano mai invocati
  // realmente (stesso ragionamento di CheckboxComponent).
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChange: (val: string | number) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouched: () => void = () => {};

  writeValue(val: string | number | null): void {
    this.value = val ?? '';
    this.cdr.markForCheck();
  }
  registerOnChange(fn: (val: string | number) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
    this.cdr.markForCheck();
  }

  /** Handles native input event and propagates value changes. */
  onInput(event: Event): void {
    const val = (event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement).value;
    this.value = val;
    this.onChange(val);
    this.inputChange.emit(val);
    this.cdr.markForCheck();
  }

  /** Handles focus event and updates internal UI state. */
  onFocus(event: FocusEvent): void {
    this.isFocused.set(true);
    this.inputFocus.emit(event);
  }

  /** Handles blur event and marks control as touched. */
  onBlur(event: FocusEvent): void {
    this.isFocused.set(false);
    this.onTouched();
    this.inputBlur.emit(event);
  }

  /** Handles keyboard interaction (Enter key submission hook). */
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') this.inputEnter.emit(event);
  }

  /** Clears the current input value and resets internal state. */
  onClear(): void {
    this.value = '';
    this.onChange('');
    this.onTouched();
    this.cleared.emit();
    this.cdr.markForCheck();
  }

  /** Toggles password visibility for password input type. */
  togglePassword(): void {
    this.showPassword.update((v) => !v);
  }

  /**
   * Resolves the effective input type based on component state.
   *
   * NOTA: l'originale aveva un terzo branch morto (textarea/select), mai
   * raggiungibile: il template usa effectiveType solo sul tag <input>, che
   * non viene mai renderizzato quando type è 'textarea'/'select' (rendono
   * <textarea>/<select> invece, gestiti da branch separati). Rimosso.
   */
  get effectiveType(): string {
    if (this.type === 'password') return this.showPassword() ? 'text' : 'password';
    return this.type;
  }

  /** Computes the current validation status of the input. */
  get status(): InputStatus {
    if (this.errorMessage) return 'error';
    if (this.successMessage) return 'success';
    return 'default';
  }

  /** Returns icon size based on configured input size. */
  get iconSize(): number {
    return { sm: 14, md: 16, lg: 18 }[this.size];
  }

  /** Determines whether the clear button should be visible. */
  get showClearBtn(): boolean {
    return this.clearable && !!this.value && !this.disabled && !this.readonly;
  }

  /** Determines whether password visibility toggle should be shown. */
  get showPasswordToggle(): boolean {
    return this.type === 'password';
  }

  /**
   * Indica se esiste un messaggio (hint/error/success) da collegare via
   * aria-describedby — condiviso da input, textarea e select.
   */
  get describedById(): string | null {
    return this.hint || this.errorMessage || this.successMessage ? `${this.inputId}-hint` : null;
  }

  /** Computes wrapper container classes. */
  get wrapperClasses(): string {
    return ['ohmyui-input-wrapper', this.fullWidth ? 'ohmyui-input-wrapper--full' : ''].filter(Boolean).join(' ');
  }

  /** Computes input field classes based on state and configuration. */
  get fieldClasses(): string {
    return [
      'ohmyui-input-wrapper__field',
      `ohmyui-input-wrapper__field--${this.size}`,
      `ohmyui-input-wrapper__field--${this.variant}`,
      `ohmyui-input-wrapper__field--${this.status}`,
      this.isFocused() ? 'ohmyui-input-wrapper__field--focused' : '',
      this.disabled ? 'ohmyui-input-wrapper__field--disabled' : '',
      this.readonly ? 'ohmyui-input-wrapper__field--readonly' : '',
      this.iconLeft ? 'ohmyui-input-wrapper__field--icon-left' : '',
      this.iconRight || this.showClearBtn || this.showPasswordToggle || this.suffix
        ? 'ohmyui-input-wrapper__field--icon-right'
        : '',
      this.prefix ? 'ohmyui-input-wrapper__field--has-prefix' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }
}
