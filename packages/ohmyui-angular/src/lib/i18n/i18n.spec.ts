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
 * @file i18n.spec.ts
 * @description Unit tests of the translations: English by default, the
 * language set with provideOhmyuiI18n, the replaced texts, the change of
 * language at runtime in an OnPush component, and the placeholders.
 */

import { describe, it, expect } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { OhmyuiI18n, interpolate, provideOhmyuiI18n } from './i18n';
import { OHMYUI_TRANSLATIONS } from './messages';
import { LinkComponent } from '../link/link';

describe('OhmyuiI18n', () => {
  it('should use English without configuration', () => {
    const i18n = TestBed.inject(OhmyuiI18n);
    expect(i18n.locale()).toBe('en');
    expect(i18n.messages()).toEqual(OHMYUI_TRANSLATIONS.en);
  });

  it('should use the language set with provideOhmyuiI18n', () => {
    TestBed.configureTestingModule({
      providers: [provideOhmyuiI18n({ locale: 'it' })],
    });
    const i18n = TestBed.inject(OhmyuiI18n);
    expect(i18n.locale()).toBe('it');
    expect(i18n.messages().pagination.rows).toBe('Righe');
  });

  it('should replace only the given texts of the current language', () => {
    TestBed.configureTestingModule({
      providers: [
        provideOhmyuiI18n({
          locale: 'it',
          messages: { it: { pagination: { rows: 'Elementi' } } },
        }),
      ],
    });
    const i18n = TestBed.inject(OhmyuiI18n);
    expect(i18n.messages().pagination.rows).toBe('Elementi');
    expect(i18n.messages().pagination.goTo).toBe('Vai a');
    i18n.setLocale('en');
    expect(i18n.messages().pagination.rows).toBe('Rows');
  });

  it('should update an OnPush component when the language changes', () => {
    TestBed.configureTestingModule({
      imports: [LinkComponent],
      providers: [provideRouter([])],
    });
    const fixture = TestBed.createComponent(LinkComponent);
    fixture.componentInstance.href = 'https://example.com';
    fixture.componentInstance.mode = 'external';
    fixture.componentInstance.label = 'Docs';
    fixture.detectChanges();
    const anchor: HTMLAnchorElement = fixture.nativeElement.querySelector('a');
    expect(anchor.getAttribute('aria-label')).toBe('Docs (opens in a new tab)');

    TestBed.inject(OhmyuiI18n).setLocale('it');
    fixture.detectChanges();
    expect(anchor.getAttribute('aria-label')).toBe(
      'Docs (si apre in una nuova scheda)',
    );
  });
});

describe('interpolate', () => {
  it('should replace the placeholders with their values', () => {
    expect(interpolate('Page {page} of {total}', { page: 2, total: 9 })).toBe(
      'Page 2 of 9',
    );
  });

  it('should keep the placeholders without a value', () => {
    expect(interpolate('Remove {label}', {})).toBe('Remove {label}');
  });
});
