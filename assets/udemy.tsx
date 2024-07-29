import { useState } from 'react';

// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

export default function HomeScreen() {

    //register new state here in out homescreen component

    //user input state

    //the enteredCarCollection state which is set by setEnteredCarCollection function and initial string (enteredCarCollection) is empty

    const [enteredCarCollection, setEnteredCarCollection] = useState('');

    //list of goals state, because the list of goals is also dynamically changing data, for UI update (current changes reflect at very time)

    // in the below input car collection area, carDetails variable stores the car details like name and the setCarDetails function will set assign something to this variable, initially no cars

    const [carDetails, setCarDetails] = useState<string[]>([]);






    //to fetch information as user types and also add event listener prop onChange (that takes a function and without brackets so it will not fire the function on execution but only when the user enters somthing in the input) below in input tag

    //maintain state now like the current input value in the current state so use usestate hook
    function inputHandler(enteredText: string) {
        //console.log(enteredText)

        setEnteredCarCollection(enteredText);


    };

    function buttonClickHandler() {
        //console.log(enteredCarCollection);
        //setCarDetails([...carDetails, enteredCarCollection]); //not the best way to update state if new state depends on previous state, so pass arrow function (this function will automatically receives the existing state) inside setCarDetails which will be called by react automatically to update the state

        //the currentCars (OLD cars in list) arrow function automatically receives parameter by react

        setCarDetails(currentCars => [...carDetails, enteredCarCollection]);
        //appending the new goal in front of existing goals

        // to display we will use mapping of string array (or object array) into an array of tsx elements returned by below component, the map function receives a function and arguments as individual car stored in carDetails array


    };




    return (
        <View style={styles.appContainer}>
            <View style={styles.headerContainer}>
                <Text>Car Collection</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput style={styles.textInput} placeholder="Enter Car Model!" onChangeText={inputHandler} />

                <Button title='Add Car' onPress={buttonClickHandler} />

            </View>
            <View style={styles.goalsContainer}>
                {/* <Text>List of Cars</Text> */}
                {carDetails.map((car) => <Text key={car} style={styles.individualCar}>{car}</Text>)}
            </View>
        </View>
    );
}

//in mapping each child(item) in a list should have unique "key" prop, for efficient list updation, for now key={car} which can be same if same text is entered twice

//button don't have style prop
//handling events by event listeners functions, use states to manage state
//this is a just like react app



const styles = StyleSheet.create({
    appContainer: {
        paddingTop: 40,//whole inside spacing of container
        paddingHorizontal: 16,
        // borderWidth:1,
        // borderColor:'red',
        flex: 1,//container stretched in main axis of the root mobile container which is column
    },

    inputContainer: {

        flexDirection: 'row',//the elements inside the container will be placed like row
        justifyContent: 'space-between',//to place spacing between elements in container
        alignItems: 'center',//default was stretch so the childs were stretching in the cross axis
        // paddingBottom:24,
        marginBottom: 24,
        paddingTop: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        flex: 1,//container stretched in main axis of the app container(parent) which is column
    },

    textInput: {
        width: '65%',//this text input element will take 80%of the container space in which it is contained
        borderWidth: 1,
        borderColor: '#cccccc',
        margin: 8,//to place spacing between elements in container
        padding: 8,// to place spacing inside the element

    },

    headerContainer: {
        alignItems: 'center',


    },

    goalsContainer: {
        flex: 5,//container stretched in main axis of the app container(parent) which is column
    },

    individualCar: {
        margin: 8,
        padding: 8,
        borderRadius: 6,
        backgroundColor: '#5e0acc',
        color: 'white'

    }

});