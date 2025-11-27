import { ActionSheet, Header } from '@/components';
import { Profile } from '@/features/my/type';
import { useToastStore } from '@/store/commonStore';

import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { jinny } from 'index';

import { useEffect, useState } from 'react';
import { Pressable, Share } from 'react-native';

export default function UserLayout() {
  const router = useRouter();
  const { userId } = useLocalSearchParams<{ userId: string }>();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [showActionSheet, setShowActionSheet] = useState(false);

  const { show } = useToastStore();

  /** 사용자 프로필 정보 불러오기 */
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetch(`/users/${userId}`);
        const data = await res.json();
        setProfile(data.user);
      } catch (e) {
        console.warn('🔵 프로필 불러오기 오류:', e);
      }
    };

    fetchUserProfile();
  }, [userId]);

  /** 프로필 링크 공유 */
  const handleShare = async (nickname: string) => {
    const shareUrl = `heumapp://users/${nickname}`;
    try {
      await Share.share({
        message: shareUrl,
        url: shareUrl,
      });
    } catch (error) {
      console.error('Error sharing profile:', error);
    }
  };

  /** 특정 유저 헤더 오른쪽 버튼 */
  const renderRightItems = () => {
    if (!profile) return [];

    if (userId === jinny.id) {
      return [
        <Pressable key="settings" onPress={() => router.replace('/my')}>
          <Ionicons name="settings-outline" size={26} />
        </Pressable>,
      ];
    }

    return [
      <Pressable key="more" onPress={() => setShowActionSheet(true)}>
        <Ionicons name="ellipsis-horizontal" size={26} />
      </Pressable>,
    ];
  };

  return (
    <>
      <Stack>
        {/* 특정 유저 프로필 화면 */}
        <Stack.Screen
          name="index"
          options={{
            title: '',
            headerTransparent: true,
            headerShown: true,
            headerBackVisible: true,
            header: ({ navigation }) => (
              <Header
                title=""
                onBack={() => navigation.goBack()}
                rightItems={renderRightItems()}
                bgColor="transparent"
              />
            ),
          }}
        />

        {/* 특정 유저 게시글 화면 */}
        <Stack.Screen
          name="post"
          options={{
            title: '알림 설정',
            headerShown: true,
            header: ({ navigation, options }) => (
              <Header title={options.title} onBack={() => navigation.goBack()} />
            ),
          }}
        />
      </Stack>

      {/* 액션 시트 */}
      {profile && (
        <ActionSheet
          visible={showActionSheet}
          onClose={() => setShowActionSheet(false)}
          actions={[
            {
              label: '프로필 공유하기',
              onPress: () => {
                setShowActionSheet(false);
                setTimeout(() => handleShare(profile.nickname), 200);
              },
            },
            {
              label: `피드에서 ${profile.nickname} 숨기기`,
              onPress: () =>
                show({
                  message: `전체 게시물이 숨겨졌어요`,
                  undoText: '취소',
                  onUndo: () => console.log('숨김 취소됨'),
                }),
            },
          ]}
        />
      )}
    </>
  );
}
