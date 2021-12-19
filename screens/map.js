import React, { useState } from 'react';
import MapView, {Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { useRef } from 'react';
import { useEffect } from 'react';
import { selectCurrentLocation, selectNearestLocation, setCurrentLocation,setNearestLocation } from '../slices/navSlice';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';
import { findNearest } from 'geolib';


const coords  = [
    {
        "branch_name": "Aliabad",
        "latitude": 24.9200172,
        "longitude": 67.0612345
    },
    {
        "branch_name": "Numaish chowrangi",
        "latitude": 24.8732834,
        "longitude": 67.0337457
    },
    {
        "branch_name": "Saylani house phase 2",
        "latitude": 24.8278999,
        "longitude": 67.0688257
    },
    {
        "branch_name": "Touheed commercial",
        "latitude": 24.8073692,
        "longitude": 67.0357446
    },
    {
        "branch_name": "Sehar Commercial",
        "latitude": 24.8138924,
        "longitude": 67.0677652
    },
    {
        "branch_name": "Jinnah avenue",
        "latitude": 24.8949528,
        "longitude": 67.1767206
    },
    {
        "branch_name": "Johar chowrangi",
        "latitude": 24.9132328,
        "longitude": 67.1246195
    },
    {
        "branch_name": "Johar chowrangi 2",
        "latitude": 24.9100704,
        "longitude": 67.1208811
    },
    {
        "branch_name": "Hill park",
        "latitude": 24.8673515,
        "longitude": 67.0724497
    }
]



export default function Map({navigation}) {
    const mapRef = useRef(null)
    const dispatch = useDispatch()
    const currentLoc = useSelector(selectCurrentLocation)
    const nearestLocation = useSelector(selectNearestLocation)

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            alert('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          dispatch(setCurrentLocation({
            latitude: location?.coords.latitude,
            longitude: location?.coords.longitude,
        }))
        })
        ();
      }, []);
      
useEffect(()=>{
    mapRef.current.fitToSuppliedMarkers(["allLocation"], {
        edgePadding:{top:50,left:50,right:50,bottom:50}
    })

},[currentLoc])

const getNearFoodBank = (currentLocation)=>{
    var data = findNearest({latitude: currentLocation?.latitude, longitude: currentLocation?.longitude}, coords)
    dispatch(setNearestLocation({
        branch_name: data?.branch_name,
        latitude: data?.latitude,
        longitude: data?.longitude,
    }))
    // console.log("nearest location",nearestLocation)
    navigation.navigate('UserInformation')
}
    return (
        <SafeAreaView style={styles.container}>
            
            <MapView 
                ref={mapRef}
                style={styles.map}
                 initialValue={{
                    latitude: currentLoc?.latitude,
                    longitude: currentLoc?.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
            >
                {coords.map((v,i)=>{
                    return(
                        <Marker
                        key={i}
                    coordinate={{
                        latitude: v.latitude,
                        longitude: v.longitude,
                    }}
                    title={v.branch_name}
                    identifier="allLocation"
                />
                    )
                })}
               
            </MapView>
            <TouchableOpacity style={styles.mButton}
                onPress={() => getNearFoodBank(currentLoc)}
            >
                <Text style={{ color: "#000" }}>Get Neartest Bank</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    mButton: {
        width: "90%",
        alignItems: "center",
        backgroundColor: "#89C343",
        padding: 12,
        borderRadius: 10,
        marginVertical: 10,
        position: "absolute",
        bottom: 20,
    },
});