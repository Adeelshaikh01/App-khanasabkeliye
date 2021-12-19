import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView, Image, StatusBar } from "react-native";
import React, { useState } from 'react';
import { signInWithEmailAndPassword, auth } from '../config/firebase';
import { useDispatch} from 'react-redux';
import { setUid } from '../slices/navSlice';


export default function UserLogin({ navigation }) {
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const dispatch = useDispatch()

    const login = () => {
        signInWithEmailAndPassword(auth, userEmail, userPassword)
            .then((res) => {
                console.log(res.user.uid)
                dispatch(setUid({
                    uID: res.user.uid
                }))
                setUserEmail("")
                setUserPassword("")
                navigation.navigate('Map')
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

                <Text style={styles.heading}>Login</Text>
                <Text style={styles.underheading}>Add your details to login</Text>
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
                <TouchableOpacity onPress={() => navigation.navigate('Reset Password')}>
                    <Text style={styles.underheading}>Forgot your password?</Text>
                </TouchableOpacity>
                <View style={{ marginVertical: 20, flexDirection: "row" }}>
                    <Text style={styles.underheading}>Don't have an Account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('UserSignup')}>
                        <Text style={styles.signupText}>Sign Up</Text>
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
        marginLeft: 10
    },

})