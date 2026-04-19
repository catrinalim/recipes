import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ title: 'Lettuce Eat' }}/>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}