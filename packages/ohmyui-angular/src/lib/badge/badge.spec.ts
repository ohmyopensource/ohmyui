import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BadgeComponent } from './badge';
import { describe, it, expect, beforeEach } from 'vitest';

describe('BadgeComponent', () => {
  let component: BadgeComponent;
  let fixture: ComponentFixture<BadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default inputs', () => {
    expect(component.variant).toBe('neutral');
    expect(component.size).toBe('md');
    expect(component.shape).toBe('pill');
    expect(component.label).toBe('');
    expect(component.dot).toBe(false);
  });

  it('should render label', () => {
    component.label = 'In progress';
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('In progress');
  });

  it('should apply variant class', () => {
    component.variant = 'success';
    fixture.detectChanges();
    const span: HTMLElement =
      fixture.nativeElement.querySelector('.ohmyui-badge');
    expect(span.classList.contains('ohmyui-badge--success')).toBe(true);
  });

  it('should apply size class', () => {
    component.size = 'lg';
    fixture.detectChanges();
    const span: HTMLElement =
      fixture.nativeElement.querySelector('.ohmyui-badge');
    expect(span.classList.contains('ohmyui-badge--lg')).toBe(true);
  });

  it('should apply shape class', () => {
    component.shape = 'square';
    fixture.detectChanges();
    const span: HTMLElement =
      fixture.nativeElement.querySelector('.ohmyui-badge');
    expect(span.classList.contains('ohmyui-badge--square')).toBe(true);
  });

  it('should apply outline variant class', () => {
    component.variant = 'outline-error';
    fixture.detectChanges();
    const span: HTMLElement =
      fixture.nativeElement.querySelector('.ohmyui-badge');
    expect(span.classList.contains('ohmyui-badge--outline-error')).toBe(true);
  });

  it('should show dot element when dot is true', () => {
    component.dot = true;
    fixture.detectChanges();
    const dot = fixture.nativeElement.querySelector('.ohmyui-badge__dot');
    expect(dot).toBeTruthy();
  });

  it('should not show dot element when dot is false', () => {
    component.dot = false;
    fixture.detectChanges();
    const dot = fixture.nativeElement.querySelector('.ohmyui-badge__dot');
    expect(dot).toBeNull();
  });
});
