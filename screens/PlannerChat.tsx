import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, StyleSheet, Pressable, FlatList, Modal, ScrollView, TextInput } from 'react-native';
import * as Font from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import chatData from '../assets/data/PlannerChats.json'; // Adjust the path as needed
import { Chat } from '../assets/data/types2'; // Adjust the path as needed

const loadFonts = async () => {
    await Font.loadAsync({
        'JetBrainsMono': require('../assets/fonts/JetBrainsMono-Regular.ttf'),
    });
};

const PlannerChat = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        loadFonts().then(() => setFontsLoaded(true));
    }, []);

    const openModal = (chat: Chat) => {
        setSelectedChat(chat);
        setModalVisible(true);
    };

    const closeModal = () => {
        setSelectedChat(null);
        setModalVisible(false);
    };

    if (!fontsLoaded) {
        return null; // Render null or a loading indicator while fonts are loading
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <FlatList
                data={chatData as Chat[]} // Cast the data to the Chat type
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Pressable style={styles.chatItem} onPress={() => openModal(item)}>
                        <Text style={styles.chatName}>{item.name}</Text>
                        <Text style={styles.chatLastMessage}>{item.lastMessage}</Text>
                        <Text style={styles.chatTime}>{new Date(item.time).toLocaleTimeString()}</Text>
                    </Pressable>
                )}
                contentContainerStyle={styles.listContainer}
            />

            {/* Modal for detailed chat */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <ScrollView style={styles.modalScroll}>
                            {selectedChat && (
                                <View>
                                    <Text style={styles.modalChatTitle}>Chat with {selectedChat.name}</Text>
                                    {selectedChat.messages && selectedChat.messages.map((msg:any, index:any) => (
                                        <Text key={index} style={styles.modalChatMessage}>{msg}</Text>
                                    ))}
                                </View>
                            )}
                        </ScrollView>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Type your message..."
                                placeholderTextColor="#888"
                            />
                            <Pressable
                                style={styles.sendButton}
                                onPress={() => {
                                    // Add logic for sending message if needed
                                }}
                            >
                                <Ionicons name="send" size={24} color="#00ff99" />
                            </Pressable>
                        </View>
                        <Pressable style={styles.closeButton} onPress={closeModal}>
                            <Ionicons name="close" size={24} color="#00ff99" />
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
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20, // Add padding at the bottom to avoid cutoff issues
    },
    chatItem: {
        backgroundColor: '#2c2c34',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
    },
    chatName: {
        fontSize: 18,
        color: '#fff',
        fontFamily: 'JetBrainsMono',
    },
    chatLastMessage: {
        fontSize: 14,
        color: '#888',
        fontFamily: 'JetBrainsMono',
    },
    chatTime: {
        fontSize: 12,
        color: '#888',
        fontFamily: 'JetBrainsMono',
        textAlign: 'right',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContent: {
        backgroundColor: '#1c1c22',
        borderRadius: 10,
        width: '90%',
        maxHeight: '80%',
        padding: 20,
    },
    modalScroll: {
        maxHeight: '80%',
    },
    modalChatTitle: {
        fontSize: 22,
        color: '#00ff99',
        fontFamily: 'JetBrainsMono',
        marginBottom: 10,
    },
    modalChatMessage: {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'JetBrainsMono',
        marginBottom: 10,
    },
    closeButton: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00ff99',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#1c1c22',
        fontSize: 16,
        fontFamily: 'JetBrainsMono',
        marginLeft: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#2c2c34',
        paddingVertical: 10,
    },
    textInput: {
        flex: 1,
        backgroundColor: '#2c2c34',
        color: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    sendButton: {
        marginLeft: 10,
    },
});

export default PlannerChat;
