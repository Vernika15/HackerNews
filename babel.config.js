module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-transform-private-methods', { loose: true }],
    [
      'module-resolver',
      {
        root: ['./src/'],
        alias: {
          '@screens': './src/screens',
          '@navigators': './src/navigators',
          '@store': './src/store',
          '@store/*': './src/store/*',
          '@api': './src/api',
          '@hooks': './src/hooks',
          '@components': './src/components',
          '@theme': './src/theme',
          '@utils': './src/utils',
          '@constants': './src/constants',
          '@assets': './src/assets',
        },
        extensions: ['.js', '.jsx', '.tsx', '.ios.js', '.android.js'],
      },
    ],
  ],
};
