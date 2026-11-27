/**
 * Copyright 2026 The OhMyOpenSource! Authors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * SPDX-License-Identifier: MPL-2.0
 */

/**
 * @file locale.ts
 * @description Language selector of the Storybook toolbar: the `locale` global
 * and the decorators that apply it to the texts of the components of every
 * story.
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  inject,
} from '@angular/core';
import {
  componentWrapperDecorator,
  moduleMetadata,
  type Decorator,
  type Preview,
} from '@storybook/angular';
import { OhmyuiI18n, type OhmyuiLocale } from '../src';

/** Wrapper of every story that sets the language of the texts. */
@Component({
  selector: 'ohmyui-storybook-locale',
  standalone: true,
  template: '<ng-content />',
  host: { style: 'display: contents' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class StorybookLocaleComponent implements OnChanges {
  private readonly i18n = inject(OhmyuiI18n);

  /** Language chosen in the toolbar. */
  @Input() locale: OhmyuiLocale = 'en';

  ngOnChanges(): void {
    this.i18n.setLocale(this.locale);
  }
}

/** `locale` global, shown as a menu in the toolbar. */
export const localeGlobalTypes: Preview['globalTypes'] = {
  locale: {
    description: 'Language of the texts of the components',
    toolbar: {
      title: 'Language',
      icon: 'globe',
      items: [
        { value: 'en', title: 'English' },
        { value: 'it', title: 'Italiano' },
      ],
      dynamicTitle: true,
    },
  },
};

/** Decorators that apply the `locale` global to every story. */
export const localeDecorators: Decorator[] = [
  componentWrapperDecorator(StorybookLocaleComponent, ({ globals }) => ({
    locale: globals['locale'] ?? 'en',
  })),
  moduleMetadata({ imports: [StorybookLocaleComponent] }),
];
