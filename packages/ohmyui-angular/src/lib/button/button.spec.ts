import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default inputs', () => {
    expect(component.variant).toBe('primary');
    expect(component.size).toBe('md');
    expect(component.radius).toBe('md');
    expect(component.disabled).toBe(false);
    expect(component.loading).toBe(false);
    expect(component.fullWidth).toBe(false);
    expect(component.label).toBe('');
    expect(component.type).toBe('button');
  });

  it('should apply correct classes', () => {
    component.variant = 'danger';
    component.size = 'lg';
    component.radius = 'full';
    const classes = component.classes;
    expect(classes).toContain('ohmyui-btn--danger');
    expect(classes).toContain('ohmyui-btn--lg');
    expect(classes).toContain('ohmyui-btn--radius-full');
  });

  it('should include full-width class when fullWidth is true', () => {
    component.fullWidth = true;
    expect(component.classes).toContain('ohmyui-btn--full');
  });

  it('should include loading class when loading is true', () => {
    component.loading = true;
    expect(component.classes).toContain('ohmyui-btn--loading');
  });

  it('should render label in the DOM', () => {
    component.label = 'Conferma';
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Conferma');
  });

  it('should disable the button when disabled is true', () => {
    component.disabled = true;
    fixture.detectChanges();
    const btn: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    expect(btn.disabled).toBe(true);
  });

  it('should disable the button when loading is true', () => {
    component.loading = true;
    fixture.detectChanges();
    const btn: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    expect(btn.disabled).toBe(true);
  });

  it('should emit clicked event on click', () => {
    const spy = vi.fn();
    component.clicked.subscribe(spy);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('button').click();
    expect(spy).toHaveBeenCalled();
  });

  it('should not emit clicked when disabled', () => {
    const spy = vi.fn();
    component.clicked.subscribe(spy);
    component.disabled = true;
    fixture.detectChanges();
    component.handleClick(new MouseEvent('click'));
    expect(spy).not.toHaveBeenCalled();
  });

  it('should not emit clicked when loading', () => {
    const spy = vi.fn();
    component.clicked.subscribe(spy);
    component.loading = true;
    fixture.detectChanges();
    component.handleClick(new MouseEvent('click'));
    expect(spy).not.toHaveBeenCalled();
  });

  it('should show spinner when loading', () => {
    component.loading = true;
    fixture.detectChanges();
    const spinner = fixture.nativeElement.querySelector('.ohmyui-btn__spinner');
    expect(spinner).toBeTruthy();
  });

  it('should not show spinner when not loading', () => {
    component.loading = false;
    fixture.detectChanges();
    const spinner = fixture.nativeElement.querySelector('.ohmyui-btn__spinner');
    expect(spinner).toBeNull();
  });
});
