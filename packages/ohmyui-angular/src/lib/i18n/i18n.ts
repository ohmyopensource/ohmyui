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
 * @file i18n.ts
 * @description Language of the texts of the components: OhmyuiI18n, which
 * holds the current language and its texts, and provideOhmyuiI18n, which sets
 * the language and replaces single texts. Without configuration the texts are
 * in English.
 */

import {
  EnvironmentProviders,
  Injectable,
  InjectionToken,
  computed,
  inject,
  makeEnvironmentProviders,
  signal,
} from '@angular/core';
import { OHMYUI_TRANSLATIONS, OhmyuiLocale, OhmyuiMessages } from './messages';

/** Texts that replace part of the texts of a language. */
export type OhmyuiMessagesOverride = {
  [Group in keyof OhmyuiMessages]?: Partial<OhmyuiMessages[Group]>;
};

/** Configuration of the texts of the components. */
export interface OhmyuiI18nConfig {
  /** Language of the texts at startup. English when not set. */
  locale?: OhmyuiLocale;
  /** Texts that replace the default ones, for each language. */
  messages?: Partial<Record<OhmyuiLocale, OhmyuiMessagesOverride>>;
}

const OHMYUI_I18N_CONFIG = new InjectionToken<OhmyuiI18nConfig>(
  'OHMYUI_I18N_CONFIG',
);

/**
 * Sets the language of the texts of the components and the texts that replace
 * the default ones. Add it to the providers of the application.
 *
 * @param config Language and replaced texts.
 */
export function provideOhmyuiI18n(
  config: OhmyuiI18nConfig,
): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: OHMYUI_I18N_CONFIG, useValue: config },
  ]);
}

/**
 * Current language of the texts of the components. Changing it with
 * `setLocale` updates every component on the page.
 */
@Injectable({ providedIn: 'root' })
export class OhmyuiI18n {
  private readonly config =
    inject(OHMYUI_I18N_CONFIG, { optional: true }) ?? {};
  private readonly currentLocale = signal<OhmyuiLocale>(
    this.config.locale ?? 'en',
  );

  /** Current language. */
  readonly locale = this.currentLocale.asReadonly();

  /** Texts of the current language, with the replaced texts applied. */
  readonly messages = computed(() =>
    mergeMessages(
      OHMYUI_TRANSLATIONS[this.currentLocale()],
      this.config.messages?.[this.currentLocale()],
    ),
  );

  /**
   * Changes the language of the texts.
   *
   * @param locale New language.
   */
  setLocale(locale: OhmyuiLocale): void {
    this.currentLocale.set(locale);
  }
}

/** Texts of a language with the replaced texts applied, group by group. */
function mergeMessages(
  messages: OhmyuiMessages,
  override: OhmyuiMessagesOverride | undefined,
): OhmyuiMessages {
  if (!override) return messages;
  const merged: Record<string, object> = { ...messages };
  for (const [group, texts] of Object.entries(override)) {
    merged[group] = { ...merged[group], ...texts };
  }
  return merged as unknown as OhmyuiMessages;
}

/**
 * Text with each `{name}` placeholder replaced by the value of the same name.
 * Placeholders without a value stay as they are.
 *
 * @param text Text with placeholders.
 * @param values Values of the placeholders.
 */
export function interpolate(
  text: string,
  values: Record<string, string | number>,
): string {
  return text.replace(/\{(\w+)\}/g, (placeholder, name: string) =>
    name in values ? String(values[name]) : placeholder,
  );
}
