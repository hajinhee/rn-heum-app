import { PostData } from './feed.types';

/**
 * 공통 유저 응답 (GET /user, GET /user/me 등)
 */
export interface UserResponseDto {
  id: number;
  email: string;
  profile: {
    id: number;
    nickname: string;
    profileImageUrl: string;
    bio: string;
  };
}

/**
 * 내 정보 수정 요청 (PUT /user/me)
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
