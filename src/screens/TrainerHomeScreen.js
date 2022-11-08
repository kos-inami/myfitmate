import { Text, View, StyleSheet, Image, ImageBackground, TextInput, TouchableOpacity, FlatList, Alert, Keyboard, KeyboardAvoidingView, Platform, RefreshControl } from 'react-native'
import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native'
import { useHeaderHeight } from '@react-navigation/elements'

// Firebase config ---------- // installed package
import { firebaseConfig } from '../../config/Config'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, query, onSnapshot, orderBy, doc, getDatabase, ref, QuerySnapshot, Firestore, where } from "firebase/firestore"

// Import FontAwesome Component
import FontAwesome from '@expo/vector-icons/FontAwesome';

// Design set ----------
import { COLORS, SIZES, FONTS, SHADOW } from "../designSet"

export default function TrainerHomeScreen( props ) {

    // Set navigation ----------
    const navigation = useNavigation()

    const FBapp = initializeApp( firebaseConfig ) // initialize Firebase app and store ref in a variable
    const db = getFirestore( FBapp )  // initialize Firestore

    const [trainerList, setTrainerList] = useState('')
    const [photoSet, setPhotoSet] = useState('')

    const getTrainerData = () => {
        const FSquery = query( collection(db, 'trainerList'), where("trainerListId", "==", props.auth.uid ))
        const unsubscribe = onSnapshot(FSquery, (querySnapshot) => {
            console.log("Start to get data");
            let FSdata = []
            querySnapshot.forEach((doc) => {
                let item = {}
                item = doc.data()
                item.id = doc.id
                FSdata.push( item )
            })
            setPhotoSet(FSdata[0].photo)
            console.log(FSdata);
        })
    }

    const renderPhoto = (pho) => {
        console.log("photo = " + pho);
        if (pho == "") {
            return <ImageBackground source={ require('../../assets/photoNone.png') } resizeMode="cover" imageStyle={{ borderRadius: 10}} style={styles.photoSize} />
        } else {
            return <ImageBackground source={ {uri: pho} } resizeMode="cover" imageStyle={{ borderRadius: 10}} style={styles.photoSize} />
        }
    }

    useEffect( () => {

        console.log( "Trainer data ---------" )
        console.log( props.auth.uid)
        getTrainerData()

    }, [props.data])

    useEffect(() => {
        if(!props.auth){
            navigation.reset({index: 0, routes: [{ name: "WelcomeScreen" }]})
        }
        else {
            console.log( "Trainer data ---------" )
            // console.log( props.data[0].photo)
        }

    }, [props.auth])

    return (
        <View style={styles.homeView}>
            <View style={{padding: SIZES.padding}}>
                <View style={styles.photoArea}>{ renderPhoto(photoSet) }</View>
                <TouchableOpacity style={styles.table} onPress={ () => { navigation.navigate('TrainerProfileScreen') }}>
                        <Text style={{...FONTS.p2}}>Your profile</Text>
                        <FontAwesome name="angle-right" style={styles.listArrow}/>
                </TouchableOpacity>
                <View style={styles.borderBottom}></View>
                <TouchableOpacity style={styles.table} onPress={ () => { navigation.navigate('TrainerAccountScreen') }}>
                    <Text style={{...FONTS.p2}}>Account details</Text>
                    <FontAwesome name="angle-right" style={styles.listArrow}/>
                </TouchableOpacity>
                <View style={styles.borderBottom}></View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create( {
    homeView: {
        backgroundColor: COLORS.white,
        flex: 1,
        width: '100%',
        paddingBottom: 130,
    },
    photoArea: {
        width: "100%",
        marginBottom: 40,
        justifyContent: "center",
        alignItems: 'center',
    },
    photoSize: {
        width: 200,
        height: 200,
    },
    icon: {
        marginRight: 5,
    },
    name: {
        ...FONTS.p1,
        padding: 2,
        marginBottom: 10,
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
        backgroundColor: COLORS.gray,
        height: 1,
    },
    button: {
        backgroundColor: COLORS.blue,
        padding: 15,
        marginBottom: 10,
        borderRadius: 50,
    },
    buttonText: {
        ...FONTS.p1,
        color: 'white',
        textAlign: 'center',
    },
    nav: {
        position: 'absolute',
        bottom: 0,
        flexDirection: "row",
        width: '100%',
        justifyContent: "space-around",
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: COLORS.orange,
        ...SHADOW,
    },
    navBtn: {
        color: COLORS.white, 
        opacity: 0.5,
        fontWeight: "800",
    },
    navBtnActive: {
        color: COLORS.white, 
        opacity: 1,
        fontWeight: "800",
    },
    listArrow: {
        position: 'absolute',
        right: SIZES.padding,
        top: 20,
        fontSize: 20,
        color: COLORS.blue,
    },
    table: {
        padding: SIZES.padding,
        
    },
});