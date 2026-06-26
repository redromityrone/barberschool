import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function NewSessionScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Nueva sesión de corte
      </Text>
      <Text variant="bodyMedium" style={styles.description}>
        Selecciona un tipo de corte en la pantalla de inicio para comenzar el flujo
        guiado con pasos, fotos de referencia y tarjetas de decisión.
      </Text>
      <Text variant="bodySmall" style={styles.comingSoon}>
        Flujo completo disponible en Fase 3 del plan de desarrollo.
      </Text>
      <Button mode="contained" onPress={() => router.back()} buttonColor="#e94560">
        Volver
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f3460',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  description: {
    color: '#ccc',
    marginBottom: 12,
    lineHeight: 22,
  },
  comingSoon: {
    color: '#e94560',
    marginBottom: 24,
    fontStyle: 'italic',
  },
});
