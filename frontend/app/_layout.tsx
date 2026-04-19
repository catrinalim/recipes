import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ title: 'Lettuce Eat' }}/>
      <Stack.Screen name="recipes/index" options={{ title: 'My Recipes' }} />
      <Stack.Screen name="recipes/[id]" options={{ title: 'Recipe Details' }} />
      <Stack.Screen name="recipes/add" options={{ title: 'Add Recipe' }} />
      <Stack.Screen name="inventory" options={{ title: 'My Inventory' }}/>
      <Stack.Screen name="suggestions" options={{ title: 'Recipe Suggestions' }}/>
    </Stack>
  );
}