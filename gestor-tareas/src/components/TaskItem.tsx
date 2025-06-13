import { View, Text, StyleSheet, Pressable } from 'react-native';

interface TaskItemProps {
  title: string;
  description?: string;
  priority?: string;
  status?: string;
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function TaskItem({
  title,
  description,
  priority = 'Media',
  status = 'Pendiente',
  onPress,
  onEdit,
  onDelete,
}: TaskItemProps) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {description ? <Text style={styles.text}>{description}</Text> : null}

      <View style={styles.metaContainer}>
        <Text style={styles.meta}>🎯 Prioridad: <Text style={styles.value}>{priority}</Text></Text>
        <Text style={styles.meta}>📌 Estado: <Text style={styles.value}>{status}</Text></Text>
      </View>

      <View style={styles.actions}>
        {onEdit && <Text onPress={onEdit} style={styles.link}>✏️ Editar</Text>}
        {onDelete && <Text onPress={onDelete} style={styles.link}>🗑️ Eliminar</Text>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    backgroundColor: '#fefefe',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  metaContainer: {
    marginTop: 4,
  },
  meta: {
    fontSize: 13,
    color: '#666',
  },
  value: {
    fontWeight: '600',
    color: '#000',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 10,
  },
  link: {
    marginRight: 15,
    color: 'blue',
    fontSize: 14,
  },
});
