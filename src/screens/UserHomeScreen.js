import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert, Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/elements'

// Design set ----------
import { COLORS, SIZES, FONTS, SHADOW } from "../designSet"

export default function UserHomeScreen( props ) {

    // Set navigation ----------
    const navigation = useNavigation()

    const [exist, setExist] = useState('')

    useEffect(() => {
        if(!props.auth){
            navigation.reset({index: 0, routes: [{ name: "WelcomeScreen" }]})
        }
    }, [props.auth])

    // Get data ----------
    useEffect( () => {
        console.log( "--- user data ---" )
        if (props.data == "") {
            console.log("the data is empty")
            setExist(1)
        } else {
            console.log( props.data )
            setExist(2)
        }
    }, [props.data])

    // Pass data detail screen ----------
    const clickHandler = (data) => {
        navigation.navigate('Detail', data )
    }
    const renderItem = ({item}) => (    // Render to items 
        <View>
            <View>
                <Text style={styles.taskListText} onPress={ () => clickHandler(item) }>
                    { item.lastName }
                </Text>
            </View>
            <View style={styles.borderBottom}></View>
        </View>
    )
    
    const trainerForm = () => {
        console.log("toTrainerForm")
        props.signoutToTrainerScreen()
    }

    if (exist == 2) {
        return (
            <View style={styles.homeView}>
                <FlatList 
                    data={ props.data } 
                    renderItem= {renderItem}
                    keyExtractor={ item => item.id }
                />
            </View>
        )
    } else {
        return (
            <View style={styles.homeView}>
                <Text>This account seems trainer's account.</Text>
                <Text>Please login from the trainer's sign in form</Text>
                <TouchableOpacity 
                    style={ styles.button}
                    onPress={ () => { trainerForm()}}
                >
                    <Text style={styles.buttonText}>Sign out</Text>
                </TouchableOpacity>
            </View>
        )
    }


}

const styles = StyleSheet.create( {
    homeView: {
        backgroundColor: COLORS.white,
        flex: 1,
        padding: SIZES.padding,
        width: '100%',
        paddingBottom: 100,
    },
    inputBlock: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        left: 15,
        right: 0,
        bottom: 20,
        width: '100%',
    },
    input: {
        ...FONTS.p2,
        backgroundColor: COLORS.white,
        borderColor: COLORS.orange,
        borderWidth: 3,
        borderRadius: 100,
        padding: 10,
        marginRight: 10,
        paddingLeft: SIZES.padding,
        width: '80%',
        zIndex: 3, // works on ios
        elevation: 3, // works on android
    },    
    button: {
        backgroundColor: COLORS.blue,
        padding: 10,
        marginTop: 10,
        marginBottom: 30,
    },
    buttonText: {
        ...FONTS.p1,
        color: COLORS.white,
        textAlign: 'center',
    },
});