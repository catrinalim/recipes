import { View, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

type Props = {
  title?: string;
};

export function BackHeader({ title }: Props) {
  const insets = useSafeAreaInsets();
  const background = useThemeColor({}, 'background');

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + 10,
          backgroundColor: background,
        },
      ]}
    >
      <View style={styles.row}>
        {/* Back button */}
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ThemedText style={styles.backText}>←</ThemedText>
        </Pressable>

        {/* Title */}
        {title && (
          <ThemedText style={styles.title}>
            {title}
          </ThemedText>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 10,

    // subtle separation like native apps
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backBtn: {
    padding: 6,
  },
  backText: {
    fontSize: 22,
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
});