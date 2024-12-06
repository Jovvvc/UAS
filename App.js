import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Magnetometer } from 'expo-sensors';

export default function App() {
  const [magnetometerData, setMagnetometerData] = useState(null);

  useEffect(() => {
    // Start reading data from the magnetometer
    const subscription = Magnetometer.addListener((data) => {
      setMagnetometerData(data);
    });

    // Clean up when the component is unmounted
    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Magnetometer Data</Text>
      {magnetometerData ? (
        <Text style={styles.text}>
          X: {magnetometerData.x.toFixed(2)} {'\n'}
          Y: {magnetometerData.y.toFixed(2)} {'\n'}
          Z: {magnetometerData.z.toFixed(2)}
        </Text>
      ) : (
        <Text style={styles.text}>Loading data...</Text>
      )}
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
  text: {
    fontSize: 18,
  },
});
