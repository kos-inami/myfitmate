import { Text, TextInput, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, StatusBar, ScrollView, SafeAreaView } from 'react-native'
import { React, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

import SelectList from 'react-native-dropdown-select-list'

// Design set ----------
import { COLORS, SIZES, FONTS, SHADOW, LINE } from "../designSet"


export default function UserSigninScreen( props ) {
    
    // Set navigation ----------
    const navigation = useNavigation()

    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState( false ) // email validation

    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState()

    const validateEmail = ( emailStr ) => {
        // Check if email contains '@' symbol
        const atIndex = emailStr.indexOf('@')
        if (atIndex > 0) {
            return true
        }
        else {
            return false
        }
    }

    const validatePassword = ( passwordStr ) => {
        // check the length of the password
        const passLength = passwordStr.length
        if (passLength >= 8) {
            return true
        }
        else {
            return false
        }
    }

    const signIn = ( 
        email, 
        password
    ) => {
        console.log("sign in...")
        props.signin( 
            email, 
            password
        )
    }

    useEffect (() => {
        // console.log(validateEmail(email))
        if ( validateEmail( email ) ) {
            setValidEmail ( true )
        } else {
            setValidEmail ( false )
        }
        if ( validatePassword( password ) ) {
            setValidPassword ( true )
        } else {
            setValidPassword ( false )
        }
    }, [email, password])

    useEffect (() => {

        if (props.auth) {
            console.log("id: " + props.auth.uid);
            console.log("data: " + props.appData);
            if (props.appData == "no") {
                console.log("yes");
            } else {
                console.log("no");
                // navigation.reset( {index: 0, routes: [{name: "UserHomeScreen"}]})
            }
        }
    }, [props.auth])

    return (
        
        <KeyboardAvoidingView style={styles.signupView} behavior='padding'>
            <ScrollView style={styles.container}>
                <View style={styles.signupForm}>

                    <Text style={styles.label}>Email</Text>
                        <TextInput style={styles.input} onChangeText={ (value) => setEmail(value) }/>

                    <Text style={styles.label}>Password</Text>
                        <TextInput style={styles.input} secureTextEntry={true} onChangeText={ (value) => setPassword(value) } />
                    
                    {/* Submit button */}
                    <TouchableOpacity 
                        style={ (validEmail && validPassword) ? styles.button : styles.buttonDisabled }
                        disabled={ (validEmail && validPassword) ? false : true }
                        onPress={ () => { signIn(
                            email, 
                            password,
                            ) }}
                    >
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={ () => navigation.navigate("UserSignupScreen") }>
                        <Text style={{...FONTS.p2}}>Do you NOT have an account?</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );

}

// Styles ===========
const styles = StyleSheet.create({

    container: {
        paddingTop: Platform.OS === "ios" ? 40 : StatusBar.currentHeight + 10,
        flex: 1,
        backgroundColor: COLORS.white,
        padding: SIZES.padding,
        height: '100%',
        width: '100%',
    },
    signupView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signupForm: {
        width: '100%',
        height: '100%',
        padding: 10,
        marginBottom: 100,
    },
    title: {
        ...FONTS.p1,
        marginVertical: 10,
    },
    label: {
        ...FONTS.p2,
        marginVertical: 10,
    },
    input: {
        borderColor: COLORS.orange,
        borderWidth: 1.5,
        borderRadius: 6,
        marginBottom: 15,
        padding: 10,
    },
    inputTextArea: {
        textAlignVertical: 'top',
        borderColor: COLORS.orange,
        borderWidth: 1.5,
        borderRadius: 6,
        marginBottom: 15,
        padding: 10,
    },
    form: {
        alignItems: 'flex-start',
    },
    button: {
        backgroundColor: COLORS.orange,
        padding: 10,
        marginTop: 10,
        marginBottom: 30,
    },
    buttonDisabled: {
        backgroundColor: COLORS.gray,
        padding: 10,
        marginTop: 10,
        marginBottom: 30,
    },
    buttonText: {
        ...FONTS.p1,
        color: 'white',
        textAlign: 'center',
    }

});