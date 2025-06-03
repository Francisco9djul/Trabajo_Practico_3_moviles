import { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import TaskItem from '../../src/components/TaskItem';
import { useRouter } from 'expo-router';

// Importa el hook desde tu contexto
import { useTasks } from '../../src/context/TaskContext';

export default function TaskListScreen() {
  const { tasks, addTask, deleteTask } = useTasks();  // obtenemos las tareas y funciones del contexto
  const [newTask, setNewTask] = useState('');
  const router = useRouter();

  // Función para agregar tarea, llama la función del contexto
  const handleAddTask = () => {
    if (newTask.trim() === '') return;
    addTask(newTask);
    setNewTask('');
  };
//eliminar tarea usando contexto
const handleDeleteTask = (index: number) => {
  console.log('Eliminar tarea índice:', index);
  deleteTask(index);
};


  // Editar tarea, navega a la pantalla de edición (como ya tenías)
  const editTask = (index: number) => {
    router.push({
      pathname: '/tasks/[id]',
      params: { id: index.toString() },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Tareas</Text>
      <TextInput
        style={styles.input}
        placeholder="Nueva tarea"
        value={newTask}
        onChangeText={setNewTask}
      />
      <Button title="Agregar tarea" onPress={handleAddTask} />

      <FlatList
        data={tasks}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TaskItem
            title={item}
            onPress={() => {}}
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
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 },
});
