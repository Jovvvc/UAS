import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import GyroScreen  from './GyroScreen';

console.log(GyroScreen); // This should log a function
export default function App() {
    return (
        <View style={styles.container}>
            <GyroScreen />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

