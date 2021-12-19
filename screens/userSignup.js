import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Alert,StatusBar,Image } from "react-native";
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, auth } from '../config/firebase';


export default function UserSignup({ navigation }){
    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")

    const register = () => {
        createUserWithEmailAndPassword(auth, userEmail, userPassword)
            .then((res) => {
                Alert.alert(`${res.user.email} Resgistration Complete`)
                navigation.navigate('UserLogin')
                setUserName("")
                setUserEmail("")
                setUserPassword("")
            })
            .catch((err) => {
                Alert.alert(err.message)
            })
    }

    return (
        <><Image
            style={styles.tinyLogo}
            source={require('../assets/splash.png')} />
            <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: 'center', alignItems: "center" }}>
                    <Text style={styles.heading}>Sign Up</Text>
                    <Text style={styles.underheading}>Add your details to Sign Up</Text>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Name"
                        placeholderTextColor={"#afafaf"}
                        onChangeText={(val) => setUserName(val)} 
                        value={userName}/>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Email"
                        placeholderTextColor={"#afafaf"}
                        keyboardType={"email-address"}
                        onChangeText={(val) => setUserEmail(val)}
                        value={userEmail} />
                    <TextInput
                        style={styles.inputText}
                        placeholder="Password"
                        placeholderTextColor={"#afafaf"}
                        secureTextEntry={true}
                        onChangeText={(val) => setUserPassword(val)} 
                        value={userPassword}/>
                    <TouchableOpacity onPress={register} activeOpacity={0.6} style={styles.button}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                    <View style={{ marginVertical: 20,flexDirection:"row"}}>
                    <Text style={styles.underheading}>Already have account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('UserLogin')}>
                            <Text style={styles.signupText}>Login</Text>
                        </TouchableOpacity>
                </View>
            </ScrollView></>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%"
    },
    tinyLogo: {
        width: 120,
        height: 120,
        resizeMode: "contain",
        paddingTop: StatusBar.currentHeight,
        alignSelf: 'center',
        marginTop: 20
    },
    heading: {
        color: "#222",
        fontSize: 32,
        marginVertical: 10
    },
    underheading: {
        color: "#22222294",
        fontSize: 14,
        marginBottom: 10,
    },
    inputText: {
        height: 50,
        padding: 10,
        marginVertical: 10,
        backgroundColor: "#8080801c",
        borderRadius: 25,
        width: "80%",
        color: "#000"
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        marginVertical: 20,
        backgroundColor: "#89C343",
        borderRadius: 25,
        width: "80%",
    },
    buttonText: {
        color: "#000",
        fontSize: 14
    },
    signupText: {
        color: "#89C343",
        fontSize: 14,
        marginLeft: 5
    }

})
