import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PlannerHome from '@/screens/PlannerHome';
import PlannerApply from '@/screens/PlannerApply';
import PlannerChat from '@/screens/PlannerChat';
import PlannerProfile from '@/screens/PlannerProfile';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const PlannerTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerTitle:'Event X',
                
                
                headerStyle: {
                    backgroundColor: '#2c2c34', // Background color for the header
                    
                },
                headerTintColor: '#00ff99', // Color for the header text
                headerTitleStyle: {
                    fontFamily: 'JetBrainsMono', // Use your custom font
                    fontSize: 20,
                },
                tabBarStyle: {
                    backgroundColor: '#2c2c34', // Better contrast background color for the tab bar
                },
                tabBarActiveTintColor: '#00ff99', // Color for the active tab icon and label
                tabBarInactiveTintColor: '#888', // Color for the inactive tab icon and label
                tabBarLabelStyle: {
                    fontFamily: 'JetBrainsMono', // Use your custom font for tab labels
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: 'home' | 'home-outline' | 'checkmark-circle' | 'checkmark-circle-outline' | 'chatbubble' | 'chatbubble-outline' | 'person' | 'person-outline';

                    switch (route.name) {
                        case 'Home':
                            iconName = focused ? 'home' : 'home-outline';
                            break;
                        case 'Apply':
                            iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline';
                            break;
                        case 'Chat':
                            iconName = focused ? 'chatbubble' : 'chatbubble-outline';
                            break;
                        case 'Profile':
                            iconName = focused ? 'person' : 'person-outline';
                            break;
                        default:
                            iconName = 'home-outline'; // Default icon
                            break;
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={PlannerHome} options={{
                
            }} />
            <Tab.Screen name="Apply" component={PlannerApply} />
            <Tab.Screen name="Chat" component={PlannerChat} />
            <Tab.Screen name="Profile" component={PlannerProfile} />
        </Tab.Navigator>
    );
};

export default PlannerTabs;
