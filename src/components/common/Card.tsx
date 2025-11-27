import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
};

/**
 * 앱 전역에서 사용되는 기본 카드 래퍼 컴포넌트입니다.
 * 그림자, 둥근 모서리, 흰색 배경을 제공합니다.
 */
export function Card({ children, className, style }: CardProps) {
  return (
    <View
      className={`w-full bg-white rounded-2xl mb-4 p-4 ${className}`}
      style={[styles.card, style]}
    >
      {children}
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.1,
    // shadowRadius: 3,
    elevation: 3,
    borderWidth: 2,
    borderColor: '#F3F3F3',
  },
});
