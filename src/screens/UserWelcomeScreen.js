import { Text, TextInput, Image, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'

// Design set ----------
import { COLORS, SIZES, FONTS, SHADOW } from "../designSet"

export default function UserWelcomeScreen() {
    
    // Set navigation ----------
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <View style={styles.containerLogo}>
                <View style={styles.containerLogo}>
                    <Image source={ require('../../assets/myfitmateLogo.png') }  style={styles.logo}/>
                    <Text style={styles.h1}>User Login</Text>
                </View>
            </View>
            <TouchableOpacity onPress={ () => navigation.navigate("UserSigninScreen") }>
                <Text style={[styles.button, styles.buttonLogin]}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => navigation.navigate("UserSignupScreen") }>
                <Text style={[styles.button, styles.buttonNewAccount]}>Create an account</Text>
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
        padding:SIZES.padding,
        textAlign: 'center',
    },
    button: {
        ...FONTS.p1,
        color: COLORS.white,
        textAlign: 'center',
        padding: SIZES.padding,
        margin: SIZES.padding,
        borderRadius: 10,
    },
    buttonLogin: {
        backgroundColor: COLORS.orange,
    },
    buttonNewAccount: {
        borderWidth: 2,
        borderColor: COLORS.orange,
        color: COLORS.orange,
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