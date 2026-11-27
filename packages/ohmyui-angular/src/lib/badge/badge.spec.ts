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
 * @file badge.spec.ts
 * @description Unit tests of BadgeComponent: the defaults, the label, the count
 * mode and its cap, the dot-only mode and the removed event.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BadgeComponent } from './badge';

describe('BadgeComponent', () => {
  let component: BadgeComponent;
  let fixture: ComponentFixture<BadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default to primary variant, md size, pill shape', () => {
    fixture.detectChanges();
    expect(component.classes['ohmyui-badge--primary']).toBe(true);
    expect(component.classes['ohmyui-badge--md']).toBe(true);
    expect(component.classes['ohmyui-badge--pill']).toBe(true);
  });

  it('should render the label', () => {
    component.label = 'New';
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('New');
  });

  it('should switch to count mode when count > 0', () => {
    component.count = 5;
    fixture.detectChanges();
    expect(component.isCountMode).toBe(true);
    expect(fixture.nativeElement.textContent).toContain('5');
  });

  it('should cap the count at maxCount', () => {
    component.count = 150;
    component.maxCount = 99;
    expect(component.displayCount).toBe('99+');
  });

  it('should be dot-only when dot is true and there is no label/count', () => {
    component.dot = true;
    expect(component.isDotOnly).toBe(true);
  });

  it('should not be dot-only when a label is present', () => {
    component.dot = true;
    component.label = 'Online';
    expect(component.isDotOnly).toBe(false);
  });

  it('should emit removed when the remove button is clicked', () => {
    component.removable = true;
    fixture.detectChanges();
    const emitSpy = vi.spyOn(component.removed, 'emit');

    const removeButton: HTMLButtonElement = fixture.nativeElement.querySelector(
      '.ohmyui-badge__remove',
    );
    removeButton.click();

    expect(emitSpy).toHaveBeenCalled();
  });
});
