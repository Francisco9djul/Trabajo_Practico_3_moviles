// src/components/TaskItem.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';

interface TaskItemProps {
  title: string;
  onPress?: () => void;         // Para acción general al presionar la tarea
  onEdit?: () => void;          // Para botón editar
  onDelete?: () => void;        // Para botón eliminar
}

export default function TaskItem({ title, onPress, onEdit, onDelete }: TaskItemProps) {
  return (
  <View style={styles.container}>
    <Text style={styles.text}>{title}</Text>

    <View style={styles.buttonsContainer}>
      {onEdit && (
        <TouchableOpacity onPress={onEdit} style={styles.buttonEdit}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
      )}
      {onDelete && (
        <TouchableOpacity onPress={onDelete} style={styles.buttonDelete}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  buttonEdit: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  buttonDelete: {
    backgroundColor: '#F44336',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});