import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ModalComponent } from './modal';
import { SimpleChange } from '@angular/core';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default inputs', () => {
    expect(component.open).toBe(false);
    expect(component.title).toBe('');
    expect(component.size).toBe('md');
    expect(component.position).toBe('center');
    expect(component.closable).toBe(true);
    expect(component.closeOnOverlay).toBe(true);
    expect(component.closeOnEsc).toBe(true);
  });

  it('should not be visible by default', () => {
    fixture.detectChanges();
    expect(component.isVisible).toBe(false);
  });

  it('should become visible when open is set to true', () => {
    component.open = true;
    component.ngOnChanges({
      open: new SimpleChange(false, true, false),
    });
    expect(component.isVisible).toBe(true);
  });

  it('should generate correct panel class', () => {
    component.size = 'lg';
    component.position = 'top';
    const cls = component.panelClass;
    expect(cls).toContain('ohmyui-modal__panel--lg');
    expect(cls).toContain('ohmyui-modal__panel--top');
  });

  it('should include out class when animating out', () => {
    component.isAnimatingOut = true;
    expect(component.panelClass).toContain('ohmyui-modal__panel--out');
    expect(component.overlayClass).toContain('ohmyui-modal__overlay--out');
  });

  it('should emit closed when requestClose is called', async () => {
    vi.useFakeTimers();
    const spy = vi.fn();
    component.closed.subscribe(spy);
    component.isVisible = true;
    component.requestClose();
    vi.advanceTimersByTime(200);
    expect(spy).toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('should not close on overlay click when closeOnOverlay is false', () => {
    const spy = vi.fn();
    component.closed.subscribe(spy);
    component.closeOnOverlay = false;
    component.onOverlayClick();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should not close on ESC when closeOnEsc is false', () => {
    const spy = vi.fn();
    component.closed.subscribe(spy);
    component.closeOnEsc = false;
    component.open = true;
    component.onEsc();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should not close when closable is false', () => {
    const spy = vi.fn();
    component.closed.subscribe(spy);
    component.closable = false;
    component.open = true;
    component.onEsc();
    component.onOverlayClick();
    expect(spy).not.toHaveBeenCalled();
  });
});
