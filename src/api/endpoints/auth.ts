import { apiClient } from '@/api';
import type { AuthLoginRequestDto, AuthLoginResponseDto } from '@/api/types/auth.types';

/**
 * 로그인 (POST /auth/login)
 */
export const postLogin = async (data: AuthLoginRequestDto) => {
  const response = await apiClient.post<AuthLoginResponseDto>('/auth/login', data);
  return response.data;
};
