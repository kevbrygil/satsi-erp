module.exports = function (api) {
  api.cache(true);

  const removeConsole = process.env.NODE_ENV === 'production'

  return {
    presets: [],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './',
            '@src': './src',
            '@assets': './src/assets',
            '@components': './src/components',
            '@contexts': './src/contexts',
            '@hooks': './src/hooks',
            '@utils': './src/utils',
          },
        },
      ],
      'react-native-reanimated/plugin',
      ...(removeConsole ? ['transform-remove-console'] : []),
    ],
  };
};
