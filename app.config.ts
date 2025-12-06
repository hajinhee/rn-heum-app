import 'dotenv/config';
import { ConfigContext, ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'heum-app',
  slug: 'heum-app',
  version: '1.0.0',
  orientation: 'portrait',
  icon: 'src/assets/images/heum-logo.png',
  scheme: 'heumapp',
  // userInterfaceStyle: 'light',
  // newArchEnabled: true,
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
    bundleIdentifier: 'com.heum.app',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: 'src/assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    package: 'com.heum.app',
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
    [
      'expo-build-properties',
      {
        android: {
          extraMavenRepos: ['https://devrepo.kakao.com/nexus/content/groups/public/'],
        },
        ios: {
          useFrameworks: 'static',
        },
      },
    ],
    [
      '@react-native-kakao/core',
      {
        nativeAppKey: process.env.KAKAO_NATIVE_APP_KEY,
        android: { authCodeHandlerActivity: true },
        ios: { handleKakaoOpenUrl: true },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    // kakao
    kakaoAppKey: process.env.KAKAO_NATIVE_APP_KEY,
    kakaoRestKey: process.env.KAKAO_REST_API_KEY,
    kakaoJsKey: process.env.KAKAO_JS_KEY,
    // naver
    naverClientKey: process.env.NAVER_CLIENT_ID,
    naverSecretKey: process.env.NAVER_CLIENT_SECRET,
    // server URL
    apiBaseUrl: process.env.SERVER_URL,
    eas: {
      projectId: 'd6754215-7c8e-4102-897c-61d1623db3eb',
    },
  },
});
