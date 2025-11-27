import { Text, StyleSheet, TextProps } from 'react-native';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label';

export type TypographyProps = TextProps & {
  children: React.ReactNode;
  variant?: TypographyVariant;
  className?: string;
  color?: string;
};

/**
 * 앱 전역의 텍스트 스타일을 일관되게 적용하는 컴포넌트
 * 추가 스타일은 className, style prop으로 오버라이드 가능
 *
 * - variant prop으로 제목(h1, h2, h3), 본문(body), 캡션(caption), 라벨(label) 스타일 선택 가능
 *
 * @example
 * // variant 기본 스타일
 * <Typography variant="h1">페이지 제목</Typography>
 *
 * // color prop으로 색상 지정
 * <Typography variant="h1" color="#FF0000">빨간색 제목</Typography>
 *
 * // NativeWind로 색상과 정렬을 오버라이드
 * <Typography variant="body" className="text-gray-600 text-center">
 * 본문 내용입니다.
 * </Typography>
 */
export function Typography({
  children,
  variant = 'body',
  className,
  style,
  color,
  ...props
}: TypographyProps) {
  const variantStyle = {
    h1: styles.h1,
    h2: styles.h2,
    h3: styles.h3,
    body: styles.body,
    caption: styles.caption,
    label: styles.label,
  }[variant];

  // 스타일 배열 순서 변경
  // [기본] -> [Variant] -> [color prop] -> [style prop]
  // 뒤에 오는 스타일이 앞의 스타일을 덮어씀
  const combinedStyle = [
    styles.base,
    variantStyle,
    color ? { color: color } : undefined, // 3. color prop 적용
    style,
  ];

  return (
    <Text
      className={className}
      style={combinedStyle} // 4. 병합된 스타일 적용
      {...props}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    color: '#0F172A', // 기본값 (text-slate-900)
  },
  h1: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  h3: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  caption: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#64748B', // caption의 기본값 (text-slate-500)
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
});
