import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { EmbedComponent } from './embed';

describe('EmbedComponent', () => {
  let component: EmbedComponent;
  let fixture: ComponentFixture<EmbedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmbedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmbedComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default inputs', () => {
    expect(component.src).toBe('');
    expect(component.title).toBe('');
    expect(component.variant).toBe('bordered');
    expect(component.shape).toBe('rounded');
    expect(component.ratio).toBe('16/9');
    expect(component.sandbox).toBe('safe');
    expect(component.allowFullscreen).toBe(true);
    expect(component.allowCamera).toBe(false);
    expect(component.allowMicrophone).toBe(false);
    expect(component.allowAutoplay).toBe(false);
  });

  it('should set state to error when src is empty', () => {
    component.src = '';
    component.ngOnChanges();
    expect(component.state).toBe('error');
  });

  it('should set state to loading when src is provided', () => {
    component.src = 'https://example.com/embed';
    component.ngOnChanges();
    expect(component.state).toBe('loading');
  });

  it('should set state to loaded on load event', () => {
    component.src = 'https://example.com/embed';
    component.ngOnChanges();
    component.onLoad();
    expect(component.state).toBe('loaded');
  });

  it('should set state to error on error event', () => {
    component.src = 'https://example.com/embed';
    component.ngOnChanges();
    component.onError();
    expect(component.state).toBe('error');
  });

  it('should return correct sandbox attribute', () => {
    component.sandbox = 'safe';
    expect(component.sandboxAttr).toBe('allow-same-origin allow-scripts');

    component.sandbox = 'strict';
    expect(component.sandboxAttr).toBe('');

    component.sandbox = 'none';
    expect(component.sandboxAttr).toBeNull();
  });

  it('should build allow attribute from inputs', () => {
    component.allowFullscreen = true;
    component.allowCamera = true;
    component.allowMicrophone = false;
    component.allowAutoplay = false;
    expect(component.allowAttr).toBe('camera; fullscreen');
  });

  it('should include variant class in wrapperClass', () => {
    component.variant = 'shadow-lg';
    expect(component.wrapperClass).toContain('ohmyui-embed--shadow-lg');
  });

  it('should include ratio class with slashes replaced', () => {
    component.ratio = '16/9';
    component.height = 0;
    expect(component.wrapperClass).toContain('ohmyui-embed--ratio-16-9');
  });

  it('should not include ratio class when height is set', () => {
    component.ratio = '16/9';
    component.height = 400;
    expect(component.wrapperClass).not.toContain('ohmyui-embed--ratio-16-9');
  });
});
