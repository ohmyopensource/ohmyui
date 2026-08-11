import { copyFileSync, mkdirSync } from 'fs';
import { join } from 'path';

export default {
  source: ['src/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'build/css/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
        },
      ],
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
  hooks: {
    'build:end': () => {
      const outDir = 'build/css/fonts';
      mkdirSync(outDir, { recursive: true });

      const files = [
        'Outfit-VariableFont_wght.woff2',
        'Outfit-VariableFont_wght.ttf',
        'Quicksand-VariableFont_wght.woff2',
        'Quicksand-VariableFont_wght.ttf',
        'fonts.css',
      ];

      for (const f of files) {
        copyFileSync(join('src/fonts', f), join(outDir, f));
      }

      console.log('✓ fonts copied to build/css/fonts/');
    },
  },
};
