import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView, Image, StatusBar } from "react-native";
import React, { useState } from 'react';
import { DropDown } from "../components/dropdownpicker";
// import ImagePickerExample from "../components/imagepicker";
import { selectNearestLocation, selectCategory,selectUID } from "../slices/navSlice";
import { useSelector } from "react-redux";
import { dbRef,database,set } from '../config/firebase';

export default function UserInformation({ navigation }) {
    const [userName, setuserName] = useState("")
    const [userFatherName, setFatherName] = useState("")
    const [userCNIC, setuserCNIC] = useState("")
    const [salary, setSalary] = useState("")
    const [userFamilyMember, setFamilyMember] = useState("")
    const nearestLocation = useSelector(selectNearestLocation)
    const rationType = useSelector(selectCategory)
    const userID = useSelector(selectUID)
    
    const userData = () => {
        var obj={
            userName,
            userFatherName,
            userCNIC,
            salary,
            userFamilyMember,
            category: rationType.category,
            nearestLocation: nearestLocation.branch_name,
            status: "Pending"
        }
        console.log(userID.uID)
            set(dbRef(database, 'users/' + userID.uID), {
                ...obj
            }).then(()=>{
                navigation.navigate('UserDashboard')
            })
            
    }
    return (
        <><Image
            style={styles.tinyLogo}
            source={require('../assets/splash.png')} />
            <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: 'center', alignItems: "center" }}>

                <Text style={styles.heading}>Details</Text>
                <Text style={styles.underheading}><Text style={styles.branchName}>{nearestLocation?.branch_name}</Text> nearest food bank</Text>
                <TextInput
                    style={styles.inputText}
                    placeholder="Your Name"
                    placeholderTextColor={"#afafaf"}
                    onChangeText={(val) => setuserName(val)} 
                    value={userName}/>
                <TextInput
                    style={styles.inputText}
                    placeholder="Father Name"
                    placeholderTextColor={"#afafaf"}
                    onChangeText={(val) => setFatherName(val)} 
                    value={userFatherName} />
                <TextInput
                    style={styles.inputText}
                    placeholder="CNIC Number"
                    placeholderTextColor={"#afafaf"}
                    keyboardType={"number-pad"}
                    onChangeText={(val) => setuserCNIC(val)} 
                    value={userCNIC}
                    maxLength={13} />
                <TextInput
                    style={styles.inputText}
                    placeholder="Family Members"
                    placeholderTextColor={"#afafaf"}
                    keyboardType={"number-pad"}
                    onChangeText={(val) => setFamilyMember(val)} 
                    value={userFamilyMember}
                    maxLength={3} />

                <DropDown />

                {/* <ImagePickerExample title="Add your image" id="img1" />
                <ImagePickerExample title="Add CNIC Front Image" id="img2" />
                <ImagePickerExample title="Add CNIC Back Image" id="img3" /> */}

                <TextInput
                    style={styles.inputText}
                    placeholder="Monthly Salary"
                    placeholderTextColor={"#afafaf"}
                    keyboardType={"number-pad"}
                    onChangeText={(val) => setSalary(val)} 
                    value={salary} />

                <TouchableOpacity onPress={userData} style={styles.button} activeOpacity={0.4}>
                    <Text style={styles.buttonText}>Submit</Text>
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
    branchName:{
        color: "#89C343",
        fontSize: 14,
        marginBottom: 10,
    }
})