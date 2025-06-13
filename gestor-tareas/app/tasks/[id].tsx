import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import Button from '../../src/components/Button';
import { useTasks } from '../../src/context/TaskContext';

export default function EditTaskScreen() {
  const { id } = useLocalSearchParams();
  const { tasks, editTask } = useTasks(); // ⬅ usamos updateTask en lugar de editTask
  const router = useRouter();

  const index = Number(id);

  // Validar índice
  useEffect(() => {
    if (isNaN(index) || index < 0 || index >= tasks.length) {
      Alert.alert('Error', 'Id de tarea inválido');
      router.push('/tasks');
    }
  }, [index, tasks]);

  const task = tasks[index];

  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [priority, setPriority] = useState(task?.priority || 'Media');
  const [status, setStatus] = useState(task?.status || 'Pendiente');

  const saveTask = () => {
    if (title.trim() === '') {
      Alert.alert('Error', 'El título no puede estar vacío');
      return;
    }

    const updatedTask = {
      title,
      description,
      priority,
      status,
    };

    editTask(index, updatedTask);
    router.push('/tasks');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar tarea #{index + 1}</Text>

      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text>Prioridad</Text>
      <Picker selectedValue={priority} onValueChange={setPriority}>
        <Picker.Item label="Baja" value="Baja" />
        <Picker.Item label="Media" value="Media" />
        <Picker.Item label="Alta" value="Alta" />
      </Picker>

      <Text>Estado</Text>
      <Picker selectedValue={status} onValueChange={setStatus}>
        <Picker.Item label="Pendiente" value="Pendiente" />
        <Picker.Item label="En Progreso" value="En Progreso" />
        <Picker.Item label="Completada" value="Completada" />
      </Picker>

      <Button title="Guardar cambios" onPress={saveTask} />
      <Button title="Cancelar" onPress={() => router.push('/tasks')}  />
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
