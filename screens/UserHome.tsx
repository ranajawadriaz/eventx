import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Pressable,
    ScrollView,
    Modal,
} from 'react-native';
import * as Font from 'expo-font';

const loadFonts = async () => {
    await Font.loadAsync({
        'JetBrainsMono': require('../assets/fonts/JetBrainsMono-Regular.ttf'),
    });
};

const UserHome = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        loadFonts().then(() => setFontsLoaded(true));
    }, []);

    if (!fontsLoaded) {
        return null; // Render null or a loading indicator while fonts are loading
    }

    // Dummy data
    const pastEvents = [
        { id: '1', name: 'Event 1', date: '2024-08-20' },
        { id: '2', name: 'Event 2', date: '2024-07-15' },
    ];

    const recentTransactions = [
        { id: '1', description: 'Payment for Event 1', amount: '-$50.00', date: '2024-08-20' },
        { id: '2', description: 'Refund from Event 2', amount: '+$25.00', date: '2024-07-16' },
    ];

    const userStats = [
        { id: '1', label: 'Events Attended', value: '5' },
        { id: '2', label: 'Events Organized', value: '3' },
        { id: '3', label: 'Money Spent', value: '$200' },
        { id: '4', label: 'Average Rating', value: '4.5' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.innerContainer}>

                    {/* Current Balance */}
                    <View style={styles.balanceContainer}>
                        <Text style={styles.sectionTitle}>Current Balance</Text>
                        <Text style={styles.balanceAmount}>$150.00</Text>
                    </View>

                    {/* Past Events */}
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Past Events</Text>
                        {pastEvents.map((event) => (
                            <View key={event.id} style={styles.itemContainer}>
                                <Text style={styles.itemText}>{event.name}</Text>
                                <Text style={styles.itemSubText}>{event.date}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Recent Transactions */}
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Recent Transactions</Text>
                        {recentTransactions.map((transaction) => (
                            <View key={transaction.id} style={styles.itemContainer}>
                                <Text style={styles.itemText}>{transaction.description}</Text>
                                <Text style={styles.itemSubText}>{transaction.amount}</Text>
                                <Text style={styles.itemSubText}>{transaction.date}</Text>
                            </View>
                        ))}
                    </View>

                    {/* User Stats */}
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Your Stats</Text>
                        {userStats.map((stat) => (
                            <View key={stat.id} style={styles.statsContainer}>
                                <Text style={styles.itemText}>{stat.label}</Text>
                                <Text style={styles.itemSubText}>{stat.value}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Help & Support */}
                    <View style={styles.footerContainer}>
                        <Pressable 
                            style={styles.supportButton}
                            onPress={() => setModalVisible(true)}
                        >
                            <Text style={styles.supportButtonText}>Help & Support</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>

            {/* Help & Support Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Help & Support</Text>
                        <Text style={styles.modalText}>Developer Company: TechSavvy Solutions</Text>
                        <Text style={styles.modalText}>Email: support@techsavvy.com</Text>
                        <Text style={styles.modalText}>Phone: +1-800-123-4567</Text>
                        <Pressable 
                            style={styles.closeButton} 
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c1c22',
        paddingTop: StatusBar.currentHeight,
    },
    scrollViewContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    innerContainer: {
        flex: 1,
    },
    balanceContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    balanceAmount: {
        fontSize: 36,
        color: '#00ff99',
        fontFamily: 'JetBrainsMono',
    },
    sectionContainer: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 24,
        color: '#00ff99',
        fontFamily: 'JetBrainsMono',
        marginBottom: 10,
    },
    itemContainer: {
        backgroundColor: '#2c2c34',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
    },
    itemText: {
        fontSize: 18,
        color: '#fff',
        fontFamily: 'JetBrainsMono',
    },
    itemSubText: {
        fontSize: 14,
        color: '#888',
        fontFamily: 'JetBrainsMono',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#2c2c34',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
    },
    footerContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    supportButton: {
        backgroundColor: '#00ff99',
        width: '80%',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    supportButtonText: {
        color: '#1c1c22',
        fontSize: 18,
        fontFamily: 'JetBrainsMono',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modalContent: {
        backgroundColor: '#2c2c34',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        color: '#00ff99',
        fontFamily: 'JetBrainsMono',
        marginBottom: 20,
    },
    modalText: {
        fontSize: 18,
        color: '#fff',
        fontFamily: 'JetBrainsMono',
        marginBottom: 10,
    },
    closeButton: {
        backgroundColor: '#00ff99',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    closeButtonText: {
        color: '#1c1c22',
        fontSize: 18,
        fontFamily: 'JetBrainsMono',
    },
});

export default UserHome;
