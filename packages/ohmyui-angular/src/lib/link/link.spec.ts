import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LinkComponent } from './link';

describe('LinkComponent', () => {
  let component: LinkComponent;
  let fixture: ComponentFixture<LinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(LinkComponent);
    component = fixture.componentInstance;
    component.href = '/docs';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default to internal mode, primary variant, md size, external icon shown', () => {
    fixture.detectChanges();
    expect(component.mode).toBe('internal');
    expect(component.linkClasses['ohmyui-inline-link--primary']).toBe(true);
    expect(component.linkClasses['ohmyui-inline-link--md']).toBe(true);
    expect(component.showExternalIcon).toBe(true);
  });

  it('should NOT display the external icon in internal mode, even with showExternalIcon true', () => {
    component.mode = 'internal';
    expect(component.displayExternalIcon).toBe(false);
  });

  it('should display the external icon in external mode when showExternalIcon is true', () => {
    component.mode = 'external';
    expect(component.displayExternalIcon).toBe(true);
  });

  it('should NOT display the external icon in external mode when showExternalIcon is false', () => {
    component.mode = 'external';
    component.showExternalIcon = false;
    expect(component.displayExternalIcon).toBe(false);
  });

  it('should not render an icon element for internal links', () => {
    component.mode = 'internal';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.ohmyui-inline-link__icon')).toBeNull();
  });

  it('should render an icon element for external links with showExternalIcon true', () => {
    component.mode = 'external';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.ohmyui-inline-link__icon')).not.toBeNull();
  });

  it('should use noopener noreferrer rel only when target is _blank', () => {
    expect(component.externalRel).toBe('noopener noreferrer');
    component.target = '_self';
    expect(component.externalRel).toBe('');
  });

  it('should return an accessible label mentioning the new tab for external + _blank', () => {
    component.mode = 'external';
    component.target = '_blank';
    component.label = 'Vai su GitHub';
    expect(component.accessibleLabel).toBe('Vai su GitHub (si apre in una nuova scheda)');
  });

  it('should return null accessibleLabel for internal links', () => {
    component.mode = 'internal';
    expect(component.accessibleLabel).toBeNull();
  });

  it('should return null accessibleLabel for external links opened in the same tab', () => {
    component.mode = 'external';
    component.target = '_self';
    expect(component.accessibleLabel).toBeNull();
  });

  it('should render the label text', () => {
    component.label = 'Leggi la documentazione';
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Leggi la documentazione');
  });
});
