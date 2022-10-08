import { Text, TextInput, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useEffect } from "react";

// Design set ----------
import { COLORS, SIZES, FONTS, SHADOW } from "../designSet"

export default function TrainerHomeScreen( props ) {

    // Set navigation ----------
    const navigation = useNavigation()

    useEffect(() => {
        if(!props.auth){
            navigation.reset({index: 0, routes: [{ name: "WelcomeScreen" }]})
        }
    }, [props.auth])

    return (
        <Text>Hello.</Text>
    )

}