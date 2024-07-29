
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// //import { StatusBar } from 'expo-status-bar';
// import * as Font from 'expo-font';
// import { useEffect,useState } from 'react';
// import { StyleSheet,StatusBar, Text, TextInput, View, Button, SafeAreaView, useColorScheme, Pressable,KeyboardAvoidingView } from 'react-native';

// const loadFonts = async () => {
//   await Font.loadAsync({
//     'JetBrainsMono': require('../assets/fonts/JetBrainsMono-Regular.ttf'), // Adjust the path as needed
//   });
// };

// export default function HomeScreen() {
//     const [fontsLoaded, setFontsLoaded] = useState(false);


//     const colorScheme = useColorScheme();

// useEffect(() => {
//     loadFonts().then(() => setFontsLoaded(true));
//   }, []);

//   useEffect(() => {
//     if (colorScheme === 'dark') {
//       StatusBar.setBarStyle('light-content');
//       StatusBar.setBackgroundColor('#000000');  // or any dark color
//     } else {
//       StatusBar.setBarStyle('dark-content');
//       StatusBar.setBackgroundColor('#ffffff');  // or any light color
//     }
//   }, [colorScheme]);


//     return (

//         <View style={styles.parent}>
//             {/* <KeyboardAvoidingView> */}
//             <View style={styles.signUpContainer}>
//                 <Text style={styles.signUpTxt}>Sign Up</Text>
//             </View>
//             <View style={styles.textInputContainer}>
//                 <TextInput style={styles.textInput_} placeholder='First Name' placeholderTextColor='rgba(255, 255, 255, 0.45)' />
//                 <TextInput style={styles.textInput_} placeholder='Last Name' placeholderTextColor='rgba(255, 255, 255, 0.45)' />
//                 <TextInput style={styles.textInput_} placeholder='Username' placeholderTextColor='rgba(255, 255, 255, 0.45)' />
//                 <TextInput style={styles.textInput_} placeholder='Email' placeholderTextColor='rgba(255, 255, 255, 0.45)' />
//                 <TextInput style={styles.textInput_} placeholder='Password' placeholderTextColor='rgba(255, 255, 255, 0.45)' />

//             </View>
//             <View style={styles.buttonArea}>
//                 {/* <Button title='halo' /> */}
//                 <Pressable style={styles.buttonAreaPressable}><Text style={styles.registerTxt}>Register</Text></Pressable>
//                 <Text style={styles.loginTxt}>Already have an account? Login</Text>
//             </View>
//             {/* </KeyboardAvoidingView> */}
//         </View>

//     );
// }


// const styles = StyleSheet.create({
//     appContainer: {
//         paddingTop: 40,//whole inside spacing of container
//         paddingHorizontal: 16,
//         // borderWidth:1,
//         // borderColor:'red',
//         flex: 1,//container stretched in main axis of the root mobile container which is column
//     },

//     inputContainer: {

//         flexDirection: 'row',//the elements inside the container will be placed like row
//         justifyContent: 'space-between',//to place spacing between elements in container
//         alignItems: 'center',//default was stretch so the childs were stretching in the cross axis
//         // paddingBottom:24,
//         marginBottom: 24,
//         paddingTop: 15,
//         borderBottomWidth: 1,
//         borderBottomColor: '#cccccc',
//         flex: 1,//container stretched in main axis of the app container(parent) which is column
//     },

//     textInput: {
//         width: '65%',//this text input element will take 80%of the container space in which it is contained
//         borderWidth: 1,
//         borderColor: '#cccccc',
//         margin: 8,//to place spacing between elements in container
//         padding: 8,// to place spacing inside the element

//     },

//     headerContainer: {
//         alignItems: 'center',


//     },

//     // container: {
//     //     flex: 1,
//     // },
//     // themedView: {
//     //     flex: 1,
//     //     justifyContent: 'center',
//     //     alignItems: 'center',
//     // },
//     // themedText: {
//     //     fontSize: 20,
//     // },

//     inputBarTxt:{
//         marginLeft:8,

//     },



//     textInput_:{
//         margin:8,
//         padding:11,
//         paddingLeft:18,
//         borderWidth:1,
//         borderColor:'rgba(255, 255, 255, 0.1)',
//         color:'white',
//         borderRadius:8,
//         backgroundColor:'#1c1c22',
//         fontFamily: 'JetBrainsMono',



//         // borderColor:'rgba(255, 255, 255, 0.6)'


//     },

//     parent:{
//         flex:1,
//         backgroundColor:'#1c1c22',


//     },

//     signUpContainer:{/////////////////////////////////
//         flex:0.5,
//         // borderWidth:1,
//         // borderColor:'red',
//         justifyContent:'center',
//         margin:12,
//         padding:25,
//         paddingLeft:25

//         // fontSize:90
//         // color:'r'


//     },

//     textInputContainer:{//////////////////////////////////
//         flex:2,
//         // borderWidth:1,
//         // borderColor:'red',
//         margin:12,
//         padding:12,
//         backgroundColor:'#27272c',
//         borderRadius:8,
//         justifyContent:'center'



//     },

//     signUpTxt:{
//         color:'#00ff99',
//         fontFamily: 'JetBrainsMono',
//         fontSize:40,


//     },

//     registerTxt:{
//         color:'#1c1c22',
//         fontFamily: 'JetBrainsMono',

//         fontSize:18,
//         // fontFamily: 'JetBrainsMono',

//     },

//     buttonArea:{//////////////////////////////////
//         // borderWidth:1,
//         // borderColor:'red',
//         flex:1,
//         alignItems:'center',
//         padding:8,
//         margin:8

//     },

//     buttonAreaPressable:{///////////////////////////////////
//         // alignItems:'center'
//         // borderWidth:1,
//         // borderColor:'red',
//         alignItems:'center',
//         backgroundColor:'#00ff99',
//         margin:20,
//         padding:12,
//         borderRadius:30,
//         width:'85%'



//     },

//     loginTxt:{
//         color:'#00ff99',
//         fontFamily: 'JetBrainsMono',
//         fontSize:12


//     }





// });