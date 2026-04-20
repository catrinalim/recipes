import { ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { SafeScreen } from '@/components/safe-screen';
import { Header } from '@/components/header';
import { Card } from '@/components/card';

export default function RecipesScreen() {
  return (
    <SafeScreen>
      <Header title="Recipes" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TextInput
          placeholder="Search recipes..."
          placeholderTextColor="#888"
          style={styles.search}
        />

        <View style={styles.list}>
          <Card title="Pasta" image="https://images.unsplash.com/photo-1603133872878-684f208fb84b" match={85} />
          <Card title="Chicken Bowl" image="https://images.unsplash.com/photo-1604908176997-431f0d0d6f7b" match={72} />
          <Card title="Salad" image="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe" match={60} />
        </View>
      </ScrollView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 40,
    gap: 20,
  },
  search: {
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    padding: 14,
  },
  list: {
    gap: 16,
  },
});