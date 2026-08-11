import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  HostListener,
  ElementRef,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  LucideChevronDown,
  LucideX,
  LucideCheck,
  LucideSearch,
  LucideLoader,
} from '@lucide/angular';

export type SelectVariant = 'default' | 'filled' | 'ghost';
export type SelectSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SelectStatus = 'default' | 'error' | 'success';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
}

@Component({
  selector: 'ohmyui-select',
  standalone: true,
  imports: [
    FormsModule,
    LucideChevronDown,
    LucideX,
    LucideCheck,
    LucideSearch,
    LucideLoader,
  ],
  templateUrl: './select.html',
  styleUrl: './select.css',
})
export class SelectComponent implements OnChanges {
  private el = inject(ElementRef);

  @Input() options: SelectOption[] = [];
  @Input() value: string | string[] = '';
  @Input() placeholder = 'Select an option';
  @Input() label = '';
  @Input() hint = '';
  @Input() variant: SelectVariant = 'default';
  @Input() size: SelectSize = 'md';
  @Input() status: SelectStatus = 'default';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() clearable = false;
  @Input() searchable = false;
  @Input() multiple = false;
  @Input() maxHeight = 260;

  @Output() valueChange = new EventEmitter<string | string[]>();
  @Output() selectChange = new EventEmitter<SelectOption | SelectOption[]>();

  isOpen = false;
  searchQuery = '';
  labelId = `ohmyui-select-label-${Math.random().toString(36).slice(2, 7)}`;
  hintId = `ohmyui-select-hint-${Math.random().toString(36).slice(2, 7)}`;
  listboxId = `ohmyui-select-listbox-${Math.random().toString(36).slice(2, 7)}`;

  /* ── Computed ─────────────────────────────── */

  get selectedValues(): string[] {
    if (this.multiple) return Array.isArray(this.value) ? this.value : [];
    return this.value ? [this.value as string] : [];
  }

  get displayLabel(): string {
    if (this.multiple) {
      const count = this.selectedValues.length;
      if (count === 0) return this.placeholder;
      if (count === 1) return this.getLabelForValue(this.selectedValues[0]);
      return `${count} selected`;
    }
    return this.value
      ? this.getLabelForValue(this.value as string)
      : this.placeholder;
  }

  get hasValue(): boolean {
    if (this.multiple) return this.selectedValues.length > 0;
    return !!this.value;
  }

  get groups(): string[] {
    const g = this.filteredOptions
      .map((o) => o.group ?? '')
      .filter((v, i, a) => a.indexOf(v) === i);
    return g;
  }

  get filteredOptions(): SelectOption[] {
    if (!this.searchQuery) return this.options;
    const q = this.searchQuery.toLowerCase();
    return this.options.filter((o) => o.label.toLowerCase().includes(q));
  }

  get triggerClass(): string {
    return [
      'ohmyui-select__trigger',
      `ohmyui-select__trigger--${this.variant}`,
      `ohmyui-select__trigger--${this.size}`,
      `ohmyui-select__trigger--${this.status}`,
      this.isOpen ? 'ohmyui-select__trigger--open' : '',
      this.disabled ? 'ohmyui-select__trigger--disabled' : '',
      this.loading ? 'ohmyui-select__trigger--loading' : '',
      !this.hasValue ? 'ohmyui-select__trigger--placeholder' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  /* ── Methods ──────────────────────────────── */

  ngOnChanges(): void {
    if (!this.multiple && Array.isArray(this.value)) {
      this.value = this.value[0] ?? '';
    }
  }

  toggle(): void {
    if (this.disabled || this.loading) return;
    this.isOpen = !this.isOpen;
    if (!this.isOpen) this.searchQuery = '';
  }

  close(): void {
    this.isOpen = false;
    this.searchQuery = '';
  }

  isSelected(option: SelectOption): boolean {
    return this.selectedValues.includes(option.value);
  }

  select(option: SelectOption): void {
    if (option.disabled) return;

    if (this.multiple) {
      const current = [...this.selectedValues];
      const idx = current.indexOf(option.value);
      if (idx >= 0) {
        current.splice(idx, 1);
      } else {
        current.push(option.value);
      }
      this.value = current;
      this.valueChange.emit(current);
      this.selectChange.emit(
        current.map((v) => this.getOptionForValue(v)!).filter(Boolean),
      );
    } else {
      this.value = option.value;
      this.valueChange.emit(option.value);
      this.selectChange.emit(option);
      this.close();
    }
  }

  clear(event: Event): void {
    event.stopPropagation();
    this.value = this.multiple ? [] : '';
    this.valueChange.emit(this.value);
    this.selectChange.emit(
      this.multiple ? [] : (null as unknown as SelectOption),
    );
  }

  optionsForGroup(group: string): SelectOption[] {
    return this.filteredOptions.filter((o) => (o.group ?? '') === group);
  }

  private getLabelForValue(val: string): string {
    return this.options.find((o) => o.value === val)?.label ?? val;
  }

  private getOptionForValue(val: string): SelectOption | undefined {
    return this.options.find((o) => o.value === val);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.el.nativeElement.contains(event.target)) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close();
  }

  trackByValue(_: number, option: SelectOption): string {
    return option.value;
  }
}
