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
 * @file styles.spec.ts
 * @description Checks the stylesheets of the components in the public API for
 * selectors that break onto a new line at a combinator. Emulated view
 * encapsulation scopes such a selector wrongly, so its rule stops applying.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const libDir = dirname(fileURLToPath(import.meta.url));

/** Folders of the components exported by the public API. */
function publicFolders(): string[] {
  const index = readFileSync(join(libDir, '..', 'index.ts'), 'utf8');
  const folders = [...index.matchAll(/\.\/lib\/([\w-]+)\//g)].map((m) => m[1]);
  return [...new Set(folders)].filter((folder) => folder !== 'i18n');
}

/** Selectors of a stylesheet with a line break outside parentheses. */
function wrappedSelectors(css: string): string[] {
  const source = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const wrapped: string[] = [];
  for (const match of source.matchAll(/([^{};]+)\{/g)) {
    const prelude = match[1].trim();
    if (prelude.startsWith('@')) continue;
    let depth = 0;
    let outside = '';
    for (const char of prelude) {
      if (char === '(') depth++;
      if (depth === 0) outside += char;
      if (char === ')') depth--;
    }
    for (const selector of outside.split(',')) {
      if (selector.trim().includes('\n')) wrapped.push(selector.trim());
    }
  }
  return wrapped;
}

describe('component stylesheets', () => {
  for (const folder of publicFolders()) {
    const files = readdirSync(join(libDir, folder)).filter((file) =>
      file.endsWith('.css'),
    );
    for (const file of files) {
      it(`${folder}/${file} keeps every selector on one line`, () => {
        const css = readFileSync(join(libDir, folder, file), 'utf8');
        expect(wrappedSelectors(css)).toEqual([]);
      });
    }
  }
});
