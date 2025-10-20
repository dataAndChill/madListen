// app/(tabs)/chat.js
import React, { useMemo, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, Pressable, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { styles } from "../../styles/styles";
import { palette } from "../../styles/theme";
import Constants from "expo-constants";
import { useRecipes } from "../../state/RecipesContext";
import { usePantry } from "../../state/PantryContext";

export default function Chat() {
  const apiKey =
    process.env.EXPO_PUBLIC_OPENAI_API_KEY ||
    Constants?.expoConfig?.extra?.OPENAI_API_KEY ||
    "";
  const { recipes } = useRecipes();
  const { items: pantry } = usePantry();

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hej! Jeg kan hjælpe med at finde klimavenlige retter, foreslå indkøb og guide dig i køkkenet. Hvad har du lyst til at lave?" }
  ]);
  const listRef = useRef(null);

  const systemPrompt = useMemo(() => {
    const pantryList = pantry?.join(", ") || "ingen varer";
    const recipeNames = (recipes || []).map(r => r.name).join(", ");
    return `Du er en køkkenhjælper på dansk. Foreslå klimavenlige retter baseret på brugerens ønsker og deres forråd. Prioritér lav CO₂. 
Forråd: ${pantryList}
Opskrifter i appen: ${recipeNames}
Svar kort og konkret med trin eller forslag.`;
  }, [recipes, pantry]);

  const send = async () => {
    const q = input.trim();
    if (!q) return;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: q }]);

    // Try OpenAI; fall back to mock if no key
    if (!apiKey) {
      const mock =
        "Jeg har ikke adgang til ChatGPT lige nu. Men her er et forslag: Prøv en linsesuppe (lav CO₂) med gulerødder og krydderier fra dit forråd. Trin: 1) Svits løg/krydderier, 2) Tilsæt linser + gulerødder + vand/fond, 3) Simrér 20-25 min, 4) Smag til.";
      setMessages(prev => [...prev, { role: "assistant", content: mock }]);
      return;
    }

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: "user", content: q },
          ],
          temperature: 0.7,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const answer = data?.choices?.[0]?.message?.content?.trim() || "Jeg kunne ikke finde et svar.";
      setMessages(prev => [...prev, { role: "assistant", content: answer }]);
      setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 50);
    } catch (e) {
      setMessages(prev => [...prev, { role: "assistant", content: "Der opstod en fejl med chatten. Prøv igen senere." }]);
    }
  };

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: palette.bg }]}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Chat</Text>
          <FlatList
            ref={listRef}
            data={messages}
            keyExtractor={(_, i) => String(i)}
            contentContainerStyle={{ paddingBottom: 12 }}
            renderItem={({ item }) => (
              <View style={[styles.chatBubble, item.role === "user" ? styles.chatUser : styles.chatAssistant]}>
                <Text style={styles.body}>{item.content}</Text>
              </View>
            )}
          />

          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Spørg fx: 'Lav en grøntsagsgryde trin-for-trin'"
              value={input}
              onChangeText={setInput}
              onSubmitEditing={send}
              returnKeyType="send"
            />
            <Pressable style={styles.button} onPress={send}>
              <Text style={styles.buttonText}>Send</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
