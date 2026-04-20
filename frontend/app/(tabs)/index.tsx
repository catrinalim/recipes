import { ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';

import { SafeScreen } from '@/components/safe-screen';
import { Header } from '@/components/header';
import { Card } from '@/components/card';
import { getAllRecipes } from '@/lib/api';

export default function HomeScreen() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllRecipes()
      .then((data) => {
        console.log('HOME DATA:', data); // DEBUG
        setRecipes(data);
      })
      .catch((err) => console.error('Home fetch error:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeScreen>
      <Header
        title="Good afternoon"
        subtitle="What can you cook today?"
      />

      {loading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          {recipes.map((recipe) => (
            <Card
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              image={
                recipe.image ||
                'https://images.unsplash.com/photo-1490645935967-10de6ba17061'
              }
            />
          ))}
        </ScrollView>
      )}
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    gap: 12,
  },
});