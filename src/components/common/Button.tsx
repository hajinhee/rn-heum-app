import React from 'react';
import { Pressable, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';

export type AppButtonVariant = 'filled' | 'outline' | 'gray';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: AppButtonVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

/**
 * 공통 버튼 컴포넌트(Button)
 *
 * - Filled / Outline / Gray 스타일을 선택적으로 사용할 수 있음
 * - 팔로우 버튼, 로그인 버튼 등 다양한 화면에서 재사용 가능
 * - 기본적으로 width: '100%' + 둥근 모양(button radius 14)
 * - 외부에서 style, textStyle 로 자유롭게 스타일 오버라이드 가능
 *
 * 사용 예시:
 * <Button title="팔로우" variant="outline" onPress={handleFollow} />
 * <Button title="로그인" variant="filled" onPress={handleLogin} />
 * <Button title="팔로잉" variant="gray" onPress={handleUnfollow} />
 */
export function Button({ title, onPress, variant = 'filled', style, textStyle }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.base,
        variant === 'filled' && styles.filled,
        variant === 'outline' && styles.outline,
        variant === 'gray' && styles.gray,
        style,
      ]}
    >
      <Text
        style={[
          styles.baseText,
          variant === 'filled' && styles.filledText,
          variant === 'outline' && styles.outlineText,
          variant === 'gray' && styles.grayText,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  baseText: {
    fontSize: 16,
    fontWeight: '600',
  },

  /* Filled (파란 배경) */
  filled: {
    backgroundColor: '#4285EA',
  },
  filledText: {
    color: '#FFFFFF',
  },

  /* Outline */
  outline: {
    borderWidth: 1,
    borderColor: '#4285EA',
    backgroundColor: '#FFFFFF',
  },
  outlineText: {
    color: '#4285EA',
  },

  /* Gray */
  gray: {
    backgroundColor: '#E8E8E8',
  },
  grayText: {
    color: '#000000',
  },
});
