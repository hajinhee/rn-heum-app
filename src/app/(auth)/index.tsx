import { useLoginMutation } from '@/hooks/queries/useAuthMutations';
import * as KakaoLogin from '@react-native-seoul/kakao-login';

import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function AuthScreen() {
  const loginMutation = useLoginMutation();

  const handleLogin = async (provider: string) => {
    console.log(`${provider} 로그인`);

    if (provider === 'KAKAO') {
      try {
        const result = await KakaoLogin.login();
        const accessToken = result.accessToken;

        loginMutation.mutate({
          provider: 'KAKAO',
          socialToken: accessToken,
        });
      } catch (e) {
        console.error('카카오 로그인 실패:', e);
      }
    }
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
        <Pressable
          style={[styles.snsButton, { backgroundColor: '#03C75A' }]}
          onPress={() => handleLogin('NAVER')}
        >
          <Image source={require('@/assets/images/naver_logo.png')} style={styles.snsIcon} />
          <Text style={[styles.snsText, { color: '#fff' }]}>네이버로 시작하기</Text>
        </Pressable>

        {/* Kakao */}
        <Pressable
          style={[styles.snsButton, { backgroundColor: '#FEE500' }]}
          onPress={() => handleLogin('KAKAO')}
        >
          <Image source={require('@/assets/images/kakao_logo.png')} style={styles.snsIcon} />
          <Text style={[styles.snsText, { color: '#000' }]}>카카오로 시작하기</Text>
        </Pressable>

        {/* Google */}
        <Pressable
          style={[
            styles.snsButton,
            { backgroundColor: '#fff', borderWidth: 1, borderColor: '#DADCE0' },
          ]}
          onPress={() => handleLogin('GOOGLE')}
        >
          <Image source={require('@/assets/images/google_logo.png')} style={styles.snsIcon} />
          <Text style={[styles.snsText, { color: '#3C4043' }]}>구글로 시작하기</Text>
        </Pressable>
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
  snsButton: {
    width: '100%',
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  snsIcon: {
    position: 'absolute',
    width: 20,
    height: 20,
    left: 14,
  },
  snsText: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
  },
});
