import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
}

interface AuthActions {
  setTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

const secureStorage = {
  getItem: async (key: string) => SecureStore.getItemAsync(key),
  setItem: async (key: string, value: string) => SecureStore.setItemAsync(key, value),
  removeItem: async (key: string) => SecureStore.deleteItemAsync(key),
};

/**
 * 인증 토큰을 관리하는 Zustand 스토어 훅
 *
 * 지속성:
 * - 스토리지: `expo-secure-store`(JSON)
 * - 키: `auth-secure`
 * - `partialize`로 `refreshToken`만 영속화( `accessToken`은 메모리 전용 )
 *
 * 상태:
 * - `accessToken`: 액세스 토큰(메모리)
 * - `refreshToken`: 리프레시 토큰(보안 저장)
 *
 * 액션:
 * - `setTokens(accessToken, refreshToken)`: 토큰 저장
 * - `logout()`: 토큰 초기화
 *
 * 보안 참고:
 * - 민감 정보는 `SecureStore`에만 저장하며 `AsyncStorage`는 사용하지 않음.
 */
export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      accessToken: null, // 메모리 전용
      refreshToken: null, // 보안 저장
      setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
      logout: () => set({ accessToken: null, refreshToken: null }),
    }),
    {
      name: 'auth-secure',
      storage: createJSONStorage(() => secureStorage),
      // refreshToken만 저장하여 노출 최소화
      partialize: (state) => ({ refreshToken: state.refreshToken }),
    },
  ),
);
