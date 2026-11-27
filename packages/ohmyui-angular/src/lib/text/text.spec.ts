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
 * @file text.spec.ts
 * @description Unit tests of TextComponent: the input defaults and the host
 * classes for variants, colors, weights, alignment, modifiers, line clamp and
 * extra classes.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextComponent } from './text';

describe('TextComponent', () => {
  let component: TextComponent;
  let fixture: ComponentFixture<TextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should default variant to "body"', () => {
    expect(component.variant).toBe('body');
  });
  it('should default color to "default"', () => {
    expect(component.color).toBe('default');
  });
  it('should default weight to empty string', () => {
    expect(component.weight).toBe('');
  });
  it('should default align to empty string', () => {
    expect(component.align).toBe('');
  });
  it('should default italic to false', () => {
    expect(component.italic).toBe(false);
  });
  it('should default underline to false', () => {
    expect(component.underline).toBe(false);
  });
  it('should default truncate to false', () => {
    expect(component.truncate).toBe(false);
  });
  it('should default noWrap to false', () => {
    expect(component.noWrap).toBe(false);
  });
  it('should default gradient to false', () => {
    expect(component.gradient).toBe(false);
  });
  it('should default lineClamp to 0', () => {
    expect(component.lineClamp).toBe(0);
  });
  it('should default extraClass to empty string', () => {
    expect(component.extraClass).toBe('');
  });

  it('should always include "ohmyui-text" in hostClasses', () => {
    expect(component.hostClasses).toContain('ohmyui-text');
  });
  it('should include variant class in hostClasses', () => {
    expect(component.hostClasses).toContain('ohmyui-text--body');
  });
  it('should include color class in hostClasses', () => {
    expect(component.hostClasses).toContain('ohmyui-text--color-default');
  });

  it('should apply ohmyui-text--h1 for variant "h1"', () => {
    fixture.componentRef.setInput('variant', 'h1');
    expect(component.hostClasses).toContain('ohmyui-text--h1');
  });
  it('should apply ohmyui-text--display for variant "display"', () => {
    fixture.componentRef.setInput('variant', 'display');
    expect(component.hostClasses).toContain('ohmyui-text--display');
  });
  it('should apply ohmyui-text--code for variant "code"', () => {
    fixture.componentRef.setInput('variant', 'code');
    expect(component.hostClasses).toContain('ohmyui-text--code');
  });

  it('should apply ohmyui-text--color-primary for color "primary"', () => {
    fixture.componentRef.setInput('color', 'primary');
    expect(component.hostClasses).toContain('ohmyui-text--color-primary');
  });
  it('should apply ohmyui-text--color-error for color "error"', () => {
    fixture.componentRef.setInput('color', 'error');
    expect(component.hostClasses).toContain('ohmyui-text--color-error');
  });
  it('should apply ohmyui-text--color-white for color "white"', () => {
    fixture.componentRef.setInput('color', 'white');
    expect(component.hostClasses).toContain('ohmyui-text--color-white');
  });
  it('should apply ohmyui-text--color-inherit for color "inherit"', () => {
    fixture.componentRef.setInput('color', 'inherit');
    expect(component.hostClasses).toContain('ohmyui-text--color-inherit');
  });

  it('should NOT include weight class when weight is empty', () => {
    expect(component.hostClasses).not.toContain('ohmyui-text--weight-');
  });
  it('should apply ohmyui-text--weight-bold for weight "bold"', () => {
    fixture.componentRef.setInput('weight', 'bold');
    expect(component.hostClasses).toContain('ohmyui-text--weight-bold');
  });

  it('should NOT include align class when align is empty', () => {
    expect(component.hostClasses).not.toContain('ohmyui-text--align-');
  });
  it('should apply ohmyui-text--align-center for align "center"', () => {
    fixture.componentRef.setInput('align', 'center');
    expect(component.hostClasses).toContain('ohmyui-text--align-center');
  });

  it('should apply ohmyui-text--italic when italic is true', () => {
    fixture.componentRef.setInput('italic', true);
    expect(component.hostClasses).toContain('ohmyui-text--italic');
  });
  it('should NOT apply ohmyui-text--italic when italic is false', () => {
    expect(component.hostClasses).not.toContain('ohmyui-text--italic');
  });

  it('should apply ohmyui-text--underline when underline is true', () => {
    fixture.componentRef.setInput('underline', true);
    expect(component.hostClasses).toContain('ohmyui-text--underline');
  });

  it('should apply ohmyui-text--truncate when truncate is true', () => {
    fixture.componentRef.setInput('truncate', true);
    expect(component.hostClasses).toContain('ohmyui-text--truncate');
  });
  it('should apply ohmyui-text--nowrap when noWrap is true', () => {
    fixture.componentRef.setInput('noWrap', true);
    expect(component.hostClasses).toContain('ohmyui-text--nowrap');
  });

  it('should apply ohmyui-text--gradient when gradient is true', () => {
    fixture.componentRef.setInput('gradient', true);
    expect(component.hostClasses).toContain('ohmyui-text--gradient');
  });
  it('should NOT apply ohmyui-text--gradient when gradient is false', () => {
    expect(component.hostClasses).not.toContain('ohmyui-text--gradient');
  });

  it('should NOT include clamp class when lineClamp is 0', () => {
    expect(component.hostClasses).not.toContain('ohmyui-text--clamp-');
  });
  it('should apply ohmyui-text--clamp-3 for lineClamp 3', () => {
    fixture.componentRef.setInput('lineClamp', 3);
    expect(component.hostClasses).toContain('ohmyui-text--clamp-3');
  });
  it('should apply ohmyui-text--clamp-6 for lineClamp 6', () => {
    fixture.componentRef.setInput('lineClamp', 6);
    expect(component.hostClasses).toContain('ohmyui-text--clamp-6');
  });

  it('should NOT include extra class when extraClass is empty', () => {
    expect(
      component.hostClasses.split(' ').filter((c) => c === ''),
    ).toHaveLength(0);
  });
  it('should append extraClass to hostClasses', () => {
    fixture.componentRef.setInput('extraClass', 'my-custom-class');
    expect(component.hostClasses).toContain('my-custom-class');
  });

  it('should combine variant, color, weight and align correctly', () => {
    fixture.componentRef.setInput('variant', 'h2');
    fixture.componentRef.setInput('color', 'primary');
    fixture.componentRef.setInput('weight', 'bold');
    fixture.componentRef.setInput('align', 'center');
    const classes = component.hostClasses;
    expect(classes).toContain('ohmyui-text--h2');
    expect(classes).toContain('ohmyui-text--color-primary');
    expect(classes).toContain('ohmyui-text--weight-bold');
    expect(classes).toContain('ohmyui-text--align-center');
  });

  it('should combine multiple boolean modifiers', () => {
    fixture.componentRef.setInput('italic', true);
    fixture.componentRef.setInput('underline', true);
    fixture.componentRef.setInput('gradient', true);
    const classes = component.hostClasses;
    expect(classes).toContain('ohmyui-text--italic');
    expect(classes).toContain('ohmyui-text--underline');
    expect(classes).toContain('ohmyui-text--gradient');
  });

  it('should produce a space-separated string without empty entries', () => {
    const classes = component.hostClasses.split(' ');
    expect(classes.every((c) => c.length > 0)).toBe(true);
  });

  it('should apply hostClasses to the host element', () => {
    const hostEl = fixture.nativeElement as HTMLElement;
    expect(hostEl.className).toContain('ohmyui-text');
  });
  it('should reflect input changes on the host element class', () => {
    fixture.componentRef.setInput('variant', 'h1');
    fixture.detectChanges();
    const hostEl = fixture.nativeElement as HTMLElement;
    expect(hostEl.className).toContain('ohmyui-text--h1');
  });
});
