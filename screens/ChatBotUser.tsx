import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons'; // For the send icon
import LoadingScreen from '@/screens/LoadingScreen'; // Already imported component
import { GoogleGenerativeAI } from '@google/generative-ai'; // Import Generative AI SDK
// import { API_KEY } from '@env';

const apiKey = 'abcdefghijklmnopqrstuvwxyz'; // Replace with your actual API key
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

interface Message {
  type: 'user' | 'bot';
  text: string;
}

const ChatbotScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]); // State to hold chat messages
  const [inputText, setInputText] = useState(''); // State to hold user input
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Function to send message to the model
  const sendMessage = async (message: string) => {
    setIsLoading(true); // Show loading screen
    const chatSession = model.startChat({
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: 'text/plain',
      },
      history: [],
    });

    try {
      const result = await chatSession.sendMessage(message);
      const response = await result.response.text();
      // Update messages with the user input and the chatbot response
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'user', text: message },
        { type: 'bot', text: response },
      ]);
    } catch (error) {
      console.error('Error generating response:', error);
    } finally {
      setIsLoading(false); // Hide loading screen
    }
  };

  // Function to handle send button press
  const handleSend = () => {
    if (inputText.trim()) {
      sendMessage(inputText.trim());
      setInputText(''); // Clear input after sending
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjusted to handle both iOS and Android
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 120} // Offset adjusted for Android as well
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          {isLoading && <LoadingScreen />}
          <FlatList
            data={messages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.messageBubble,
                  item.type === 'user' ? styles.userBubble : styles.botBubble,
                ]}
              >
                <Text style={styles.messageText}>{item.text}</Text>
              </View>
            )}
            inverted
            contentContainerStyle={{ paddingBottom: 20 }}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type your message..."
              placeholderTextColor="#888"
              onSubmitEditing={handleSend}
              blurOnSubmit={false} // Prevent keyboard from closing on submit
            />
            <Pressable onPress={handleSend} style={styles.sendButton}>
              <Ionicons name="send" size={24} color="#00ff99" />
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ChatbotScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c2c34',
  },
  inner: {
    flex: 1,
    justifyContent: 'flex-end', // Aligns the input container at the bottom
  },
  messageBubble: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    maxWidth: '80%',
  },
  userBubble: {
    backgroundColor: '#00ff99',
    alignSelf: 'flex-end',
  },
  botBubble: {
    backgroundColor: '#444',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: '#fff',
    fontFamily: 'JetBrainsMono',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#2c2c34',
    borderTopWidth: 1,
    borderTopColor: '#444',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#00ff99',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    color: '#fff',
    fontFamily: 'JetBrainsMono',
  },
  sendButton: {
    marginLeft: 10,
  },
});
