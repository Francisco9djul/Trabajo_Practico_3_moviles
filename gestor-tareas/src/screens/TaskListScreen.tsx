import React from 'react';
import { View, FlatList, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';
import TaskItem from '../components/TaskItem'; // componente personalizado que vos creaste

const dummyTasks = [
  { id: '1', title: 'Comprar pan', description: 'Ir a la panadería' },
  { id: '2', title: 'Estudiar', description: 'Repasar teoría de React Native' },
];

export default function TaskListScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <FlatList
        data={dummyTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TaskItem title={item.title} />}
      />
      <Button title="Agregar Tarea" onPress={() => router.push('/new')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
});
