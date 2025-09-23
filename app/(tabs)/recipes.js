import { SafeAreaView, View, Text, FlatList } from 'react-native';
import { styles } from '../../styles/styles';
import { RECIPES } from '../../data/recipes';

export default function Recipes() {
  return (
<SafeAreaView style={{ flex: 1, backgroundColor: '#ffe5b4' /* pastel peach */ }}>
      <View style={styles.container}>

        <Text style={styles.title}>Recipes</Text>

        <FlatList
          data={RECIPES}
          keyExtractor={(r) => r.id}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 16 }}>
              <Text style={styles.subtitle}>{item.name}</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {item.ingredients.map((ing) => (
                  <View key={ing} style={styles.chip}>
                    <Text style={styles.chipText}>{ing}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
