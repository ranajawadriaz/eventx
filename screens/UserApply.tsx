import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    FlatList,
    Pressable,
    Modal,
} from 'react-native';
import * as Font from 'expo-font';
import eventsData from '../assets/data/events.json'; // Adjust the path according to your project structure

// Define the type for Event
type Event = {
    id: string;
    name: string;
    date: string;
    location: string;
};

const loadFonts = async () => {
    await Font.loadAsync({
        'JetBrainsMono': require('../assets/fonts/JetBrainsMono-Regular.ttf'),
    });
};

const UserApply = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    useEffect(() => {
        loadFonts().then(() => setFontsLoaded(true));
    }, []);

    if (!fontsLoaded) {
        return null; // Render null or a loading indicator while fonts are loading
    }

    const handleApplyPress = (event: Event) => {
        setSelectedEvent(event);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedEvent(null);
    };

    const renderEventItem = ({ item }: { item: Event }) => (
        <View style={styles.itemContainer}>
            <View style={styles.itemTextContainer}>
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={styles.itemSubText}>{item.date}</Text>
                <Text style={styles.itemSubText}>{item.location}</Text>
            </View>
            <Pressable style={styles.applyButton} onPress={() => handleApplyPress(item)}>
                <Text style={styles.applyButtonText}>Apply</Text>
            </Pressable>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <FlatList
                data={eventsData}
                renderItem={renderEventItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
            />

            {/* Modal for event details */}
            {selectedEvent && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>{selectedEvent.name}</Text>
                            <Text style={styles.modalText}>Date: {selectedEvent.date}</Text>
                            <Text style={styles.modalText}>Location: {selectedEvent.location}</Text>
                            <Text style={styles.modalText}>Description: This is a detailed description of the event. It can include more information about the agenda, speakers, and what attendees can expect.</Text>
                            <Pressable style={styles.closeButton} onPress={closeModal}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c1c22',
        paddingTop: StatusBar.currentHeight,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    itemContainer: {
        backgroundColor: '#2c2c34',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemTextContainer: {
        flex: 1,
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
    applyButton: {
        backgroundColor: '#00ff99',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    applyButtonText: {
        color: '#1c1c22',
        fontSize: 16,
        fontFamily: 'JetBrainsMono',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent background
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#2c2c34',
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 24,
        color: '#00ff99',
        fontFamily: 'JetBrainsMono',
        marginBottom: 15,
    },
    modalText: {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'JetBrainsMono',
        marginBottom: 10,
    },
    closeButton: {
        backgroundColor: '#00ff99',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    closeButtonText: {
        color: '#1c1c22',
        fontSize: 16,
        fontFamily: 'JetBrainsMono',
    },
});

export default UserApply;
