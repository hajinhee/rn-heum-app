import { apiClient } from '@/api';
import type {
  AuthLoginRequestDto,
  AuthLoginResponseDto,
  AuthLogoutRequestDto,
} from '@/api/types/auth.types';
import type { CommonResponseDto } from '@/api/types/common.types';

/**
 * 로그인 (POST /auth/login)
 */
export const postLogin = async (data: AuthLoginRequestDto) => {
  const response = await apiClient.post<AuthLoginResponseDto>('/auth/login', data);
  console.log('💕 response.data', response.data);
  return response.data;
};

/**
 * 로그아웃 (POST /auth/logout)
 */
export const postLogout = async (data: AuthLogoutRequestDto) => {
  const response = await apiClient.post<CommonResponseDto>('/auth/logout', data);
  return response.data;
};
