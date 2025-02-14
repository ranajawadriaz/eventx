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

const loadFonts = async () => {
  await Font.loadAsync({
    JetBrainsMono: require('../assets/fonts/JetBrainsMono-Regular.ttf'), // Adjust the path as needed
  });
};

const LoginScreen = ({ navigation }: any) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [selectedRole, setSelectedRole] = useState('User');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  const validateCredentials = async () => {
    const filePath =
      selectedRole === 'User'
        ? FileSystem.documentDirectory + 'users.json'
        : FileSystem.documentDirectory + 'planners.json';
    try {
      const fileExists = await FileSystem.getInfoAsync(filePath);
      if (fileExists.exists) {
        const json = await FileSystem.readAsStringAsync(filePath);
        const data = JSON.parse(json);
        const user = data.find(
          (user: { username: string; password: string }) =>
            user.username === username && user.password === password
        );
        if (user) {
          dispatch(login({ role: selectedRole, username }));
          navigation.navigate(selectedRole === 'User' ? 'UserTabs' : 'PlannerTabs');
        } else {
          Alert.alert('Login Failed', 'Invalid username or password.');
        }
      } else {
        Alert.alert('Error', 'No accounts found. Please sign up first.');
      }
    } catch (error) {
      console.error('Error validating credentials:', error);
      Alert.alert('Error', 'Failed to validate credentials.');
    }
  };

  if (!fontsLoaded) {
    return null; // Render null or a loading indicator while fonts are loading
  }

  const handleLoginPress = () => {
    if (username && password) {
      validateCredentials();
    } else {
      Alert.alert('Validation Error', 'Please fill in all fields.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.innerContainer}>
        <Text style={styles.heading}>Login</Text>
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
        <Pressable style={styles.loginButton} onPress={handleLoginPress}>
          <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <Pressable onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpLink}>Sign Up</Text>
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
  loginButton: {
    backgroundColor: '#00ff99',
    width: '80%',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
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
  signUpLink: {
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

export default LoginScreen;
