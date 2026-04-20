import { View, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function SafeScreen({ children }: any) {
  const insets = useSafeAreaInsets();
  const background = useThemeColor({}, 'background');

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: background,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 20,
  },
});