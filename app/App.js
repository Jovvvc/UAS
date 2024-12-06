import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Platform, Text, View } from 'react-native';
import { DeviceMotion } from 'expo-sensors';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [motionData, setMotionData] = useState({
    acceleration: { x: 0, y: 0, z: 0 },
  });

  useEffect(() => {
    // Subscription to the device motion updates
    const subscription = DeviceMotion.addListener((data) => {
      setMotionData({
        acceleration: data.acceleration || { x: 0, y: 0, z: 0 },
      });
    });

    // Clean up the subscription when the component is unmounted
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Device Motion Data</ThemedText>
        <ThemedText>
          Acceleration X: {motionData.acceleration.x > 0 ? `Right (${motionData.acceleration.x.toFixed(2)})` : `Left (${motionData.acceleration.x.toFixed(2)})`}
        </ThemedText>
        <ThemedText>
          Acceleration Y: {motionData.acceleration.y > 0 ? `Up (${motionData.acceleration.y.toFixed(2)})` : `Down (${motionData.acceleration.y.toFixed(2)})`}
        </ThemedText>
        <ThemedText>
          Acceleration Z: {motionData.acceleration.z > 0 ? `Away (${motionData.acceleration.z.toFixed(2)})` : `Towards (${motionData.acceleration.z.toFixed(2)})`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 4: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
