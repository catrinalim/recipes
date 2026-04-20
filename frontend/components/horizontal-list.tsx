import { ScrollView, StyleSheet } from 'react-native';

export function HorizontalList({ children }: any) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { gap: 12 },
});