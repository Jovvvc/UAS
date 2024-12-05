import { View, Text, StyleSheet, Switch, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Gyroscope } from 'expo-sensors';

const GyroScreen = () => {
    const [gyroData, setGyroData] = useState({ x: 0, y: 0, z: 0 });
    const [gyroEnabled, setGyroEnabled] = useState(false);

    useEffect(() => {
        let subscription;

        if (gyroEnabled) {
            subscription = Gyroscope.addListener((gyroscopeData) => {
                setGyroData(gyroscopeData);
            });
        } else {
            subscription?.remove();
        }

        return () => {
            subscription?.remove();
        };
    }, [gyroEnabled]);

    const handleGyroToggle = () => {
        setGyroEnabled(!gyroEnabled);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Gyroscope</Text>
            <View style={styles.switchContainer}>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={gyroEnabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={handleGyroToggle}
                    value={gyroEnabled}
                    style={styles.switch}
                />
            </View>

            <View
                style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    backgroundColor: 'red',
                    transform: [
                        { translateX: gyroData.y * 10 },
                        { translateY: -gyroData.x * 10 },
                    ],
                }}
            />
        </SafeAreaView>
    );
};

export default GyroScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: 80,
    },
    switchContainer: {
        marginBottom: 60,
        marginTop: 64,
    },
    switch: {
        transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
    },
});
