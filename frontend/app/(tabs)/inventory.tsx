import { ScrollView, StyleSheet, Pressable, View, TextInput } from 'react-native';

import { SafeScreen } from '@/components/safe-screen';
import { Header } from '@/components/header';
import { ThemedText } from '@/components/themed-text';

export default function InventoryScreen() {
  return (
    <SafeScreen>
      <Header title="Inventory" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TextInput
          placeholder="Add ingredient..."
          placeholderTextColor="#888"
          style={styles.input}
        />

        <View style={styles.list}>
          <Ingredient name="Tomatoes" quantity={2} />
          <Ingredient name="Chicken" quantity={1} />
          <Ingredient name="Milk" quantity={0} />
        </View>
      </ScrollView>
    </SafeScreen>
  );
}

function Ingredient({ name, quantity }: any) {
  return (
    <View style={styles.row}>
      <ThemedText>{name}</ThemedText>

      <View style={styles.controls}>
        <Pressable style={styles.btn}>
          <ThemedText>-</ThemedText>
        </Pressable>

        <ThemedText>{quantity}</ThemedText>

        <Pressable style={styles.btn}>
          <ThemedText>+</ThemedText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 40,
    gap: 20,
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    padding: 14,
  },
  list: {
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controls: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  btn: {
    padding: 8,
    backgroundColor: '#ddd',
    borderRadius: 8,
  },
});