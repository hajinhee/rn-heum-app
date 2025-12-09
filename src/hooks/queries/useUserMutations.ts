import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { deleteUser, getUserInfo, getUserPostList, putUpdateUser } from '@/api/endpoints/user';
import { useAuthStore } from '@/store/authStore';

/**
 * 내 정보 조회 쿼리 (GET /users/me)
 */
export const useUserInfoQuery = () => {
  const isLoggedIn = !!useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ['user', 'info'],
    queryFn: getUserInfo,
    enabled: isLoggedIn, // 로그인 상태일 때만 API 호출
    staleTime: 1000 * 60 * 5, // 5분
  });
};

/**
 * 내 정보 수정 뮤테이션 (PUT /users/me)
 */
export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putUpdateUser,
    onSuccess: (updatedUser) => {
      // 1. 수정 성공 시
      // 2. 캐시된 'user' 'info' 데이터를 최신 데이터(updatedUser)로 즉시 업데이트
      queryClient.setQueryData(['user', 'info'], updatedUser);

      // 3. (선택) 서버와 100% 동기화하려면 setQueryData 대신 invalidate
      // queryClient.invalidateQueries({ queryKey: ['user', 'info'] });
    },
  });
};

/**
 * 회원 탈퇴 뮤테이션 (DELETE /user/me)
 */
export const useDeleteUserMutation = () => {
  const { logout } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      logout();
      queryClient.clear();
    },
  });
};

/**
 * 특정 사용자 게시물 리스트 조회 쿼리 (GET /users/:nickname/posts)
 */
export const useUserPostsQuery = (nickname: string) => {
  return useQuery({
    queryKey: ['user', nickname, 'posts'],
    queryFn: () => getUserPostList(nickname),
    enabled: !!nickname,
    staleTime: 1000 * 60,
  });
};
