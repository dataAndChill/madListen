import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, FlatList, Pressable } from "react-native";
import { styles } from "../../styles/styles";
import { palette } from "../../styles/theme";
import { usePantry } from "../../state/PantryContext";

export default function Pantry() {
  const { items, addItem, removeItem, clear } = usePantry();
  const [text, setText] = useState("");

  const onAdd = () => { addItem(text); setText(""); };

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: palette.pantryBg }]}>
      <View style={styles.container}>
        <Text style={styles.title}>Mit forråd</Text>

        <View style={styles.inputRow}>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Tilføj ingrediens (fx Broccoli)"
            returnKeyType="done"
            onSubmitEditing={onAdd}
            style={styles.input}
          />
          <Pressable style={styles.button} onPress={onAdd}>
            <Text style={styles.buttonText}>Tilføj</Text>
          </Pressable>
        </View>

        <FlatList
          data={[...items].sort()}
          keyExtractor={(i) => i}
          renderItem={({ item }) => (
            <View style={[styles.listItem, styles.rowBetween]}>
              <Text style={styles.body}>{item}</Text>
              <Pressable style={styles.chip} onPress={() => removeItem(item)}>
                <Text style={styles.chipText}>Fjern</Text>
              </Pressable>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.body}>Intet i forrådet endnu.</Text>}
        />

        <View style={{ height: 12 }} />
        <Pressable style={styles.button} onPress={clear}>
          <Text style={styles.buttonText}>Ryd forråd</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
