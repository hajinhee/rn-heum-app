import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AppState {
  onboardingCompleted: boolean;
  setOnboardingCompleted: () => void;
}

/**
 * 앱 전역 설정을 관리하는 Zustand 스토어 훅
 * - 스토리지 키: `app-storage`
 *
 * 상태:
 * - `onboardingCompleted` \- 온보딩 완료 여부.
 *
 * 액션:
 * - `setOnboardingCompleted()` \- 온보딩을 완료로 표시.
 *
 * 사용 예:
 * ```ts
 * const { onboardingCompleted, setOnboardingCompleted } = useAppStore();
 * if (!onboardingCompleted) setOnboardingCompleted();
 */
export const useAppStore = create(
  persist<AppState>(
    (set) => ({
      onboardingCompleted: false, // 앱소개 온보딩 상태(최소 설치 시 로그인 성공 후 온보딩 안보이게)
      setOnboardingCompleted: () => set({ onboardingCompleted: true }),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
