import { apiClient } from '@/api';
import { CommonResponseDto } from '@/api/types/common.types';
import type {
  UserCreateRequestDto,
  UserPostListResponseDto,
  UserResponseDto,
  UserUpdateRequestDto,
} from '@/api/types/user.types';

/**
 * 회원가입 (POST /user)
 */
export const postSignup = async (data: UserCreateRequestDto) => {
  const response = await apiClient.post<UserResponseDto>('/user', data);
  return response.data;
};

/**
 * 회원 정보 조회 (GET /user)
 */
export const getUserInfo = async () => {
  const response = await apiClient.get<UserResponseDto>('/user');
  return response.data;
};

/**
 * 회원 정보 수정 (PUT /user)
 */
export const putUpdateUser = async (data: UserUpdateRequestDto) => {
  const response = await apiClient.put<UserResponseDto>('/user', data);
  return response.data;
};

/**
 * 회원 탈퇴 (DELETE /user)
 */
export const deleteUser = async () => {
  const response = await apiClient.delete<CommonResponseDto>('/user');
  return response.data;
};

/**
 * 특정 사용자 게시물 리스트 조회 (GET /users/:nickname/posts)
 */
export const getUserPostList = async (nickname: string) => {
  const response = await apiClient.get<UserPostListResponseDto>(`/users/${nickname}/posts`);
  return response.data;
};
