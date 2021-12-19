import { useEffect, useState } from 'react';
import {  Picker, StyleSheet,Text } from "react-native";
import { useDispatch} from 'react-redux';
import { setCategory } from '../slices/navSlice';

export function DropDown() {
const [selectedValue, setSelectedValue] = useState("Monthly Ration");

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(setCategory({
        category: selectedValue
    }))
  },[selectedValue])
  return (
    <><Text style={styles.infoText}>Select type of ration from below</Text>
    <Picker
      selectedValue={selectedValue}
      style={styles.inputText}
      onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
    >
      <Picker.Item label="Monthly Ration" value="Monthly Ration" />
      <Picker.Item label="Daily 1" value="Daily 1" />
      <Picker.Item label="Daily 2" value="Daily 2" />
      <Picker.Item label="Daily 3" value="Daily 3" />
    </Picker></>
  );
}

const styles = StyleSheet.create({
    inputText: {
        height: 50,
        padding: 10,
        marginVertical: 10,
        borderRadius: 25,
        width: "80%",
        alignSelf: "center",
        color: "#808080",
    },
    infoText:{
      fontSize: 10,
      width: "75%",
      color: "#0A73B7"
    }
})