import React, { useState } from "react"
import { StyleSheet,Text, SafeAreaView } from 'react-native';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const CELL_COUNT = 13;
export default function VerificationInput() {
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    return (
        <SafeAreaView style={styles.root}>
            <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                    <Text
                        key={index}
                        style={[styles.cell, isFocused && styles.focusCell]}
                        onLayout={getCellOnLayoutHandler(index)}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                )}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    root: { 
        width: "100%",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingBottom: 5,
        borderRadius: 10,
        marginVertical: 10,
    },
    title: { textAlign: 'center', fontSize: 30 },
    codeFieldRoot: { marginTop: 0 },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderBottomWidth: 2,
        borderColor: '#00000030',
        textAlign: 'center',
        margin: 5
    },
    focusCell: {
        borderColor: '#2A2AC0',
    },

});