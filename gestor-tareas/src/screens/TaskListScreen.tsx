import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Button from '../../src/components/Button';
import TaskItem from '../../src/components/TaskItem';
import { useTasks } from '../../src/context/TaskContext';
import EmptyList from '../../src/components/EmptyList';

type Priority = 'Alta' | 'Media' | 'Baja';
type Status = 'Pendiente' | 'En Proceso' | 'Completada';

export default function TaskListScreen() {
  const { tasks, deleteTask } = useTasks();
  const router = useRouter();

  const [priorityOpen, setPriorityOpen] = useState(false);
  const [priorityValue, setPriorityValue] = useState<Priority | 'Todas'>('Todas');
  const [priorityItems, setPriorityItems] = useState([
    { label: 'Todas', value: 'Todas' },
    { label: 'Alta', value: 'Alta' },
    { label: 'Media', value: 'Media' },
    { label: 'Baja', value: 'Baja' },
  ]);

  const [statusOpen, setStatusOpen] = useState(false);
  const [statusValue, setStatusValue] = useState<Status | 'Todos'>('Todos');
  const [statusItems, setStatusItems] = useState([
    { label: 'Todos', value: 'Todos' },
    { label: 'Pendiente', value: 'Pendiente' },
    { label: 'En Proceso', value: 'En Proceso' },
    { label: 'Completada', value: 'Completada' },
  ]);

  const filteredTasks = tasks.filter(task =>
    (priorityValue === 'Todas' || task.priority === priorityValue) &&
    (statusValue === 'Todos' || task.status === statusValue)
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Mis Tareas</Text>

      <Text style={styles.filterTitle}>Filtrar por Prioridad:</Text>
      <View style={{ zIndex: priorityOpen ? 1000 : 1 }}>
        <DropDownPicker
          open={priorityOpen}
          value={priorityValue}
          items={priorityItems}
          setOpen={setPriorityOpen}
          setValue={setPriorityValue}
          setItems={setPriorityItems}
          placeholder="Seleccionar prioridad"
        />
      </View>

      <Text style={styles.filterTitle}>Filtrar por Estado:</Text>
      <View style={{ zIndex: statusOpen ? 999 : 0 }}>
        <DropDownPicker
          open={statusOpen}
          value={statusValue}
          items={statusItems}
          setOpen={setStatusOpen}
          setValue={setStatusValue}
          setItems={setStatusItems}
          placeholder="Seleccionar estado"
        />
      </View>

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
      ListEmptyComponent={<EmptyList />}
    />


      <Button title="Volver" onPress={() => router.push('./(tabs)')} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  filterTitle: { marginTop: 10, fontWeight: '600' },
  noTasks: {
    fontStyle: 'italic',
    color: '#555',
    marginTop: 20,
    textAlign: 'center',
  },
});
