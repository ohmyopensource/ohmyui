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
 * @file tabs.spec.ts
 * @description Unit tests of TabsComponent: the defaults, tab selection, the
 * active tab, the rendering of the tabs, the roving tabindex, keyboard
 * navigation and the tab classes.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsComponent, TabItem } from './tabs';

const tabs: TabItem[] = [
  { id: 'a', label: 'A' },
  { id: 'b', label: 'B' },
  { id: 'c', label: 'C', disabled: true },
  { id: 'd', label: 'D' },
];

describe('TabsComponent', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabsComponent);
    component = fixture.componentInstance;
    component.tabs = tabs;
    component.activeTab = 'a';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default to line style, primary variant, md size', () => {
    fixture.detectChanges();
    expect(component.wrapperClasses).toContain('ohmyui-tabs--line');
    expect(component.wrapperClasses).toContain('ohmyui-tabs--primary');
    expect(component.wrapperClasses).toContain('ohmyui-tabs--md');
  });

  describe('selectTab', () => {
    it('should emit tabChange with the tab id', () => {
      const emitSpy = vi.spyOn(component.tabChange, 'emit');
      component.selectTab(tabs[1]);
      expect(emitSpy).toHaveBeenCalledWith('b');
    });
    it('should not emit for a disabled tab', () => {
      const emitSpy = vi.spyOn(component.tabChange, 'emit');
      component.selectTab(tabs[2]);
      expect(emitSpy).not.toHaveBeenCalled();
    });
    it('should not emit when selecting the already-active tab', () => {
      const emitSpy = vi.spyOn(component.tabChange, 'emit');
      component.selectTab(tabs[0]);
      expect(emitSpy).not.toHaveBeenCalled();
    });
  });

  it('should report isActive correctly', () => {
    expect(component.isActive(tabs[0])).toBe(true);
    expect(component.isActive(tabs[1])).toBe(false);
  });

  it('should render every tab button', () => {
    fixture.detectChanges();
    const buttons =
      fixture.nativeElement.querySelectorAll('button[role="tab"]');
    expect(buttons.length).toBe(4);
  });

  describe('accessible label', () => {
    it('should label the tab list in the current language by default', () => {
      fixture.detectChanges();
      const list = fixture.nativeElement.querySelector('[role="tablist"]');
      expect(list.getAttribute('aria-label')).toBe('Tabs');
    });
    it('should use ariaLabel when set', () => {
      component.ariaLabel = 'Account sections';
      fixture.detectChanges();
      const list = fixture.nativeElement.querySelector('[role="tablist"]');
      expect(list.getAttribute('aria-label')).toBe('Account sections');
    });
  });

  describe('roving tabindex', () => {
    it('should set tabindex 0 only on the active tab', () => {
      fixture.detectChanges();
      const buttons: NodeListOf<HTMLButtonElement> =
        fixture.nativeElement.querySelectorAll('button[role="tab"]');
      expect(buttons[0].getAttribute('tabindex')).toBe('0');
      expect(buttons[1].getAttribute('tabindex')).toBe('-1');
      expect(buttons[3].getAttribute('tabindex')).toBe('-1');
    });

    it('should fall back to the first enabled tab when none is active', () => {
      component.activeTab = 'nonexistent';
      fixture.detectChanges();
      const buttons: NodeListOf<HTMLButtonElement> =
        fixture.nativeElement.querySelectorAll('button[role="tab"]');
      expect(buttons[0].getAttribute('tabindex')).toBe('0');
    });
  });

  describe('keyboard navigation', () => {
    it('should move to the next enabled tab on ArrowRight, skipping disabled ones', () => {
      fixture.detectChanges();
      const emitSpy = vi.spyOn(component.tabChange, 'emit');
      // From index 1 (b), ArrowRight should skip disabled index 2 (c) and land on index 3 (d)
      component.onKeydown(
        new KeyboardEvent('keydown', { key: 'ArrowRight' }),
        1,
      );
      expect(emitSpy).toHaveBeenCalledWith('d');
    });

    it('should move to the previous enabled tab on ArrowLeft, wrapping around', () => {
      fixture.detectChanges();
      const emitSpy = vi.spyOn(component.tabChange, 'emit');
      // From index 0 (a), ArrowLeft should wrap to the last enabled tab, index 3 (d)
      component.onKeydown(
        new KeyboardEvent('keydown', { key: 'ArrowLeft' }),
        0,
      );
      expect(emitSpy).toHaveBeenCalledWith('d');
    });

    it('should jump to the first enabled tab on Home', () => {
      component.activeTab = 'd';
      fixture.detectChanges();
      const emitSpy = vi.spyOn(component.tabChange, 'emit');
      component.onKeydown(new KeyboardEvent('keydown', { key: 'Home' }), 3);
      expect(emitSpy).toHaveBeenCalledWith('a');
    });

    it('should jump to the last enabled tab on End, skipping disabled ones', () => {
      fixture.detectChanges();
      const emitSpy = vi.spyOn(component.tabChange, 'emit');
      component.onKeydown(new KeyboardEvent('keydown', { key: 'End' }), 0);
      expect(emitSpy).toHaveBeenCalledWith('d');
    });

    it('should use ArrowDown/ArrowUp instead of left/right when vertical', () => {
      component.vertical = true;
      fixture.detectChanges();
      const emitSpy = vi.spyOn(component.tabChange, 'emit');
      component.onKeydown(
        new KeyboardEvent('keydown', { key: 'ArrowDown' }),
        0,
      );
      expect(emitSpy).toHaveBeenCalledWith('b');
    });

    it('should ignore ArrowRight/ArrowLeft when vertical', () => {
      component.vertical = true;
      fixture.detectChanges();
      const emitSpy = vi.spyOn(component.tabChange, 'emit');
      component.onKeydown(
        new KeyboardEvent('keydown', { key: 'ArrowRight' }),
        0,
      );
      expect(emitSpy).not.toHaveBeenCalled();
    });

    it('should ignore unrelated keys', () => {
      fixture.detectChanges();
      const emitSpy = vi.spyOn(component.tabChange, 'emit');
      component.onKeydown(new KeyboardEvent('keydown', { key: 'a' }), 0);
      expect(emitSpy).not.toHaveBeenCalled();
    });
  });

  it('should build tab classes with active/disabled/full modifiers', () => {
    component.fullWidth = true;
    expect(component.tabClasses(tabs[0])).toContain('ohmyui-tabs__tab--active');
    expect(component.tabClasses(tabs[0])).toContain('ohmyui-tabs__tab--full');
    expect(component.tabClasses(tabs[2])).toContain(
      'ohmyui-tabs__tab--disabled',
    );
  });
});
