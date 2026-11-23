import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmailComponent } from './email';

describe('EmailComponent', () => {
  let component: EmailComponent;
  let fixture: ComponentFixture<EmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmailComponent);
    component = fixture.componentInstance;
    component.email = 'ciao@ohmyopensource.dev';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default to primary variant, md size, icon and underline enabled', () => {
    fixture.detectChanges();
    expect(component.emailClasses['ohmyui-email-link--primary']).toBe(true);
    expect(component.emailClasses['ohmyui-email-link--md']).toBe(true);
    expect(component.showIcon).toBe(true);
    expect(component.underline).toBe(true);
  });

  it('should build a plain mailto href with no subject/body', () => {
    expect(component.mailtoHref).toBe('mailto:ciao@ohmyopensource.dev');
  });

  it('should include subject in the mailto href when provided', () => {
    component.subject = 'Richiesta di supporto';
    expect(component.mailtoHref).toBe('mailto:ciao@ohmyopensource.dev?subject=Richiesta+di+supporto');
  });

  it('should include both subject and body in the mailto href when provided', () => {
    component.subject = 'Ciao';
    component.body = 'Ho una domanda';
    expect(component.mailtoHref).toBe('mailto:ciao@ohmyopensource.dev?subject=Ciao&body=Ho+una+domanda');
  });

  it('should display the email address when no label is provided', () => {
    expect(component.displayLabel).toBe('ciao@ohmyopensource.dev');
  });

  it('should display the custom label when provided', () => {
    component.label = 'Scrivici';
    expect(component.displayLabel).toBe('Scrivici');
  });

  it('should render the mailto href on the anchor element', () => {
    fixture.detectChanges();
    const anchor: HTMLAnchorElement = fixture.nativeElement.querySelector('a');
    expect(anchor.getAttribute('href')).toBe('mailto:ciao@ohmyopensource.dev');
  });

  it('should include the full email address in aria-label even with a custom label', () => {
    component.label = 'Contattaci';
    fixture.detectChanges();
    const anchor: HTMLAnchorElement = fixture.nativeElement.querySelector('a');
    expect(anchor.getAttribute('aria-label')).toBe('Invia email a ciao@ohmyopensource.dev');
  });

  it('should not render the icon when showIcon is false', () => {
    component.showIcon = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.ohmyui-email-link__icon')).toBeNull();
  });

  it('should render the icon when showIcon is true', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.ohmyui-email-link__icon')).not.toBeNull();
  });
});
