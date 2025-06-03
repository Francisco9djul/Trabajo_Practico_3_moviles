import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTasks } from '../../../src/context/TaskContext';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { tasks } = useTasks();

  const taskIndex = Number(id);
  const task = tasks[taskIndex];

  if (!task || isNaN(taskIndex)) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Tarea no encontrada</Text>
        <Button title="Volver" onPress={() => router.push('/tasks')} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Título:</Text>
      <Text style={styles.text}>{task.title}</Text>

      <Text style={styles.title}>Descripción:</Text>
      <Text style={styles.text}>{task.description || 'Sin descripción'}</Text>

      <Button title="Volver" onPress={() => router.push('/tasks')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginTop: 20 },
  text: { fontSize: 16, marginTop: 5 },
  error: { fontSize: 18, color: 'red', textAlign: 'center' },
});
