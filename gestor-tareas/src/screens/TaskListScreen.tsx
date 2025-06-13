import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Button from '../../src/components/Button';
import TaskItem from '../../src/components/TaskItem';
import { useTasks } from '../../src/context/TaskContext';

type Priority = 'Alta' | 'Media' | 'Baja';
type Status = 'Pendiente' | 'En Proceso' | 'Completada';

export default function TaskListScreen() {
  const { tasks, deleteTask } = useTasks();
  const router = useRouter();

  const [priorityFilter, setPriorityFilter] = useState<Priority | 'Todas'>('Todas');
  const [statusFilter, setStatusFilter] = useState<Status | 'Todos'>('Todos');

  const filteredTasks = tasks.filter(task =>
    (priorityFilter === 'Todas' || task.priority === priorityFilter) &&
    (statusFilter === 'Todos' || task.status === statusFilter)
  );

  const handleDeleteTask = (index: number) => {
    deleteTask(index);
  };

  const editTask = (index: number) => {
    router.push({
      pathname: '/tasks/[id]',
      params: { id: index.toString() },
    });
  };

  const handleViewTask = (index: number) => {
    router.push({
      pathname: '/tasks/detail/[id]',
      params: { id: index.toString() },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Tareas</Text>

      <Text style={styles.filterTitle}>Filtrar por Prioridad:</Text>
      <Picker
        selectedValue={priorityFilter}
        onValueChange={(value) => setPriorityFilter(value)}
        style={styles.picker}
      >
        <Picker.Item label="Todas" value="Todas" />
        <Picker.Item label="Alta" value="Alta" />
        <Picker.Item label="Media" value="Media" />
        <Picker.Item label="Baja" value="Baja" />
      </Picker>

      <Text style={styles.filterTitle}>Filtrar por Estado:</Text>
      <Picker
        selectedValue={statusFilter}
        onValueChange={(value) => setStatusFilter(value)}
        style={styles.picker}
      >
        <Picker.Item label="Todos" value="Todos" />
        <Picker.Item label="Pendiente" value="Pendiente" />
        <Picker.Item label="En Proceso" value="En Proceso" />
        <Picker.Item label="Completada" value="Completada" />
      </Picker>

      {filteredTasks.length === 0 ? (
        <Text style={styles.noTasks}>No hay tareas que coincidan con los filtros.</Text>
      ) : (
        <FlatList
          data={filteredTasks}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TaskItem
              title={item.title}
              description={item.description}
              priority={item.priority}
              status={item.status}
              onPress={() => handleViewTask(index)}
              onEdit={() => editTask(index)}
              onDelete={() => handleDeleteTask(index)}
            />
          )}
        />
      )} 
      <Button title="Volver" onPress={() => router.push('./(tabs)')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  filterTitle: { marginTop: 10, fontWeight: '600' },
  picker: {
    height: 50,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
  },
  noTasks: {
    fontStyle: 'italic',
    color: '#555',
    marginTop: 20,
    textAlign: 'center',
  },
});
