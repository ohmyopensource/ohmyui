# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and the project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
Versions 0.x are development releases: the public API can change from one minor
version to the next. `@ohmyopensource/ohmyui-angular` and
`@ohmyopensource/ohmyui-tokens` are released together and share one version
number.

## [Unreleased]

### Added

- Badge, Input, Pagination and Text expose the colors that change in the dark
  theme as custom properties of the component, like the other components
  already do (for example `--ohmyui-badge-ghost-text`,
  `--ohmyui-input-select-arrow`, `--ohmyui-text-code-bg`), so they can be
  customized for each theme.
- `--ohmyui-font-weight-extrabold` (800) completes the font weight scale.
- Translations of the texts that the Angular components write themselves, such
  as the labels for screen readers and the texts of Pagination, in English and
  Italian. The texts are in English by default;
  `provideOhmyuiI18n({ locale: 'it' })` in the providers of the application
  switches them to Italian, its `messages` option replaces single texts for
  each language, and `OhmyuiI18n.setLocale()` changes the language while the
  application runs.
- `--ohmyui-font-size-2xs` (`0.625rem`, that is 10px) extends the font size
  scale below `xs`.
- Badge exposes its own measures as custom properties:
  `--ohmyui-badge-height-xs` to `--ohmyui-badge-height-lg`,
  `--ohmyui-badge-dot-size-xs` to `--ohmyui-badge-dot-size-lg`,
  `--ohmyui-badge-border-width`, `--ohmyui-badge-shadow-geometry`,
  `--ohmyui-badge-neutral-shadow`, `--ohmyui-badge-icon-size` and
  `--ohmyui-badge-remove-icon-size`.
- `--ohmyui-control-height-xs` to `--ohmyui-control-height-lg` (28, 34, 42 and
  52px) give the heights of the controls, and `--ohmyui-icon-size-2xs` to
  `--ohmyui-icon-size-xl` (from 10 to 20px, in steps of 2px) the sizes of the
  icons inside the components.
- Button exposes its own measures as custom properties:
  `--ohmyui-button-border-width`, `--ohmyui-button-shadow-geometry`,
  `--ohmyui-button-shadow-geometry-hover`,
  `--ohmyui-button-shadow-geometry-subtle`,
  `--ohmyui-button-focus-ring-width`, `--ohmyui-button-focus-ring-offset`,
  `--ohmyui-button-ripple-color`, `--ohmyui-button-ripple-color-subtle` and
  `--ohmyui-button-spinner-duration`.
- `--ohmyui-typescale-*` give each style of Text, from `display` to
  `blockquote`, its size range (`size-min` and `size-max`, or `size` for
  `code`, relative to the surrounding text), weight, line height and letter
  spacing, so that every platform can share the same type scale.
- Text exposes `--ohmyui-text-gradient-start`, `--ohmyui-text-gradient-end`,
  `--ohmyui-text-underline-offset` and `--ohmyui-text-blockquote-border-width`.

### Changed

- The tokens package is renamed from `@ohmyopensource/tokens` to
  `@ohmyopensource/ohmyui-tokens`, following the package names of the other
  OhMyOpenSource! libraries, and moves to `packages/ohmyui-tokens`.
- Every CSS custom property has the `--ohmyui-` prefix, so it cannot collide
  with the variables of other libraries in the same page: the design tokens
  (`--color-primary-300` becomes `--ohmyui-color-primary-300`) and the custom
  properties declared by the components, which take the name of the component
  (`--btn-*` becomes `--ohmyui-button-*`, `--pagination-btn-*` becomes
  `--ohmyui-pagination-button-*`).
- The two radius scales are merged into one, `--ohmyui-radius-*`: `none` (0),
  `xs` (4px), `sm` (6px), `md` (10px), `lg` (16px), `xl` (24px) and `full`.
  `--border-radius-*` and `--radius-*` no longer exist.
- The font size tokens, from `--ohmyui-font-size-xs` to
  `--ohmyui-font-size-6xl`, are in `rem` instead of `px`, so text follows the
  font size set in the browser. With the default root font size of 16px the
  sizes do not change (`xs` is `0.6875rem`, that is 11px).
- Badge, Email, Input, Link, Pagination and Tabs write their own texts in
  English by default instead of Italian: the labels for screen readers, the
  placeholder of the select of Input and the texts of Pagination. The
  `selectPlaceholder` input of Input is empty by default, so the text of the
  current language is used.
- `--ohmyui-font-family-mono` is the monospace font of the operating system
  (`ui-monospace`, SF Mono, Menlo, Consolas or Liberation Mono, with
  `monospace` as the last fallback) instead of JetBrains Mono, which the
  package does not bundle.
- Badge takes its font sizes from the type scale: 10px (`2xs`), 11px (`xs`),
  13px (`sm`) and 15px (`md`) for the sizes `xs`, `sm`, `md` and `lg`, instead
  of 9.6, 11.2, 12 and 13.6px. Padding and spacing follow, as they are
  proportional to the text. The shadow of the `neutral` variant uses
  `--ohmyui-color-ghost-shadow`, so it is slightly lighter in the light theme
  and follows the dark theme.
- Badge sizes its icons in proportion to the text: `1em` for the icon and
  `0.85em` for the remove icon. The icons of the sizes `md` and `lg` are 13
  and 15px instead of 12 and 14px, and the remove icons stay within a pixel of
  their previous size.
- Button takes its font sizes from the type scale: 11px (`xs`), 13px (`sm`),
  15px (`md`) and 17px (`lg`) for the sizes of the same name, instead of 11.2,
  12.8, 14.4 and 16px. On screens up to 480px wide the text no longer shrinks
  (`md` and `lg` were 13.6 and 15.2px there), and only the padding does.
  Padding and spacing follow the text; the heights do not change. The ripple
  lasts 500ms instead of 550ms, and the press feedback 50ms instead of 80ms.

### Removed

- The `iconSize` getter of Button and the `iconSize` and `closeSize` getters
  of Badge: the icons take their size from the styles of the components.

### Fixed

- Text: in the dark theme, the `code` variant with the `gradient` option shows
  the gradient, as in the light theme. Before, the dark background of the
  variant covered it.
- The focus shadows `--ohmyui-shadow-focus-primary`,
  `--ohmyui-shadow-focus-error` and `--ohmyui-shadow-focus-success` use the
  focus colors of the semantic tokens (`--ohmyui-color-primary-focus`,
  `--ohmyui-color-error-focus` and `--ohmyui-color-success-focus`), also in the
  dark theme. Before, they kept the colors of an earlier palette.
- Dark theme: the semantic tokens that point to the palette, such as
  `--ohmyui-color-text-default` and `--ohmyui-color-border-default`, take the
  dark value also when the `dark-theme` class is on an element other than the
  root, such as `<body>`. Before, they kept the light value there: for example,
  the labels of Checkbox stayed dark on the dark background.
- Button turns off the hover lift on devices that cannot hover, such as phones
  and tablets, instead of on screens up to 480px wide. Before, a tap on a
  wider touch screen left the button lifted, and a narrow desktop window lost
  the effect.
- Text with `gradient` and the color `warning`, `error` or `info` fills the
  text with the gradient of that color instead of the primary one.

## [0.1.0] - 2026-11-24

First release. No package is published to a registry yet. The project is
licensed under the Mozilla Public License 2.0; the earlier commits of the
repository, never released, were under the GNU Affero General Public License
3.0.

### Added

- Design tokens in three tiers: primitive palettes (`primary`, `secondary`,
  `tertiary`, `success`, `warning`, `error`, `info`, `neutral`, `teal`),
  semantic roles for the light and the dark theme, and custom properties that
  the components declare on their host element.
- The token build (`nx build tokens`) writes `build/css/variables.css`, with the
  light theme on `:root`; `build/css/theme-dark.css`, with the dark overrides,
  which apply when an ancestor element has the `dark-theme` class; and
  `build/dart/tokens.dart`. It copies the Outfit (headings) and Quicksand (body
  text) fonts to `build/css/fonts/`, with their licences.
- Angular components, standalone, each with Storybook stories and unit tests:
  Badge, Button, Checkbox, CheckboxGroup, Email, Input, Link, Pagination, Tabs
  and Text.
  - Checkbox supports the indeterminate state. Checkbox and Input work with
    Angular forms through `ControlValueAccessor`.
  - When disabled, CheckboxGroup disables all its checkboxes through a native
    `<fieldset>`.
  - Link marks external links with an icon, and labels the links that open in
    a new tab for screen readers.
  - Tabs follows the WAI-ARIA tabs pattern: arrow keys, Home and End move
    between the tabs, with a roving tab index.
  - Text applies the type styles to native elements as an attribute, as in
    `<h1 ohmyuiText>`.
- `@ohmyopensource/ohmyui-angular` builds with ng-packagr, in partial
  compilation mode, for Angular 21 and 22. `@lucide/angular` is a peer
  dependency.
- CI on GitHub Actions for pushes and pull requests to `dev` and `main`: lint,
  unit tests, the builds of the tokens, of the Angular library and of both
  Storybooks, and `flutter analyze` and `flutter test` on the Flutter package.
- Dependabot opens grouped weekly updates against `dev`.

### Known issues

- Some labels of the Angular components are fixed in Italian: the select
  placeholder and the password toggle of Input, the new-tab label of Link and
  the page labels of Pagination.
- The CSS variables of the tokens have no prefix, so they can collide with
  variables of the same name defined by other libraries, such as the theme
  variables of Tailwind CSS v4 (`--color-*`, `--spacing-*`, `--radius-*`,
  `--shadow-*`).
- Two radius scales coexist with different values: `--radius-*` and
  `--border-radius-*`.
- The components set spacing and font sizes with fixed values instead of the
  spacing and typography tokens.
- The focus shadows (`--shadow-focus-*`) use the colours of an earlier palette.
- `--font-family-mono` names JetBrains Mono, which is not bundled.
- Accordion, Avatar, Embed, Image, Modal, RadioGroup, Select, Switch and Toast
  are drafts: they are in the repository and in Storybook, not in the public
  API.
- The React and Flutter packages have only Button and Badge, and are not part
  of the release. The Flutter tokens are written by hand with an earlier
  palette, not generated from the token sources.

[Unreleased]: https://github.com/ohmyopensource/ohmyui/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/ohmyopensource/ohmyui/releases/tag/v0.1.0
