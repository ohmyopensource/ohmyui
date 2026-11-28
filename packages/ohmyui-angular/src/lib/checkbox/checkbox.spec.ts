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
 * @file checkbox.spec.ts
 * @description Unit tests of CheckboxComponent: the defaults, the label, the
 * checked state and its event, the indeterminate state, the
 * ControlValueAccessor methods and the error state.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxComponent } from './checkbox';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default to primary variant, md size, unchecked', () => {
    fixture.detectChanges();
    expect(component.classes['ohmyui-checkbox--primary']).toBe(true);
    expect(component.classes['ohmyui-checkbox--md']).toBe(true);
    expect(component.checked).toBe(false);
  });

  it('should render the label', () => {
    component.label = 'Accept terms';
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Accept terms');
  });

  it('should update checked and emit checkedChange on native change event', () => {
    fixture.detectChanges();
    const emitSpy = vi.spyOn(component.checkedChange, 'emit');
    const input: HTMLInputElement = fixture.nativeElement.querySelector(
      'input[type="checkbox"]',
    );
    input.checked = true;
    input.dispatchEvent(new Event('change'));

    expect(component.checked).toBe(true);
    expect(emitSpy).toHaveBeenCalledWith(true);
  });

  it('should resolve indeterminate to false on user interaction', () => {
    component.indeterminate = true;
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector(
      'input[type="checkbox"]',
    );
    input.checked = true;
    input.dispatchEvent(new Event('change'));

    expect(component.indeterminate).toBe(false);
  });

  it('should sync the indeterminate DOM property on the native input', () => {
    fixture.detectChanges();
    component.indeterminate = true;
    const input: HTMLInputElement = fixture.nativeElement.querySelector(
      'input[type="checkbox"]',
    );
    expect(input.indeterminate).toBe(true);
  });

  it('should implement ControlValueAccessor.writeValue', () => {
    component.writeValue(true);
    expect(component.checked).toBe(true);
  });

  it('should implement ControlValueAccessor.setDisabledState', () => {
    component.setDisabledState(true);
    expect(component.disabled).toBe(true);
  });

  it('should call the registered onChange callback via registerOnChange', () => {
    const onChange = vi.fn();
    component.registerOnChange(onChange);
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector(
      'input[type="checkbox"]',
    );
    input.checked = true;
    input.dispatchEvent(new Event('change'));

    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('should call the registered onTouched callback via registerOnTouched on blur', () => {
    const onTouched = vi.fn();
    component.registerOnTouched(onTouched);
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector(
      'input[type="checkbox"]',
    );
    input.dispatchEvent(new Event('blur'));

    expect(onTouched).toHaveBeenCalled();
  });

  it('should mark aria-invalid when in error state', () => {
    component.error = true;
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector(
      'input[type="checkbox"]',
    );
    expect(input.getAttribute('aria-invalid')).toBe('true');
  });

  it('should keep the error state apart from the error variant', () => {
    component.variant = 'error';
    expect(component.classes['ohmyui-checkbox--error']).toBe(true);
    expect(component.classes['ohmyui-checkbox--invalid']).toBe(false);
    component.variant = 'primary';
    component.error = true;
    expect(component.classes['ohmyui-checkbox--error']).toBeUndefined();
    expect(component.classes['ohmyui-checkbox--invalid']).toBe(true);
  });
});
