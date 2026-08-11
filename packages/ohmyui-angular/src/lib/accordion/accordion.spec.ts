import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { AccordionComponent, AccordionItem } from './accordion';

const mockItems: AccordionItem[] = [
  { id: '1', title: 'Item 1', content: 'Content 1' },
  { id: '2', title: 'Item 2', content: 'Content 2' },
  { id: '3', title: 'Item 3', content: 'Content 3', disabled: true },
];

describe('AccordionComponent', () => {
  let component: AccordionComponent;
  let fixture: ComponentFixture<AccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccordionComponent);
    component = fixture.componentInstance;
    component.items = mockItems;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default inputs', () => {
    expect(component.variant).toBe('default');
    expect(component.size).toBe('md');
    expect(component.multi).toBe(false);
  });

  it('should start with all items closed', () => {
    expect(component.openIds.size).toBe(0);
  });

  it('should open an item on toggle', () => {
    component.toggle(mockItems[0]);
    expect(component.isOpen('1')).toBe(true);
  });

  it('should close an open item on toggle', () => {
    component.toggle(mockItems[0]);
    component.toggle(mockItems[0]);
    expect(component.isOpen('1')).toBe(false);
  });

  it('should close other items in single mode', () => {
    component.multi = false;
    component.toggle(mockItems[0]);
    component.toggle(mockItems[1]);
    expect(component.isOpen('1')).toBe(false);
    expect(component.isOpen('2')).toBe(true);
  });

  it('should keep multiple items open in multi mode', () => {
    component.multi = true;
    component.toggle(mockItems[0]);
    component.toggle(mockItems[1]);
    expect(component.isOpen('1')).toBe(true);
    expect(component.isOpen('2')).toBe(true);
  });

  it('should not toggle a disabled item', () => {
    component.toggle(mockItems[2]);
    expect(component.isOpen('3')).toBe(false);
  });

  it('should apply defaultOpen on init', () => {
    component.defaultOpen = ['1', '2'];
    component.multi = true;
    component.ngOnChanges({
      defaultOpen: {
        currentValue: ['1', '2'],
        previousValue: [],
        firstChange: true,
        isFirstChange: () => true,
      },
    });
    expect(component.isOpen('1')).toBe(true);
    expect(component.isOpen('2')).toBe(true);
  });

  it('should only open first defaultOpen item in single mode', () => {
    component.defaultOpen = ['1', '2'];
    component.multi = false;
    component.ngOnChanges({
      defaultOpen: {
        currentValue: ['1', '2'],
        previousValue: [],
        firstChange: true,
        isFirstChange: () => true,
      },
    });
    expect(component.isOpen('1')).toBe(true);
    expect(component.isOpen('2')).toBe(false);
  });

  it('should generate correct wrapper class', () => {
    component.variant = 'bordered';
    component.size = 'lg';
    const cls = component.getWrapperClass();
    expect(cls).toContain('ohmyui-accordion--bordered');
    expect(cls).toContain('ohmyui-accordion--lg');
  });

  it('should include open class in item class when open', () => {
    component.toggle(mockItems[0]);
    const cls = component.getItemClass(mockItems[0]);
    expect(cls).toContain('ohmyui-accordion__item--open');
  });

  it('should include disabled class in item class when disabled', () => {
    const cls = component.getItemClass(mockItems[2]);
    expect(cls).toContain('ohmyui-accordion__item--disabled');
  });
});
