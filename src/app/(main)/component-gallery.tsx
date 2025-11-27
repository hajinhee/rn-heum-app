import { useState } from 'react';
import { ScrollView, View } from 'react-native';

import {
  ActionSheet,
  AnimatedButton,
  Avatar,
  Button,
  Card,
  Surface,
  EmptyResult,
  Typography,
  ExternalLink,
} from '@/components';
import { useAlertStore, useBottomSheetStore } from '@/store/commonStore';

export default function ComponentGalleryScreen() {
  const profileImage = require('@/assets/images/profile.png');

  // ActionSheet
  const [activeType, setActiveType] = useState<null | 'edit' | 'delete'>(null);

  const handleEdit = () => setActiveType('edit');
  const handleDelete = () => setActiveType('delete');
  const handleActionSheetButton = () => {
    setActiveType('edit');
  };

  // AlertModal
  const { open: alert } = useAlertStore();

  const handleSuccessAlert = () => {
    alert({
      type: 'success',
      title: '성공',
      message: '요청하신 작업이 성공적으로 처리되었습니다.',
      confirmText: '확인',
    });
  };

  const handleWarningAlert = () => {
    alert({
      type: 'warning',
      title: '정말 삭제하시겠습니까?',
      message: '삭제된 데이터는 복구할 수 없습니다. 신중하게 결정해주세요.',
      confirmText: '삭제',
      cancelText: '취소',
      onConfirm: () => console.log('삭제 확인'),
    });
  };

  // AnimatedButton
  const [isAnimatedButtonVisible, setIsAnimatedButtonVisible] = useState(false);
  const toggleAnimatedButton = () => setIsAnimatedButtonVisible((prev) => !prev);

  // BottomSheetModal
  const { open: openBottomSheet } = useBottomSheetStore();
  const handleOpenBottomSheet = () => {
    openBottomSheet(
      <View className={'w-full h-full flex items-center justify-center pt-10'}>
        <Typography>바텀시트 컨텐츠</Typography>
      </View>,
    );
  };

  return (
    <ScrollView className={'flex-1 px-4 py-6'} contentContainerStyle={{ gap: 5 }}>
      {/* Typography */}
      <Typography variant="h3" className={'text-lg font-semibold '}>
        Typography
      </Typography>
      <View style={{ gap: 8 }}>
        <Typography variant="h1">H1 제목</Typography>
        <Typography variant="h2">H2 제목</Typography>
        <Typography variant="h3">H3 제목</Typography>
        <Typography variant="body">본문 텍스트</Typography>
        <Typography variant="caption">캡션 텍스트</Typography>
        <Typography variant="label" color="#FF5733">
          라벨 텍스트 (커스텀 색상)
        </Typography>
      </View>

      {/* Avatars */}
      <Typography variant="h3" className={'text-lg font-semibold mt-8'}>
        Avatars
      </Typography>
      <View className={'flex flex-row justify-center items-center gap-x-5'}>
        <Avatar size="sm" src={profileImage} />
        <Avatar size="md" src={profileImage} />
        <Avatar size="lg" src={profileImage} />
        <Avatar size="lg" fallbackText="BeautyKim" />
        <Avatar size="lg" src="https://reactnative.dev/img/tiny_logo.png" />
      </View>

      {/* Buttons */}
      <Typography variant="h3" className={'text-lg font-semibold mt-8'}>
        Buttons
      </Typography>
      <View style={{ gap: 8 }}>
        <Button title="Filled Button (default)" onPress={() => {}} />
        <Button title="Outline Button" variant="outline" onPress={() => {}} />
        <Button title="Gray Button" variant="gray" onPress={() => {}} />
      </View>

      {/* Cards (Legacy) */}
      <Typography variant="h3" className={'text-lg font-semibold mt-8'}>
        Cards (Legacy)
      </Typography>
      <Card>
        <Typography className="text-center">Legacy Card</Typography>
      </Card>

      {/* Surfaces (New) */}
      <Typography variant="h3" className={'text-lg font-semibold mt-8'}>
        Surfaces (New)
      </Typography>
      <View style={{ gap: 12 }}>
        <Surface variant="elevated" className="p-4 items-center">
          <Typography>Elevated Surface</Typography>
        </Surface>
        <Surface variant="outlined" className="p-4 items-center">
          <Typography>Outlined Surface</Typography>
        </Surface>
        <Surface variant="filled" className="p-4 items-center">
          <Typography>Filled Surface (default)</Typography>
        </Surface>
      </View>

      {/* Empty State */}
      <Typography variant="h3" className={'text-lg font-semibold mt-8'}>
        Empty State
      </Typography>
      <EmptyResult />

      {/* External Links */}
      <Typography variant="h3" className={'text-lg font-semibold mt-8'}>
        External Links
      </Typography>
      <View style={{ gap: 8 }}>
        <ExternalLink href="https://google.com">Google</ExternalLink>
        <ExternalLink href="https://expo.dev" variant="h2" color="orange">
          Expo
        </ExternalLink>
        <ExternalLink href="https://reactnative.dev" underline={true} className="no-underline">
          React Native (Custom Style)
        </ExternalLink>
      </View>

      <Typography variant="h3" className={'text-lg font-semibold mt-8'}>
        UI 인터랙션 데모(sheet, alert, button)
      </Typography>
      <View style={{ gap: 8 }}>
        <Button title="ActionSheet" variant="gray" onPress={handleActionSheetButton} />
        <Button title="Success Alert" onPress={handleSuccessAlert} />
        <Button title="Warning Alert" variant="outline" onPress={handleWarningAlert} />
        <Button
          title={isAnimatedButtonVisible ? 'Hide AnimatedButton' : 'Show AnimatedButton'}
          onPress={toggleAnimatedButton}
        />
        <Button title="BottomSheet" variant="gray" onPress={handleOpenBottomSheet} />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
        <AnimatedButton visible={isAnimatedButtonVisible} icon="arrow-up" onPress={() => {}} />
        <AnimatedButton
          visible={isAnimatedButtonVisible}
          label="등록"
          width={90}
          height={40}
          onPress={() => {}}
        />
      </View>

      <ActionSheet
        visible={!!activeType}
        onClose={() => setActiveType(null)}
        actions={[
          { label: '수정', onPress: handleEdit },
          { label: '삭제', onPress: handleDelete, destructive: true },
        ]}
      />
    </ScrollView>
  );
}
