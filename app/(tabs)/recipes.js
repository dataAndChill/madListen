import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, FlatList, TextInput, Pressable } from "react-native";
import { styles } from "../../styles/styles";
import { palette } from "../../styles/theme";
import { useRecipes } from "../../state/RecipesContext";

const CO2_LEVELS = ["Lav", "Middel", "Høj"];

export default function Recipes() {
  const { recipes, addRecipe, removeRecipe } = useRecipes();

  const [name, setName] = useState("");
  const [ingredientsCSV, setIngredientsCSV] = useState("");
  const [co2, setCo2] = useState("Lav");
  const [desc, setDesc] = useState("");

  const onAdd = () => {
    const ingredients = ingredientsCSV.split(",").map(s => s.trim()).filter(Boolean);
    if (!name || ingredients.length === 0) return;
    addRecipe({ name, ingredients, co2, description: desc || "Ingen beskrivelse." });
    setName(""); setIngredientsCSV(""); setCo2("Lav"); setDesc("");
  };

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: palette.recipesBg }]}>
      <View style={styles.container}>
        <Text style={styles.title}>Opskrifter</Text>

        {/* Create form */}
        <View style={styles.card}>
          <Text style={styles.subtitle}>Tilføj opskrift</Text>
          <TextInput placeholder="Navn" value={name} onChangeText={setName} style={styles.input} />
          <TextInput placeholder="Ingredienser (kommasepareret)" value={ingredientsCSV} onChangeText={setIngredientsCSV} style={styles.input} />
          <TextInput placeholder="Beskrivelse (valgfri)" value={desc} onChangeText={setDesc} style={styles.input} />

          <View style={[styles.inputRow, { marginTop: 4 }]}>
            {CO2_LEVELS.map(level => (
              <Pressable
                key={level}
                onPress={() => setCo2(level)}
                style={[styles.chip, co2 === level && { borderColor: palette.primary }]}
              >
                <Text style={styles.chipText}>{level}</Text>
              </Pressable>
            ))}
          </View>

          <View style={{ height: 8 }} />
          <Pressable style={styles.button} onPress={onAdd}>
            <Text style={styles.buttonText}>Gem opskrift</Text>
          </Pressable>
        </View>

        {/* List */}
        <FlatList
          data={[...recipes].sort((a,b)=>a.name.localeCompare(b.name))}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.subtitle}>{item.name}</Text>
              <Text style={styles.body}>CO₂: {item.co2}</Text>
              <Text style={styles.body}>Ingredienser: {item.ingredients.join(", ")}</Text>
              <Text style={styles.body}>{item.description}</Text>
              <View style={{ height: 8 }} />
              <Pressable style={styles.chip} onPress={() => removeRecipe(item.name)}>
                <Text style={styles.chipText}>Slet</Text>
              </Pressable>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.body}>Ingen opskrifter endnu.</Text>}
        />
      </View>
    </SafeAreaView>
  );
}
