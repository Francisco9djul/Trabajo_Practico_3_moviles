import { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import TaskItem from '../../src/components/TaskItem';
import { useRouter } from 'expo-router';
import { useTasks } from '../../src/context/TaskContext';

export default function TaskListScreen() {
  const { tasks, addTask, deleteTask } = useTasks();

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const router = useRouter();

  const handleAddTask = () => {
    if (newTitle.trim() === '') {
      Alert.alert('Error', 'El título no puede estar vacío');
      return;
    }
    addTask({ title: newTitle, description: newDescription });
    setNewTitle('');
    setNewDescription('');
  };

  const handleDeleteTask = (index: number) => {
    deleteTask(index);
  };

  const editTask = (index: number) => {
    router.push({
      pathname: '/tasks/[id]',
      params: { id: index.toString() },
    });
  };

  // ✅ NUEVO: ver detalle de la tarea
  const handleViewTask = (index: number) => {
    router.push({
      pathname: '/tasks/detail/[id]',
      params: { id: index.toString() },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Tareas</Text>

      <TextInput
        style={styles.input}
        placeholder="Título de la tarea"
        value={newTitle}
        onChangeText={setNewTitle}
      />
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Descripción (opcional)"
        value={newDescription}
        onChangeText={setNewDescription}
        multiline
      />

      <Button title="Agregar tarea" onPress={handleAddTask} />

      <FlatList
        data={tasks}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TaskItem
            title={item.title}
            description={item.description}
            onPress={() => handleViewTask(index)} // ir al detalle al tocar
            onEdit={() => editTask(index)}
            onDelete={() => handleDeleteTask(index)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
});
