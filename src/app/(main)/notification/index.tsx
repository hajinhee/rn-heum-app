import React, { useEffect, useMemo, useState } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NotificationCard } from '@/features/notification/components/NotificationCard';
import { NotificationItem } from '@/features/notification/type';

// 날짜별 그룹화 함수
const groupByDate = (notifications: NotificationItem[]) => {
  const grouped: Record<string, NotificationItem[]> = {};

  notifications.forEach((item) => {
    const dateKey = new Date(item.createdAt).toISOString().split('T')[0];
    if (!grouped[dateKey]) grouped[dateKey] = [];
    grouped[dateKey].push(item);
  });

  return Object.keys(grouped)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .map((date) => ({
      title: date.replace(/-/g, '.'), // 화면엔 "2025.11.10" 으로 표시
      data: grouped[date],
    }));
};

export default function NotificationScreen() {
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        setNotifications([]);
        const res = await fetch('/notifications');

        if (!res.ok) {
          throw new Error(`서버 오류: ${res.status}`);
        }

        const data = await res.json();
        setNotifications(data.notifications);
      } catch (err) {
        console.error('err: ', err);
      } finally {
        console.log('getPosts 요청 완료');
      }
    };

    getNotifications();
  }, []);

  const sections = useMemo(() => groupByDate(notifications), [notifications]);

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <SectionList
        style={styles.sectionList}
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <NotificationCard item={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  sectionList: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    fontSize: 12,
    color: '#888',
    backgroundColor: '#FFF',
  },
});
