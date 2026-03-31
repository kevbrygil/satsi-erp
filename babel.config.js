export default function (api) {
  api.cache(true);

  const removeConsole = process.env.NODE_ENV === 'production';

  return {
    presets: [
      ['@babel/preset-env', { targets: 'defaults' }],
      ['@babel/preset-react', { runtime: 'automatic' }],
    ],
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
            '@interfaces': './src/interfaces',
            '@contexts': './src/contexts',
            '@hooks': './src/hooks',
            '@utils': './src/utils',
          },
        },
      ],
      ...(removeConsole ? ['transform-remove-console'] : []),
    ],
  };
}
