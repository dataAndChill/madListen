import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerTitleAlign: "center" }}>
      <Tabs.Screen name="pantry"  options={{ title: "Forråd",    tabBarLabel: "Forråd",    tabBarIcon: ({ color, size }) => <Ionicons name="basket-outline"    color={color} size={size} /> }} />
      <Tabs.Screen name="recipes" options={{ title: "Opskrifter", tabBarLabel: "Opskrifter",tabBarIcon: ({ color, size }) => <Ionicons name="restaurant-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="suggest" options={{ title: "Forslag",    tabBarLabel: "Forslag",   tabBarIcon: ({ color, size }) => <Ionicons name="sparkles-outline"  color={color} size={size} /> }} />
      <Tabs.Screen name="impact"  options={{ title: "Overblik",   tabBarLabel: "Overblik",  tabBarIcon: ({ color, size }) => <Ionicons name="leaf-outline"      color={color} size={size} /> }} />
      <Tabs.Screen name="search"  options={{ title: "Søg",        tabBarLabel: "Søg",       tabBarIcon: ({ color, size }) => <Ionicons name="search-outline"    color={color} size={size} /> }} />
      <Tabs.Screen name="chat"    options={{ title: "Chat",       tabBarLabel: "Chat",      tabBarIcon: ({ color, size }) => <Ionicons name="chatbubbles-outline" color={color} size={size} /> }} />
    </Tabs>
  );
}
