import React, { useState } from 'react';
import { Button, Image, View, StyleSheet,Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { storage, ref } from '../config/firebase';

export default function ImagePickerExample({ title, id }) {
    const [image, setImage] = useState(null);
    const [imageurl, setImageUrl] = useState(null);

    let uploadFiles = (file) => {
        return new Promise((resolve, reject) => {
            let storageRef = ref(storage, file);
            const response =  fetch(file);
            const blob =  response.blob();
            let uploading = storageRef.put(blob)
            uploading.on('state_changed',
                (snapshot) => {
                    console.log("files")
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED:
                            console.log('Upload is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING:
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    reject("yeh masla hai",error)
                },
                () => {
                    uploading.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        resolve(downloadURL)
                    });
                }
            );
        })
    }
    

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (!result.cancelled) {
            setImage(result.uri);
            uploadFiles(result.uri);
    };
    }
   
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
            <Button title={title} onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        marginVertical: 20,
        backgroundColor: "#89C343",
        borderRadius: 25,
        width: "80%",
    },
})