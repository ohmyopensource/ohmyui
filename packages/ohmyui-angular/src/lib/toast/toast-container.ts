/**
 * Copyright 2026 The OhMyOpenSource! Authors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * SPDX-License-Identifier: MPL-2.0
 */

import { Component, inject } from '@angular/core';
import { ToastService, ToastPosition, Toast } from './toast.service';
import { ToastItemComponent } from './toast-item';

const POSITIONS: ToastPosition[] = [
  'top-right',
  'top-left',
  'top-center',
  'bottom-right',
  'bottom-left',
  'bottom-center',
];

@Component({
  selector: 'ohmyui-toast-container',
  standalone: true,
  imports: [ToastItemComponent],
  templateUrl: './toast-container.html',
  styleUrl: './toast-container.css',
})
export class ToastContainerComponent {
  private toastService = inject(ToastService);

  readonly positions = POSITIONS;

  toastsForPosition(position: ToastPosition): Toast[] {
    return this.toastService.toasts().filter((t) => t.position === position);
  }

  dismiss(id: string): void {
    this.toastService.dismiss(id);
  }

  trackById(_index: number, toast: Toast): string {
    return toast.id;
  }
}
