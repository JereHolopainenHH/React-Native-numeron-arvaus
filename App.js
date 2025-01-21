import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
    const [number, setNumber] = useState('');
    const [randomNumber, setRandomNumber] = useState(0);
    const [guessCount, setGuessCount] = useState(0);
    const [text, setText] = useState('Guess a number between 1-100');

    useEffect(() => setRandomNumber(generateRandomNumber()), []);

    const generateRandomNumber = () => (Math.floor(Math.random() * 100) + 1);

    const handleChange = (value) => setNumber(value.replace(/[^0-9]/g, '')); // regex allows only numbers

    const handleSubmit = () => {
        const guess = parseInt(number);
        setGuessCount(prev => prev + 1);
        if (guess === randomNumber) {
            Alert.alert(`You guessed the number in ${guessCount} tries`);
            setGuessCount(0);
            setRandomNumber(generateRandomNumber());
            setText('Guess a number between 1-100');
        } else if (guess > randomNumber) {
            setText(`Your guess ${guess} is too high`);
        } else {
            setText(`Your guess ${guess} is too low`);
        }
    }
    return (
        <View style={styles.container}>
            <Text>{text}</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter a number"
                keyboardType="numeric"
                onChangeText={handleChange}
                value={number}
                onSubmitEditing={handleSubmit} // allows submitting using the on-screen keyboard's enter key (shouldn't use it though as it closes the keyboard... just click the button on screen with your finger)
            />
            <View>
                <Button title="Make a guess" onPress={handleSubmit} />
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#777',
        padding: 8,
        margin: 10,
        width: 200,
    }
});
