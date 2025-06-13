import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useTasks } from '../../src/context/TaskContext';
import TaskForm, { Task } from '../../src/screens/TaskForm';

export default function NewTaskScreen() {
  const { addTask } = useTasks();
  const router = useRouter();

  const handleCreateTask = (task: Task) => {
    // Agrega la tarea usando el contexto
    addTask(task);

     Alert.alert(
      'Tarea guardada',
      `Título: ${task.title}\nDescripción: ${task.description}\nPrioridad: ${task.priority}\nEstado: ${task.status}`
    );

     router.back();
  };

  return (
    <View style={styles.container}>
      <TaskForm onSubmit={handleCreateTask} />  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
});
