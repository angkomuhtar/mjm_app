module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@components': './src/components',
          '@redux': './src/redux',
          '@commons': './src/commons',
          '@screens': './src/screens',
          '@assets': './assets',
        },
      },
    ],
    ['module:react-native-dotenv'],
  ],
};
