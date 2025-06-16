import DropDownPicker from 'react-native-dropdown-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Button from '../../src/components/Button';
import { useTasks } from '../../src/context/TaskContext';

export default function EditTaskScreen() {
  const { id } = useLocalSearchParams();
  const { tasks, editTask } = useTasks();
  const router = useRouter();
  const index = Number(id);

  useEffect(() => {
    if (isNaN(index) || index < 0 || index >= tasks.length) {
      Alert.alert('Error', 'Id de tarea inválido');
      router.push('/tasks');
    }
  }, [index, tasks]);

  const task = tasks[index];

  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');

  const [priorityOpen, setPriorityOpen] = useState(false);
  const [priority, setPriority] = useState(task?.priority || 'Media');
  const [priorityItems, setPriorityItems] = useState([
    { label: 'Baja', value: 'Baja' },
    { label: 'Media', value: 'Media' },
    { label: 'Alta', value: 'Alta' },
  ]);

  const [statusOpen, setStatusOpen] = useState(false);
  const [status, setStatus] = useState(task?.status || 'Pendiente');
  const [statusItems, setStatusItems] = useState([
    { label: 'Pendiente', value: 'Pendiente' },
    { label: 'En Proceso', value: 'En Proceso' },
    { label: 'Completada', value: 'Completada' },
  ]);

  useEffect(() => {
    if (priorityOpen) setStatusOpen(false);
    if (statusOpen) setPriorityOpen(false);
  }, [priorityOpen, statusOpen]);

  const saveTask = () => {
    if (title.trim() === '') {
      Alert.alert('Error', 'El título no puede estar vacío');
      return;
    }

    const updatedTask = { title, description, priority, status };
    editTask(index, updatedTask);
    router.push('/tasks');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <ScrollView contentContainerStyle={styles.container}>
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

          <Text style={styles.label}>Prioridad</Text>
          <View style={{ zIndex: priorityOpen ? 2000 : 1000 }}>
            <DropDownPicker
              open={priorityOpen}
              value={priority}
              items={priorityItems}
              setOpen={setPriorityOpen}
              setValue={setPriority}
              setItems={setPriorityItems}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropDownContainer}
            />
          </View>

          <Text style={styles.label}>Estado</Text>
          <View style={{ zIndex: statusOpen ? 2000 : 1000 }}>
            <DropDownPicker
              open={statusOpen}
              value={status}
              items={statusItems}
              setOpen={setStatusOpen}
              setValue={setStatus}
              setItems={setStatusItems}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropDownContainer}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Guardar cambios" onPress={saveTask} />
            <Button title="Cancelar" onPress={() => router.push('/tasks')} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { padding: 20, backgroundColor: '#fff', flexGrow: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
  },
  label: { marginTop: 10, marginBottom: 5, fontWeight: '600' },
  dropdown: {
    borderColor: '#ccc',
    marginBottom: 15,
  },
  dropDownContainer: {
    borderColor: '#ccc',
    zIndex: 1000,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
