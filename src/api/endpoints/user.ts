import { apiClient } from '@/api';
import { CommonResponseDto } from '@/api/types/common.types';
import type {
  UserPostListResponseDto,
  UserResponseDto,
  UserUpdateRequestDto,
} from '@/api/types/user.types';

/**
 * 내 정보 조회 (GET /users/me)
 */
export const getUserInfo = async () => {
  const response = await apiClient.get<UserResponseDto>('/users/me');
  return response.data;
};

/**
 * 내 정보 수정 (PUT /users/me)
 */
export const putUpdateUser = async (data: UserUpdateRequestDto) => {
  const response = await apiClient.put<UserResponseDto>('/users/me', data);
  return response.data;
};

/**
 * 회원 탈퇴 (DELETE /users/me)
 */
export const deleteUser = async () => {
  const response = await apiClient.delete<CommonResponseDto>('/users/me');
  return response.data;
};

/**
 * 특정 사용자 게시물 리스트 조회 (GET /users/:nickname/posts)
 */
export const getUserPostList = async (nickname: string) => {
  const response = await apiClient.get<UserPostListResponseDto>(`/users/${nickname}/posts`);
  return response.data;
};
