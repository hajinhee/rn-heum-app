import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AuthScreen() {
  const router = useRouter();

  const handleLogin = (type: string) => {
    console.log(`${type} 로그인`);
    router.replace('/(tabs)');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoSection}>
        <Image
          source={require('@/assets/images/heum-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>환영합니다!</Text>
        <Text style={styles.subtitle}>
          3초 만에 가입하고,{'\n'}나만의 훈련 기록을 지금 바로 시작하세요.
        </Text>
      </View>

      <View style={styles.buttonGroup}>
        {/* Naver */}
        <TouchableOpacity style={styles.button} onPress={() => handleLogin('Naver')}>
          <MaterialCommunityIcons name="alpha-n-box" size={20} color="#000" />
          <Text style={styles.buttonText}>네이버로 시작하기</Text>
        </TouchableOpacity>

        {/* Kakao */}
        <TouchableOpacity style={styles.button} onPress={() => handleLogin('Kakao')}>
          <MaterialCommunityIcons name="message-text" size={20} color="#000" />
          <Text style={styles.buttonText}>카카오로 시작하기</Text>
        </TouchableOpacity>

        {/* Google */}
        <TouchableOpacity style={styles.button} onPress={() => handleLogin('Google')}>
          <MaterialCommunityIcons name="google" size={20} color="#000" />
          <Text style={styles.buttonText}>구글로 시작하기</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
    backgroundColor: '#fff',
  },
  logoSection: {
    alignItems: 'flex-start',
    marginBottom: 80,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
  },
  buttonGroup: {
    width: '100%',
    gap: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
});
