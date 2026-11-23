/**
 * @file button.ts
 * @description
 * Reusable standalone button component for Angular applications.
 *
 * Supports multiple visual variants, sizes, icon rendering, loading states,
 * success states, accessibility features, internal routing, external links,
 * and ripple animations.
 *
 * The component follows a design-system-oriented approach and can be used
 * as a standard button, Angular router link, or external hyperlink while
 * preserving a consistent user experience.
 */
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Renderer2,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  LucideDynamicIcon,
  LucideIconData,
  LucideLoaderCircle,
  LucideCircleCheck,
} from '@lucide/angular';

/** Available visual variants for the button component. */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'ghost'
  | 'outline'
  | 'outline-error'
  | 'flat';
/** Available button sizes. */
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';
/** Available button rounded styles. */
export type ButtonRounded = 'none' | 'sm' | 'md' | 'lg' | 'full';
/**
 * Supported operating modes.
 * - button: standard HTML button
 * - link-internal: Angular Router navigation
 * - link-external: external hyperlink
 */
export type ButtonMode = 'button' | 'link-internal' | 'link-external';
/** Native HTML button types. */
export type ButtonType = 'button' | 'submit' | 'reset';
/** Icon placement relative to the label. */
export type ButtonIconPosition = 'left' | 'right';
/** Visual style applied when the component enters the succeeded state. */
export type ButtonSucceededStyle = 'filled' | 'ghost';

/**
 * Design-system button component.
 *
 * Provides a unified API for rendering buttons, internal Angular links
 * and external hyperlinks.
 *
 * NOTA: importando RouterModule, ohmyui-angular acquisisce una dipendenza
 * da @angular/router anche per i consumer che usano solo mode="button".
 * Segnalato perché è un cambiamento nella superficie di dipendenze della
 * libreria rispetto alla versione precedente del componente.
 */
@Component({
  selector: 'ohmyui-button',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideDynamicIcon],
  templateUrl: './button.html',
  styleUrl: './button.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  private renderer = inject(Renderer2);
  readonly loaderIcon: LucideIconData = LucideLoaderCircle.icon;
  readonly succeededIcon: LucideIconData = LucideCircleCheck.icon;

  /** Text displayed inside the button. */
  @Input() label = '';
  /** Visual variant used to determine the button appearance. */
  @Input() variant: ButtonVariant = 'primary';
  /** Size of the button and its internal content. */
  @Input() size: ButtonSize = 'md';
  /** Rounded style of the button. */
  @Input() rounded: ButtonRounded = 'md';
  /** Expands the button to occupy the full width of its parent container. */
  @Input() fullWidth = false;
  /** Lucide icon component displayed inside the button. */
  @Input() icon: LucideIconData | null = null;
  /** Position of the icon relative to the label. */
  @Input() iconPosition: ButtonIconPosition = 'left';
  /**
   * Enables icon-only mode. When enabled, the label is visually hidden and
   * the button is rendered as a square icon button. An ariaLabel value
   * should always be provided.
   */
  @Input() iconOnly = false;
  /** Disables user interaction with the component. */
  @Input() disabled = false;
  /** Displays a loading indicator and prevents user interaction while active. */
  @Input() loading = false;
  /**
   * Indicates that the associated action completed successfully. When
   * enabled, the component displays a success state and becomes
   * non-interactive.
   */
  @Input() succeeded = false;
  /** Visual style applied when the component is in the succeeded state. */
  @Input() succeededStyle: ButtonSucceededStyle = 'filled';
  /**
   * Alternative label displayed while the component is in the succeeded
   * state. If not provided, the default label is used.
   */
  @Input() succeededLabel = '';
  /**
   * Operating mode of the component. Determines whether the component
   * behaves as a native button, an Angular router link, or an external
   * hyperlink.
   */
  @Input() mode: ButtonMode = 'button';
  /** Native HTML button type. */
  @Input() type: ButtonType = 'button';
  /**
   * Navigation destination. Used as routerLink when mode is 'link-internal',
   * or as href when mode is 'link-external'.
   */
  @Input() href = '';
  /** Navigation target used for external links. */
  @Input() target: '_self' | '_blank' = '_self';
  /**
   * Accessible label announced by assistive technologies. Required when
   * iconOnly is enabled.
   */
  @Input() ariaLabel = '';

  /**
   * Emitted when the button is activated by the user. Emission occurs only
   * when mode is 'button', and disabled/loading/succeeded are all false.
   */
  @Output() clicked = new EventEmitter<MouseEvent>();

  /** Returns the icon size in pixels according to the configured button size. */
  get iconSize(): number {
    const map: Record<ButtonSize, number> = { xs: 14, sm: 16, md: 18, lg: 20 };
    return map[this.size];
  }

  /**
   * Determines whether the component should be considered non-interactive.
   * A button becomes inert when disabled, loading, or succeeded.
   */
  get isInert(): boolean {
    return this.disabled || this.loading || this.succeeded;
  }

  /**
   * Returns the effective label displayed by the component. When the
   * button is in the succeeded state, the success label takes precedence
   * if provided.
   */
  get displayLabel(): string {
    return this.succeeded && this.succeededLabel
      ? this.succeededLabel
      : this.label;
  }

  /** Returns the CSS classes required for the current button configuration. */
  get classes(): Record<string, boolean> {
    return {
      'ohmyui-btn': true,
      [`ohmyui-btn--${this.variant}`]: !this.succeeded,
      'ohmyui-btn--succeeded-filled':
        this.succeeded && this.succeededStyle === 'filled',
      'ohmyui-btn--succeeded-ghost':
        this.succeeded && this.succeededStyle === 'ghost',
      [`ohmyui-btn--${this.size}`]: true,
      [`ohmyui-btn--rounded-${this.rounded}`]: true,
      'ohmyui-btn--full-width': this.fullWidth,
      'ohmyui-btn--disabled': this.disabled,
      'ohmyui-btn--loading': this.loading,
      'ohmyui-btn--icon-only': this.iconOnly,
      'ohmyui-btn--icon-right':
        this.icon !== null && this.iconPosition === 'right' && !this.iconOnly,
    };
  }

  /**
   * Returns the appropriate rel attribute for external links, preventing
   * reverse tabnabbing when opening links in a new browser tab.
   */
  get externalRel(): string {
    return this.target === '_blank' ? 'noopener noreferrer' : '';
  }

  /**
   * Returns the path portion of `href`, stripped of any query string, for
   * use with routerLink when mode is 'link-internal'.
   */
  get routerPath(): string {
    return (this.href ?? '').split('?')[0];
  }

  /**
   * Parses the query string portion of `href` (if present) into an object
   * suitable for routerLink's [queryParams] binding.
   */
  get routerQueryParams(): Record<string, string> | null {
    const queryIndex = (this.href ?? '').indexOf('?');
    if (queryIndex === -1) return null;
    const queryString = this.href.slice(queryIndex + 1);
    const params: Record<string, string> = {};
    new URLSearchParams(queryString).forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }

  /**
   * Handles button click events. Prevents interaction when the component
   * is disabled, loading, or already succeeded.
   */
  onButtonClick(event: MouseEvent): void {
    if (this.isInert) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.clicked.emit(event);
  }

  /**
   * Creates and manages the ripple animation originating from the user's
   * click position. No ripple is generated when the component is inert.
   */
  onRipple(event: MouseEvent): void {
    if (this.isInert) return;
    const btn = event.currentTarget as HTMLElement;
    btn
      .querySelectorAll('.ohmyui-btn__ripple')
      .forEach((el) => this.renderer.removeChild(btn, el));
    const circle = this.renderer.createElement('span');
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;
    const rect = btn.getBoundingClientRect();
    this.renderer.setStyle(circle, 'width', `${diameter}px`);
    this.renderer.setStyle(circle, 'height', `${diameter}px`);
    this.renderer.setStyle(
      circle,
      'left',
      `${event.clientX - rect.left - radius}px`,
    );
    this.renderer.setStyle(
      circle,
      'top',
      `${event.clientY - rect.top - radius}px`,
    );
    this.renderer.addClass(circle, 'ohmyui-btn__ripple');
    this.renderer.appendChild(btn, circle);
    circle.addEventListener(
      'animationend',
      () => {
        if (btn.contains(circle)) this.renderer.removeChild(btn, circle);
      },
      { once: true },
    );
    setTimeout(() => {
      if (btn.contains(circle)) this.renderer.removeChild(btn, circle);
    }, 600);
  }
}
