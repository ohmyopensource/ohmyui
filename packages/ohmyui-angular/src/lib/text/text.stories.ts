/**
 * Copyright 2026 The OhMyOpenSource! Authors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * SPDX-License-Identifier: MPL-2.0
 */

import type { Meta, StoryObj } from '@storybook/angular';
import { TextComponent } from './text';

const meta: Meta<TextComponent> = {
  title: 'Components/Text',
  component: TextComponent,
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'display',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'body-lg',
        'body',
        'body-sm',
        'caption',
        'label',
        'overline',
        'code',
      ],
    },
    color: {
      control: 'select',
      options: [
        'default',
        'muted',
        'subtle',
        'primary',
        'secondary',
        'tertiary',
        'success',
        'warning',
        'error',
        'info',
        'white',
        'inherit',
      ],
    },
    weight: {
      control: 'select',
      options: ['', 'normal', 'medium', 'semibold', 'bold', 'extrabold'],
    },
    align: {
      control: 'select',
      options: ['', 'left', 'center', 'right', 'justify'],
    },
    italic: { control: 'boolean' },
    underline: { control: 'boolean' },
    truncate: { control: 'boolean' },
    noWrap: { control: 'boolean' },
    gradient: { control: 'boolean' },
    lineClamp: { control: 'number' },
  },
};
export default meta;
type Story = StoryObj<TextComponent>;

/* ── Playground ──────────────────────────────── */
export const Playground: Story = {
  args: { variant: 'body', color: 'default' },
  render: (args) => ({
    props: args,
    template: `<p ohmyuiText [variant]="variant" [color]="color" [weight]="weight" [align]="align">
      Il design system OhMyUI! fornisce token e componenti coerenti su Angular, React e Flutter.
    </p>`,
  }),
};

/* ── Variants (applicati al tag HTML semantico corretto) ────── */
export const Display: Story = {
  render: () => ({
    template: `<div ohmyuiText variant="display">Display</div>`,
  }),
};
export const H1: Story = {
  render: () => ({ template: `<h1 ohmyuiText variant="h1">Heading 1</h1>` }),
};
export const H2: Story = {
  render: () => ({ template: `<h2 ohmyuiText variant="h2">Heading 2</h2>` }),
};
export const H3: Story = {
  render: () => ({ template: `<h3 ohmyuiText variant="h3">Heading 3</h3>` }),
};
export const BodyLg: Story = {
  name: 'Body / Large',
  render: () => ({
    template: `<p ohmyuiText variant="body-lg">Testo body più grande, per introduzioni.</p>`,
  }),
};
export const Body: Story = {
  render: () => ({
    template: `<p ohmyuiText variant="body">Testo body standard, per il contenuto principale.</p>`,
  }),
};
export const BodySm: Story = {
  name: 'Body / Small',
  render: () => ({
    template: `<p ohmyuiText variant="body-sm">Testo body più piccolo, per dettagli secondari.</p>`,
  }),
};
export const Caption: Story = {
  render: () => ({
    template: `<span ohmyuiText variant="caption">Didascalia dell'immagine</span>`,
  }),
};
export const Label: Story = {
  render: () => ({
    template: `<label ohmyuiText variant="label">Nome utente</label>`,
  }),
};
export const Overline: Story = {
  render: () => ({
    template: `<span ohmyuiText variant="overline">Nuovo</span>`,
  }),
};
export const Code: Story = {
  render: () => ({
    template: `<span ohmyuiText variant="code">npm install ohmyui-angular</span>`,
  }),
};
export const Blockquote: Story = {
  render: () => ({
    template: `<blockquote ohmyuiText variant="body">"Un buon design system si nota quando smette di farsi notare."</blockquote>`,
  }),
};

/* ── Colors ──────────────────────────────────── */
export const ColorPrimary: Story = {
  name: 'Color / Primary',
  render: () => ({
    template: `<p ohmyuiText variant="h3" color="primary">Testo primary</p>`,
  }),
};
export const ColorError: Story = {
  name: 'Color / Error',
  render: () => ({
    template: `<p ohmyuiText variant="body" color="error">Questo campo è obbligatorio.</p>`,
  }),
};
export const ColorMuted: Story = {
  name: 'Color / Muted',
  render: () => ({
    template: `<p ohmyuiText variant="body" color="muted">Testo secondario, meno prominente.</p>`,
  }),
};

/* ── Modifiers ───────────────────────────────── */
export const Gradient: Story = {
  render: () => ({
    template: `<h1 ohmyuiText variant="display" [gradient]="true">Gradient text</h1>`,
  }),
};
export const Truncate: Story = {
  render: () => ({
    template: `<div style="width: 200px;">
      <p ohmyuiText variant="body" [truncate]="true">Questo è un testo molto lungo che verrà troncato con i puntini di sospensione.</p>
    </div>`,
  }),
};
export const LineClamp: Story = {
  name: 'Line clamp (3 righe)',
  render: () => ({
    template: `<div style="width: 300px;">
      <p ohmyuiText variant="body" [lineClamp]="3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </div>`,
  }),
};

/* ── Accessibility ────────────────────────────── */
export const AccessibleSemanticTags: Story = {
  name: 'Accessibility / Real semantic tags, not divs everywhere',
  render: () => ({
    template: `
      <h2 ohmyuiText variant="h2">Titolo di sezione</h2>
      <p ohmyuiText variant="body">Il componente applica lo stile SOPRA il tag HTML che scegli tu — resta un vero &lt;h2&gt;, non un &lt;div&gt; con del CSS che sembra un titolo.</p>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          "Il selettore è un attributo (`ohmyuiText`) applicabile a `h1`–`h6`, `p`, `span`, `label`, `blockquote`, ecc. — non un tag custom. Questo preserva la semantica HTML reale (struttura dei titoli per screen reader e SEO) invece di forzare tutto dentro `<div>` generici con l'aspetto visivo di un titolo ma nessun significato semantico.",
      },
    },
  },
};
