import { Component, Input, Output, EventEmitter } from '@angular/core';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'confirm'
  | 'warning'
  | 'danger'
  | 'info'
  | 'cancel'
  | 'link';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type ButtonRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';

@Component({
  selector: 'ohmyui-button',
  standalone: true,
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() radius: ButtonRadius = 'md';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() fullWidth = false;
  @Input() label = '';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  @Output() clicked = new EventEmitter<MouseEvent>();

  get classes(): string {
    return [
      'ohmyui-btn',
      `ohmyui-btn--${this.variant}`,
      `ohmyui-btn--${this.size}`,
      `ohmyui-btn--radius-${this.radius}`,
      this.fullWidth ? 'ohmyui-btn--full' : '',
      this.loading ? 'ohmyui-btn--loading' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  handleClick(event: MouseEvent): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event);
    }
  }
}
