// app/index.js
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable } from "react-native";
import { styles } from "../styles/styles";
import { palette } from "../styles/theme";
import { router } from "expo-router";

const tiles = [
  { label: "Forråd", route: "/(tabs)/pantry" },
  { label: "Opskrifter", route: "/(tabs)/recipes" },
  { label: "Forslag", route: "/(tabs)/suggest" },
  { label: "Overblik", route: "/(tabs)/impact" },
  { label: "Søg", route: "/(tabs)/search" },
  { label: "Chat", route: "/(tabs)/chat" },
];

export default function Home() {
  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: palette.bg }]}>
      <View style={styles.container}>
        <Text style={styles.title}>Velkommen 👋</Text>
        <Text style={[styles.body, { marginBottom: 16 }]}>
          Vælg en sektion for at komme i gang:
        </Text>

        <View style={styles.tileGrid}>
          {tiles.map(t => (
            <Pressable key={t.route} style={styles.tile} onPress={() => router.push(t.route)}>
              <Text style={styles.tileText}>{t.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
