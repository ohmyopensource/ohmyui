# OhMyUI!

> Open source design system by OhMyOpenSource — tokens, components and guidelines for Angular, React and Flutter.

OhMyUI! is a monorepo containing shared design tokens and UI components for all OhMyOpenSource projects. Every component is built once per platform and reused everywhere, ensuring a consistent look and feel across web, mobile and desktop.

---

## What's inside

```
ohmyui/
├── packages/
│   ├── tokens/          → Design tokens (colors, spacing, typography) — source of truth
│   ├── ohmyui-angular/  → Angular components
│   ├── ohmyui-react/    → React components
│   └── ohmyui_flutter/  → Flutter components
```

---

## Prerequisites

Before you start, make sure you have the following installed:

- [Node.js](https://nodejs.org/) v22 or higher
- [npm](https://www.npmjs.com/) v10 or higher
- [Flutter SDK](https://flutter.dev/docs/get-started/install) (only if working on Flutter components)
- [Git](https://git-scm.com/)

---

## Getting started

Clone the repository and install dependencies:

```bash
git clone https://github.com/ohmyopensource/ohmyui.git
cd ohmyui
npm install
```

Build the design tokens (required before running Storybook):

```bash
cd packages/tokens
npx style-dictionary build --config sd.config.js
cd ../..
```

That's it. You're ready to work.

---

## Running Storybook

Storybook is the development environment where you can see and interact with all components in isolation.

**Angular:**

```bash
npx nx storybook ohmyui-angular
```

**React:**

```bash
npx nx storybook ohmyui-react
```

Storybook will open automatically in your browser at `http://localhost:6006`.

---

## Adding a new component

This is the main workflow. Follow the section for the platform you are working on.

---

### Angular

#### 1. Generate the component files

Run this command from the root of the repository, replacing `my-component` with the name of your component (use kebab-case):

```bash
npx nx generate @nx/angular:component \
  --path=packages/ohmyui-angular/src/lib/my-component \
  --name=my-component \
  --standalone \
  --no-interactive
```

This will create:

```
packages/ohmyui-angular/src/lib/
├── my-component.ts
├── my-component.html
└── my-component.css
```

#### 2. Write the component

Open `my-component.ts` and define your inputs:

```typescript
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ohmyui-my-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-component.html',
  styleUrl: './my-component.css',
})
export class MyComponent {
  @Input() label = '';
}
```

Open `my-component.html` and write the template:

```html
<div class="ohmyui-my-component">{{ label }}</div>
```

Open `my-component.css` and style it using design tokens:

```css
.ohmyui-my-component {
  color: var(--color-primary-500);
  font-size: var(--font-size-md);
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
}
```

> Always use CSS custom properties (e.g. `var(--color-primary-500)`) instead of hardcoded values. The full list of available tokens is in `packages/tokens/build/css/variables.css`.

#### 3. Export the component

Open `packages/ohmyui-angular/src/index.ts` and add your export:

```typescript
export * from './lib/my-component';
```

#### 4. Write the Storybook story

Create `packages/ohmyui-angular/src/lib/my-component.stories.ts`:

```typescript
import type { Meta, StoryObj } from '@storybook/angular';
import { MyComponent } from './my-component';

const meta: Meta<MyComponent> = {
  title: 'Components/MyComponent',
  component: MyComponent,
  argTypes: {
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<MyComponent>;

export const Default: Story = {
  args: { label: 'Hello OhMyUI!' },
};
```

#### 5. Verify in Storybook

```bash
npx nx storybook ohmyui-angular
```

Open your browser and check that the component appears correctly in the sidebar under `Components/MyComponent`.

---

### React

#### 1. Create the component file

Create `packages/ohmyui-react/src/lib/my-component.tsx`:

```tsx
import styles from './my-component.module.css';

export interface MyComponentProps {
  label?: string;
}

export function MyComponent({ label = '' }: MyComponentProps) {
  return <div className={styles['ohmyui-my-component']}>{label}</div>;
}

export default MyComponent;
```

#### 2. Create the CSS module

Create `packages/ohmyui-react/src/lib/my-component.module.css`:

```css
.ohmyui-my-component {
  color: var(--color-primary-500);
  font-size: var(--font-size-md);
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
}
```

> Always use CSS custom properties instead of hardcoded values. The full list is in `packages/tokens/build/css/variables.css`.

#### 3. Export the component

Open `packages/ohmyui-react/src/index.ts` and add your export:

```typescript
export * from './lib/my-component';
```

#### 4. Write the Storybook story

Create `packages/ohmyui-react/src/lib/my-component.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from './my-component';

const meta: Meta<typeof MyComponent> = {
  title: 'Components/MyComponent',
  component: MyComponent,
  argTypes: {
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const Default: Story = {
  args: { label: 'Hello OhMyUI!' },
};
```

#### 5. Verify in Storybook

```bash
npx nx storybook ohmyui-react
```

Open your browser and check that the component appears correctly in the sidebar under `Components/MyComponent`.

---

### Flutter

#### 1. Create the component file

Create `packages/ohmyui_flutter/lib/src/components/my_component/my_component.dart`:

```dart
import 'package:flutter/material.dart';
import '../../tokens/tokens.dart';

class OhMyUIMyComponent extends StatelessWidget {
  final String label;

  const OhMyUIMyComponent({
    super.key,
    required this.label,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(OhMyUITokens.spacing4),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(OhMyUITokens.radiusMd),
      ),
      child: Text(
        label,
        style: const TextStyle(
          color: OhMyUITokens.colorPrimary500,
          fontSize: OhMyUITokens.fontSizeMd,
        ),
      ),
    );
  }
}
```

> Always use `OhMyUITokens.*` constants instead of hardcoded values. The full list is in `packages/ohmyui_flutter/lib/src/tokens/tokens.dart`.

#### 2. Export the component

Open `packages/ohmyui_flutter/lib/ohmyui_flutter.dart` and add your export:

```dart
export 'src/tokens/tokens.dart';
export 'src/components/button/button.dart';
export 'src/components/my_component/my_component.dart'; // add this
```

#### 3. Write a test

Create `packages/ohmyui_flutter/test/my_component_test.dart`:

```dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:ohmyui_flutter/ohmyui_flutter.dart';

void main() {
  testWidgets('OhMyUIMyComponent renders label', (WidgetTester tester) async {
    await tester.pumpWidget(
      const MaterialApp(
        home: Scaffold(
          body: OhMyUIMyComponent(label: 'Hello OhMyUI!'),
        ),
      ),
    );
    expect(find.text('Hello OhMyUI!'), findsOneWidget);
  });
}
```

#### 4. Run the analysis and tests

From the Flutter package directory:

```bash
cd packages/ohmyui_flutter
flutter analyze
flutter test
```

Both commands must pass with no errors before you push.

---

## Design tokens reference

All tokens are defined in `packages/tokens/src/` as JSON files and compiled to CSS and Dart automatically.

| Category      | CSS variable example        | Dart constant example           |
| ------------- | --------------------------- | ------------------------------- |
| Colors        | `var(--color-primary-500)`  | `OhMyUITokens.colorPrimary500`  |
| Spacing       | `var(--spacing-4)`          | `OhMyUITokens.spacing4`         |
| Border radius | `var(--radius-md)`          | `OhMyUITokens.radiusMd`         |
| Font size     | `var(--font-size-md)`       | `OhMyUITokens.fontSizeMd`       |
| Font weight   | `var(--font-weight-medium)` | `OhMyUITokens.fontWeightMedium` |

To rebuild tokens after modifying the JSON source files:

```bash
cd packages/tokens
npx style-dictionary build --config sd.config.js
```

---

## Submitting your work

When your component is ready and verified in Storybook (or tested with `flutter test`):

```bash
git checkout -b feat/my-component-angular
git add .
git commit -m "feat(angular): add MyComponent"
git push origin feat/my-component-angular
```

Then open a Pull Request targeting the `dev` branch on GitHub. A maintainer will review it and merge it.

> Never push directly to `main` or `dev`. Always open a Pull Request.

---

## Useful commands

| Command                                                                  | Description             |
| ------------------------------------------------------------------------ | ----------------------- |
| `npx nx storybook ohmyui-angular`                                        | Start Angular Storybook |
| `npx nx storybook ohmyui-react`                                          | Start React Storybook   |
| `npx nx build ohmyui-angular`                                            | Build Angular package   |
| `npx nx build ohmyui-react`                                              | Build React package     |
| `cd packages/ohmyui_flutter && flutter analyze`                          | Analyze Flutter package |
| `cd packages/ohmyui_flutter && flutter test`                             | Run Flutter tests       |
| `cd packages/tokens && npx style-dictionary build --config sd.config.js` | Rebuild design tokens   |

---

## License

OhMyUI! is released under the [AGPL-3.0 License](LICENSE).
