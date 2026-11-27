# OhMyUI!

Design system with design tokens and components for Angular, React and Flutter.

## What it is

OhMyUI! is the design system of OhMyOpenSource!. This repository is an Nx monorepo, managed with pnpm, that holds the source code of every package:

| Package                          | Folder                    | Contents                                                                                                                        |
| -------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `@ohmyopensource/ohmyui-tokens`  | `packages/ohmyui-tokens`  | Design tokens generated with Style Dictionary: CSS custom properties for the light and dark theme, Dart constants and the fonts |
| `ohmyui-i18n`                    | `packages/ohmyui-i18n`    | Texts of the components in English and Italian, the single source of the translations of every library; not published           |
| `@ohmyopensource/ohmyui-angular` | `packages/ohmyui-angular` | Angular components                                                                                                              |
| `ohmyui-react`                   | `packages/ohmyui-react`   | React components, at an early stage: Button and Badge                                                                           |
| `ohmyui_flutter`                 | `packages/ohmyui_flutter` | Flutter widgets, at an early stage: Button and Badge                                                                            |

No package is published to a registry yet. The user documentation is written in the [ohmyui-docs](https://github.com/ohmyopensource/ohmyui-docs) repository, and the changes of every version are listed in the [changelog](CHANGELOG.md).

## Getting started

Requirements: Node.js 24, pnpm 10 and, only for the Flutter package, Flutter 3.44.

```bash
pnpm install
pnpm nx storybook ohmyui-angular
```

The second command builds the tokens and starts Storybook with the Angular components.

## Running the checks

```bash
pnpm nx run-many -t lint test build
```

This runs lint, unit tests and builds of every project, as the CI does. For the Flutter package, run `flutter analyze` and `flutter test` in `packages/ohmyui_flutter`. The other commands are listed in [CONTRIBUTING.md](CONTRIBUTING.md).

## Contributing

Read the [OhMyOpenSource! guidelines](https://github.com/ohmyopensource/ohmyopensource-guidelines) and [CONTRIBUTING.md](CONTRIBUTING.md), which explains how to add a component.

## License

OhMyUI! is released under the [Mozilla Public License 2.0](LICENSE).

The bundled fonts are distributed under the SIL Open Font License 1.1: [Outfit](packages/ohmyui-tokens/src/fonts/Outfit-OFL.txt) and [Quicksand](packages/ohmyui-tokens/src/fonts/Quicksand-OFL.txt).
