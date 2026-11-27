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
 * @file index.ts
 * @description Public API of @ohmyopensource/ohmyui-angular: the components
 * that are ready to use. Draft components are not exported.
 */

export * from './lib/badge/badge';
export * from './lib/button/button';
export * from './lib/checkbox/checkbox';
export * from './lib/checkbox/checkbox-group';
export * from './lib/email/email';
export * from './lib/input/input';
export * from './lib/link/link';
export * from './lib/pagination/pagination';
export * from './lib/tabs/tabs';
export * from './lib/text/text';
export {
  OhmyuiI18n,
  provideOhmyuiI18n,
  type OhmyuiI18nConfig,
  type OhmyuiMessagesOverride,
} from './lib/i18n/i18n';
export type { OhmyuiLocale, OhmyuiMessages } from './lib/i18n/messages';
