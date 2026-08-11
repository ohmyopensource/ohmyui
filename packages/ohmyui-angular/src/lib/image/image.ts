import { Component, Input, OnChanges } from '@angular/core';
import { LucideLoader, LucideImageOff } from '@lucide/angular';

export type ImageVariant =
  | 'flat'
  | 'bordered'
  | 'shadow'
  | 'shadow-md'
  | 'shadow-lg';
export type ImageShape = 'square' | 'rounded' | 'circle';
export type ImageRatio = '1/1' | '4/3' | '16/9' | '3/4' | 'auto';
export type ImageFit = 'cover' | 'contain';
export type ImageState = 'loading' | 'loaded' | 'error';

@Component({
  selector: 'ohmyui-image',
  standalone: true,
  imports: [LucideLoader, LucideImageOff],
  templateUrl: './image.html',
  styleUrl: './image.css',
})
export class ImageComponent implements OnChanges {
  /** Image source URL */
  @Input() src = '';
  /** Alt text — required for accessibility and SEO */
  @Input() alt = '';
  /** Longer description for screen readers (maps to aria-describedby content) */
  @Input() description = '';
  /** Caption shown below the image */
  @Input() caption = '';
  /** Visual style */
  @Input() variant: ImageVariant = 'flat';
  /** Border radius style */
  @Input() shape: ImageShape = 'rounded';
  /** Aspect ratio */
  @Input() ratio: ImageRatio = '16/9';
  /** Object-fit strategy */
  @Input() fit: ImageFit = 'cover';
  /** Lazy load (default true — always recommended) */
  @Input() lazy = true;
  /** Width hint for the browser (e.g. '800px', '100%') */
  @Input() width = '';
  /** Height hint for the browser */
  @Input() height = '';

  state: ImageState = 'loading';
  descriptionId = `ohmyui-img-desc-${Math.random().toString(36).slice(2, 7)}`;

  ngOnChanges(): void {
    if (this.src) {
      this.state = 'loading';
    } else {
      this.state = 'error';
    }
  }

  onLoad(): void {
    this.state = 'loaded';
  }

  onError(): void {
    this.state = 'error';
  }

  get wrapperClass(): string {
    return [
      'ohmyui-image',
      `ohmyui-image--${this.variant}`,
      `ohmyui-image--${this.shape}`,
      `ohmyui-image--ratio-${this.ratio.replace('/', '-')}`,
      `ohmyui-image--${this.state}`,
    ].join(' ');
  }

  get imgClass(): string {
    return [
      'ohmyui-image__img',
      `ohmyui-image__img--${this.fit}`,
      this.state === 'loaded' ? 'ohmyui-image__img--visible' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }
}
