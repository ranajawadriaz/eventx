import React, { useEffect, useState } from 'react';
import { StyleSheet, StatusBar, Text, TextInput, View, Pressable, useColorScheme } from 'react-native';
import * as Font from 'expo-font';

type DetailsProps = {
    setShowDetails: (value: boolean) => void;
};

const loadFonts = async () => {
    await Font.loadAsync({
        'JetBrainsMono': require('../assets/fonts/JetBrainsMono-Regular.ttf'), // Adjust the path as needed
    });
};

export default function Details({ setShowDetails }: DetailsProps) {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [focusedInput, setFocusedInput] = useState<string | null>(null);
    // State to track which input is focused

    // const colorScheme = useColorScheme();

    useEffect(() => {
        loadFonts().then(() => setFontsLoaded(true));
    }, []);

    // useEffect(() => {
    //     if (colorScheme === 'dark') {
    //         StatusBar.setBarStyle('light-content');
    //         StatusBar.setBackgroundColor('#000000');  // or any dark color
    //     } else {
    //         StatusBar.setBarStyle('dark-content');
    //         StatusBar.setBackgroundColor('#ffffff');  // or any light color
    //     }
    // }, [colorScheme]);

    const handleFocus = (inputName: string) => {
        setFocusedInput(inputName);
    };

    const handleBlur = () => {
        setFocusedInput(null);
    };

    if (!fontsLoaded) {
        return null; // Render null or a loading indicator while fonts are loading
    }

    return (
        <View style={styles.parent}>
            <View style={styles.signUpContainer}>
                <Text style={styles.signUpTxt}>Login
                </Text>
            </View>
            <View style={styles.textInputContainer}>



                <TextInput
                    style={[styles.textInput_, focusedInput === 'email' && styles.textInputFocused]}
                    placeholder='Username or Email'
                    placeholderTextColor='rgba(255, 255, 255, 0.45)'
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                />
                <TextInput
                    style={[styles.textInput_, focusedInput === 'password' && styles.textInputFocused]}
                    placeholder='Password'
                    placeholderTextColor='rgba(255, 255, 255, 0.45)'
                    onFocus={() => handleFocus('password')}
                    onBlur={handleBlur}
                    secureTextEntry
                />
            </View>
            <View style={styles.buttonArea}>
                {/* <Pressable style={styles.buttonAreaPressable}>
                    <Text style={styles.registerTxt}>Login</Text>
                </Pressable> */}
                <Pressable
                    style={({ pressed }) => [
                        styles.buttonAreaPressable,
                        { backgroundColor: pressed ? '#00e187' : '#00ff99' } // Change color based on pressed state
                    ]}
                // onPress={() => console.log('Login pressed')}
                >
                    <Text style={styles.registerTxt}>Login</Text>
                </Pressable>
                <View style={styles.loginView}>
                    <Text style={styles.loginBeforeTxt}>Do not have an account?</Text>
                    <Pressable onPress={() => setShowDetails(false)}>
                        <Text style={styles.loginTxt}> Sign Up</Text>

                    </Pressable>

                </View>


            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    appContainer: {
        paddingTop: 40, //whole inside spacing of container
        paddingHorizontal: 16,
        flex: 1, //container stretched in main axis of the root mobile container which is column
    },
    inputContainer: {
        flexDirection: 'row', //the elements inside the container will be placed like row
        justifyContent: 'space-between', //to place spacing between elements in container
        alignItems: 'center', //default was stretch so the childs were stretching in the cross axis
        marginBottom: 24,
        paddingTop: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        flex: 1, //container stretched in main axis of the app container(parent) which is column
    },
    textInput: {
        width: '65%', //this text input element will take 80%of the container space in which it is contained
        borderWidth: 1,
        borderColor: '#cccccc',
        margin: 8, //to place spacing between elements in container
        padding: 8, // to place spacing inside the element
    },
    headerContainer: {
        alignItems: 'center',
    },
    inputBarTxt: {
        marginLeft: 8,
    },
    textInput_: {
        margin: 8,
        padding: 11,
        paddingLeft: 18,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        color: 'white',
        borderRadius: 8,
        backgroundColor: '#1c1c22',
        fontFamily: 'JetBrainsMono',
    },
    textInputFocused: {
        borderColor: '#00ff99', // Green border for focused input
    },
    parent: {
        flex: 1,
        backgroundColor: '#1c1c22',

    },
    signUpContainer: {
        flex: 0.5,
        justifyContent: 'center',
        margin: 12,
        padding: 25,
        paddingLeft: 25,
    },
    textInputContainer: {
        flex: 0.5,
        margin: 12,
        padding: 12,
        backgroundColor: '#27272c',
        borderRadius: 8,
        justifyContent: 'space-evenly',
    },
    signUpTxt: {
        color: '#00ff99',
        fontFamily: 'JetBrainsMono',
        fontSize: 40,
    },
    registerTxt: {
        color: '#1c1c22',
        fontFamily: 'JetBrainsMono',
        fontSize: 18,
    },
    buttonArea: {
        flex: 1,
        alignItems: 'center',
        padding: 8,
        margin: 8,
    },
    buttonAreaPressable: {
        alignItems: 'center',
        backgroundColor: '#00ff99',
        margin: 20,
        padding: 12,
        borderRadius: 30,
        width: '80%',
    },
    loginTxt: {
        color: '#00ff99',
        fontFamily: 'JetBrainsMono',
        fontSize: 11,
    },

    loginView: {
        flexDirection: 'row'
    },
    loginBeforeTxt: {
        color: 'rgba(255, 255, 255, 0.95)',
        fontFamily: 'JetBrainsMono',
        fontSize: 11,

    }
});


