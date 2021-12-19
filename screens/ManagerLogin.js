import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView, Image, StatusBar } from "react-native";
import React, { useState } from 'react';
import { signInWithEmailAndPassword, auth } from '../config/firebase';

export default function ManagerLogin({ navigation }) {
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")

    const login = () => {
        signInWithEmailAndPassword(auth, userEmail, userPassword)
            .then((res) => {
                setUserEmail("")
                setUserPassword("")
                navigation.navigate('ManagerDashboard')
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

                <Text style={styles.heading}>Manager Login</Text>
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
                    value={userPassword} />
                <TouchableOpacity onPress={login} style={styles.button} activeOpacity={0.4}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

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
    }

})