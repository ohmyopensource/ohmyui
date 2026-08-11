import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'neutral';
export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center';

export interface Toast {
  id: string;
  type: ToastType;
  title?: string;
  message?: string;
  duration: number; // ms — 0 = persistent
  position: ToastPosition;
  closable: boolean;
  removing: boolean; // true while exit animation plays
}

export interface ToastOptions {
  title?: string;
  message?: string;
  duration?: number;
  position?: ToastPosition;
  closable?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly toasts = signal<Toast[]>([]);

  private defaultDuration = 4000;
  private defaultPosition: ToastPosition = 'top-right';

  /** Configure global defaults */
  configure(options: { duration?: number; position?: ToastPosition }): void {
    if (options.duration !== undefined) this.defaultDuration = options.duration;
    if (options.position !== undefined) this.defaultPosition = options.position;
  }

  success(title?: string, message?: string, options?: ToastOptions): string {
    return this.add('success', { title, message, ...options });
  }

  error(title?: string, message?: string, options?: ToastOptions): string {
    return this.add('error', { title, message, ...options });
  }

  warning(title?: string, message?: string, options?: ToastOptions): string {
    return this.add('warning', { title, message, ...options });
  }

  info(title?: string, message?: string, options?: ToastOptions): string {
    return this.add('info', { title, message, ...options });
  }

  neutral(title?: string, message?: string, options?: ToastOptions): string {
    return this.add('neutral', { title, message, ...options });
  }

  dismiss(id: string): void {
    // mark as removing so exit animation plays, then remove
    this.toasts.update((list) =>
      list.map((t) => (t.id === id ? { ...t, removing: true } : t)),
    );
    setTimeout(() => {
      this.toasts.update((list) => list.filter((t) => t.id !== id));
    }, 350);
  }

  dismissAll(): void {
    this.toasts().forEach((t) => this.dismiss(t.id));
  }

  private add(type: ToastType, options: ToastOptions = {}): string {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const toast: Toast = {
      id,
      type,
      title: options.title,
      message: options.message,
      duration: options.duration ?? this.defaultDuration,
      position: options.position ?? this.defaultPosition,
      closable: options.closable ?? true,
      removing: false,
    };

    this.toasts.update((list) => [...list, toast]);

    if (toast.duration > 0) {
      setTimeout(() => this.dismiss(id), toast.duration);
    }

    return id;
  }
}
