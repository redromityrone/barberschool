import { View, StyleSheet } from 'react-native';
import { Text, Switch, List } from 'react-native-paper';
import { useState } from 'react';

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Ajustes
      </Text>
      <List.Section>
        <List.Item
          title="Modo oscuro"
          description="Tema visual de la aplicación"
          titleStyle={styles.itemTitle}
          descriptionStyle={styles.itemDescription}
          right={() => (
            <Switch value={darkMode} onValueChange={setDarkMode} color="#e94560" />
          )}
        />
        <List.Item
          title="Versión"
          description="0.1.0 — MVP"
          titleStyle={styles.itemTitle}
          descriptionStyle={styles.itemDescription}
        />
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f3460',
    padding: 16,
  },
  title: {
    color: '#fff',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  itemTitle: {
    color: '#fff',
  },
  itemDescription: {
    color: '#aaa',
  },
});
