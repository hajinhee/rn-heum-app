import { Button } from '@/components';
import { Profile } from '@/features/my/type';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function UserProfilePage() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { username, userId } = useLocalSearchParams<{ username: string; userId: string }>();

  const [profile, setProfile] = useState<Profile>(null);
  const [loading, setLoading] = useState(true);

  /** 사용자 프로필 정보 불러오기 */
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetch(`/users/${userId}`);
        const data = await res.json();
        setProfile(data.user);
      } catch {
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  /** 팔로우 신청/취소 */
  const handleToggleFollow = () => {
    if (profile.isFollowing) {
      console.log('언팔로우 요청');
      setProfile((prev) => ({ ...prev, isFollowing: false }));
    } else {
      console.log('팔로우 요청');
      setProfile((prev) => ({ ...prev, isFollowing: true }));
    }
  };
  if (loading || !profile) {
    return <View style={{ flex: 1, backgroundColor: '#fff' }} />;
  }

  return (
    <>
      <View style={styles.container}>
        {/* 프로필 이미지 */}
        <Image source={{ uri: profile.profileImageUrl }} style={styles.backgroundImage} />

        {/* 카드 전체가 스크롤되는 영역 */}
        <ScrollView
          style={styles.scrollArea}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 200 }}
        >
          {/* 흰색 카드 */}
          <View style={styles.card}>
            {/* 상단 둥근 바 영역 */}
            <View style={styles.topBarContainer}>
              <View style={styles.handleBar} />
            </View>

            <Text style={styles.name}>{profile.nickname}</Text>
            <Text style={styles.nickname}>{profile.email}</Text>

            <View style={styles.statsContainer}>
              <Pressable
                style={styles.statBox}
                onPress={() =>
                  router.push({
                    pathname: '/user/[username]/post',
                    params: { username: profile.nickname, userId: profile.id },
                  })
                }
              >
                <Text style={styles.statNumber}>{profile.postCount}</Text>
                <Text style={styles.statLabel}>게시물</Text>
              </Pressable>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{profile.followers}</Text>
                <Text style={styles.statLabel}>팔로워</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{profile.following}</Text>
                <Text style={styles.statLabel}>팔로잉</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* 하단 고정 버튼 */}

        <View style={[styles.bottomFixed, { bottom: insets.bottom }]}>
          {userId === String(1234) ? (
            <Button
              title="프로필 편집"
              variant="outline"
              onPress={() => console.log('사용자 프로필 편집 페이지로 이동')}
            />
          ) : (
            <Button
              title={profile.isFollowing ? '팔로잉' : '팔로우'}
              variant={profile.isFollowing ? 'outline' : 'filled'}
              onPress={handleToggleFollow}
            />
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '80%',
  },
  scrollArea: {
    flex: 1,
    marginTop: '60%', // 여기서 카드가 시작됨 (원하면 조절)
  },
  card: {
    backgroundColor: '#FFF',
    marginTop: '60%',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingVertical: 16,
    paddingHorizontal: 20,
    minHeight: '100%', // 카드가 전체 화면을 덮도록
  },
  topBarContainer: {
    alignItems: 'center',
  },
  handleBar: {
    width: 38,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#ddd',
  },
  name: {
    paddingTop: 16,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  nickname: {
    marginTop: 4,
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 130,
  },
  statBox: { alignItems: 'center' },
  statNumber: { fontSize: 18, fontWeight: 'bold' },
  statLabel: { marginTop: 3, fontSize: 14, color: '#777' },
  bottomFixed: {
    position: 'absolute',
    left: 20,
    right: 20,
  },
});
