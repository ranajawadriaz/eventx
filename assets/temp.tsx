import { Image, StyleSheet, Platform, Text, TextInput, View, Button, Pressable } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import BouncyCheckbox from "react-native-bouncy-checkbox"
import { Link } from 'expo-router';

/*
html
-> p, span, h1 - h6, -----> Text
-> input ----> TextInput
-> button ----> Pressable
-> img ----> Image
-> input.type = checkbox ----> BouncyCheckbox (External Libraries)
-> CSS, SCSS, SASS, LESS ----> StyleSheet
*/

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 28, fontWeight: "600" }}>Login Page</Text>
      <TextInput keyboardType="email-address" style={styles.inputStyle} placeholder='Email' placeholderTextColor={"gray"} />
      <TextInput keyboardType="visible-password" style={styles.inputStyle} placeholder='Password' placeholderTextColor={"gray"} />
      <BouncyCheckbox
        size={20}
        fillColor="#4D7298"
        unFillColor="#FFFFFF"
        text="Remember Me"
        style={styles.rememberMeContainer}
        textStyle={{}}
        iconStyle={{ borderColor: "#4D7298" }}
        innerIconStyle={{ borderWidth: 2 }}
      />
      <Pressable style={styles.buttonStyle}>
        <Text style={{ color: "white", textAlign: "center", fontWeight: "500" }}>Login</Text>
      </Pressable>

      <Link href={"/signup"}>
        <Text style={{ fontWeight: "500" }}>
          Go to Sign Up
        </Text>
      </Link>
    </SafeAreaView>
  )
  // return (
  //   <ParallaxScrollView
  //     headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
  //     headerImage={
  //       <Image
  //         source={require('@/assets/images/partial-react-logo.png')}
  //         style={styles.reactLogo}
  //       />
  //     }>
  //     <ThemedView style={styles.titleContainer}>
  //       <ThemedText type="title">Welcome!</ThemedText>
  //       <HelloWave />
  //     </ThemedView>
  //     <ThemedView style={styles.stepContainer}>
  //       <ThemedText type="subtitle">Step 1: Try it</ThemedText>
  //       <ThemedText>
  //         Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
  //         Press{' '}
  //         <ThemedText type="defaultSemiBold">
  //           {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
  //         </ThemedText>{' '}
  //         to open developer tools.
  //       </ThemedText>
  //     </ThemedView>
  //     <ThemedView style={styles.stepContainer}>
  //       <ThemedText type="subtitle">Step 2: Explore</ThemedText>
  //       <ThemedText>
  //         Tap the Explore tab to learn more about what's included in this starter app.
  //       </ThemedText>
  //     </ThemedView>
  //     <ThemedView style={styles.stepContainer}>
  //       <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
  //       <ThemedText>
  //         When you're ready, run{' '}
  //         <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
  //         <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
  //         <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
  //         <ThemedText type="defaultSemiBold">app-example</ThemedText>.
  //       </ThemedText>
  //     </ThemedView>
  //   </ParallaxScrollView>
  // );
}

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    display: "flex",
    flexDirection: "column",
    gap: 14,
    justifyContent: 'center',
    flex: 1,
  },
  inputStyle: {
    width: 250,
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    // alignItems: "center",
    // width: "100%",
    display: "flex",
  },
  buttonStyle: {
    backgroundColor: '#4D7298',
    borderRadius: 5,
    padding: 10,
    width: 250,
  }
})
