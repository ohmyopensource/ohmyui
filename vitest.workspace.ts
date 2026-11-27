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
 * @file vitest.workspace.ts
 * @description Vitest workspace: runs the tests of every project that has a
 * Vite or Vitest configuration.
 */

export default [
  '**/vite.config.{mjs,js,ts,mts}',
  '**/vitest.config.{mjs,js,ts,mts}',
];
