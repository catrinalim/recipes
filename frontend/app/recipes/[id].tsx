import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

import { SafeScreen } from '@/components/safe-screen';
import { BackHeader } from '@/components/back-header';
import { ThemedText } from '@/components/themed-text';
import { getRecipeById } from '@/lib/api';

export default function RecipeDetail() {
  const params = useLocalSearchParams();

  // ✅ Fix param type (string | string[])
  const recipeId =
    typeof params.id === 'string'
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : undefined;

  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!recipeId) return;

    setLoading(true);

    getRecipeById(recipeId)
      .then((data) => setRecipe(data))
      .catch((err) => {
        console.error('Fetch error:', err);
        setRecipe(null);
      })
      .finally(() => setLoading(false));
  }, [recipeId]);

  // ⏳ Loading state
  if (loading) {
    return (
      <SafeScreen>
        <BackHeader title="Loading..." />
        <ActivityIndicator />
      </SafeScreen>
    );
  }

  // ❌ Not found
  if (!recipe) {
    return (
      <SafeScreen>
        <BackHeader title="Recipe" />
        <ThemedText>Recipe not found</ThemedText>
      </SafeScreen>
    );
  }

  return (
    <SafeScreen>
      <BackHeader title={recipe.title} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Image fallback */}
        <Image
          source={{
            uri:
              recipe.image ||
              'https://images.unsplash.com/photo-1490645935967-10de6ba17061',
          }}
          style={styles.image}
        />

        <ThemedText style={styles.title}>
          {recipe.title}
        </ThemedText>

        {/* Ingredients */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            Ingredients
          </ThemedText>

          {recipe.ingredients?.map((item: any) => (
            <ThemedText key={item.id}>
              • {item.quantity} {item.ingredient_name}
            </ThemedText>
          ))}
        </View>

        {/* Directions */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            Instructions
          </ThemedText>

          {recipe.directions
            ?.split(/\r?\n/)
            .map((step: string, i: number) => (
              <ThemedText key={i}>
                {step}
              </ThemedText>
            ))}
        </View>
      </ScrollView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 40,
    gap: 16,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
});