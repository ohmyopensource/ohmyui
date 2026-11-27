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
 * @file sd.dark.config.js
 * @description Style Dictionary configuration of the dark theme. It writes on
 * the .dark-theme selector (build/css/theme-dark.css) the overrides of
 * semantic-dark.json and every token that references another token, so that
 * the references resolve against the dark values on the element that has the
 * class, also when it is not the root element.
 */

import { usesReferences } from 'style-dictionary/utils';

export default {
  include: ['src/*.json'],
  source: ['src/semantic-dark.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'ohmyui',
      buildPath: 'build/css/',
      options: {
        outputReferences: true,
      },
      // Do not warn about references to tokens left out of this file, such as
      // the palette: they resolve against :root.
      log: {
        warnings: 'disabled',
      },
      files: [
        {
          destination: 'theme-dark.css',
          format: 'css/variables',
          filter: (token) =>
            token.isSource || usesReferences(token.original.value),
          options: {
            selector: '.dark-theme',
          },
        },
      ],
    },
  },
};
