import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTasks } from '../../src/context/TaskContext';

export default function EditTaskScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const taskIndex = Number(id);

  const { tasks, editTask } = useTasks();

  // Ahora el estado es un objeto con title y description
  const [task, setTask] = useState({ title: '', description: '' });

  useEffect(() => {
    if (isNaN(taskIndex) || taskIndex < 0 || taskIndex >= tasks.length) {
      Alert.alert('Error', 'Id de tarea inválido');
      router.push('/tasks');
      return;
    }

    // Cargar la tarea completa (objeto)
    setTask(tasks[taskIndex]);
  }, [taskIndex, tasks]);

  const saveTask = () => {
    if (task.title.trim() === '') {
      Alert.alert('Error', 'El título no puede estar vacío');
      return;
    }

    editTask(taskIndex, task);
    router.push('/tasks');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar tarea #{taskIndex + 1}</Text>

      <TextInput
        style={styles.input}
        placeholder="Título"
        value={task.title}
        onChangeText={(text) => setTask((prev) => ({ ...prev, title: text }))}
      />

      <TextInput
        style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
        placeholder="Descripción"
        value={task.description}
        onChangeText={(text) => setTask((prev) => ({ ...prev, description: text }))}
        multiline
      />

      <Button title="Guardar cambios" onPress={saveTask} />
      <Button title="Cancelar" onPress={() => router.push('/tasks')} color="gray" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
});
