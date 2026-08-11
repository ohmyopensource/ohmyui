import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { ImageComponent } from './image';

describe('ImageComponent', () => {
  let component: ImageComponent;
  let fixture: ComponentFixture<ImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default inputs', () => {
    expect(component.src).toBe('');
    expect(component.alt).toBe('');
    expect(component.variant).toBe('flat');
    expect(component.shape).toBe('rounded');
    expect(component.ratio).toBe('16/9');
    expect(component.fit).toBe('cover');
    expect(component.lazy).toBe(true);
  });

  it('should set state to loading when src is provided', () => {
    component.src = 'https://example.com/img.jpg';
    component.ngOnChanges();
    expect(component.state).toBe('loading');
  });

  it('should set state to error when src is empty', () => {
    component.src = '';
    component.ngOnChanges();
    expect(component.state).toBe('error');
  });

  it('should set state to loaded on successful load', () => {
    component.src = 'https://example.com/img.jpg';
    component.ngOnChanges();
    component.onLoad();
    expect(component.state).toBe('loaded');
  });

  it('should set state to error on failed load', () => {
    component.src = 'https://broken.invalid/img.jpg';
    component.ngOnChanges();
    component.onError();
    expect(component.state).toBe('error');
  });

  it('should include variant class in wrapperClass', () => {
    component.variant = 'shadow-lg';
    expect(component.wrapperClass).toContain('ohmyui-image--shadow-lg');
  });

  it('should include shape class in wrapperClass', () => {
    component.shape = 'circle';
    expect(component.wrapperClass).toContain('ohmyui-image--circle');
  });

  it('should include ratio class with slashes replaced', () => {
    component.ratio = '16/9';
    expect(component.wrapperClass).toContain('ohmyui-image--ratio-16-9');
  });

  it('should include state class in wrapperClass', () => {
    component.src = 'https://example.com/img.jpg';
    component.ngOnChanges();
    expect(component.wrapperClass).toContain('ohmyui-image--loading');
  });

  it('should include fit class in imgClass', () => {
    component.fit = 'contain';
    expect(component.imgClass).toContain('ohmyui-image__img--contain');
  });

  it('should include visible class in imgClass when loaded', () => {
    component.state = 'loaded';
    expect(component.imgClass).toContain('ohmyui-image__img--visible');
  });

  it('should generate unique descriptionId', () => {
    expect(component.descriptionId).toMatch(/^ohmyui-img-desc-/);
  });
});
