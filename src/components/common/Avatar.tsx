import { Image, Text, View } from 'react-native';

/**
 * @file Avatar.tsx
 * @description
 * - 이미지를 표시하거나 fallbackText의 첫 글자를 표시
 * - size prop으로 다양한 크기 대응
 */

type AvatarProps = {
  /** 이미지 경로 (require 또는 { uri }) */
  src?: any;
  /** fallback 텍스트 (예: 이름) */
  fallbackText?: string;
  /** 크기 (sm, md, lg) */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** 추가 클래스네임 */
  className?: string;
};

export function Avatar({ src, fallbackText = '', size = 'md', className = '' }: AvatarProps) {
  const sizeMap = {
    sm: 32,
    md: 48,
    lg: 64,
    xl: 76,
  };

  const avatarSize = sizeMap[size];
  const initials = fallbackText?.[0] || '?';

  return (
    <View
      className={`items-center justify-center overflow-hidden rounded-full bg-gray-200 ${className}`}
      style={{
        width: avatarSize,
        height: avatarSize,
      }}
    >
      {src ? (
        <Image
          source={typeof src === 'string' ? { uri: src } : src}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: avatarSize / 2,
          }}
          resizeMode="cover"
        />
      ) : (
        <Text
          className="text-gray-500 font-semibold"
          style={{
            fontSize: avatarSize / 2.5,
          }}
        >
          {initials}
        </Text>
      )}
    </View>
  );
}
