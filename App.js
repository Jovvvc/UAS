import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Device from 'expo-device';
import { Pedometer } from 'expo-sensors';

export default function App() {
  const [steps, setSteps] = useState(0);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState(false);

  // Mengecek apakah perangkat mendukung pedometer
  useEffect(() => {
    if (Device.isDevice) {
      Pedometer.isAvailableAsync().then(
        (result) => setIsPedometerAvailable(result),
        (error) => console.log(error)
      );
    } else {
      console.log("Pedometer is not available on this device.");
    }
  }, []);

  // Mengambil data langkah
  useEffect(() => {
    let subscription;
    if (isPedometerAvailable) {
      subscription = Pedometer.watchStepCount((result) => {
        setSteps(result.steps);
      });
    }

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [isPedometerAvailable]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pedometer</Text>
      <Text style={styles.steps}>Steps: {steps}</Text>
      <Button title="Reset Steps" onPress={() => setSteps(0)} />
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  steps: {
    fontSize: 18,
    marginTop: 20,
  },
});
