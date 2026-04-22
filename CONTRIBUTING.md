# Contributing to OhMyUI!

Thank you for your interest in contributing! OhMyUI! is an open source design system and every contribution helps make it better.

---

## Before you start

Read the [OhMyOpenSource! guidelines](https://github.com/ohmyopensource/ohmyopensource-guidelines) — they cover commit conventions, branching strategy, pull request standards and code review practices that apply to all our repositories.

For component creation instructions (the main contribution workflow), see the [README](README.md).

---

## How to contribute

### Reporting a bug

Open an issue using the **Bug report** template. Include the platform (Angular, React or Flutter), steps to reproduce, and what you expected to happen.

### Suggesting a new component

Open an issue using the **Feature request** template. Describe the component, which platforms it should target, and link any design references.

### Submitting a component or fix

1. Fork the repository
2. Create a branch from `dev`:
   ```bash
   git checkout dev
   git checkout -b feat/my-component-angular
   ```
3. Follow the component creation guide in [README.md](README.md)
4. Verify your work in Storybook (Angular/React) or with `flutter test` (Flutter)
5. Open a Pull Request targeting `dev`

---

## Key rules

- **Use design tokens** — never hardcode colors, spacing or typography. Use `var(--token-name)` in CSS and `OhMyUITokens.*` in Dart.
- **One component per PR** — keep PRs focused and easy to review.
- **Follow commit conventions** — see [commit conventions](https://github.com/ohmyopensource/ohmyopensource-guidelines/blob/main/git/commit-conventions.md).
- **Never push to `main` or `dev` directly** — always open a Pull Request.

---

## License

By contributing, you agree that your contributions will be licensed under the [AGPL-3.0 License](LICENSE).
