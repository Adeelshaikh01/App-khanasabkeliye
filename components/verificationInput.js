import React from "react"
import { StyleSheet, View, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import VerificationInput from "../components/verficationLib";

export default function Verification(props) {

    return (
        <View style={styles.container}>
            <Image
                style={styles.tinyLogo}
                source={require('../assets/Logo.png')}
            />
            <View style={styles.textContainer}>
                <Text style={styles.headingText}>Verification</Text>
                <Text style={styles.infoText}>Insert your code here:</Text>
            </View>
            <View style={styles.buttonContainer}>
                <VerificationInput />
                <TouchableOpacity style={styles.mButton}
                onPress={() => props.navigation.navigate('Location')}
                >
                    <Text style={{ color: "#fff" }}>Continue</Text>
                </TouchableOpacity>
                <View style={styles.linksContainer}>
                    <TouchableOpacity>
                        <Text style={{ color: "#2A2AC0" }}>Resent Code</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{ color: "#2A2AC0" }}>Change Number</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
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
        marginBottom: 20
    },
    headingText: {
        fontSize: 22,
        color: "#181461",
        fontWeight: "bold"
    },
    infoText: {
        fontSize: 14,
        color: "#181461"
    },
    buttonContainer: {
        width: "100%",
        textAlign: "center",
    },
    mButton: {
        width: "100%",
        alignItems: "center",
        backgroundColor: "#2A2AC0",
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
    },
    linksContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between"
    }
});