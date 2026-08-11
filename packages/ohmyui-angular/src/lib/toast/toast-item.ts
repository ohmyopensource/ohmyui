import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  inject,
} from '@angular/core';
import {
  LucideCircleCheck,
  LucideCircleX,
  LucideTriangleAlert,
  LucideInfo,
  LucideBell,
  LucideX,
} from '@lucide/angular';
import type { Toast, ToastType } from './toast.service';

@Component({
  selector: 'ohmyui-toast-item',
  standalone: true,
  imports: [
    LucideCircleCheck,
    LucideCircleX,
    LucideTriangleAlert,
    LucideInfo,
    LucideBell,
    LucideX,
  ],
  templateUrl: './toast-item.html',
  styleUrl: './toast-item.css',
})
export class ToastItemComponent implements OnInit, OnDestroy {
  @Input() toast!: Toast;
  @Output() dismiss = new EventEmitter<string>();

  progress = 100;
  isRemoving = false;
  private interval?: ReturnType<typeof setInterval>;

  private cdr = inject(ChangeDetectorRef);

  get toastClass(): string {
    return [
      'ohmyui-toast',
      `ohmyui-toast--${this.toast.type}`,
      this.isRemoving ? 'ohmyui-toast--out' : 'ohmyui-toast--in',
    ].join(' ');
  }

  get iconType(): ToastType {
    return this.toast.type;
  }

  ngOnInit(): void {
    if (this.toast.duration > 0) {
      const step = 50;
      const decrement = (step / this.toast.duration) * 100;

      this.interval = setInterval(() => {
        this.progress = Math.max(0, this.progress - decrement);
        this.cdr.markForCheck();

        if (this.progress <= 0) {
          this.clearInterval();
          this.startDismiss();
        }
      }, step);
    }
  }

  ngOnDestroy(): void {
    this.clearInterval();
  }

  onDismiss(): void {
    this.clearInterval();
    this.startDismiss();
  }

  private startDismiss(): void {
    if (this.isRemoving) return;
    this.isRemoving = true;
    setTimeout(() => this.dismiss.emit(this.toast.id), 300);
  }

  private clearInterval(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
  }
}
