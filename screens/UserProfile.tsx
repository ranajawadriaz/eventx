import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Pressable, Modal, ScrollView } from 'react-native';
import * as Font from 'expo-font';

const loadFonts = async () => {
  await Font.loadAsync({
    'JetBrainsMono': require('../assets/fonts/JetBrainsMono-Regular.ttf'),
  });
};

// Define the type for the profile details
interface ProfileDetail {
  id: string;
  title: string;
  detail: string;
}

const UserProfile = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<ProfileDetail | null>(null);

  // Dummy data for the profile
  const profileData = {
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "A short bio about John Doe. Enthusiast in tech and gadgets.",
  };

  // Dummy data for profile details
  const profileDetails: ProfileDetail[] = [
    { id: '1', title: 'Address', detail: '123 Main Street, Springfield' },
    { id: '2', title: 'Phone', detail: '+1234567890' },
    { id: '3', title: 'Company', detail: 'Tech Innovations Inc.' },
    // Add more items as needed
  ];

  // Function to open modal with selected detail
  const openModal = (item: ProfileDetail) => {
    setSelectedDetail(item);
    setModalVisible(true);
  };

  // Function to close detail modal
  const closeModal = () => {
    setModalVisible(false);
    setSelectedDetail(null);
  };

  // Function to open delete confirmation modal
  const openDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  // Function to close delete confirmation modal
  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
  };

  // Function to handle profile deletion
  const handleDeleteProfile = () => {
    // Perform the deletion logic here (dummy action for now)
    // alert('Profile deleted!');
    closeDeleteModal();
  };

  if (!fontsLoaded) {
    loadFonts().then(() => setFontsLoaded(true));
    return null; // Render null or a loading indicator while fonts are loading
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Profile Information */}
        <View style={styles.profileContainer}>
          <Text style={styles.profileName}>{profileData.name}</Text>
          <Text style={styles.profileEmail}>{profileData.email}</Text>
          <Text style={styles.profileBio}>{profileData.bio}</Text>
        </View>

        {/* Profile Details */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Profile Details</Text>
          {profileDetails.map((item) => (
            <Pressable key={item.id} style={styles.itemContainer} onPress={() => openModal(item)}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDetail}>{item.detail}</Text>
            </Pressable>
          ))}
        </View>

        {/* Delete Profile Button */}
        <Pressable style={styles.deleteButton} onPress={openDeleteModal}>
          <Text style={styles.deleteButtonText}>Delete Profile</Text>
        </Pressable>

        {/* Modal for Detail Information */}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {selectedDetail && (
                <>
                  <Text style={styles.modalTitle}>{selectedDetail.title}</Text>
                  <Text style={styles.modalDetail}>{selectedDetail.detail}</Text>
                </>
              )}
              <Pressable style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {/* Modal for Delete Confirmation */}
        <Modal
          visible={deleteModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={closeDeleteModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Confirm Deletion</Text>
              <Text style={styles.modalDetail}>Are you sure you want to delete your profile?</Text>
              <View style={styles.modalButtonContainer}>
                <Pressable style={styles.confirmButton} onPress={handleDeleteProfile}>
                  <Text style={styles.confirmButtonText}>Delete</Text>
                </Pressable>
                <Pressable style={styles.cancelButton} onPress={closeDeleteModal}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c22',
    paddingTop: 20,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  profileContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  profileName: {
    fontSize: 28,
    color: '#00ff99',
    fontFamily: 'JetBrainsMono',
  },
  profileEmail: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'JetBrainsMono',
    marginVertical: 5,
  },
  profileBio: {
    fontSize: 16,
    color: '#888',
    fontFamily: 'JetBrainsMono',
    textAlign: 'center',
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
  itemTitle: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'JetBrainsMono',
  },
  itemDetail: {
    fontSize: 14,
    color: '#888',
    fontFamily: 'JetBrainsMono',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#1c1c22',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    color: '#00ff99',
    fontFamily: 'JetBrainsMono',
    marginBottom: 10,
  },
  modalDetail: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'JetBrainsMono',
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  confirmButton: {
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'JetBrainsMono',
  },
  cancelButton: {
    backgroundColor: '#888',
    padding: 10,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'JetBrainsMono',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'JetBrainsMono',
  },
  closeButton: {
    backgroundColor: '#00ff99',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#1c1c22',
    fontSize: 18,
    fontFamily: 'JetBrainsMono',
  },
});

export default UserProfile;
