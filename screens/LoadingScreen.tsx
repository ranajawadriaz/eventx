import React, { useState, useEffect } from 'react';

import { View, Text, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native';
import * as Font from 'expo-font';


const loadFonts = async () => {
    await Font.loadAsync({
        JetBrainsMono: require('../assets/fonts/JetBrainsMono-Regular.ttf'), // Adjust the path as needed
    });
};

const LoadingScreen = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    useEffect(() => {
        loadFonts().then(() => setFontsLoaded(true));
    }, []);

    if (!fontsLoaded) {
        return null; // Render null or a loading indicator while fonts are loading
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <ActivityIndicator size="large" color="#00ff99" style={styles.loader} />
                <Text style={styles.text}>Loading...</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1c1c22', // Background color of the loading screen
    },
    innerContainer: {
        alignItems: 'center',
    },
    loader: {
        marginBottom: 10, // Space between the loader and the text
    },
    text: {
        fontSize: 18,
        color: '#fff',
        fontFamily: 'JetBrainsMono', // Or any font you are using
    },
});

export default LoadingScreen;
