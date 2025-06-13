import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Button from '../../src/components/Button';

type Weather = {
  temperature: number;
  weathercode: number;
  time: string;
};

export default function MainScreen() {
  const router = useRouter();
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const weatherCodeToEmoji = (code: number): string => {
    if (code === 0) return '☀️';
    if ([1, 2, 3].includes(code)) return '⛅️';
    if ([45, 48].includes(code)) return '🌫️';
    if ([51, 53, 55].includes(code)) return '🌦️';
    if ([61, 63, 65].includes(code)) return '🌧️';
    if ([71, 73, 75].includes(code)) return '🌨️';
    if ([80, 81, 82].includes(code)) return '⛈️';
    if ([95, 96, 99].includes(code)) return '🌩️';
    return '❓';
  };

  const fetchWeather = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(
        'http://api.open-meteo.com/v1/forecast?latitude=-34.61&longitude=-58.38&current_weather=true'
      );
      const data = await res.json();
      setWeather(data.current_weather);
    } catch (e) {
      setError('Error al obtener el clima');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  // Formatear la fecha en formato legible
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('es-AR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginBottom: 20 }} />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : weather ? (
        <>
          <Text style={styles.emoji}>{weatherCodeToEmoji(weather.weathercode)}</Text>
          <Text style={styles.temp}>{weather.temperature}°C</Text>
          <Text style={styles.date}>{formatDate(weather.time)}</Text>
          <Text style={styles.desc}>Clima actual en Buenos Aires</Text>
        </>
      ) : null}

      <Button title="Ir a Lista de Tareas" onPress={() => router.push('./tasks')} />
      <Button title="Actualizar Clima" onPress={fetchWeather} />
       <Button title="Crear Nueva Tarea" onPress={() => router.push('./tasks/newTask')} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16, backgroundColor: '#f9f9f9' },
  emoji: { fontSize: 64, textAlign: 'center', marginBottom: 12 },
  temp: { fontSize: 48, fontWeight: 'bold', textAlign: 'center' },
  date: { fontSize: 16, fontStyle: 'italic', textAlign: 'center', marginBottom: 8 },
  desc: { fontSize: 20, fontStyle: 'italic', textAlign: 'center', marginBottom: 20 },
  error: { color: 'red', fontSize: 16, textAlign: 'center', marginBottom: 16 },
});
