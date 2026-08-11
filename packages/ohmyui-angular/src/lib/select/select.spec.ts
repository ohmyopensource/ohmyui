import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SelectComponent } from './select';
import type { SelectOption } from './select';

const mockOptions: SelectOption[] = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C', disabled: true },
];

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    component.options = mockOptions;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default inputs', () => {
    expect(component.variant).toBe('default');
    expect(component.size).toBe('md');
    expect(component.status).toBe('default');
    expect(component.disabled).toBe(false);
    expect(component.loading).toBe(false);
    expect(component.clearable).toBe(false);
    expect(component.searchable).toBe(false);
    expect(component.multiple).toBe(false);
  });

  it('should toggle open state', () => {
    expect(component.isOpen).toBe(false);
    component.toggle();
    expect(component.isOpen).toBe(true);
    component.toggle();
    expect(component.isOpen).toBe(false);
  });

  it('should not toggle when disabled', () => {
    component.disabled = true;
    component.toggle();
    expect(component.isOpen).toBe(false);
  });

  it('should not toggle when loading', () => {
    component.loading = true;
    component.toggle();
    expect(component.isOpen).toBe(false);
  });

  it('should select an option in single mode', () => {
    const spy = vi.fn();
    component.valueChange.subscribe(spy);
    component.select(mockOptions[0]);
    expect(component.value).toBe('a');
    expect(spy).toHaveBeenCalledWith('a');
  });

  it('should close after selection in single mode', () => {
    component.isOpen = true;
    component.select(mockOptions[0]);
    expect(component.isOpen).toBe(false);
  });

  it('should not select disabled option', () => {
    const spy = vi.fn();
    component.valueChange.subscribe(spy);
    component.select(mockOptions[2]);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should toggle option in multiple mode', () => {
    component.multiple = true;
    component.value = [];
    component.select(mockOptions[0]);
    expect((component.value as string[]).includes('a')).toBe(true);
    component.select(mockOptions[0]);
    expect((component.value as string[]).includes('a')).toBe(false);
  });

  it('should not close after selection in multiple mode', () => {
    component.multiple = true;
    component.value = [];
    component.isOpen = true;
    component.select(mockOptions[0]);
    expect(component.isOpen).toBe(true);
  });

  it('should clear value', () => {
    component.value = 'a';
    component.clear(new MouseEvent('click'));
    expect(component.value).toBe('');
  });

  it('should return correct displayLabel for single value', () => {
    component.value = 'b';
    expect(component.displayLabel).toBe('Option B');
  });

  it('should return placeholder when no value', () => {
    component.value = '';
    component.placeholder = 'Pick one';
    expect(component.displayLabel).toBe('Pick one');
  });

  it('should return count label for multiple selection', () => {
    component.multiple = true;
    component.value = ['a', 'b'];
    expect(component.displayLabel).toBe('2 selected');
  });

  it('should filter options by searchQuery', () => {
    component.searchQuery = 'option b';
    expect(component.filteredOptions.length).toBe(1);
    expect(component.filteredOptions[0].value).toBe('b');
  });

  it('should close on escape', () => {
    component.isOpen = true;
    component.onEscape();
    expect(component.isOpen).toBe(false);
  });
});
