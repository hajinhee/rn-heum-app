/**
 * 로그인 요청 (POST /auth/login)
 */
export interface AuthLoginRequestDto {
  provider: 'NAVER' | 'KAKAO' | 'GOOGLE';
  socialToken: string;
}

/**
 * 로그인 응답 (POST /auth/login)
 */
export interface AuthLoginResponseDto {
  accessToken: string;
  refreshToken: string;
}

/**
 * 로그아웃 요청 (POST /auth/logout)
 */
export interface AuthLogoutRequestDto {
  fcmToken?: string; // 임시(esLint 에러 방지용)
}
