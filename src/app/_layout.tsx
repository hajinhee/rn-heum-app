import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack, usePathname, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'global.css';
import { useEffect, useRef, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
export { ErrorBoundary } from 'expo-router';

import { AlertModal } from '@/components';
import BottomSheetModal from '@/components/common/BottomSheet';
import { Toast } from '@/components/common/Toast';
import { useAppStore, useAuthStore } from '@/store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false, staleTime: 30_000 },
  },
});

// 스플래시 자동 숨김 방지(초기 비동기 작업 완료 시점까지 유지)
SplashScreen.preventAutoHideAsync();

const SCREENS: { name: string; options: any }[] = [
  { name: '(onboarding)', options: { headerShown: false } },
  { name: '(auth)', options: { headerShown: false } },
  { name: '(tabs)', options: { headerShown: false } },
  { name: '(main)', options: { headerShown: false } },
  { name: '(modal)', options: { presentation: 'modal', headerShown: false } },
];

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  const storesHydrated = useStoresHydrated();

  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  useEffect(() => {
    if (fontsLoaded && storesHydrated) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, storesHydrated]);

  if (!fontsLoaded || !storesHydrated) return null;

  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <PaperProvider>
          <RootLayoutNav />
        </PaperProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

function useStoresHydrated(): boolean {
  const [ready, setReady] = useState(
    (useAuthStore.persist?.hasHydrated?.() ?? false) &&
      (useAppStore.persist?.hasHydrated?.() ?? false),
  );

  useEffect(() => {
    const authDone = useAuthStore.persist?.hasHydrated?.();
    const appDone = useAppStore.persist?.hasHydrated?.();
    if (authDone && appDone) {
      setReady(true);
      return;
    }
    const unsubAuth = useAuthStore.persist?.onFinishHydration?.(() => {
      if (useAppStore.persist?.hasHydrated?.()) setReady(true);
    });
    const unsubApp = useAppStore.persist?.onFinishHydration?.(() => {
      if (useAuthStore.persist?.hasHydrated?.()) setReady(true);
    });
    return () => {
      unsubAuth?.();
      unsubApp?.();
    };
  }, []);

  return ready;
}

function RootLayoutNav() {
  const router = useRouter();
  const pathname = usePathname();

  const accessToken = useAuthStore((s) => s.accessToken);
  const isAuthenticated = !!accessToken;
  const { onboardingCompleted, setOnboardingCompleted } = useAppStore();

  const isDev = __DEV__;
  const needsOnboarding = isDev ? true : !onboardingCompleted;

  // 개발 모드에서는 무조건 온보딩 완료 처리
  useEffect(() => {
    if (!isDev && isAuthenticated && !onboardingCompleted) {
      setOnboardingCompleted();
    }
  }, [isDev, isAuthenticated, onboardingCompleted, setOnboardingCompleted]);

  const target = needsOnboarding ? '/(onboarding)' : isAuthenticated ? '/(tabs)' : '/(auth)';

  const prevTargetRef = useRef<string | null>(null);

  useEffect(() => {
    if (prevTargetRef.current === target) return;
    if (!pathname?.startsWith(target)) {
      router.replace(target);
    }
    prevTargetRef.current = target;
  }, [pathname, target, router]);

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        {SCREENS.map((s) => (
          <Stack.Screen key={s.name} name={s.name} options={s.options} />
        ))}
      </Stack>
      <AlertModal />
      <BottomSheetModal />
      <Toast />
    </ThemeProvider>
  );
}
