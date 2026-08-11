import { Component, Input } from '@angular/core';

export type BadgeVariant =
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral'
  | 'primary'
  | 'teal'
  | 'outline-success'
  | 'outline-warning'
  | 'outline-error'
  | 'outline-info'
  | 'outline-neutral'
  | 'outline-primary';

export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';
export type BadgeShape = 'pill' | 'rounded' | 'square';

@Component({
  selector: 'ohmyui-badge',
  standalone: true,
  imports: [],
  templateUrl: './badge.html',
  styleUrl: './badge.css',
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'neutral';
  @Input() size: BadgeSize = 'md';
  @Input() shape: BadgeShape = 'pill';
  @Input() label = '';
  @Input() dot = false;
}
