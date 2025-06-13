import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Button from '../../src/components/Button';
import Input from '../../src/components/Input';
export type Task = {
  title: string;
  description: string;
  priority: 'Alta' | 'Media' | 'Baja';
  status: 'Pendiente' | 'En Proceso' | 'Completada';
};
export type Priority = Task['priority'];
export type Status = Task['status'];
type TaskFormProps = {
  onSubmit: (task: Task) => void;
};

export default function TaskForm({ onSubmit }: TaskFormProps) {
  
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [priorityOpen, setPriorityOpen] = useState(false);
  const [priorityValue, setPriorityValue] = useState<'Alta' | 'Media' | 'Baja'>('Media');
  const [priorityItems, setPriorityItems] = useState([
    { label: 'Alta', value: 'Alta' },
    { label: 'Media', value: 'Media' },
    { label: 'Baja', value: 'Baja' },
  ]);

  const [statusOpen, setStatusOpen] = useState(false);
  const [statusValue, setStatusValue] = useState<'Pendiente' | 'En Proceso' | 'Completada'>('Pendiente');
  const [statusItems, setStatusItems] = useState([
    { label: 'Pendiente', value: 'Pendiente' },
    { label: 'En Proceso', value: 'En Proceso' },
    { label: 'Completada', value: 'Completada' },
  ]);

  const handleSubmit = () => {
    if (!title.trim()) return;

    onSubmit({
      title,
      description,
      priority: priorityValue,
      status: statusValue,
    });

    setTitle('');
    setDescription('');
    setPriorityValue('Media');
    setStatusValue('Pendiente');
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
       
      />
      <Input
        placeholder="Descripción (opcional)"
        value={description}
        onChangeText={setDescription}
      />

      <Text>Prioridad:</Text>
      <View style={{ zIndex: 5000, marginBottom: 12 }}>
        <DropDownPicker
          open={priorityOpen}
          value={priorityValue}
          items={priorityItems}
          setOpen={setPriorityOpen}
          setValue={setPriorityValue}
          setItems={setPriorityItems}
          placeholder="Seleccione prioridad"
          listMode="SCROLLVIEW"
        />
      </View>

      <Text>Estado:</Text>
      <View style={{ zIndex: 4000, marginBottom: 12 }}>
        <DropDownPicker
          open={statusOpen}
          value={statusValue}
          items={statusItems}
          setOpen={setStatusOpen}
          setValue={setStatusValue}
          setItems={setStatusItems}
          placeholder="Seleccione estado"
          listMode="SCROLLVIEW"
        />
      </View>

      <Button title="Agregar tarea" onPress={handleSubmit} />
      <Button title="Volver" onPress={() => router.push('./(tabs)')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    padding: 10,
  },
});
