import { PostData } from './feed.types';

/**
 * 공통 유저 응답 (GET /user 등)
 */
export interface UserResponseDto {
  userId: number;
  name: string;
  grade: number;
  phoneNumber: string;
  birth: string | null; // Nullable
}

/**
 * 회원가입 요청 (POST /user)
 */
export interface UserCreateRequestDto {
  username: string;
  password: string;
  name: string;
  grade: number;
  phoneNumber: string;
  birth?: string;
}

/**
 * 회원 정보 수정 요청 (PUT /user)
 */
export interface UserUpdateRequestDto {
  name?: string;
  grade?: number;
  phoneNumber?: string;
  birth?: string;
}

/**
 * 특정 사용자 게시물 리스트 응답 (GET /users/:nickname/posts)
 */
export type UserPostListResponseDto = PostData[];
