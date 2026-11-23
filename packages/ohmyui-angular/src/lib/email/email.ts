/**
 * @file email.ts
 * @description Reusable mailto link component with optional leading icon,
 * consistent OhMyUI! styling, and automatic accessibility attributes.
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideDynamicIcon, LucideIconData, LucideMail } from '@lucide/angular';

/** Available visual variants for the email link. */
export type EmailVariant = 'primary' | 'secondary' | 'neutral' | 'ghost';
/** Available sizes for the email link text and icon. */
export type EmailSize = 'sm' | 'md' | 'lg';

/**
 * Mailto link component used to render an email address consistently
 * across the application, with optional icon, subject/body prefill,
 * and accessible labeling.
 */
@Component({
  selector: 'ohmyui-email',
  standalone: true,
  imports: [CommonModule, LucideDynamicIcon],
  templateUrl: './email.html',
  styleUrl: './email.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailComponent {
  readonly mailIcon: LucideIconData = LucideMail.icon;

  /**
   * Email address used to build the mailto link and as displayed text
   * when no custom label is provided.
   */
  @Input({ required: true }) email = '';
  /** Optional custom label displayed instead of the raw email address. */
  @Input() label = '';
  /** Optional subject prefilled in the mailto link. */
  @Input() subject = '';
  /** Optional body prefilled in the mailto link. */
  @Input() body = '';
  /** Visual variant applied to the link text and icon color. */
  @Input() variant: EmailVariant = 'primary';
  /** Size applied to text and icon. */
  @Input() size: EmailSize = 'md';
  /** Shows the leading mail icon. */
  @Input() showIcon = true;
  /** Applies an underline on hover instead of always-on underline. */
  @Input() underline = true;

  /** Returns the icon size in pixels according to the configured size. */
  get iconSize(): number {
    const map: Record<EmailSize, number> = { sm: 12, md: 14, lg: 16 };
    return map[this.size];
  }

  /** Returns the text displayed inside the link. */
  get displayLabel(): string {
    return this.label || this.email;
  }

  /** Builds the mailto href, including optional subject and body query params. */
  get mailtoHref(): string {
    const params = new URLSearchParams();
    if (this.subject) params.set('subject', this.subject);
    if (this.body) params.set('body', this.body);
    const query = params.toString();
    return `mailto:${this.email}${query ? '?' + query : ''}`;
  }

  /** Builds the CSS class map applied to the link element. */
  get emailClasses(): Record<string, boolean> {
    return {
      'ohmyui-email-link': true,
      [`ohmyui-email-link--${this.variant}`]: true,
      [`ohmyui-email-link--${this.size}`]: true,
      'ohmyui-email-link--underline': this.underline,
    };
  }
}
