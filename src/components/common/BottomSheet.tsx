import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';

import { useBottomSheetStore } from '@/store/commonStore';

export default function BottomSheetModal() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { index, content, close } = useBottomSheetStore();

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />
    ),
    [],
  );

  useEffect(() => {
    if (!bottomSheetRef.current) return;

    if (index === -1) {
      bottomSheetRef.current.close(); // 실제 close 애니메이션 실행
    } else {
      bottomSheetRef.current.expand();
    }
  }, [index]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={index}
      onClose={close}
      enablePanDownToClose
      enableDynamicSizing={false}
      snapPoints={['30%']}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={styles.handleIndicator}
      backgroundStyle={styles.background}
    >
      <BottomSheetView style={styles.container}>{content}</BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  handleIndicator: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#ccc',
    marginTop: 5,
  },
  container: {},
});
