// app/new.tsx
import React from 'react';
import { View, Alert } from 'react-native';
import TaskForm from '../src/screens/TaskForm'; // o '../screens/TaskForm' según tu estructura

export default function NewTaskScreen() {
  const handleCreateTask = (title: string, description: string) => {
    // Acá podrías guardar la tarea, por ahora mostramos una alerta
    Alert.alert('Tarea guardada', `Título: ${title}\nDescripción: ${description}`);
  };

  return (
    <View>
      <TaskForm onSubmit={handleCreateTask} />
    </View>
  );
}