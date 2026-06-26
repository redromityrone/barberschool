import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Historial de sesiones
      </Text>
      <Text variant="bodyMedium" style={styles.empty}>
        Aún no hay sesiones registradas. Inicia un corte desde la pantalla de inicio.
      </Text>
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
  empty: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 40,
  },
});
