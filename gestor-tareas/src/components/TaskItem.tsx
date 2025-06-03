// src/components/TaskItem.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

interface TaskItemProps {
  title: string;
  onPress?: () => void;
}

export default function TaskItem({ title, onPress }: TaskItemProps) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    elevation: 2,
  },
  text: {
    fontSize: 16,
  },
});
