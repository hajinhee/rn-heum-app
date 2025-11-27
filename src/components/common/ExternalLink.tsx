import * as Linking from 'expo-linking';
import { StyleSheet } from 'react-native';

import { useAlertStore } from '@/store/commonStore';
import { Typography, type TypographyProps } from './Typography';

type ExternalLinkProps = Omit<TypographyProps, 'onPress'> & {
  /** 열고자 하는 외부 URL (e.g., "https://google.com") */
  href: string;
  /** 링크로 표시될 텍스트 */
  children: string;
  /** 밑줄 표시 여부 (기본값: false) */
  underline?: boolean;
};

/**
 * 외부 브라우저(또는 앱)로 URL을 여는 텍스트 링크 컴포넌트
 * <Typography> 컴포넌트를 기반으로 하며 모든 Typography props(variant, color 등)를 지원
 *
 * - href prop에 URL을 전달
 * - 기본적으로 파란색 밑줄 스타일이 적용되며, color, className prop으로 오버라이드 가능
 *
 * @example
 * // 기본 body 스타일 링크
 * <ExternalLink href="https://google.com">
 * Google.com
 * </ExternalLink>
 *
 * // h2 variant, 다른 색상 지정
 * <ExternalLink href="https://expo.dev" variant="h2" color="purple">
 * Expo
 * </ExternalLink>
 *
 * // NativeWind로 스타일 오버라이드
 * <ExternalLink href="https://react-query.tanstack.com" className="text-green-600 no-underline">
 * React Query (스타일 덮어쓰기)
 * </ExternalLink>
 */
export function ExternalLink({
  children,
  href,
  variant = 'body',
  className,
  style,
  color = '#000000',
  underline = false,
  ...props // numberOfLines 등 Typography의 나머지 props
}: ExternalLinkProps) {
  const { open: alert } = useAlertStore();

  const handlePress = async () => {
    try {
      // 이 URL을 열 수 있는지 확인
      const supported = await Linking.canOpenURL(href);

      if (supported) {
        // 외부 브라우저(또는 앱)로 URL 열기
        await Linking.openURL(href);
      } else {
        alert({
          type: 'warning',
          title: '링크 오류',
          message: `이 링크를 열 수 없습니다: ${href}`,
        });
      }
    } catch (error) {
      console.error('Failed to open URL:', error);
      alert({
        type: 'warning',
        title: '링크 오류',
        message: `링크를 여는 데 실패했습니다.`,
      });
    }
  };

  return (
    <Typography
      variant={variant}
      className={className}
      style={[styles.base, !underline && styles.noUnderline, style]}
      color={color}
      onPress={handlePress}
      accessibilityRole="link" // 웹 접근성
      {...props}
    >
      {children}
    </Typography>
  );
}

const styles = StyleSheet.create({
  base: {
    textDecorationLine: 'underline',
  },
  noUnderline: {
    textDecorationLine: 'none',
  },
});
