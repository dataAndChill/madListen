import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, Expo + React Native 👋</Text>
      <Text style={styles.count}>Count: {count}</Text>

      <Pressable onPress={() => setCount(c => c + 1)} style={styles.button}>
        <Text style={styles.buttonText}>Increment</Text>
      </Pressable>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 12 },
  count: { fontSize: 18, marginBottom: 20 },
  button: { backgroundColor: '#1e90ff', padding: 12, borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: '600' },
});
