// src/components/EmptyList.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EmptyList() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No hay tareas por ahora 💤</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  text: {
    color: '#888',
    fontSize: 16,
    fontStyle: 'italic',
  },
});
