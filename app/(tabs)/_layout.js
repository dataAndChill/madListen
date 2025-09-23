import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: 'center',
        tabBarActiveTintColor: '#1e90ff',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: { backgroundColor: '#fff' },
      }}
    >
      <Tabs.Screen
        name="pantry"
        options={{
          title: 'Pantry',
          tabBarIcon: ({ color, size }) => <Ionicons name="basket-outline" size={size} color={color} />,
          headerTitle: 'Your Pantry',
        }}
      />
      <Tabs.Screen
        name="recipes"
        options={{
          title: 'Recipes',
          tabBarIcon: ({ color, size }) => <Ionicons name="book-outline" size={size} color={color} />,
          headerTitle: 'Recipes',
        }}
      />
      <Tabs.Screen
        name="suggest"
        options={{
          title: 'Suggestions',
          tabBarIcon: ({ color, size }) => <Ionicons name="bulb-outline" size={size} color={color} />,
          headerTitle: 'Smart Suggestions',
        }}
      />
    </Tabs>
  );
}
