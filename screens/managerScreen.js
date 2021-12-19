import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, ScrollView, Image, StatusBar } from "react-native";
import React, { useEffect, useState } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { dbRef,database,child,get,onChildChanged } from '../config/firebase';

export default function ManagerDashboard() {
    const [serialNo, setSerialNo] = useState("")
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const databseRef = dbRef(database)


    const getData = (data) =>{
        get(child(databseRef, `users/${data}`)).then((snapshot) => {
            if (snapshot.exists()) {
              alert(snapshot.val().status)
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });
    }

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        // alert(data)
        getData(data)
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <><Image
            style={styles.tinyLogo}
            source={require('../assets/splash.png')} />
            <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: 'center', alignItems: "center" }}>

                <View style={{ width: "100%", alignItems: "center" }}>
                    <Text style={styles.heading}>Verify from serial number</Text>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Serial No."
                        placeholderTextColor={"#afafaf"}
                        keyboardType={"default"}
                        onChangeText={(val) => setSerialNo(val)}
                        value={serialNo} />

                    <TouchableOpacity style={styles.button} activeOpacity={0.4}>
                        <Text style={styles.buttonText}>Verify</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: "100%", alignItems: "center", borderTopWidth: 0.5, marginTop: 10 }}>
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={{ height: 300, width: 300, marginTop: 10 }}
                    />
                    {scanned && <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
                        <Text style={styles.buttonText}>Tap to Scan Again</Text>
                    </TouchableOpacity>}
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
        fontSize: 18,
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
        marginVertical: 10,
        backgroundColor: "#89C343",
        borderRadius: 25,
        width: "80%",
    },
    buttonText: {
        color: "#000",
        fontSize: 14
    },

})