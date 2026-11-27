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
 * @file messages.ts
 * @description Texts of the components in every language. Generated from
 * packages/ohmyui-i18n/src by `pnpm nx run ohmyui-i18n:generate`: edit the
 * JSON files there, not this file.
 */

/** Language of the texts of the components. */
export type OhmyuiLocale = 'en' | 'it';

/** Texts of the components, grouped by component. */
export interface OhmyuiMessages {
  badge: { remove: string; removeUnlabeled: string };
  email: { send: string };
  input: {
    selectPlaceholder: string;
    showPassword: string;
    hidePassword: string;
    clear: string;
  };
  link: { opensInNewTab: string };
  pagination: {
    label: string;
    rows: string;
    controls: string;
    firstPage: string;
    previousPage: string;
    page: string;
    nextPage: string;
    lastPage: string;
    goTo: string;
    goToPage: string;
    of: string;
    noResults: string;
  };
  tabs: { label: string };
}

/** Texts of the components in every language. */
export const OHMYUI_TRANSLATIONS: Record<OhmyuiLocale, OhmyuiMessages> = {
  en: {
    badge: {
      remove: 'Remove {label}',
      removeUnlabeled: 'Remove',
    },
    email: {
      send: 'Send an email to {email}',
    },
    input: {
      selectPlaceholder: 'Select',
      showPassword: 'Show password',
      hidePassword: 'Hide password',
      clear: 'Clear field',
    },
    link: {
      opensInNewTab: '{label} (opens in a new tab)',
    },
    pagination: {
      label: 'Pagination',
      rows: 'Rows',
      controls: 'Page controls',
      firstPage: 'First page',
      previousPage: 'Previous page',
      page: 'Page {page}',
      nextPage: 'Next page',
      lastPage: 'Last page',
      goTo: 'Go to',
      goToPage: 'Go to page',
      of: 'of',
      noResults: 'No results',
    },
    tabs: {
      label: 'Tabs',
    },
  },
  it: {
    badge: {
      remove: 'Rimuovi {label}',
      removeUnlabeled: 'Rimuovi',
    },
    email: {
      send: 'Invia email a {email}',
    },
    input: {
      selectPlaceholder: 'Seleziona',
      showPassword: 'Mostra password',
      hidePassword: 'Nascondi password',
      clear: 'Svuota campo',
    },
    link: {
      opensInNewTab: '{label} (si apre in una nuova scheda)',
    },
    pagination: {
      label: 'Navigazione pagine',
      rows: 'Righe',
      controls: 'Controlli pagina',
      firstPage: 'Prima pagina',
      previousPage: 'Pagina precedente',
      page: 'Pagina {page}',
      nextPage: 'Pagina successiva',
      lastPage: 'Ultima pagina',
      goTo: 'Vai a',
      goToPage: 'Vai alla pagina',
      of: 'di',
      noResults: 'Nessun risultato',
    },
    tabs: {
      label: 'Navigazione tab',
    },
  },
};
