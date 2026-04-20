import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

type Props = {
  title: string;
  subtitle?: string;
  right?: React.ReactNode; // buttons/icons
};

export function Header({ title, subtitle, right }: Props) {
  const insets = useSafeAreaInsets();
  const background = useThemeColor({}, 'background');

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + 10, // handles notch
          backgroundColor: background,
        },
      ]}
    >
      <View style={styles.row}>
        <View>
          <ThemedText style={styles.title}>{title}</ThemedText>

          {subtitle && (
            <ThemedText style={styles.subtitle}>
              {subtitle}
            </ThemedText>
          )}
        </View>

        {right && <View>{right}</View>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.6,
    marginTop: 4,
  },
});