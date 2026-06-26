import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, Button, FAB } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { HAIRCUT_TYPES } from '@/data/haircutTypes';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        ¿Qué corte vas a realizar?
      </Text>
      <FlatList
        data={HAIRCUT_TYPES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Card style={styles.card} onPress={() => router.push('/session/new')}>
            <Card.Content>
              <Text variant="titleMedium" style={styles.cardTitle}>
                {item.name}
              </Text>
              <Text variant="bodyMedium" style={styles.cardDescription}>
                {item.description}
              </Text>
            </Card.Content>
            <Card.Actions>
              <Button
                mode="contained"
                onPress={() => router.push('/session/new')}
                buttonColor="#e94560"
              >
                Iniciar
              </Button>
            </Card.Actions>
          </Card>
        )}
      />
      <FAB
        icon="camera"
        style={styles.fab}
        color="#fff"
        onPress={() => router.push('/session/new')}
      />
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
  list: {
    paddingBottom: 80,
  },
  card: {
    marginBottom: 12,
    backgroundColor: '#16213e',
  },
  cardTitle: {
    color: '#fff',
  },
  cardDescription: {
    color: '#aaa',
    marginTop: 4,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#e94560',
  },
});
