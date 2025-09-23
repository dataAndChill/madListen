// app/_layout.js
import { Stack } from 'expo-router';
import { PantryProvider } from '../state/PantryContext';

export default function RootLayout() {
  return (
    <PantryProvider>
      <Stack screenOptions={{ headerTitleAlign: 'center', contentStyle: { backgroundColor: '#fff' } }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </PantryProvider>
  );
}
