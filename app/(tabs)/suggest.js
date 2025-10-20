import React, { useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, FlatList, Pressable } from "react-native";
import { styles } from "../../styles/styles";
import { palette } from "../../styles/theme";
import { useRecipes } from "../../state/RecipesContext";

export default function Suggest() {
  const { recipes } = useRecipes();
  const [ecoMode, setEcoMode] = useState(false);

  const ecoRecipes = useMemo(() => {
    const source = recipes || [];
    if (!ecoMode) return source;
    return source.filter(r => r.co2 === "Lav" || r.co2 === "Middel");
  }, [recipes, ecoMode]);

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: palette.suggestBg }]}>
      <View style={styles.container}>
        {/* Klima-knap i toppen */}
        <View style={styles.rowBetween}>
          <Text style={styles.title}>Forslag</Text>
          <Pressable style={styles.chip} onPress={() => setEcoMode(!ecoMode)}>
            <Text style={styles.chipText}>
              {ecoMode ? "🌿 Klima-tilstand aktiv" : "Slå klima til"}
            </Text>
          </Pressable>
        </View>

        <FlatList
          data={ecoRecipes}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.subtitle}>{item.name}</Text>
              <Text style={styles.body}>CO₂: {item.co2}</Text>
              <Text style={styles.body}>{item.description}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
