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
 * @description Style Dictionary configuration of the dark theme. It writes
 * the overrides of semantic-dark.json on the .dark-theme selector
 * (build/css/theme-dark.css).
 */

export default {
  source: ['src/semantic-dark.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'ohmyui',
      buildPath: 'build/css/',
      files: [
        {
          destination: 'theme-dark.css',
          format: 'css/variables',
          options: {
            selector: '.dark-theme',
          },
        },
      ],
    },
  },
};
