// src/components/TaskItem.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface TaskItemProps {
  title: string;
  description?: string;
  onPress?: () => void;       // Para tocar todo el ítem
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function TaskItem({ title, onPress, onEdit, onDelete }: TaskItemProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.touchable}>
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
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: {
    marginVertical: 6,
    borderRadius: 8,
  },
  container: {
    backgroundColor: '#fff',
    padding: 12,
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
    marginLeft: 8,
  },
  buttonDelete: {
    backgroundColor: '#F44336',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
