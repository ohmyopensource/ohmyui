import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ElementRef,
  ViewChild,
  HostListener,
} from '@angular/core';
import { ButtonComponent } from '../button/button';
import { LucideX } from '@lucide/angular';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen';
export type ModalPosition = 'center' | 'top' | 'bottom' | 'left' | 'right';

@Component({
  selector: 'ohmyui-modal',
  standalone: true,
  imports: [ButtonComponent, LucideX],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class ModalComponent implements OnChanges, OnDestroy {
  @Input() open = false;
  @Input() title = '';
  @Input() size: ModalSize = 'md';
  @Input() position: ModalPosition = 'center';
  @Input() closable = true;
  @Input() closeOnOverlay = true;
  @Input() closeOnEsc = true;

  /** Predefined confirm pattern: shows Cancel + Confirm buttons in footer */
  @Input() confirmLabel = '';
  /** Predefined cancel label shown when confirmLabel is set */
  @Input() cancelLabel = 'Cancel';
  /** Variant for the confirm button */
  @Input() confirmVariant:
    | 'primary'
    | 'confirm'
    | 'danger'
    | 'warning'
    | 'info' = 'primary';

  @Output() closed = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<void>();

  @ViewChild('modalPanel') modalPanel!: ElementRef<HTMLElement>;

  isVisible = false;
  isAnimatingOut = false;

  private focusableElements: HTMLElement[] = [];
  private previouslyFocused: HTMLElement | null = null;

  get panelClass(): string {
    return [
      'ohmyui-modal__panel',
      `ohmyui-modal__panel--${this.size}`,
      `ohmyui-modal__panel--${this.position}`,
      this.isAnimatingOut ? 'ohmyui-modal__panel--out' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  get overlayClass(): string {
    return [
      'ohmyui-modal__overlay',
      this.isAnimatingOut ? 'ohmyui-modal__overlay--out' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  get hasFooter(): boolean {
    return !!this.confirmLabel;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open']) {
      if (this.open) {
        this.openModal();
      } else if (!changes['open'].firstChange) {
        this.closeModal();
      }
    }
  }

  ngOnDestroy(): void {
    this.unlockScroll();
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    if (this.open && this.closeOnEsc && this.closable) {
      this.requestClose();
    }
  }

  onOverlayClick(): void {
    if (this.closeOnOverlay && this.closable) {
      this.requestClose();
    }
  }

  requestClose(): void {
    this.isAnimatingOut = true;
    setTimeout(() => {
      this.isAnimatingOut = false;
      this.isVisible = false;
      this.unlockScroll();
      this.restoreFocus();
      this.closed.emit();
    }, 250);
  }

  onConfirm(): void {
    this.confirmed.emit();
    this.requestClose();
  }

  onKeydownTab(event: Event): void {
    const keyEvent = event as KeyboardEvent;
    if (this.focusableElements.length === 0) return;

    const first = this.focusableElements[0];
    const last = this.focusableElements[this.focusableElements.length - 1];

    if (keyEvent.shiftKey) {
      if (document.activeElement === first) {
        keyEvent.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        keyEvent.preventDefault();
        first.focus();
      }
    }
  }

  private openModal(): void {
    this.previouslyFocused = document.activeElement as HTMLElement;
    this.isVisible = true;
    this.lockScroll();
    setTimeout(() => this.trapFocus(), 50);
  }

  private closeModal(): void {
    this.isVisible = false;
    this.unlockScroll();
    this.restoreFocus();
  }

  private lockScroll(): void {
    document.body.style.overflow = 'hidden';
  }

  private unlockScroll(): void {
    document.body.style.overflow = '';
  }

  private trapFocus(): void {
    if (!this.modalPanel?.nativeElement) return;
    this.focusableElements = Array.from(
      this.modalPanel.nativeElement.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((el) => !el.hasAttribute('disabled'));

    if (this.focusableElements.length > 0) {
      this.focusableElements[0].focus();
    }
  }

  private restoreFocus(): void {
    if (this.previouslyFocused) {
      this.previouslyFocused.focus();
      this.previouslyFocused = null;
    }
  }
}
