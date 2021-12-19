import React from "react"
import { StyleSheet, View, Image, Text, TouchableOpacity,SafeAreaView } from 'react-native';


export default function SelectUser({ navigation }) {
    
    return (
        <SafeAreaView style={styles.container}>
        <View>
            <Image
                style={styles.tinyLogo}
                source={require('../assets/splash.png')} />
            <View style={styles.textContainer}>
                <Text style={styles.headingText}>Welcome</Text>
                <Text style={styles.infoText}>Select your user type</Text>
            </View>
            
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.mButton}
                    onPress={() => navigation.navigate('UserLogin')}
                >
                    <Text style={{ color: "#fff" }}>Public User</Text>
                </TouchableOpacity>
                    <Text style={styles.infoText}>or</Text>
                <TouchableOpacity style={styles.mButton} 
                    onPress={() => navigation.navigate('ManagerLogin')}
                >
                    <Text style={{ color: "#fff" }}>Branch Manager</Text>
                </TouchableOpacity>
            </View>
        </View>            
            </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    },
    tinyLogo: {
        width: 120,
        height: 120,
        resizeMode: "contain",
        marginVertical: 20
    },
    textContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30
    },
    headingText: {
        fontSize: 22,
        color: "#89C343",
        fontWeight: "bold"
    },
    infoText: {
        fontSize: 14,
        color: "#0A73B7"
    },
    buttonContainer: {
        alignItems: "center"
    },
    mButton: {
        width: "100%",
        alignItems: "center",
        backgroundColor: "#89C343",
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
    }
});
