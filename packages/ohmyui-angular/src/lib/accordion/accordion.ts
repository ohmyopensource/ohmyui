import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BadgeComponent, BadgeVariant } from '../badge/badge';
import { LucideChevronDown } from '@lucide/angular';

export type AccordionVariant = 'default' | 'bordered' | 'filled' | 'ghost';
export type AccordionSize = 'sm' | 'md' | 'lg';

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
  disabled?: boolean;
  badge?: string;
  badgeVariant?: BadgeVariant;
}

@Component({
  selector: 'ohmyui-accordion',
  standalone: true,
  imports: [BadgeComponent, LucideChevronDown],
  templateUrl: './accordion.html',
  styleUrl: './accordion.css',
})
export class AccordionComponent implements OnChanges {
  @Input() items: AccordionItem[] = [];
  @Input() variant: AccordionVariant = 'default';
  @Input() size: AccordionSize = 'md';
  @Input() multi = false;
  @Input() defaultOpen: string[] = [];

  openIds = new Set<string>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['defaultOpen'] && this.defaultOpen.length > 0) {
      if (this.multi) {
        this.openIds = new Set(this.defaultOpen);
      } else {
        this.openIds = new Set([this.defaultOpen[0]]);
      }
    }
  }

  isOpen(id: string): boolean {
    return this.openIds.has(id);
  }

  toggle(item: AccordionItem): void {
    if (item.disabled) return;

    if (this.openIds.has(item.id)) {
      this.openIds.delete(item.id);
    } else {
      if (!this.multi) {
        this.openIds.clear();
      }
      this.openIds.add(item.id);
    }

    this.openIds = new Set(this.openIds);
  }

  onKeydown(event: KeyboardEvent, item: AccordionItem): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggle(item);
    }
  }

  trackById(_index: number, item: AccordionItem): string {
    return item.id;
  }

  get iconSize(): number {
    return this.size === 'sm' ? 14 : this.size === 'lg' ? 20 : 16;
  }

  getWrapperClass(): string {
    return [
      'ohmyui-accordion',
      `ohmyui-accordion--${this.variant}`,
      `ohmyui-accordion--${this.size}`,
    ].join(' ');
  }

  getItemClass(item: AccordionItem): string {
    return [
      'ohmyui-accordion__item',
      this.isOpen(item.id) ? 'ohmyui-accordion__item--open' : '',
      item.disabled ? 'ohmyui-accordion__item--disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }
}
