import { useLoginMutation } from '@/hooks/queries/useAuthMutations';
import * as KakaoLogin from '@react-native-seoul/kakao-login';
import NaverLogin from '@react-native-seoul/naver-login';
import * as Google from 'expo-auth-session/providers/google';
import Constants from 'expo-constants';
import { useEffect } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function AuthScreen() {
  const loginMutation = useLoginMutation();

  /** 네이버 로그인 */
  const handleNaverLogin = async () => {
    const initialOptions = {
      consumerKey: Constants.expoConfig.extra.naverClientKey,
      consumerSecret: Constants.expoConfig.extra.naverSecretKey,
      appName: 'heum-app',
      serviceUrlScheme: 'heumapp', // Android
      serviceUrlSchemeIOS: 'heumapp', // iOS
    };

    try {
      const init = await NaverLogin.initialize(initialOptions);
      const result = await NaverLogin.login();

      if (result.isSuccess) {
        const accessToken = result.successResponse.accessToken;

        loginMutation.mutate({
          provider: 'NAVER',
          socialToken: accessToken,
        });
      } else {
        console.log('네이버 로그인 실패:', result.failureResponse);
      }
    } catch (e) {
      console.error('네이버 로그인 에러:', e);
    }
  };

  /** 카카오 로그인 */
  const handleKakaoLogin = async () => {
    try {
      const result = await KakaoLogin.login();
      const accessToken = result.accessToken;

      loginMutation.mutate({
        provider: 'KAKAO',
        socialToken: accessToken,
      });
    } catch (e) {
      console.error('KAKAO 로그인 실패:', e);
    }
  };
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: Constants.expoConfig.extra.googleIosKey,
    androidClientId: Constants.expoConfig.extra.googleAndroidKey,
    webClientId: Constants.expoConfig.extra.googleWebKey,
  });

  // response 객체가 변경될 때마다 실행되는 useEffect 훅
  // Google 인증이 성공적으로 완료되었을 때 accessToken을 추출하고 백엔드에 전송합니다.
  useEffect(() => {
    if (response?.type === 'success') {
      const accessToken = response.authentication.accessToken;

      console.log('Google Access Token:', accessToken);

      // 획득한 accessToken을 백엔드로 보내 소셜 로그인을 완료합니다.
      loginMutation.mutate({
        provider: 'GOOGLE',
        socialToken: accessToken,
      });

      // 필요한 경우 사용자 정보를 추가로 가져올 수 있습니다.
      // fetchUserInfo(accessToken);
    } else if (response?.type === 'cancel') {
      console.log('Google 로그인 취소됨.');
    } else if (response?.type === 'error') {
      console.error('Google 로그인 오류:', response.error);
    }
  }, [response]); // response 객체가 업데이트될 때마다 실행

  // ---

  /** 구글 로그인 (수정됨) */
  const handleGoogleLogin = async () => {
    try {
      // ⭐️ promptAsync 함수를 호출하여 인증 플로우를 시작합니다. ⭐️
      // request 객체가 준비되었을 때만 호출해야 합니다.
      if (request) {
        await promptAsync();
      } else {
        console.warn('Google 로그인 요청이 아직 준비되지 않았습니다.');
      }
    } catch (e) {
      console.error('GOOGLE 로그인 에러:', e);
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
          onPress={handleNaverLogin}
        >
          <Image source={require('@/assets/images/naver_logo.png')} style={styles.snsIcon} />
          <Text style={[styles.snsText, { color: '#fff' }]}>네이버로 시작하기</Text>
        </Pressable>

        {/* Kakao */}
        <Pressable
          style={[styles.snsButton, { backgroundColor: '#FEE500' }]}
          onPress={handleKakaoLogin}
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
          onPress={handleGoogleLogin}
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
