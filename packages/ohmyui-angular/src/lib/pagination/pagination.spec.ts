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
import { PaginationComponent } from './pagination';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default to primary variant, md size, filled emphasis', () => {
    fixture.detectChanges();
    expect(component.hostClasses['ohmyui-pagination--primary']).toBe(true);
    expect(component.hostClasses['ohmyui-pagination--md']).toBe(true);
    expect(component.hostClasses['ohmyui-pagination--filled']).toBe(true);
  });

  describe('totalPages', () => {
    it('should compute total pages from totalItems and pageSize', () => {
      component.totalItems = 237;
      component.pageSize = 10;
      expect(component.totalPages).toBe(24);
    });
    it('should always be at least 1, even with zero items', () => {
      component.totalItems = 0;
      component.pageSize = 10;
      expect(component.totalPages).toBe(1);
    });
  });

  describe('rangeStart / rangeEnd', () => {
    it('should compute the correct range for a middle page', () => {
      component.totalItems = 237;
      component.pageSize = 10;
      component.currentPage = 3;
      expect(component.rangeStart).toBe(21);
      expect(component.rangeEnd).toBe(30);
    });
    it('should cap rangeEnd at totalItems on the last page', () => {
      component.totalItems = 237;
      component.pageSize = 10;
      component.currentPage = 24;
      expect(component.rangeEnd).toBe(237);
    });
    it('should return 0/0 range when there are no items', () => {
      component.totalItems = 0;
      component.currentPage = 1;
      expect(component.rangeStart).toBe(0);
    });
  });

  describe('pageItems (ellipsis logic)', () => {
    it('should render all pages with no ellipsis when total fits maxVisiblePages', () => {
      component.totalItems = 35;
      component.pageSize = 10; // totalPages = 4
      component.currentPage = 2;
      component.maxVisiblePages = 5;
      const items = component.pageItems;
      expect(
        items.map((i) => (component.isPageItem(i) ? i.value : 'ellipsis')),
      ).toEqual([1, 2, 3, 4]);
    });

    it('should show only a right ellipsis when near the start', () => {
      component.totalItems = 200;
      component.pageSize = 10; // totalPages = 20
      component.currentPage = 2;
      component.maxVisiblePages = 5;
      const items = component.pageItems;
      expect(
        items.map((i) => (component.isPageItem(i) ? i.value : 'ellipsis')),
      ).toEqual([1, 2, 3, 4, 'ellipsis', 20]);
    });

    it('should show only a left ellipsis when near the end', () => {
      component.totalItems = 200;
      component.pageSize = 10; // totalPages = 20
      component.currentPage = 19;
      component.maxVisiblePages = 5;
      const items = component.pageItems;
      expect(
        items.map((i) => (component.isPageItem(i) ? i.value : 'ellipsis')),
      ).toEqual([1, 'ellipsis', 17, 18, 19, 20]);
    });

    it('should show both ellipses when in the middle of a long range', () => {
      component.totalItems = 200;
      component.pageSize = 10; // totalPages = 20
      component.currentPage = 10;
      component.maxVisiblePages = 5;
      const items = component.pageItems;
      expect(
        items.map((i) => (component.isPageItem(i) ? i.value : 'ellipsis')),
      ).toEqual([1, 'ellipsis', 9, 10, 11, 'ellipsis', 20]);
    });

    it('should always include the first and last page', () => {
      component.totalItems = 5000;
      component.pageSize = 10;
      component.currentPage = 250;
      component.maxVisiblePages = 7;
      const items = component.pageItems;
      const pages = items.filter(component.isPageItem).map((i) => i.value);
      expect(pages[0]).toBe(1);
      expect(pages[pages.length - 1]).toBe(500);
    });
  });

  describe('goTo', () => {
    beforeEach(() => {
      component.totalItems = 200;
      component.pageSize = 10; // totalPages = 20
      component.currentPage = 5;
    });

    it('should emit pageChange with the clamped page', () => {
      const emitSpy = vi.spyOn(component.pageChange, 'emit');
      component.goTo(10);
      expect(emitSpy).toHaveBeenCalledWith(10);
    });

    it('should clamp to the last page when target exceeds totalPages', () => {
      const emitSpy = vi.spyOn(component.pageChange, 'emit');
      component.goTo(999);
      expect(emitSpy).toHaveBeenCalledWith(20);
    });

    it('should clamp to page 1 when target is below 1', () => {
      const emitSpy = vi.spyOn(component.pageChange, 'emit');
      component.goTo(-5);
      expect(emitSpy).toHaveBeenCalledWith(1);
    });

    it('should not emit when the target equals the current page', () => {
      const emitSpy = vi.spyOn(component.pageChange, 'emit');
      component.goTo(5);
      expect(emitSpy).not.toHaveBeenCalled();
    });

    it('should not emit when disabled', () => {
      component.disabled = true;
      const emitSpy = vi.spyOn(component.pageChange, 'emit');
      component.goTo(10);
      expect(emitSpy).not.toHaveBeenCalled();
    });
  });

  it('should navigate first/prev/next/last correctly', () => {
    component.totalItems = 200;
    component.pageSize = 10;
    component.currentPage = 5;
    const emitSpy = vi.spyOn(component.pageChange, 'emit');

    component.goFirst();
    expect(emitSpy).toHaveBeenLastCalledWith(1);
    component.goPrev();
    expect(emitSpy).toHaveBeenLastCalledWith(4);
    component.goNext();
    expect(emitSpy).toHaveBeenLastCalledWith(6);
    component.goLast();
    expect(emitSpy).toHaveBeenLastCalledWith(20);
  });

  describe('onPageSizeChange', () => {
    it('should emit both pageSizeChange and reset to page 1', () => {
      const sizeSpy = vi.spyOn(component.pageSizeChange, 'emit');
      const pageSpy = vi.spyOn(component.pageChange, 'emit');
      const event = { target: { value: '50' } } as unknown as Event;
      component.onPageSizeChange(event);
      expect(sizeSpy).toHaveBeenCalledWith(50);
      expect(pageSpy).toHaveBeenCalledWith(1);
    });

    it('should do nothing when disabled', () => {
      component.disabled = true;
      const sizeSpy = vi.spyOn(component.pageSizeChange, 'emit');
      const event = { target: { value: '50' } } as unknown as Event;
      component.onPageSizeChange(event);
      expect(sizeSpy).not.toHaveBeenCalled();
    });
  });

  describe('auto-correct out-of-range current page', () => {
    it('should navigate to the last page if currentPage exceeds totalPages after a change', () => {
      vi.useFakeTimers();
      component.totalItems = 50;
      component.pageSize = 10; // totalPages = 5
      component.currentPage = 8;
      const emitSpy = vi.spyOn(component.pageChange, 'emit');

      component.ngOnChanges({});
      vi.runAllTimers();

      expect(emitSpy).toHaveBeenCalledWith(5);
      vi.useRealTimers();
    });
  });

  describe('jump to page', () => {
    it('should navigate to the entered page and reset jumpValue', () => {
      component.totalItems = 200;
      component.pageSize = 10;
      component.currentPage = 1;
      component.jumpValue = 15;
      const emitSpy = vi.spyOn(component.pageChange, 'emit');

      component.onJump();

      expect(emitSpy).toHaveBeenCalledWith(15);
      expect(component.jumpValue).toBeNull();
    });

    it('should do nothing when jumpValue is null', () => {
      const emitSpy = vi.spyOn(component.pageChange, 'emit');
      component.onJump();
      expect(emitSpy).not.toHaveBeenCalled();
    });

    it('should trigger jump on Enter key', () => {
      component.totalItems = 200;
      component.pageSize = 10;
      component.jumpValue = 3;
      const emitSpy = vi.spyOn(component.pageChange, 'emit');
      component.onJumpKeydown(new KeyboardEvent('keydown', { key: 'Enter' }));
      expect(emitSpy).toHaveBeenCalledWith(3);
    });
  });
});
