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
 * @file preview.ts
 * @description Storybook preview parameters of the Angular library: the control
 * matchers, the order of the sidebar sections, Components before Drafts, and
 * the language selector of the toolbar.
 */

import type { Preview } from '@storybook/angular';
import { localeDecorators, localeGlobalTypes } from './locale';

const preview: Preview = {
  globalTypes: localeGlobalTypes,
  initialGlobals: { locale: 'en' },
  decorators: localeDecorators,
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Components', 'Drafts'],
      },
    },
  },
};

export default preview;
