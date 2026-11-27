# Contributing to OhMyUI!

Thank you for your interest in contributing! OhMyUI! is an open source design system and every contribution helps make it better.

---

## Before you start

Read the [OhMyOpenSource! guidelines](https://github.com/ohmyopensource/ohmyopensource-guidelines) — they cover commit conventions, branching strategy, pull request standards and code review practices that apply to all our repositories.

The development setup and the steps to add a component are described below, in [Development](#development).

---

## How to contribute

### Reporting a bug

Open an issue using the **Bug report** template. Include the platform (Angular, React or Flutter), steps to reproduce, and what you expected to happen.

### Suggesting a new component

Open an issue using the **Feature request** template. Describe the component, which platforms it should target, and link any design references.

### Submitting a component or fix

1. Fork the repository
2. Create a branch from `dev`, named `feature/<name>`, `fix/<name>` or `docs/<name>`:
   ```bash
   git checkout dev
   git checkout -b feature/angular-switch
   ```
3. Make your change as described in [Development](#development)
4. Run the checks listed there: they must pass before you open the pull request
5. Open a pull request targeting `dev`

---

## Development

### Requirements

- Node.js 24
- pnpm 10 (the exact version is set in the `packageManager` field of `package.json`)
- Flutter 3.44, only to work on `packages/ohmyui_flutter`

Install the dependencies from the repository root:

```bash
pnpm install
```

### Commands

| Command                               | What it does                                                                   |
| ------------------------------------- | ------------------------------------------------------------------------------ |
| `pnpm nx storybook ohmyui-angular`    | Starts Storybook for the Angular components (it builds the tokens first)       |
| `pnpm nx storybook ohmyui-react`      | Starts Storybook for the React components                                      |
| `pnpm nx test ohmyui-angular`         | Runs the unit tests of the Angular library                                     |
| `pnpm nx build ohmyui-angular`        | Builds the Angular library and checks every template in strict mode            |
| `pnpm nx build ohmyui-tokens`         | Generates the CSS and Dart tokens in `packages/ohmyui-tokens/build`            |
| `pnpm nx run ohmyui-i18n:generate`    | Writes the translations of `packages/ohmyui-i18n/src` into the Angular library |
| `pnpm nx run-many -t lint test build` | Runs lint, tests and builds of every project, as the CI does                   |

For the Flutter package, run `flutter analyze` and `flutter test` in `packages/ohmyui_flutter`.

### Adding an Angular component

1. Create the folder `packages/ohmyui-angular/src/lib/<component>/` with:
   - `<component>.ts`: a standalone component with `ChangeDetectionStrategy.OnPush` and the selector `ohmyui-<component>`;
   - `<component>.html` and `<component>.css`;
   - `<component>.stories.ts`: stories under `Components/<Name>`, with a `Playground` story first;
   - `<component>.spec.ts`: unit tests.
2. Style it only with the design tokens. For the dark theme use `:host-context(.dark-theme)`, never `prefers-color-scheme`.
3. Write no interface text in the component, not even an `aria-label`: add it to `packages/ohmyui-i18n/src/en.json` and `it.json`, under the name of the component, run `pnpm nx run ohmyui-i18n:generate` and read it from `OhmyuiI18n`.
4. Export the component and its public types from `packages/ohmyui-angular/src/index.ts`.
5. Run `pnpm nx run-many -t lint test build`. Storybook does not check templates strictly: only the library build catches template errors.
6. Describe the change for users of the library under `## [Unreleased]` in `CHANGELOG.md`.

---

## Key rules

- **Use design tokens** — never hardcode colors, spacing or typography. Use the `--ohmyui-*` custom properties in CSS and `OhMyUITokens.*` in Dart.
- **Translate every text** — the texts of the components live in `packages/ohmyui-i18n/src`, in English and Italian.
- **One component per PR** — keep PRs focused and easy to review.
- **Follow commit conventions** — see [commit conventions](https://github.com/ohmyopensource/ohmyopensource-guidelines/blob/main/git/commit-conventions.md).
- **Never push to `main` or `dev` directly** — always open a Pull Request.

---

## License

By contributing, you agree that your contributions will be licensed under the [Mozilla Public License 2.0](LICENSE).
