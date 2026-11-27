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
 * @file text.stories.ts
 * @description Storybook stories of TextComponent: typography variants, colors,
 * modifiers and the accessibility notes.
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

/* Playground */
export const Playground: Story = {
  args: { variant: 'body', color: 'default' },
  render: (args) => ({
    props: args,
    template: `<p ohmyuiText [variant]="variant" [color]="color" [weight]="weight" [align]="align">
      The OhMyUI! design system provides consistent tokens and components for Angular, React and Flutter.
    </p>`,
  }),
};

/* Variants */
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
    template: `<p ohmyuiText variant="body-lg">Larger body text, for introductions.</p>`,
  }),
};
export const Body: Story = {
  render: () => ({
    template: `<p ohmyuiText variant="body">Standard body text, for the main content.</p>`,
  }),
};
export const BodySm: Story = {
  name: 'Body / Small',
  render: () => ({
    template: `<p ohmyuiText variant="body-sm">Smaller body text, for secondary details.</p>`,
  }),
};
export const Caption: Story = {
  render: () => ({
    template: `<span ohmyuiText variant="caption">Image caption</span>`,
  }),
};
export const Label: Story = {
  render: () => ({
    template: `<label ohmyuiText variant="label">Username</label>`,
  }),
};
export const Overline: Story = {
  render: () => ({
    template: `<span ohmyuiText variant="overline">New</span>`,
  }),
};
export const Code: Story = {
  render: () => ({
    template: `<span ohmyuiText variant="code">npm install @ohmyopensource/ohmyui-angular</span>`,
  }),
};
export const Blockquote: Story = {
  render: () => ({
    template: `<blockquote ohmyuiText variant="body">"A good design system goes unnoticed."</blockquote>`,
  }),
};

/* Colors */
export const ColorPrimary: Story = {
  name: 'Color / Primary',
  render: () => ({
    template: `<p ohmyuiText variant="h3" color="primary">Primary text</p>`,
  }),
};
export const ColorError: Story = {
  name: 'Color / Error',
  render: () => ({
    template: `<p ohmyuiText variant="body" color="error">This field is required.</p>`,
  }),
};
export const ColorMuted: Story = {
  name: 'Color / Muted',
  render: () => ({
    template: `<p ohmyuiText variant="body" color="muted">Secondary, less prominent text.</p>`,
  }),
};

/* Modifiers */
export const Gradient: Story = {
  render: () => ({
    template: `<h1 ohmyuiText variant="display" [gradient]="true">Gradient text</h1>`,
  }),
};
export const Truncate: Story = {
  render: () => ({
    template: `<div style="width: 200px;">
      <p ohmyuiText variant="body" [truncate]="true">This is a very long text that is truncated with an ellipsis.</p>
    </div>`,
  }),
};
export const LineClamp: Story = {
  name: 'Line clamp (3 lines)',
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

/* Accessibility */
export const AccessibleSemanticTags: Story = {
  name: 'Accessibility / Real semantic tags, not divs everywhere',
  render: () => ({
    template: `
      <h2 ohmyuiText variant="h2">Section title</h2>
      <p ohmyuiText variant="body">The component styles the HTML tag you choose: it stays a real &lt;h2&gt;, not a &lt;div&gt; with CSS that looks like a heading.</p>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'The selector is an attribute (`ohmyuiText`) for `h1` to `h6`, `p`, `span`, `label`, `blockquote` and other elements, not a custom tag. This keeps the real HTML semantics, such as the heading structure that screen readers and search engines use, instead of generic `<div>` elements that only look like headings.',
      },
    },
  },
};
