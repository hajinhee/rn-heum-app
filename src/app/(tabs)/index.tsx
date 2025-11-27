import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from 'react-native';

export default function DashboardScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* 환영 메시지 */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>안녕하세요,</Text>
          <Text style={styles.welcomeSubtitle}>청학동 수달님!</Text>
          <Text style={styles.welcomeMessage}>Time to make a splash!</Text>
        </View>

        {/* 오늘의 수영 기록 */}
        <TouchableOpacity style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>오늘의 수영 기록</Text>
            <Text style={styles.arrow}>›</Text>
          </View>
          <View style={styles.todaySwim}>
            <Text style={styles.todaySwimLabel}>Today's Swim</Text>
            <Text style={styles.todaySwimDistance}>750m</Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statIcon}>⏱</Text>
                <Text style={styles.statLabel}>총 시간</Text>
                <Text style={styles.statValue}>00:46:25</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statIcon}>⏱</Text>
                <Text style={styles.statLabel}>평균 페이스</Text>
                <Text style={styles.statValue}>2:27/100m</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statIcon}>❤️</Text>
                <Text style={styles.statLabel}>평균 심박수</Text>
                <Text style={styles.statValue}>139 bpm</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* 수영 캘린더 */}
        <TouchableOpacity style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>수영 캘린더</Text>
            <Text style={styles.arrow}>›</Text>
          </View>
          <View style={styles.calendar}>
            <View style={styles.weekDays}>
              <Text style={styles.weekDay}>S</Text>
              <Text style={styles.weekDay}>M</Text>
              <Text style={styles.weekDay}>T</Text>
              <Text style={styles.weekDay}>W</Text>
              <Text style={styles.weekDay}>T</Text>
              <Text style={styles.weekDay}>F</Text>
              <Text style={styles.weekDay}>S</Text>
            </View>
            <View style={styles.dates}>
              <Text style={styles.date}>14</Text>
              <Text style={styles.date}>15</Text>
              <Text style={styles.date}>16</Text>
              <Text style={[styles.date, styles.dateActive]}>17</Text>
              <Text style={styles.date}>18</Text>
              <Text style={styles.date}>19</Text>
              <Text style={styles.date}>20</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* 목표 진행률 */}
        <TouchableOpacity style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>목표 진행률</Text>
            <Text style={styles.arrow}>›</Text>
          </View>
          <View style={styles.goals}>
            <View style={styles.goalItem}>
              <Text style={styles.goalLabel}>주간 목표 달성률</Text>
              <Text style={styles.goalValue}>75%</Text>
            </View>
            <View style={styles.goalItem}>
              <Text style={styles.goalLabel}>월간 목표 달성률</Text>
              <Text style={styles.goalValue}>61%</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* 날씨 현황 */}
        <TouchableOpacity style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>날씨 현황</Text>
            <Text style={styles.arrow}>›</Text>
          </View>
          <View style={styles.weather}>
            <View style={styles.weatherItem}>
              <Text style={styles.weatherIcon}>☀️</Text>
              <Text style={styles.weatherLabel}>야외 수영천</Text>
            </View>
            <View style={styles.weatherItem}>
              <Text style={styles.weatherIcon}>🌧</Text>
              <Text style={styles.weatherLabel}>적당함</Text>
            </View>
            <View style={styles.weatherItem}>
              <Text style={styles.weatherIcon}>⛅</Text>
              <Text style={styles.weatherLabel}>일요일 맑은날</Text>
            </View>
            <View style={styles.weatherItem}>
              <Text style={styles.weatherIcon}>⚡</Text>
              <Text style={styles.weatherLabel}>즉도강</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 16,
  },
  welcomeSection: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  welcomeSubtitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  welcomeMessage: {
    fontSize: 16,
    color: '#6B7280',
  },
  card: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#F3F3F3',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  arrow: {
    fontSize: 24,
    color: '#9CA3AF',
  },
  todaySwim: {
    alignItems: 'center',
  },
  todaySwimLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  todaySwimDistance: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    marginHorizontal: 4,
  },
  statIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    color: '#6B7280',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  calendar: {
    paddingVertical: 8,
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  weekDay: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  dates: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  date: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  dateActive: {
    color: '#3B82F6',
    fontWeight: 'bold',
  },
  goals: {
    paddingVertical: 8,
  },
  goalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  goalLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  goalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B82F6',
  },
  weather: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weatherItem: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
  },
  weatherIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  weatherLabel: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'center',
  },
});
