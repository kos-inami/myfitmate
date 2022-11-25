import { Text, Image, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'

// Design set ----------
import { COLORS, SIZES, FONTS, SHADOW } from "../designSet"
import React from 'react'

export default function WelcomeScreen() {
    
    // Set navigation ----------
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <View style={styles.containerLogo}>
                <Image source={ require('../../assets/myfitmateLogo.png') }  style={styles.logo}/>
            </View>
            <TouchableOpacity onPress={ () => navigation.navigate("UserWelcomeScreen") }>
                <Text style={[styles.button, styles.buttonForUser]}>For Users</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => navigation.navigate("TrainerWelcomeScreen") }>
                <Text style={[styles.button, styles.buttonForTrainer]}>For Trainers</Text>
            </TouchableOpacity>
        </View>
    );
}

// Styles ===========
const styles = StyleSheet.create({

    container: {
        // paddingTop: Platform.OS === "ios" ? 40 : StatusBar.currentHeight + 10,
        flex: 1,
        backgroundColor: COLORS.white,
        padding: SIZES.padding,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
    },
    h1: {
        ...FONTS.h1,
        padding:SIZES.padding*2,
        textAlign: 'center',
    },
    button: {
        ...FONTS.p1,
        color: COLORS.white,
        textAlign: 'center',
        padding: SIZES.padding*2,
        margin: SIZES.padding,
        borderRadius: 10,
        overflow: 'hidden',
    },
    buttonForUser: {
        backgroundColor: COLORS.orange,
    },
    buttonForTrainer: {
        backgroundColor: COLORS.blue,
    },    
    containerLogo: {
        width: '100%',
        alignItems: 'center',
    },
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain',
        maxWidth: 300, 
    },

});