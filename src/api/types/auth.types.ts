/**
 * 로그인 요청 (POST /auth/login)
 */
export interface AuthLoginRequestDto {
  username: string;
  password: string;
  // TODO: 소셜 로그인이라면 provider, token 필드 추가 필요?
  // provider: 'KAKAO' | 'GOOGLE';
  // socialToken: string;
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
