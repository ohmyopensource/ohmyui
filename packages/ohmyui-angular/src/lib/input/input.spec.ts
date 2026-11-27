/**
 * Copyright 2026 The OhMyOpenSource! Authors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default to text type, primary variant, md size, fullWidth true', () => {
    fixture.detectChanges();
    expect(component.type).toBe('text');
    expect(component.fieldClasses).toContain(
      'ohmyui-input-wrapper__field--primary',
    );
    expect(component.fieldClasses).toContain('ohmyui-input-wrapper__field--md');
    expect(component.fullWidth).toBe(true);
  });

  describe('min/max attribute (regression: 0 is a valid boundary, not "unset")', () => {
    it('should render min="0" on the native input, not omit it', () => {
      component.type = 'number';
      component.min = 0;
      fixture.detectChanges();
      const input: HTMLInputElement =
        fixture.nativeElement.querySelector('input');
      expect(input.getAttribute('min')).toBe('0');
    });

    it('should omit the min attribute when min is not set (empty string default)', () => {
      component.type = 'number';
      fixture.detectChanges();
      const input: HTMLInputElement =
        fixture.nativeElement.querySelector('input');
      expect(input.getAttribute('min')).toBeNull();
    });

    it('should render max="0" on the native input, not omit it', () => {
      component.type = 'number';
      component.max = 0;
      fixture.detectChanges();
      const input: HTMLInputElement =
        fixture.nativeElement.querySelector('input');
      expect(input.getAttribute('max')).toBe('0');
    });
  });

  describe('effectiveType', () => {
    it('should return "password" by default for password type', () => {
      component.type = 'password';
      expect(component.effectiveType).toBe('password');
    });
    it('should return "text" when password visibility is toggled on', () => {
      component.type = 'password';
      component.togglePassword();
      expect(component.effectiveType).toBe('text');
    });
    it('should pass through non-password types unchanged', () => {
      component.type = 'email';
      expect(component.effectiveType).toBe('email');
    });
  });

  describe('validation status', () => {
    it('should default to "default" status', () => {
      expect(component.status).toBe('default');
    });
    it('should be "error" when errorMessage is set', () => {
      component.errorMessage = 'Campo obbligatorio';
      expect(component.status).toBe('error');
    });
    it('should be "success" when successMessage is set', () => {
      component.successMessage = 'Tutto ok';
      expect(component.status).toBe('success');
    });
    it('should prioritize error over success when both are set', () => {
      component.errorMessage = 'Errore';
      component.successMessage = 'Ok';
      expect(component.status).toBe('error');
    });
  });

  describe('rendering modes', () => {
    it('should render a native <input> for type text', () => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('input')).not.toBeNull();
      expect(fixture.nativeElement.querySelector('textarea')).toBeNull();
      expect(fixture.nativeElement.querySelector('select')).toBeNull();
    });
    it('should render a <textarea> for type textarea', () => {
      component.type = 'textarea';
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('textarea')).not.toBeNull();
      expect(fixture.nativeElement.querySelector('input')).toBeNull();
    });
    it('should render a <select> for type select', () => {
      component.type = 'select';
      component.options = [{ label: 'Uno', value: 1 }];
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('select')).not.toBeNull();
      expect(fixture.nativeElement.querySelector('input')).toBeNull();
    });
  });

  describe('ControlValueAccessor', () => {
    it('should implement writeValue', () => {
      component.writeValue('ciao');
      expect(component.value).toBe('ciao');
    });
    it('should default to empty string when writeValue receives null', () => {
      component.writeValue(null);
      expect(component.value).toBe('');
    });
    it('should implement setDisabledState', () => {
      component.setDisabledState(true);
      expect(component.disabled).toBe(true);
    });
    it('should call the registered onChange callback on input', () => {
      const onChange = vi.fn();
      component.registerOnChange(onChange);
      fixture.detectChanges();
      const input: HTMLInputElement =
        fixture.nativeElement.querySelector('input');
      input.value = 'nuovo valore';
      input.dispatchEvent(new Event('input'));
      expect(onChange).toHaveBeenCalledWith('nuovo valore');
    });
    it('should call the registered onTouched callback on blur', () => {
      const onTouched = vi.fn();
      component.registerOnTouched(onTouched);
      fixture.detectChanges();
      const input: HTMLInputElement =
        fixture.nativeElement.querySelector('input');
      input.dispatchEvent(new FocusEvent('blur'));
      expect(onTouched).toHaveBeenCalled();
    });
  });

  describe('clear button', () => {
    it('should not show the clear button when clearable is false', () => {
      component.clearable = false;
      component.value = 'testo';
      expect(component.showClearBtn).toBe(false);
    });
    it('should show the clear button when clearable and value is set', () => {
      component.clearable = true;
      component.value = 'testo';
      expect(component.showClearBtn).toBe(true);
    });
    it('should not show the clear button when disabled', () => {
      component.clearable = true;
      component.value = 'testo';
      component.disabled = true;
      expect(component.showClearBtn).toBe(false);
    });
    it('should emit cleared and reset the value on clear', () => {
      component.clearable = true;
      component.value = 'testo';
      fixture.detectChanges();
      const emitSpy = vi.spyOn(component.cleared, 'emit');
      component.onClear();
      expect(component.value).toBe('');
      expect(emitSpy).toHaveBeenCalled();
    });
  });

  it('should toggle password visibility', () => {
    expect(component.showPassword()).toBe(false);
    component.togglePassword();
    expect(component.showPassword()).toBe(true);
  });

  it('should emit inputEnter when Enter is pressed', () => {
    fixture.detectChanges();
    const emitSpy = vi.spyOn(component.inputEnter, 'emit');
    component.onKeydown(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should not emit inputEnter for other keys', () => {
    fixture.detectChanges();
    const emitSpy = vi.spyOn(component.inputEnter, 'emit');
    component.onKeydown(new KeyboardEvent('keydown', { key: 'a' }));
    expect(emitSpy).not.toHaveBeenCalled();
  });
});
