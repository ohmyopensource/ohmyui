# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and the project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
Versions 0.x are development releases: the public API can change from one minor
version to the next. `@ohmyopensource/ohmyui-angular` and `@ohmyopensource/tokens`
are released together and share one version number.

## [Unreleased]

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
