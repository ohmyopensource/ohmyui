export default {
  source: ['src/semantic-dark.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'build/css/',
      files: [
        {
          destination: 'theme-dark.css',
          format: 'css/variables',
          options: {
            selector: '.dark-theme',
          },
        },
      ],
    },
  },
};
