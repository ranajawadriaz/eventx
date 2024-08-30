import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Pressable,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Font from 'expo-font';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice'; // Redux action
import * as FileSystem from 'expo-file-system';
import * as Notifications from 'expo-notifications'; // Import Notifications

const loadFonts = async () => {
  await Font.loadAsync({
    JetBrainsMono: require('../assets/fonts/JetBrainsMono-Regular.ttf'), // Adjust the path as needed
  });
};

const SignUpScreen = ({ navigation }: any) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [selectedRole, setSelectedRole] = useState('User');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  // Function to send a notification
  const sendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Event X 🎉', // Custom title
        body: 'You have successfully registered!',
        sound: 'default',
        // channelId: 'default', // Correctly include channelId directly inside the content object
      },
      trigger: null, // Send immediately
    });
  };
  
  
  

  const saveCredentials = async () => {
    const filePath =
      selectedRole === 'User'
        ? FileSystem.documentDirectory + 'users.json'
        : FileSystem.documentDirectory + 'planners.json';
    try {
      const fileExists = await FileSystem.getInfoAsync(filePath);
      let data = [];
      if (fileExists.exists) {
        const json = await FileSystem.readAsStringAsync(filePath);
        data = JSON.parse(json);
      }
      data.push({ username, password });
      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(data));
      Alert.alert('Success', 'Account created successfully!');
      sendNotification(); // Trigger notification after successful registration
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error saving credentials:', error);
      Alert.alert('Error', 'Failed to create an account.');
    }
  };

  if (!fontsLoaded) {
    return null; // Render null or a loading indicator while fonts are loading
  }

  const handleSignUpPress = () => {
    if (username && password) {
      saveCredentials();
    } else {
      Alert.alert('Validation Error', 'Please fill in all fields.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.innerContainer}>
        <Text style={styles.heading}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="FirstName"
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="LastName"
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#888"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Pressable style={styles.signUpButton} onPress={handleSignUpPress}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </Pressable>
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Login</Text>
          </Pressable>
        </View>
        <Picker
          selectedValue={selectedRole}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedRole(itemValue)}
        >
          <Picker.Item label="User" value="User" />
          <Picker.Item label="Planner" value="Planner" />
        </Picker>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c22',
    paddingTop: StatusBar.currentHeight,
    justifyContent: 'center',
  },
  innerContainer: {
    alignItems: 'center',
  },
  heading: {
    color: '#00ff99',
    fontSize: 32,
    fontFamily: 'JetBrainsMono',
    marginBottom: 40,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#2c2c34',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#fff',
    fontFamily: 'JetBrainsMono',
  },
  signUpButton: {
    backgroundColor: '#00ff99',
    width: '80%',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  signUpButtonText: {
    color: '#1c1c22',
    fontSize: 18,
    fontFamily: 'JetBrainsMono',
  },
  footerContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  footerText: {
    color: '#fff',
    fontFamily: 'JetBrainsMono',
  },
  loginLink: {
    color: '#00ff99',
    fontFamily: 'JetBrainsMono',
  },
  picker: {
    width: '80%',
    color: '#fff',
    backgroundColor: '#2c2c34',
    borderRadius: 5,
    fontFamily: 'JetBrainsMono',
  },
});

export default SignUpScreen;
