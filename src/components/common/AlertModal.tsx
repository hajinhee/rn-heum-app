import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { useAlertStore } from '@/store/commonStore';

export function AlertModal() {
  const { isOpen, type, title, message, confirmText, cancelText, onConfirm, onCancel, close } =
    useAlertStore();

  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.spring(scale, { toValue: 1, friction: 6, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 0, duration: 180, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 0.9, duration: 180, useNativeDriver: true }),
      ]).start();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const iconName = type === 'warning' ? 'alert' : 'checkmark';
  const color = type === 'warning' ? '#EE685A' : '#4285EA';
  const showCancel = type !== 'success' && !!cancelText;

  return (
    <Animated.View style={[styles.overlay, { opacity }]}>
      <Animated.View style={[styles.modalBox, { transform: [{ scale }] }]}>
        <View style={[styles.iconCircle]}>
          <Ionicons name={iconName as any} size={24} color={color} />
        </View>

        {title ? <Text style={styles.title}>{title}</Text> : null}
        {message ? <Text style={styles.message}>{message}</Text> : null}

        <View style={[styles.buttonRow, !showCancel && { justifyContent: 'center' }]}>
          {showCancel && (
            <Pressable
              style={[styles.button, styles.cancel]}
              onPress={() => {
                onCancel?.();
                close();
              }}
            >
              <Text style={styles.cancelText}>{cancelText}</Text>
            </Pressable>
          )}

          <Pressable
            style={[styles.button, { backgroundColor: color }, !showCancel && { width: '65%' }]}
            onPress={() => {
              onConfirm?.();
              close();
            }}
          >
            <Text style={styles.confirmText}>{confirmText}</Text>
          </Pressable>
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  modalBox: {
    width: '82%',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#F3F3F3',
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
    color: '#111',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    color: '#666',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 26,
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
  },
  button: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancel: {
    backgroundColor: '#F3F3F3',
    marginRight: 8,
  },
  cancelText: {
    color: '#333',
    fontWeight: '500',
    fontSize: 15,
  },
  confirmText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});
