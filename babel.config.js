module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      // 1. expo 프리셋과 함께 nativewind 옵션 지정
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],

      // 2. NativeWind Babel 플러그인 추가 (presets 배열 안에 있어야 함)
      'nativewind/babel',
    ],
    plugins: [
      // ✅ 경로 alias 설정 (plugins에 유지합니다)
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './src',
            '@assets': './src/assets',
            '@components': './src/components',
            '@constants': './src/constants',
            '@features': './src/features',
            '@hooks': './src/hooks',
          },
        },
      ],

      'react-native-reanimated/plugin',
    ],
  };
};
