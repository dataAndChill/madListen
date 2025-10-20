import { Stack } from "expo-router";
import { PantryProvider } from "../state/PantryContext";
import { RecipesProvider } from "../state/RecipesContext";

export default function RootLayout() {
  return (
    <PantryProvider>
      <RecipesProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </RecipesProvider>
    </PantryProvider>
  );
}
