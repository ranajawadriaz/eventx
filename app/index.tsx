// import React from 'react';
// import { Provider } from 'react-redux';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import LoginScreen from '@/screens/Login';
// import SignUpScreen from '@/screens/SignUp';
// import UserTabs from './UserTabs';
// import PlannerTabs from './PlannerTabs';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { StatusBar } from 'react-native';
// import store from '@/redux/store'; // Import the Redux store

// const Stack = createNativeStackNavigator();

// const App = () => {
//   return (
//     <Provider store={store}>
//       {/* <NavigationContainer> */}
//         <StatusBar
//           barStyle="light-content"
//           backgroundColor="#1c1c22"
//           translucent={false}
//         />
//         <GestureHandlerRootView>
//           <Stack.Navigator initialRouteName="Login">
//             <Stack.Screen
//               name="Login"
//               component={LoginScreen}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="SignUp"
//               component={SignUpScreen}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="UserTabs"
//               component={UserTabs}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="PlannerTabs"
//               component={PlannerTabs}
//               options={{ headerShown: false }}
//             />
//           </Stack.Navigator>
//         </GestureHandlerRootView>
//       {/* </NavigationContainer> */}
//     </Provider>
//   );
// };

// export default App;

import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@/screens/Login';
import SignUpScreen from '@/screens/SignUp';
import UserTabs from './UserTabs';
import PlannerTabs from './PlannerTabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import store from '@/redux/store'; // Import the Redux store
import LoadingScreen from '@/screens/LoadingScreen'; // Import your custom loading screen

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const loadAppData = async () => {
      try {
        // Simulate a delay or some initialization logic
        await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 seconds delay
      } catch (error) {
        console.error('Error during loading:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAppData();
  }, []);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#1c1c22"
        translucent={false}
      />
      <Provider store={store}>
        {/* <NavigationContainer> */}

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
        {/* </NavigationContainer> */}
      </Provider>
    </>
  );
};

export default App;

