import { StyleSheet, TextInput } from 'react-native';

import { SafeScreen } from '@/components/safe-screen';
import { ThemedText } from '@/components/themed-text';

export default function AddRecipe() {
  return (
    <SafeScreen>
      <ThemedText style={styles.title}>Add Recipe</ThemedText>

      <TextInput placeholder="Title" style={styles.input} />
      <TextInput placeholder="Ingredients" style={styles.input} />
      <TextInput placeholder="Instructions" style={styles.input} multiline />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: '700' },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 10,
    marginTop: 12,
  },
});