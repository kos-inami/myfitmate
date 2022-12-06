import { Text, View, StyleSheet, Image, ImageBackground, TextInput, TouchableOpacity, FlatList, Alert, Keyboard, KeyboardAvoidingView, Platform, RefreshControl } from 'react-native'
import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native'
import { useHeaderHeight } from '@react-navigation/elements'
// import RNRestart from 'react-native-restart'
// import {Restart} from 'fiction-expo-restart';

// Firebase config ---------- // installed package
import { firebaseConfig } from '../../config/Config'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, query, onSnapshot, orderBy, doc, getDatabase, ref, QuerySnapshot, Firestore, where } from "firebase/firestore"

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

    // Get search data -------------
    const getSearchData = (locationSelected, genderSelected, ageSelected, proSelected) => {
        const FSquery = query( collection(db, 'trainerList'), where("location", "==", locationSelected ), where("gender", "==", genderSelected ), where("age", "==", ageSelected ), where("professional", "==", proSelected ) )
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
        })
    }
    const getSearchData1 = (locationSelected, proSelected) => {
        const FSquery = query( collection(db, 'trainerList'), where("location", "==", locationSelected ), where("professional", "==", proSelected ) )
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
        })
    }
    const getSearchData2 = (locationSelected, ageSelected, proSelected) => {
        const FSquery = query( collection(db, 'trainerList'), where("location", "==", locationSelected ), where("professional", "==", proSelected ), where("age", "==", ageSelected ) )
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
        })
    }
    const getSearchData3 = (locationSelected, ageSelected, genderSelected) => {
        const FSquery = query( collection(db, 'trainerList'), where("location", "==", locationSelected ), where("professional", "==", ageSelected ), where("gender", "==", genderSelected ) )
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
        })
    }

    // const [exist, setExist] = useState('')

    const route = useRoute();

    useEffect(() => {
        if(!props.auth){
            navigation.reset({index: 0, routes: [{ name: "WelcomeScreen" }]})
        }
    }, [props.auth])

    // Get data ----------
    useEffect( () => {
        console.log( "--- user data ---" )
        // if (props.data == "") {
        //     console.log("the data is empty")
        //     setExist(1)
        // } else {
            // setExist(2)
            // console.log(props.data);
            // console.log(route);
            if (route.params) {
                const { locationSelected, genderSelected, ageSelected, proSelected } = route.params
                if(locationSelected == "" && genderSelected == "" && ageSelected == "" && proSelected == ""){
                    getTrainerData()
                } else if(genderSelected == "" && ageSelected == ""){
                    console.log("Get route data 1")
                    getSearchData1(locationSelected, proSelected)
                } else if(genderSelected == ""){
                    console.log("Get route data 2")
                    getSearchData2(locationSelected, ageSelected, proSelected)
                } else if(ageSelected == ""){
                    console.log("Get route data 3")
                    getSearchData3(locationSelected, proSelected, genderSelected)
                } else {
                    console.log("Get route data 4")
                    getSearchData(locationSelected, genderSelected, ageSelected, proSelected)
                }
            } else {
                getTrainerData()
                console.log("No route data");
            }
        // }
    }, [trainerList]) // trainerList
    // }, []) // trainerList

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
    const renderPhoto = (pho) => {
        if (pho == "") {
            return <ImageBackground source={ require('../../assets/photoNone.png') } resizeMode="cover" imageStyle={{ borderRadius: 10}} style={styles.photoSize} />
        } else {
            return <ImageBackground source={ {uri: pho} } resizeMode="cover" imageStyle={{ borderRadius: 10}} style={styles.photoSize} />
        }
    }
    const renderItem = ({item}) => (    // Render to items 
        <View>
            <View>
                <Text style={styles.listBlock} onPress={ () => clickHandler(item) }>
                    <View style={styles.photoArea}>{ renderPhoto(item.photo) }</View>
                    <View style={styles.nameBlock}>
                        <Text style={styles.name}>{ item.firstName + " " + item.lastName }</Text>
                        <View style={{flexDirection:'row'}} >
                            <Image source={ require('../../assets/iconLocation.png') } style={styles.icon} />
                            <View style={styles.text}>{ renderLocation(item.location) }</View>
                        </View>
                        <View style={{flexDirection:'row'}} >
                            <Image source={ require('../../assets/iconPro.png') } style={styles.icon} />
                            <View style={styles.text}>{ renderPro(item.professional) }</View>
                        </View>
                    </View>
                </Text>
            </View>
            <View style={styles.borderBottom}></View>
        </View>
    )
    // Pass data to detail screen ----------
    const clickHandler = (data) => {
        navigation.navigate('UserTrainerDetailsScreen', data )
    }
    
    const trainerForm = () => {
        console.log("toTrainerForm")
        props.signoutToTrainerScreen()
    }

    // if (exist == 2) {
        return (
            <View style={styles.homeView}>
                <View style={{padding: SIZES.padding}}>
                    <View>
                        <TouchableOpacity 
                            style={ styles.button}
                            onPress={ () => { navigation.navigate('UserSearchScreen') }}
                        >
                            <Text style={styles.buttonText}>Search</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList 
                        data={ trainerList } 
                        renderItem= {renderItem}
                        keyExtractor={ item => item.id }
                    />
                </View>
                <View style={styles.nav}>
                    <View>
                        <TouchableOpacity
                            onPress={ () => { navigation.navigate('UserWorkoutListScreen') }}
                            style={styles.navMenu}
                        >
                            <Image source={ require('../../assets/iconWorkout.png') } style={styles.navBtn} />
                            <Text style={styles.navBtn}>Workout</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.navMenu}>
                        <Image source={ require('../../assets/iconTrainer.png') } style={styles.navBtnActive} />
                        <Text style={styles.navBtnActive}>Trainer</Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={ () => { navigation.navigate('UserSettingScreen') }}
                            style={styles.navMenu}
                        >
                            <Image source={ require('../../assets/iconSetting.png') } style={styles.navBtn} />
                            <Text style={styles.navBtn}>Setting</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    // } else {
        // return (
        //     <View style={styles.homeView}>
        //         <Text>This account seems trainer's account.</Text>
        //         <Text>Please login from the trainer's sign in form</Text>
        //         <TouchableOpacity 
        //             style={ styles.button}
        //             onPress={ () => { trainerForm()}}
        //         >
        //             <Text style={styles.buttonText}>Sign out</Text>
        //         </TouchableOpacity>
        //     </View>
        // )
    // }


}

const styles = StyleSheet.create( {
    homeView: {
        backgroundColor: COLORS.white,
        flex: 1,
        width: '100%',
        paddingBottom: 130,
        
    },
    photoSize: {
        flex: 1,
        justifyContent: "center"
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
        marginTop: 10,
        marginBottom: 15,
    },
    nameBlock: {
        padding: 15,
    },
    photoArea: {
        width: 100,
        height: 100,
    },
    borderBottom: {
        backgroundColor: COLORS.blue,
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
    navMenu: {
        alignItems: 'center'
    },
});