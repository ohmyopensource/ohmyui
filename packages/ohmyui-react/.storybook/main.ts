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
 * @file main.ts
 * @description Storybook configuration of the React library: the story files,
 * the Vite framework with the React and Nx path plugins, and the token
 * stylesheets served under /tokens.
 */

import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

import type { StorybookConfig } from '@storybook/react-vite';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { mergeConfig } from 'vite';
import react from '@vitejs/plugin-react';

const config: StorybookConfig = {
  stories: ['../src/lib/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  addons: [],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  staticDirs: [{ from: '../../ohmyui-tokens/build/css', to: '/tokens' }],
  viteFinal: async (config) =>
    mergeConfig(config, {
      plugins: [react(), nxViteTsPaths()],
    }),
};

function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

export default config;
