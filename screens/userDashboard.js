import { StyleSheet, Text, View, ScrollView,StatusBar,Image } from "react-native";
import React, { useEffect, useState } from 'react';
import { dbRef,database,child,get,onChildChanged } from '../config/firebase';
import { selectUID } from "../slices/navSlice";
import { useSelector } from "react-redux";
import QRCode from 'react-native-qrcode-svg';

export default function UserDashboard(){
    const databseRef = dbRef(database)
    const userID = useSelector(selectUID)
    const [userFecthData,setData] = useState("")
    const [statusChanges , setStatus] = useState("")
    useEffect(()=>{
        get(child(databseRef, `users/${userID.uID}`)).then((snapshot) => {
            if (snapshot.exists()) {
              console.log(snapshot.val());
              setData(snapshot.val());
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });
    },[statusChanges])
    var commentsRef = dbRef(database, `users/${userID.uID}`);
    onChildChanged(commentsRef, (data) => {
        console.log("update", data)
        setStatus(data)
      });
      
    let serialNo = userID.uID;
    let today = new Date(); 
    let dd = today.getDate(); 
    let mm = today.getMonth()+1; 
    let yyyy = today.getFullYear(); 
    const {userName,userFatherName,userCNIC,nearestLocation,status} = userFecthData

    return (
        <><Image
            style={styles.tinyLogo}
            source={require('../assets/splash.png')} />
            <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: 'center', alignItems: "center" }}>
                    {status == "Pending"? <Text style={styles.heading}>Request is Pending</Text> :
                    <>
                    <Text style={styles.heading}>Request is Approved</Text><View style={styles.box}>
                        <Text style={styles.boxHeading}>KHANA SABKE LIYE</Text>
                        <View style={styles.boxDetail}>
                            <Text>Name: {userName}</Text>
                            <Text>Father Name: {userFatherName}</Text>
                            <Text>CNIC No: {userCNIC}</Text>
                            <Text>Date of Issue: {`${dd}/${mm}/${yyyy}`}</Text>
                        </View>
                        <Text style={{ fontWeight: "bold", alignSelf: "center", fontSize: 18 }}>Food Bank Branch Name</Text>
                        <Text style={{ alignSelf: "center", fontSize: 14, color: "#0A73B7", marginBottom: 10 }}>{nearestLocation}</Text>
                    </View>
                    <View style={styles.box2}>
                            <QRCode value={serialNo} color="black" size={200} />
                            <Text>S.No:{serialNo}</Text>
                            <Text style={styles.sign}>Authorized Signature</Text>
                        </View></>}
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
    box:{
        borderWidth: 1,
        marginBottom: 10
    },
    boxHeading: {
        color: "#222",
        fontSize: 28,
        padding: 20,
        backgroundColor: "#8bc34abf",
        width: "100%"
    },
    box2:{
        padding: 50,
        borderWidth: 1,
        marginBottom: 10,
        width: "80%",
        alignItems: "center"
    },
    boxDetail:{
        marginVertical: 20,
    },
    sign:{
        marginTop: 50,
        fontWeight: "bold"
    }
})
