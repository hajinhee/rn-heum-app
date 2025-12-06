import { useAuthStore } from '@/store/authStore';
import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import Constants from 'expo-constants';
import snakecaseKeys from 'snakecase-keys';

export const apiClient = axios.create({
  baseURL: Constants.expoConfig.extra.apiBaseUrl || 'https://api.example.com',
  timeout: 10000,
});

// 단일 refresh 진행 상태 공유
let refreshInFlight: Promise<string | null> | null = null;

const REFRESH_URL = `${Constants.expoConfig?.extra?.apiBaseUrl || 'https://api.example.com'}/auth/refresh`;

const runRefresh = async (): Promise<string | null> => {
  const { refreshToken, setTokens, logout } = useAuthStore.getState();
  if (!refreshToken) {
    logout();
    return null;
  }
  try {
    // 인터셉터 비적용용 생 axios 사용
    const res = await axios.post(REFRESH_URL, snakecaseKeys({ refreshToken }, { deep: true }), {
      timeout: 10000,
    });

    const data = camelcaseKeys(res.data, { deep: true });
    const newAccess = data.accessToken;
    const newRefresh = data.refreshToken ?? refreshToken;
    setTokens(newAccess, newRefresh);
    return newAccess;
  } catch {
    useAuthStore.getState().logout();
    return null;
  }
};

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    // Zustand 스토어에서 accessToken 가져오기 (훅이 아닌 .getState() 사용)
    const accessToken = useAuthStore.getState().accessToken;

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    if (config.data) {
      config.data = snakecaseKeys(config.data, { deep: true });
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터 - 토큰 재발급 로직
apiClient.interceptors.response.use(
  (response) => {
    response.data = camelcaseKeys(response.data, { deep: true });
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest) return Promise.reject(error);

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!refreshInFlight) {
        refreshInFlight = runRefresh().finally(() => {
          refreshInFlight = null;
        });
      }
      const newAccess = await refreshInFlight;
      if (newAccess) {
        if (!originalRequest.headers) originalRequest.headers = {};
        (originalRequest.headers as any).Authorization = `Bearer ${newAccess}`;
        return apiClient(originalRequest);
      }
    }

    return Promise.reject(error);
  },
);
