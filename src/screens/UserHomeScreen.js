import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert, Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/elements'

// Firebase config ---------- // installed package
import { firebaseConfig } from '../../config/Config'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, query, onSnapshot, orderBy, doc, getDatabase, ref, QuerySnapshot, Firestore } from "firebase/firestore"

// Design set ----------
import { COLORS, SIZES, FONTS, SHADOW } from "../designSet"

export default function UserHomeScreen( props ) {

    // Set navigation ----------
    const navigation = useNavigation()

    const FBapp = initializeApp( firebaseConfig ) // initialize Firebase app and store ref in a variable
    const db = getFirestore( FBapp )  // initialize Firestore

    const [trainerList, setTrainerList] = useState('')
    const getTrainerData = () => {
        const FSquery = query( collection(db, 'trainerList') )
        const unsubscribe = onSnapshot(FSquery, (querySnapshot) => {
            console.log("Start to get data");
            let FSdata = []
            querySnapshot.forEach((doc) => {
                let item = {}
                item = doc.data()
                item.id = doc.id
                FSdata.push( item )
            })
            setTrainerList(FSdata)
            // console.log("trainers: " + FSdata);
        })
    }

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
            setExist(2)
            getTrainerData()
            console.log(trainerList);
        }
    }, [props.data])


    // const [location, setLocation] = useState('')

    // Pass data detail screen ----------
    const clickHandler = (data) => {
        navigation.navigate('Detail', data )
    }

    // Each Items ----------
    const renderLocation = ( location ) => {
        if (location == 1) {
            return <Text>City - CBD</Text>
        }
        if (location == 2) {
            return <Text>Eastern Suburbs</Text>
        }
        if (location == 3) {
            return <Text>South-Eastern Sydney</Text>
        }
        if (location == 4) {
            return <Text>Inner West</Text>
        }
        if (location == 5) {
            return <Text>Western Sydney</Text>
        }
        if (location == 6) {
            return <Text>Canterbury-Bankstown</Text>
        }
        if (location == 7) {
            return <Text>Hills District</Text>
        }
        if (location == 8) {
            return <Text>Macarthur</Text>
        }
        if (location == 9) {
            return <Text>South Western Sydney</Text>
        }
        if (location == 10) {
            return <Text>Northern Beaches</Text>
        }
        if (location == 11) {
            return <Text>Forest district</Text>
        }
        if (location == 12) {
            return <Text>Lower North Shore</Text>
        }
        if (location == 13) {
            return <Text>Upper North Shore</Text>
        }
        if (location == 14) {
            return <Text>St George</Text>
        }
        if (location == 15) {
            return <Text>Sutherland Shire</Text>
        }
        if (location == 16) {
            return <Text>Blue Mountains</Text>
        }
    }
    const renderPro = ( pro ) => {
        if (pro == 1) {
            return <Text>Weight loss</Text>
        }
        if (pro == 2) {
            return <Text>Build muscle</Text>
        }
        if (pro == 3) {
            return <Text>Keep healthy</Text>
        }
        if (pro == 4) {
            return <Text>Strength</Text>
        }
        if (pro == 5) {
            return <Text>Shred</Text>
        }
    }
    const renderItem = ({item}) => (    // Render to items 
        <View>
            <View>
                <Text style={styles.listBlock} onPress={ () => clickHandler(item) }>
                    <View>
                        <Text>{ item.photo + "photo here" }</Text>
                    </View>
                    <View style={styles.nameBlock}>
                        <Text style={styles.name}>{ item.firstName + " " + item.lastName }</Text>
                        <View style={styles.text}>{ renderLocation(item.location) }</View>
                        <View style={styles.text}>{ renderPro(item.professional) }</View>
                    </View>
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
                    data={ trainerList } 
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
    name: {
        ...FONTS.p1,
        padding: 2,
    },
    text: {
        ...FONTS.p2,
        padding: 2,
    },
    listBlock: {
        padding: 10,
    },
    nameBlock: {
        padding: 10,
    },
    borderBottom: {
        backgroundColor: COLORS.blue,
        height: 1,
    },
});