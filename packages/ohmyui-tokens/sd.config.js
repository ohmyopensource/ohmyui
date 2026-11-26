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
 * @file sd.config.js
 * @description Style Dictionary configuration of the light theme and of the
 * shared tokens. It writes the CSS custom properties on :root
 * (build/css/variables.css), the Dart class (build/dart/tokens.dart) and the
 * fonts. The dark theme is built by sd.dark.config.js.
 */

import { copyFileSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';
import StyleDictionary from 'style-dictionary';

const FONT_FILES = [
  'Outfit-VariableFont_wght.woff2',
  'Outfit-VariableFont_wght.ttf',
  'Quicksand-VariableFont_wght.woff2',
  'Quicksand-VariableFont_wght.ttf',
  'fonts.css',
  'Outfit-OFL.txt',
  'Quicksand-OFL.txt',
];

/**
 * Copies the font files and their licenses to build/css/fonts, and removes
 * them when the build is cleaned.
 */
StyleDictionary.registerAction({
  name: 'copy-fonts',
  do: () => {
    const outDir = 'build/css/fonts';
    mkdirSync(outDir, { recursive: true });
    for (const f of FONT_FILES) {
      copyFileSync(join('src/fonts', f), join(outDir, f));
    }
    console.log('✓ fonts copied to build/css/fonts/');
  },
  undo: () => {
    rmSync('build/css/fonts', { recursive: true, force: true });
    console.log('✓ fonts removed from build/css/fonts/');
  },
});

export default {
  source: [
    'src/border.json',
    'src/colors.json',
    'src/radius.json',
    'src/semantic.json',
    'src/shadow.json',
    'src/spacing.json',
    'src/transition.json',
    'src/typography.json',
    'src/z-index.json',
  ],
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'ohmyui',
      buildPath: 'build/css/',
      options: {
        outputReferences: true,
      },
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
        },
      ],
      actions: ['copy-fonts'],
    },
    dart: {
      transformGroup: 'flutter',
      buildPath: 'build/dart/',
      files: [
        {
          destination: 'tokens.dart',
          format: 'flutter/class.dart',
        },
      ],
    },
  },
};
