/**
 * Copyright 2026 The OhMyOpenSource! Authors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * SPDX-License-Identifier: MPL-2.0
 */

/**
 * @file checkbox-group.spec.ts
 * @description Unit tests of CheckboxGroupComponent: the legend, the projected
 * checkboxes, the disabled state passed down by the fieldset and the error
 * message.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { CheckboxGroupComponent } from './checkbox-group';
import { CheckboxComponent } from './checkbox';

@Component({
  standalone: true,
  imports: [CheckboxGroupComponent, CheckboxComponent],
  template: `
    <ohmyui-checkbox-group
      [label]="label"
      [disabled]="disabled"
      [error]="error"
      [errorMessage]="errorMessage"
    >
      <ohmyui-checkbox label="Email"></ohmyui-checkbox>
      <ohmyui-checkbox label="SMS"></ohmyui-checkbox>
    </ohmyui-checkbox-group>
  `,
})
class HostComponent {
  label = 'Notifiche';
  disabled = false;
  error = false;
  errorMessage = '';
}

describe('CheckboxGroupComponent', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
  });

  it('should create', () => {
    fixture.detectChanges();
    const group = fixture.debugElement.query(
      (el) => el.name === 'ohmyui-checkbox-group',
    );
    expect(group).toBeTruthy();
  });

  it('should render the legend with the group label', () => {
    fixture.detectChanges();
    const legend: HTMLElement = fixture.nativeElement.querySelector('legend');
    expect(legend.textContent).toContain('Notifiche');
  });

  it('should render every projected checkbox', () => {
    fixture.detectChanges();
    const checkboxes =
      fixture.nativeElement.querySelectorAll('ohmyui-checkbox');
    expect(checkboxes.length).toBe(2);
  });

  it('should disable every projected checkbox input via native fieldset cascade', () => {
    fixture.componentInstance.disabled = true;
    fixture.detectChanges();
    const inputs: NodeListOf<HTMLInputElement> =
      fixture.nativeElement.querySelectorAll('input[type="checkbox"]');
    expect(inputs.length).toBe(2);
    // `disabled` only reflects the input's own attribute; a disabled
    // <fieldset> ancestor is exposed through the :disabled state.
    inputs.forEach((input) => expect(input.matches(':disabled')).toBe(true));
  });

  it('should render the error message with role alert when in error state', () => {
    fixture.componentInstance.error = true;
    fixture.componentInstance.errorMessage = 'Seleziona almeno una opzione.';
    fixture.detectChanges();
    const errorEl: HTMLElement =
      fixture.nativeElement.querySelector('[role="alert"]');
    expect(errorEl.textContent).toContain('Seleziona almeno una opzione.');
  });
});
