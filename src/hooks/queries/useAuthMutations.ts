import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postLogin, postLogout } from '@/api/endpoints/auth';
import { useAuthStore } from '@/store/authStore';

/**
 * 로그인 뮤테이션
 */
export const useLoginMutation = () => {
  // Zustand 스토어에서 토큰 설정 함수 가져오기
  const { setTokens } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      setTokens(data.accessToken, data.refreshToken);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
      // TODO: 로그인 실패 토스트 메시지 표시
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
