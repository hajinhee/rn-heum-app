import { ActionSheet } from '@/components';
import { FloatingButton } from '@/components/common/FloatingButton';
import { PostCard } from '@/features/feed/components/PostCard';
import { PostData } from '@/features/feed/type';
import { FlashList } from '@shopify/flash-list';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function FeedScreen() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showActionSheet, setShowActionSheet] = useState(false);

  const router = useRouter();

  /** 게시글 목록 불러오기 */
  useEffect(() => {
    const getPosts = async () => {
      try {
        setPosts([]);
        const res = await fetch('/posts');

        if (!res.ok) {
          throw new Error(`서버 오류: ${res.status}`);
        }

        const data = await res.json();
        setPosts(data.posts);
      } catch (err) {
        console.error('err: ', err);
      } finally {
        console.log('getPosts 요청 완료');
      }
    };

    getPosts();
  }, []);

  /** 로드된 데이터 마지막 인덱스가 되면, 다시 데이터 호출 */
  const onEndReached = useCallback(async () => {
    try {
      const cursor = posts.at(-1)?.id;
      const res = await fetch(`/posts?cursor=${cursor}`);
      const data = await res.json();

      if (!data.posts.length) {
        return;
      }

      setPosts((prev) => [...prev, ...data.posts]);
    } catch (err) {
      console.error(err);
    } finally {
      console.log('onEndReached 요청 완료');
    }
  }, [posts]);

  /** 새로고침 */
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      const res = await fetch('/posts');
      const data = await res.json();
      setPosts(data.posts);
    } catch (err) {
      console.error('err: ', err);
    } finally {
      setRefreshing(false);
      console.log('onRefresh 요청 완료');
    }
  };

  return (
    <View style={styles.container}>
      <FlashList
        data={posts}
        onEndReached={onEndReached}
        renderItem={({ item }) => <PostCard item={item} />}
        onEndReachedThreshold={0.5}
        onRefresh={onRefresh}
        refreshing={refreshing}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#9CA3AF" />
          </View>
        }
      />
      <FloatingButton onPress={() => setShowActionSheet(true)} />

      {/* 액션 시트 */}
      <ActionSheet
        visible={showActionSheet}
        onClose={() => setShowActionSheet(false)}
        actions={[
          {
            label: '기록 공유',
            onPress: () => router.navigate('/post'),
          },
          {
            label: '목표 달성률 공유',
            onPress: () => router.navigate('/post/progress'),
          },
          {
            label: '배지 공유',
            onPress: () => router.navigate('/post/badge'),
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    borderRadius: 16,
    padding: 48,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300,
  },
});
