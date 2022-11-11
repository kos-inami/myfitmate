import { Text, TouchableOpacity } from "react-native"
import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native'

export function SignoutButton( props ) {
    
    // Set navigation ----------
    const navigation = useNavigation()

    const signout = () => {
        props.signout()
        navigation.reset({index: 0, routes: [{ name: "WelcomeScreen" }]})
    }

    return (
        // <TouchableOpacity onPress={ () => props.signout() }>
        <TouchableOpacity onPress={ () => signout() }>
            <Text>Sign out</Text>
        </TouchableOpacity>
    )
}