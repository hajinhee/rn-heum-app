import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postLogin, postLogout } from '@/api/endpoints/auth';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'expo-router';

/**
 * 로그인 뮤테이션
 */
export const useLoginMutation = () => {
  const { setTokens } = useAuthStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      console.log('❤️ data', data);
      setTokens(data.accessToken, data.refreshToken);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      router.replace('/(tabs)'); // 성공하면 이동
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
    },
  });
};

/**
 * 로그아웃 뮤테이션
 */
export const useLogoutMutation = () => {
  const { logout } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      logout();
      queryClient.clear();
    },
    onError: (error) => {
      // API 호출이 실패하더라도, 강제로 로그아웃 처리
      console.error('로그아웃 API 실패:', error);
      logout();
      queryClient.clear();
    },
  });
};
