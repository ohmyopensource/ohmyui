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
 * @file generate.mjs
 * @description Generator of the translations: it checks that every language in
 * src/ has the same texts and placeholders as English (src/en.json) and writes
 * them as TypeScript for the Angular library. With --check it only reports
 * whether the generated file is up to date.
 */

import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as prettier from 'prettier';

const ROOT = dirname(fileURLToPath(import.meta.url));
const WORKSPACE = join(ROOT, '../..');
const SOURCE_DIR = join(ROOT, 'src');
const REFERENCE_LOCALE = 'en';
const ANGULAR_OUTPUT = join(
  WORKSPACE,
  'packages/ohmyui-angular/src/lib/i18n/messages.ts',
);

const LICENSE = `/**
 * Copyright 2026 The OhMyOpenSource! Authors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * SPDX-License-Identifier: MPL-2.0
 */`;

/** Reads every `<locale>.json` file of src/, English first. */
function readLocales() {
  const locales = {};
  const files = readdirSync(SOURCE_DIR)
    .filter((file) => file.endsWith('.json'))
    .map((file) => file.slice(0, -'.json'.length))
    .sort((a, b) =>
      a === REFERENCE_LOCALE ? -1 : b === REFERENCE_LOCALE ? 1 : a < b ? -1 : 1,
    );
  for (const locale of files) {
    const path = join(SOURCE_DIR, `${locale}.json`);
    locales[locale] = JSON.parse(readFileSync(path, 'utf8'));
  }
  if (!locales[REFERENCE_LOCALE]) {
    throw new Error(`Missing src/${REFERENCE_LOCALE}.json`);
  }
  return locales;
}

/** Sorted names of the `{placeholders}` of a text. */
function placeholders(text) {
  return [...text.matchAll(/\{(\w+)\}/g)]
    .map((match) => match[1])
    .sort()
    .join(', ');
}

/** Whether a value is a plain object. */
function isGroup(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Errors of the sources: texts are grouped by component, and every language
 * has the keys and the placeholders of English.
 */
function validate(locales) {
  const errors = [];
  const reference = locales[REFERENCE_LOCALE];
  for (const [group, texts] of Object.entries(reference)) {
    if (!isGroup(texts)) {
      errors.push(`${REFERENCE_LOCALE}: ${group} must group texts`);
      continue;
    }
    for (const [key, text] of Object.entries(texts)) {
      if (typeof text !== 'string') {
        errors.push(`${REFERENCE_LOCALE}: ${group}.${key} must be a text`);
      }
    }
  }
  for (const [locale, messages] of Object.entries(locales)) {
    if (locale === REFERENCE_LOCALE) continue;
    const groups = new Set([
      ...Object.keys(reference),
      ...Object.keys(messages),
    ]);
    for (const group of groups) {
      const expected = reference[group];
      const actual = messages[group];
      if (!expected) {
        errors.push(`${locale}: unknown group ${group}`);
        continue;
      }
      if (!isGroup(actual)) {
        errors.push(`${locale}: missing group ${group}`);
        continue;
      }
      const keys = new Set([...Object.keys(expected), ...Object.keys(actual)]);
      for (const key of keys) {
        const name = `${group}.${key}`;
        if (!(key in expected)) {
          errors.push(`${locale}: unknown text ${name}`);
        } else if (typeof actual[key] !== 'string') {
          errors.push(`${locale}: missing text ${name}`);
        } else if (placeholders(actual[key]) !== placeholders(expected[key])) {
          errors.push(
            `${locale}: ${name} must have the placeholders of ` +
              `${REFERENCE_LOCALE} (${placeholders(expected[key]) || 'none'})`,
          );
        }
      }
    }
  }
  return errors;
}

/** TypeScript source of the Angular messages. */
function angularSource(locales) {
  const reference = locales[REFERENCE_LOCALE];
  const localeType = Object.keys(locales)
    .map((locale) => `'${locale}'`)
    .join(' | ');
  const groups = Object.entries(reference)
    .map(
      ([group, texts]) =>
        `${group}: { ${Object.keys(texts)
          .map((key) => `${key}: string;`)
          .join(' ')} };`,
    )
    .join('\n');
  return `${LICENSE}

/**
 * @file messages.ts
 * @description Texts of the components in every language. Generated from
 * packages/ohmyui-i18n/src by \`pnpm nx run ohmyui-i18n:generate\`: edit the
 * JSON files there, not this file.
 */

/** Language of the texts of the components. */
export type OhmyuiLocale = ${localeType};

/** Texts of the components, grouped by component. */
export interface OhmyuiMessages {
${groups}
}

/** Texts of the components in every language. */
export const OHMYUI_TRANSLATIONS: Record<OhmyuiLocale, OhmyuiMessages> = ${JSON.stringify(locales, null, 2)};
`;
}

/** Formats a generated file with the Prettier settings of the workspace. */
async function format(source, path) {
  const options = (await prettier.resolveConfig(path)) ?? {};
  return prettier.format(source, { ...options, filepath: path });
}

async function main() {
  const check = process.argv.includes('--check');
  const locales = readLocales();
  const errors = validate(locales);
  if (errors.length > 0) {
    console.error(errors.join('\n'));
    process.exit(1);
  }
  const output = await format(angularSource(locales), ANGULAR_OUTPUT);
  const name = relative(WORKSPACE, ANGULAR_OUTPUT);
  if (check) {
    const current = existsSync(ANGULAR_OUTPUT)
      ? readFileSync(ANGULAR_OUTPUT, 'utf8')
      : '';
    if (current !== output) {
      console.error(
        `${name} is not up to date: run pnpm nx run ohmyui-i18n:generate`,
      );
      process.exit(1);
    }
    console.log(`${name} is up to date`);
    return;
  }
  mkdirSync(dirname(ANGULAR_OUTPUT), { recursive: true });
  writeFileSync(ANGULAR_OUTPUT, output);
  console.log(`Wrote ${name}`);
}

await main();
