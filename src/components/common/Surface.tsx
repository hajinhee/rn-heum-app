import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

type SurfaceVariant = 'elevated' | 'outlined' | 'filled';

type SurfaceProps = {
  children: React.ReactNode;
  variant?: SurfaceVariant;
  className?: string;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
};

/**
 * 앱 전역에서 사용되는 UI 표면을 나타내는 컴포넌트
 * Card, Paper 등의 역할을 하며, 컨텐츠를 감싸고 시각적 계층을 제공
 *
 * - variant prop을 통해 'elevated'(그림자), 'outlined'(테두리), 'filled'(기본) 스타일을 선택할 수 있음
 * - 레이아웃 관련 스타일(너비, 여백, 패딩 등)은 className이나 style prop으로 외부에서 지정해야함
 *
 * @example
 * // 그림자가 있는 표면
 * <Surface variant="elevated" className="p-4">
 *   <Text>Elevated Surface</Text>
 * </Surface>
 *
 * // 테두리가 있는 표면
 * <Surface variant="outlined" className="p-4">
 *   <Text>Outlined Surface</Text>
 * </Surface>
 */
export function Surface({
  children,
  variant = 'filled',
  className,
  style,
  backgroundColor = '#FFFFFF',
}: SurfaceProps) {
  const variantStyle = {
    elevated: styles.elevated,
    outlined: styles.outlined,
    filled: undefined,
  }[variant];

  return (
    <View
      className={`${className ?? ''}  rounded-2xl  `}
      style={[{ backgroundColor }, styles.base, variantStyle, style]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 16,
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  outlined: {
    borderWidth: 1,
    borderColor: '#E5E7EB', // gray-200
  },
});
