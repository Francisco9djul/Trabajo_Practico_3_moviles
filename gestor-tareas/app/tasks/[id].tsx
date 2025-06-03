import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTasks } from '../../src/context/TaskContext'; // IMPORTANTE

export default function EditTaskScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const taskIndex = Number(id);

  const { tasks, editTask } = useTasks(); // ← usamos el contexto

  const [taskText, setTaskText] = useState('');

  useEffect(() => {
    if (isNaN(taskIndex) || taskIndex < 0 || taskIndex >= tasks.length) {
      Alert.alert('Error', 'Id de tarea inválido');
      router.push('/tasks');
      return;
    }

    // Pre-cargar la tarea en el input
    setTaskText(tasks[taskIndex]);
  }, [taskIndex, tasks]);

  const saveTask = () => {
    if (taskText.trim() === '') {
      Alert.alert('Error', 'La tarea no puede estar vacía');
      return;
    }

    editTask(taskIndex, taskText); // ← actualizamos en el contexto
    router.push('/tasks');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar tarea #{taskIndex + 1}</Text>
      <TextInput
        style={styles.input}
        placeholder="Modificar tarea"
        value={taskText}
        onChangeText={setTaskText}
      />
      <Button title="Guardar cambios" onPress={saveTask} />
      <Button title="Cancelar" onPress={() => router.push('/tasks')} color="gray" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20 },
});
