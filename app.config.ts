import { ConfigContext, ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'heum-app',
  slug: 'heum-app',
  version: '1.0.0',
  orientation: 'portrait',
  icon: 'src/assets/images/heum-logo.png',
  scheme: 'heumapp',
  userInterfaceStyle: 'light',
  newArchEnabled: true,
  splash: {
    image: 'src/assets/images/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
    show: false,
    imageStyle: {
      resizeMode: 'contain',
    },
  },
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: 'src/assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: 'src/assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    [
      'expo-location',
      {
        locationAlwaysAndWhenInUsePermission: 'Allow $(PRODUCT_NAME) to use your location.',
      },
    ],
    [
      'expo-image-picker',
      {
        photosPermission: 'The app accesses your photos to let you share them with your friends.',
        cameraPermission: 'The app accesses your camera to let you share them with your friends.',
      },
    ],
    [
      'expo-media-library',
      {
        photosPermission: 'Allow $(PRODUCT_NAME) to access your photos.',
        savePhotosPermission: 'Allow $(PRODUCT_NAME) to save photos.',
        isAccessMediaLocationEnabled: true,
        granularPermissions: ['audio', 'photo'],
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    kakaoAppKey: process.env.KAKAO_API_KEY,
    kakaoRestKey: process.env.KAKAO_REST_API_KEY,
    kakaoJsKey: process.env.KAKAO_JS_KEY,
    apiBaseUrl: process.env.SERVER_URL,
    eas: {},
  },
});
