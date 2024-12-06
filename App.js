import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function App() {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0
  });
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    // Fungsi untuk mendeteksi gerakan perangkat
    const subscription = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
      
      // Menyaring gerakan untuk mendeteksi goncangan (shake)
      const { x, y, z } = accelerometerData;
      const shakeThreshold = 1.5; // Batas ambang untuk deteksi goncangan
      if (Math.abs(x) > shakeThreshold || Math.abs(y) > shakeThreshold || Math.abs(z) > shakeThreshold) {
        setIsShaking(true);
      } else {
        setIsShaking(false);
      }
    });

    // Untuk membersihkan listener saat komponen tidak digunakan lagi
    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sensor Akselerometer</Text>
      <Text style={styles.data}>X: {data.x.toFixed(2)}</Text>
      <Text style={styles.data}>Y: {data.y.toFixed(2)}</Text>
      <Text style={styles.data}>Z: {data.z.toFixed(2)}</Text>
      {isShaking && <Text style={styles.shakeText}>Perangkat Anda sedang digoncang!</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  data: {
    fontSize: 18,
  },
  shakeText: {
    fontSize: 22,
    color: 'red',
    marginTop: 20,
  },
});
