import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function MainScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Button
        title="Ir a Lista de Tareas"
        onPress={() => router.push('./tasks')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
});
