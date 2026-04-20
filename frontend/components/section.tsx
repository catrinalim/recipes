import { View, StyleSheet } from 'react-native';
import { ThemedText } from './themed-text';

export function Section({ title, children }: any) {
  return (
    <View style={styles.section}>
      <ThemedText style={styles.title}>{title}</ThemedText>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: 10 },
  title: { fontSize: 20, fontWeight: '700' },
});