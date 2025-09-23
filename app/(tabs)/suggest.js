import { useMemo, useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Pressable, FlatList } from 'react-native';
import { styles } from '../../styles/styles';
import { RECIPES } from '../../data/recipes';
import { usePantry } from '../../state/PantryContext';

const colorFor = (n) => (n === 0 ? 'green' : n <= 2 ? '#1e90ff' : '#ff8c00');

export default function Suggest() {
  const { items, importFromCSV } = usePantry();
  const [csv, setCsv] = useState('');

  const pantrySet = useMemo(() => new Set(items.map(i => i.toLowerCase())), [items]);

  const results = useMemo(() => {
    return RECIPES.map(r => {
      const missing = r.ingredients.filter(i => !pantrySet.has(i.toLowerCase()));
      return { ...r, missing, missingCount: missing.length };
    }).sort((a, b) => a.missingCount - b.missingCount);
  }, [pantrySet]);

  const best = results[0];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff599' /* pastel yellow */ }}>
      <View style={styles.container}>
        <Text style={styles.title}>Smart Suggestions</Text>
        <Text style={{ marginBottom: 8 }}>
          Based on your Pantry items. (Optional: paste comma-separated items to import.)
        </Text>

        {/* Optional quick importer to bulk add to pantry */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="e.g. milk, tomato, basil"
            value={csv}
            onChangeText={setCsv}
            autoCapitalize="none"
            returnKeyType="done"
            onSubmitEditing={() => {
              importFromCSV(csv);
              setCsv('');
            }}
          />
          <Pressable
            onPress={() => { importFromCSV(csv); setCsv(''); }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Import</Text>
          </Pressable>
        </View>

        <View style={{ height: 12 }} />

        {best ? (
          <View>
            <Text style={styles.subtitle}>Best Match: {best.name}</Text>
            <Text>Missing ({best.missingCount}):</Text>

            <FlatList
              data={best.missing}
              keyExtractor={(i) => i}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                  <Text>{item}</Text>
                </View>
              )}
              ListEmptyComponent={<Text>Nothing missing 🎉 You can cook right now.</Text>}
            />
          </View>
        ) : (
          <Text>No recipes found.</Text>
        )}

        <View style={{ height: 16 }} />
        <Text style={styles.subtitle}>All Matches (fewest missing first)</Text>
        <FlatList
          data={results}
          keyExtractor={(r) => r.id}
          renderItem={({ item }) => (
            <View style={[styles.listItem, styles.rowBetween]}>
              <Text>{item.name}</Text>
              <Text style={{ fontWeight: '700', color: colorFor(item.missingCount) }}>
                {item.missingCount} missing
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
