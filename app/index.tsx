import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@/screens/Login';
import SignUpScreen from '@/screens/SignUp';
import UserTabs from './UserTabs';
import PlannerTabs from './PlannerTabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar,Platform } from 'react-native';
import store from '@/redux/store';
import LoadingScreen from '@/screens/LoadingScreen';
import * as Notifications from 'expo-notifications'; // Import Notifications

// Configure notification settings
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAppData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate loading delay
      } catch (error) {
        console.error('Error during loading:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Request permission to show notifications
    const requestNotificationPermission = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Notification permissions not granted!');
      }
    };

    // Create a custom notification channel for Android
    const createNotificationChannel = async () => {
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'Event X', // Custom title for the notifications
          importance: Notifications.AndroidImportance.HIGH,
          sound: 'default',
        });
      }
    };

    loadAppData();
    requestNotificationPermission();
    createNotificationChannel();
  }, []);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#1c1c22"
        translucent={false}
      />
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          {isLoading ? (
            <LoadingScreen /> // Show the loading screen while loading
          ) : (
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="UserTabs"
                component={UserTabs}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="PlannerTabs"
                component={PlannerTabs}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          )}
        </GestureHandlerRootView>
      </Provider>
    </>
  );
};

export default App;
