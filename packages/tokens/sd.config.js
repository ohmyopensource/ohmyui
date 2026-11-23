import { copyFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import StyleDictionary from 'style-dictionary';

const FONT_FILES = [
  'Outfit-VariableFont_wght.woff2',
  'Outfit-VariableFont_wght.ttf',
  'Quicksand-VariableFont_wght.woff2',
  'Quicksand-VariableFont_wght.ttf',
  'fonts.css',
];

StyleDictionary.registerAction({
  name: 'copy-fonts',
  do: () => {
    const outDir = 'build/css/fonts';
    mkdirSync(outDir, { recursive: true });
    for (const f of FONT_FILES) {
      copyFileSync(join('src/fonts', f), join(outDir, f));
    }
    console.log('✓ fonts copied to build/css/fonts/');
  },
  undo: () => {
    rmSync('build/css/fonts', { recursive: true, force: true });
    console.log('✓ fonts removed from build/css/fonts/');
  },
});

export default {
  source: [
    'src/border.json',
    'src/colors.json',
    'src/semantic.json',
    'src/shadow.json',
    'src/spacing.json',
    'src/transition.json',
    'src/typography.json',
    'src/z-index.json',
  ],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'build/css/',
      options: {
        outputReferences: true,
      },
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
        },
      ],
      actions: ['copy-fonts'],
    },
    dart: {
      transformGroup: 'flutter',
      buildPath: 'build/dart/',
      files: [
        {
          destination: 'tokens.dart',
          format: 'flutter/class.dart',
        },
      ],
    },
  },
};
