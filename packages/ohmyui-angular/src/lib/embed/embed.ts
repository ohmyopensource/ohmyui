import { Component, Input, OnChanges, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LucideLoader, LucideFrame } from '@lucide/angular';

export type EmbedVariant =
  | 'flat'
  | 'bordered'
  | 'shadow'
  | 'shadow-md'
  | 'shadow-lg';
export type EmbedShape = 'square' | 'rounded';
export type EmbedRatio = '1/1' | '4/3' | '16/9' | '3/4' | 'auto';
export type EmbedState = 'loading' | 'loaded' | 'error';

export type EmbedSandbox =
  | 'strict' // nothing allowed
  | 'safe' // allow-same-origin + allow-scripts
  | 'forms' // safe + allow-forms
  | 'popups' // safe + allow-popups
  | 'full' // all permissions (use with caution)
  | 'none'; // no sandbox attribute (trust the source fully)

const SANDBOX_MAP: Record<EmbedSandbox, string | null> = {
  strict: '',
  safe: 'allow-same-origin allow-scripts',
  forms: 'allow-same-origin allow-scripts allow-forms',
  popups: 'allow-same-origin allow-scripts allow-popups',
  full: 'allow-same-origin allow-scripts allow-forms allow-popups allow-pointer-lock allow-top-navigation',
  none: null,
};

@Component({
  selector: 'ohmyui-embed',
  standalone: true,
  imports: [LucideLoader, LucideFrame],
  templateUrl: './embed.html',
  styleUrl: './embed.css',
})
export class EmbedComponent implements OnChanges {
  private sanitizer = inject(DomSanitizer);

  /** URL to embed */
  @Input() src = '';
  /** Accessible title — required for screen readers */
  @Input() title = '';
  /** Visual variant */
  @Input() variant: EmbedVariant = 'bordered';
  /** Border radius */
  @Input() shape: EmbedShape = 'rounded';
  /** Aspect ratio */
  @Input() ratio: EmbedRatio = '16/9';
  /** Sandbox security level */
  @Input() sandbox: EmbedSandbox = 'safe';
  /** Allow camera access */
  @Input() allowCamera = false;
  /** Allow microphone access */
  @Input() allowMicrophone = false;
  /** Allow fullscreen */
  @Input() allowFullscreen = true;
  /** Allow autoplay */
  @Input() allowAutoplay = false;
  /** Custom height in px — overrides ratio when set */
  @Input() height = 0;
  /** Show error message when blocked */
  @Input() errorMessage = 'This content could not be loaded.';

  state: EmbedState = 'loading';
  safeUrl: SafeResourceUrl | null = null;

  get sandboxAttr(): string | null {
    return SANDBOX_MAP[this.sandbox];
  }

  get allowAttr(): string {
    const parts: string[] = [];
    if (this.allowCamera) parts.push('camera');
    if (this.allowMicrophone) parts.push('microphone');
    if (this.allowFullscreen) parts.push('fullscreen');
    if (this.allowAutoplay) parts.push('autoplay');
    return parts.join('; ');
  }

  get wrapperClass(): string {
    return [
      'ohmyui-embed',
      `ohmyui-embed--${this.variant}`,
      `ohmyui-embed--${this.shape}`,
      this.ratio !== 'auto' && !this.height
        ? `ohmyui-embed--ratio-${this.ratio.replace('/', '-')}`
        : '',
      `ohmyui-embed--${this.state}`,
    ]
      .filter(Boolean)
      .join(' ');
  }

  ngOnChanges(): void {
    if (this.src) {
      this.state = 'loading';
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.src);
    } else {
      this.state = 'error';
      this.safeUrl = null;
    }
  }

  onLoad(): void {
    this.state = 'loaded';
  }

  onError(): void {
    this.state = 'error';
  }
}
