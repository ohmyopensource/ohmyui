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
 * @file button.spec.ts
 * @description Unit tests of ButtonComponent: the defaults, the label, the
 * inert states (disabled, loading, succeeded), the clicked event, the succeeded
 * label, the query params of router links, the rel of external links and the
 * ripple.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ButtonComponent } from './button';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default to primary variant, md size, md rounded, button mode', () => {
    fixture.detectChanges();
    expect(component.classes['ohmyui-btn--primary']).toBe(true);
    expect(component.classes['ohmyui-btn--md']).toBe(true);
    expect(component.classes['ohmyui-btn--rounded-md']).toBe(true);
    expect(component.mode).toBe('button');
  });

  it('should render the label', () => {
    component.label = 'Save';
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Save');
  });

  it('should be inert when disabled, loading, or succeeded', () => {
    expect(component.isInert).toBe(false);
    component.disabled = true;
    expect(component.isInert).toBe(true);
    component.disabled = false;
    component.loading = true;
    expect(component.isInert).toBe(true);
    component.loading = false;
    component.succeeded = true;
    expect(component.isInert).toBe(true);
  });

  it('should emit clicked when interactive', () => {
    fixture.detectChanges();
    const emitSpy = vi.spyOn(component.clicked, 'emit');
    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    button.click();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should not emit clicked when inert', () => {
    component.disabled = true;
    fixture.detectChanges();
    const emitSpy = vi.spyOn(component.clicked, 'emit');
    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    button.click();
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should prefer succeededLabel over label when succeeded', () => {
    component.label = 'Save';
    component.succeededLabel = 'Saved!';
    expect(component.displayLabel).toBe('Save');
    component.succeeded = true;
    expect(component.displayLabel).toBe('Saved!');
  });

  it('should fall back to label when succeeded without succeededLabel', () => {
    component.label = 'Save';
    component.succeeded = true;
    expect(component.displayLabel).toBe('Save');
  });

  it('should parse query params from href for router mode', () => {
    component.href = '/products?category=shoes&sort=price';
    expect(component.routerPath).toBe('/products');
    expect(component.routerQueryParams).toEqual({
      category: 'shoes',
      sort: 'price',
    });
  });

  it('should return null query params when href has no query string', () => {
    component.href = '/products';
    expect(component.routerQueryParams).toBeNull();
  });

  it('should use noopener noreferrer rel only when target is _blank', () => {
    expect(component.externalRel).toBe('');
    component.target = '_blank';
    expect(component.externalRel).toBe('noopener noreferrer');
  });

  it('should not create a ripple when inert', () => {
    component.disabled = true;
    fixture.detectChanges();
    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    const event = new MouseEvent('click', { clientX: 10, clientY: 10 });
    Object.defineProperty(event, 'currentTarget', { value: button });
    component.onRipple(event);
    expect(button.querySelector('.ohmyui-btn__ripple')).toBeNull();
  });

  describe('ripple and reduced motion', () => {
    const view = document.defaultView as Window;

    function clickRipple(): HTMLButtonElement {
      fixture.detectChanges();
      const button: HTMLButtonElement =
        fixture.nativeElement.querySelector('button');
      const event = new MouseEvent('click', { clientX: 10, clientY: 10 });
      Object.defineProperty(event, 'currentTarget', { value: button });
      component.onRipple(event);
      return button;
    }

    function stubReducedMotion(matches: boolean): void {
      Object.defineProperty(view, 'matchMedia', {
        configurable: true,
        value: vi.fn().mockReturnValue({ matches }),
      });
    }

    afterEach(() => {
      Reflect.deleteProperty(view, 'matchMedia');
    });

    it('should create a ripple on click', () => {
      stubReducedMotion(false);
      const button = clickRipple();
      expect(button.querySelector('.ohmyui-btn__ripple')).not.toBeNull();
    });

    it('should not create a ripple when the user reduces motion', () => {
      stubReducedMotion(true);
      const button = clickRipple();
      expect(button.querySelector('.ohmyui-btn__ripple')).toBeNull();
    });
  });
});
