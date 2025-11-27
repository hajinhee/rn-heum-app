import { Text, View } from 'react-native';

export const unstable_settings = {
  title: '알림 설정',
};

export default function NotificationSettingScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
      <Text>알림 설정 페이지 내용</Text>
    </View>
  );
}
