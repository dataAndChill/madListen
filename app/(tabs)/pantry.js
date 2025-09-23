import { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Pressable, FlatList } from 'react-native';
import { styles } from '../../styles/styles';
import { usePantry } from '../../state/PantryContext';

export default function Pantry() {
  const { items, addItem, removeItem, clear } = usePantry();
  const [text, setText] = useState('');

  const onAdd = () => {
    addItem(text);
    setText('');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#b7e1c0' }}>
      <View style={styles.container}>
        <Text style={styles.title}>Your Pantry</Text>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Add ingredient (e.g. garlic)"
            value={text}
            onChangeText={setText}
            autoCapitalize="none"
            returnKeyType="done"
            onSubmitEditing={onAdd}
          />
          <Pressable onPress={onAdd} style={styles.button}>
            <Text style={styles.buttonText}>Add</Text>
          </Pressable>
        </View>

        <FlatList
          data={[...items].sort()}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={[styles.listItem, styles.rowBetween]}>
              <Text>{item}</Text>
              <Pressable onPress={() => removeItem(item)} style={styles.chip}>
                <Text style={styles.chipText}>Remove</Text>
              </Pressable>
            </View>
          )}
          ListEmptyComponent={<Text>No items yet. Add your first one!</Text>}
        />

        <View style={{ height: 12 }} />
        <Pressable onPress={clear} style={styles.button}>
          <Text style={styles.buttonText}>Clear Pantry</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
