import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'global.css';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
export { ErrorBoundary } from 'expo-router';

import { AlertModal } from '@/components/common/AlertModal';
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

  const accessToken = useAuthStore.getState().accessToken;
  const isAuthenticated = !!accessToken;
  const onboardingCompleted = useAppStore.getState().onboardingCompleted;

  const target = !onboardingCompleted ? '(onboarding)' : isAuthenticated ? '(tabs)' : '(auth)';

  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <PaperProvider>
          <RootLayoutNav initialRouteName={target} />
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

function RootLayoutNav({ initialRouteName }: { initialRouteName: string }) {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack initialRouteName={initialRouteName}>
        <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
        <Stack.Screen name="(modal)" options={{ presentation: 'modal', headerShown: false }} />
      </Stack>

      <AlertModal />
      <BottomSheetModal />
      <Toast />
    </ThemeProvider>
  );
}
