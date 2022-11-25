import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, Image, ImageBackground, Alert, TextInput, Platform, KeyboardAvoidingView } from 'react-native'
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native'
import { useHeaderHeight } from '@react-navigation/elements'

import SelectList from 'react-native-dropdown-select-list'
import * as ImagePicker from 'expo-image-picker'

// Firebase config ---------- // installed package
import { firebaseConfig } from '../../config/Config'
import { initializeApp } from 'firebase/app'
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL, getBlobFromUri } from "firebase/storage";

const app = initializeApp( firebaseConfig ) // initialize Firebase app and store ref in a variable
const storage = getStorage(app)

import { COLORS, FONTS, SIZES } from '../designSet';

export default function TrainerProfileScreen( props ) {

    // Set navigation ----------
    const navigation = useNavigation()

    // const route = useRoute()
    // const { id, trainerListId, firstName, lastName, email, phone, location, gender, age, trainGender, professional, availableDate, details, photo } = route.params

    // Item selection ----------
    const [genderSelected, setGenderSelected] = useState(props.data[0].gender)
    const dataGender = [
        {key:'1',value:'Male'},
        {key:'2',value:'Female'},
        {key:'3',value:'Others'},
    ]

    const [ageSelected, setAgeSelected] = useState(props.data[0].age)
    const dataAge = [
        {key:'1',value:'18-25'},
        {key:'2',value:'26-30'},
        {key:'3',value:'31-35'},
        {key:'4',value:'36-40'},
        {key:'5',value:'41-45'},
        {key:'6',value:'45-50'},
        {key:'7',value:'51-55'},
        {key:'8',value:'56-60'},
        {key:'9',value:'60+'},
    ]

    const [trainGenderSelected, setTrainGenderSelected] = useState(props.data[0].trainGender)
    const dataTrainGender = [
        {key:'1',value:'Male'},
        {key:'2',value:'Female'},
        {key:'3',value:'Does not matter'},
    ]

    const [proSelected, setProSelected] = useState(props.data[0].professional)
    const dataPro = [
        {key:'1',value:'Weight loss'},
        {key:'2',value:'Build muscle'},
        {key:'3',value:'Keep healthy'},
        {key:'4',value:'Strength'},
        {key:'5',value:'Shred'},
    ]

    const [availableDate, setAvailableDate] = useState(props.data[0].availableDate)
    const [details, setDetails] = useState(props.data[0].details)

    
    const [imageSet, setImageSet] = useState(props.data[0].photo);
    const [imageName, setImageName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    // Each Items ----------
    const renderPhoto = () => {
        console.log("photo url " + imageSet);
        if (imageSet == "") {
            return <ImageBackground source={ require('../../assets/photoNone.png') } resizeMode="cover" style={styles.photoSize} imageStyle={{ borderRadius: 10}}/>
        } else {
            return <ImageBackground source={ {uri: imageSet} } style={styles.photoSize}  imageStyle={{ borderRadius: 10}} resizeMode="cover" />
        }
    }
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
    const renderGender = ( gen ) => {
        if (gen == 1) {
            return <Text>Male</Text>
        }
        if (gen == 2) {
            return <Text>Female</Text>
        }
        if (gen == 3) {
            return <Text>Others</Text>
        }

    }
    const renderAge = ( ageNum ) => {
        if (ageNum == 1) {
            return <Text>18-25</Text>
        }
        if (ageNum == 2) {
            return <Text>26-30</Text>
        }
        if (ageNum == 3) {
            return <Text>31-35</Text>
        }
        if (ageNum == 4) {
            return <Text>36-40</Text>
        }
        if (ageNum == 5) {
            return <Text>41-45</Text>
        }
        if (ageNum == 6) {
            return <Text>45-50</Text>
        }
        if (ageNum == 7) {
            return <Text>51-55</Text>
        }
        if (ageNum == 8) {
            return <Text>56-60</Text>
        }
        if (ageNum == 9) {
            return <Text>60+</Text>
        }
    }
    const renderTrainFor = ( trainFor ) => {
        if (trainFor == 1) {
            return <Text>Male</Text>
        }
        if (trainFor == 2) {
            return <Text>Female</Text>
        }
        if (trainFor == 3) {
            return <Text>Does not matter</Text>
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

    useEffect( () => {
        // console.log("prof data here ----------");
        // console.log( props.data[0] )
        // console.log("auth data here ----------");
        // console.log( props.auth.uid )
        console.log(props.data[0].id);
    }, [props.data])

    // update user profile ---------
    // const [input, setInput] = useState("")
    const updateProf = async (
        path, 
        genderSelected, 
        ageSelected, 
        trainGenderSelected,
        proSelected, 
        availableDate, 
        details,
        imageSet
        ) => {

            console.log("photo to firebase : " + imageSet)
            
            if (imageSet == '') {
                
                const dataObj = {
                    id: props.data[0].id, 
                    gender: genderSelected, 
                    age: ageSelected, 
                    trainGender: trainGenderSelected, 
                    professional: proSelected, 
                    availableDate: availableDate, 
                    details: details,
                    photo: imageSet,
                }
                props.update( path, dataObj )

            } else {

                // START: upload a image file to firebase -----------------------------------------------------
                const blob = await getBlobFroUri(imageSet);

                const metadata = {
                    contentType: 'image/jpeg',
                };

                // Upload file and metadata to the object 'images/mountains.jpg'
                const storageRef = ref(storage, 'trainerImages/' + imageName);
                const uploadTask = uploadBytesResumable(storageRef, blob, metadata);

                // Listen for state changes, errors, and completion of the upload.
                uploadTask.on('state_changed',
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    }
                }, 
                (error) => {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;
                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                    }
                }, 
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setImageUrl(downloadURL)
                    console.log('image url : ' + imageUrl);

                    // Uploading 
                    const dataObjWithPhoto = {
                        id: props.data[0].id, 
                        gender: genderSelected, 
                        age: ageSelected, 
                        trainGender: trainGenderSelected, 
                        professional: proSelected, 
                        availableDate: availableDate, 
                        details: details,
                        photo: downloadURL
                    }
                    props.update( path, dataObjWithPhoto )
                    
                    updateProfList(
                        `trainerList`,
                        genderSelected, 
                        ageSelected, 
                        trainGenderSelected,
                        proSelected, 
                        availableDate, 
                        details,
                        downloadURL
                    )
                    });
                }
                );
                // END: upload a image file to firebase -----------------------------------------------------
            }
    }
    const updateProfList = (
        path, 
        genderSelected, 
        ageSelected, 
        trainGenderSelected,
        proSelected, 
        availableDate, 
        details,
        imageUrl,
        ) => {
        const dataObjProf = {
            id: props.auth.uid, 
            gender: genderSelected, 
            age: ageSelected, 
            trainGender: trainGenderSelected, 
            professional: proSelected, 
            availableDate: availableDate, 
            details: details,
            photo: imageUrl
        }
        props.updateList( path, dataObjProf )
        navigation.reset( {index: 0, routes: [{name: "TrainerHomeScreen"}]} )
    }

    
    // Upload image from device media library and get url
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
            setImageSet(result.uri)
            setImageName(result.uri.substring(result.uri.lastIndexOf('/') + 1, result.uri.length))
        }
    };
    // Fetch uploadable image binary data.
    const getBlobFroUri = async (uri) => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });
    
        return blob;
    };

    // For reanimated bottom sheet ---------
    const renderContent = () => (
    <View
        style={{
        backgroundColor: 'white',
        padding: 16,
        height: 450,
        }}
    >
        <Text>Swipe down to close</Text>
    </View>
    );

    const sheetRef = React.useRef(null);
    const height = useHeaderHeight()

    if (Platform.OS === 'android') {
        return (
            <ScrollView style={styles.container}>
            <View style={styles.detailView}>
                <View>
                    <View style={styles.photoArea}>{ renderPhoto() }</View>
                    <TouchableOpacity onPress={ () => pickImage()}>
                        <Text style={styles.photoUpdate}>Update profile photo</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.name} >{ props.data[0].firstName + " " + props.data[0].lastName }</Text>
                </View>
                <View>
                    <Text style={styles.textInTop} >{ renderLocation(props.data[0].location) }</Text>
                </View>
                <View style={{flexDirection:'row'}} >
                    <Image source={ require('../../assets/iconPhone.png') } style={styles.icon} />
                    <Text style={[ styles.textInTop, styles.limitLength ]} numberOfLines={1} >{ props.data[0].phone }</Text>
                </View>
                <View style={{flexDirection:'row'}} >
                    <Image source={ require('../../assets/iconEmail.png') } style={styles.icon} />
                    <Text style={[ styles.textInTop, styles.limitLength ]} numberOfLines={1} >{ props.data[0].email }</Text>
                </View>
                <View style={styles.border}></View>
                <View>
                    <Text style={styles.textBold} >Details</Text>
                </View>
                <View>
                    <Text style={styles.tableTitle}>Gender</Text>
                    <SelectList boxStyles={[styles.text]} inputStyles={{...FONTS.p2}} placeholder={renderGender(props.data[0].gender)} setSelected={setGenderSelected} data={dataGender} onChangeText={(selected) => setGenderSelected(selected)} search={false} />
                </View>
                <View>
                    <Text style={styles.tableTitle}>Age</Text>
                    <SelectList boxStyles={[styles.text]} inputStyles={{...FONTS.p2}} placeholder={renderAge(props.data[0].age)} setSelected={setAgeSelected} data={dataAge} onChangeText={(selected) => setAgeSelected(selected)} search={false} />
                </View>
                <View>
                    <Text style={styles.tableTitle}>Preference for the gender of the trainer</Text>
                    <SelectList boxStyles={[styles.text]} inputStyles={{...FONTS.p2}} placeholder={renderTrainFor(props.data[0].trainGender)} setSelected={setTrainGenderSelected} data={dataTrainGender} onChangeText={(selected) => setTrainGenderSelected(selected)} search={false} />
                </View>
                <View>
                    <Text style={styles.tableTitle}>Professional</Text>
                    <SelectList boxStyles={[styles.text]} inputStyles={{...FONTS.p2}} placeholder={renderPro(props.data[0].professional)} setSelected={setProSelected} data={dataPro} onChangeText={(selected) => setProSelected(selected)} search={false} />
                </View>
                <View>
                    <Text style={styles.tableTitle}>Available Date</Text>
                    <TextInput 
                        style={[styles.inputTextArea]}
                        onChangeText={ (value) => setAvailableDate(value) }
                    >{availableDate}</TextInput>
                </View>
                <View>
                    <Text style={styles.tableTitle}>Additional details</Text>
                    <TextInput
                        multiline={true}
                        textAlignVertical
                        numberOfLines={10}
                        style={[styles.inputTextArea]}
                        placeholder="Please write additional your information here."
                        onChangeText={ (value) => setDetails(value) }
                    >{details}</TextInput>
                </View>
                <View style={styles.btnPosition}>
                    <TouchableOpacity onPress={ () => { 
                        updateProf(
                            `trainer/${props.auth.uid}/profile`,
                            genderSelected, 
                            ageSelected, 
                            trainGenderSelected,
                            proSelected, 
                            availableDate, 
                            details,
                            imageSet
                        )
                    }}>
                        <Text style={styles.button}>Update</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
        )
    } else {
        return (
            <KeyboardAvoidingView 
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={10}
            >
            <ScrollView style={styles.container}>
            <View style={styles.detailView}>
                <View>
                    <View style={styles.photoArea}>{ renderPhoto() }</View>
                    <TouchableOpacity onPress={ () => pickImage()}>
                        <Text style={styles.photoUpdate}>Update profile photo</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.name} >{ props.data[0].firstName + " " + props.data[0].lastName }</Text>
                </View>
                <View>
                    <Text style={styles.textInTop} >{ renderLocation(props.data[0].location) }</Text>
                </View>
                <View style={{flexDirection:'row'}} >
                    <Image source={ require('../../assets/iconPhone.png') } style={styles.icon} />
                    <Text style={[ styles.textInTop, styles.limitLength ]} numberOfLines={1} >{ props.data[0].phone }</Text>
                </View>
                <View style={{flexDirection:'row'}} >
                    <Image source={ require('../../assets/iconEmail.png') } style={styles.icon} />
                    <Text style={[ styles.textInTop, styles.limitLength ]} numberOfLines={1} >{ props.data[0].email }</Text>
                </View>
                <View style={styles.border}></View>
                <View>
                    <Text style={styles.textBold} >Details</Text>
                </View>
                <View>
                    <Text style={styles.tableTitle}>Gender</Text>
                    <SelectList boxStyles={[styles.text]} inputStyles={{...FONTS.p2}} placeholder={renderGender(props.data[0].gender)} setSelected={setGenderSelected} data={dataGender} onChangeText={(selected) => setGenderSelected(selected)} search={false} />
                </View>
                <View>
                    <Text style={styles.tableTitle}>Age</Text>
                    <SelectList boxStyles={[styles.text]} inputStyles={{...FONTS.p2}} placeholder={renderAge(props.data[0].age)} setSelected={setAgeSelected} data={dataAge} onChangeText={(selected) => setAgeSelected(selected)} search={false} />
                </View>
                <View>
                    <Text style={styles.tableTitle}>Preference for the gender of the trainer</Text>
                    <SelectList boxStyles={[styles.text]} inputStyles={{...FONTS.p2}} placeholder={renderTrainFor(props.data[0].trainGender)} setSelected={setTrainGenderSelected} data={dataTrainGender} onChangeText={(selected) => setTrainGenderSelected(selected)} search={false} />
                </View>
                <View>
                    <Text style={styles.tableTitle}>Professional</Text>
                    <SelectList boxStyles={[styles.text]} inputStyles={{...FONTS.p2}} placeholder={renderPro(props.data[0].professional)} setSelected={setProSelected} data={dataPro} onChangeText={(selected) => setProSelected(selected)} search={false} />
                </View>
                <View>
                    <Text style={styles.tableTitle}>Available Date</Text>
                    <TextInput 
                        style={[styles.inputTextArea]}
                        onChangeText={ (value) => setAvailableDate(value) }
                    >{availableDate}</TextInput>
                </View>
                <View>
                    <Text style={styles.tableTitle}>Additional details</Text>
                    <TextInput
                        multiline={true}
                        textAlignVertical
                        numberOfLines={10}
                        style={[styles.inputTextArea2]}
                        placeholder="Please write additional your information here."
                        onChangeText={ (value) => setDetails(value) }
                    >{details}</TextInput>
                </View>
                <View style={styles.btnPosition}>
                    <TouchableOpacity onPress={ () => { 
                        updateProf(
                            `trainer/${props.auth.uid}/profile`,
                            genderSelected, 
                            ageSelected, 
                            trainGenderSelected,
                            proSelected, 
                            availableDate, 
                            details,
                            imageSet
                        )
                    }}>
                        <Text style={styles.button}>Update</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}


const styles = StyleSheet.create( {
    container: {
        flex: 1,
    },
    detailView: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: SIZES.padding,
        paddingBottom: 100,
    },    
    photoSize: {
        flex: 1,
        justifyContent: "center",
    },
    photoArea: {
        width: "100%",
        height: 300,
        marginBottom: 20,
    },
    name: {
        ...FONTS.h1,
        marginBottom: 10,

    },
    icon: {
        marginRight: 6,
    },
    textInTop: {
        ...FONTS.p2,
        marginBottom: 10,
    },
    text: {
        ...FONTS.p2,
        borderColor:COLORS.blue,
        borderWidth: 1,
        width: "100%",
        padding: SIZES.padding - 5,
        borderRadius: 6,
    },
    textBold: {
        ...FONTS.p1,
        marginBottom: 20,
    },
    limitLength: {
        // width: 80,
        opacity: 0.3,
    },
    table: {
        marginBottom: SIZES.padding - 5,
        // backgroundColor: COLORS.gray,
        borderColor: COLORS.blue,
        borderWidth: 1,
        padding: SIZES.padding - 5,
        borderRadius: 6,
    },
    tableTitle: {
        // ...FONTS.p2,
        // opacity: 0.5,
        marginBottom: 10,
    },
    border: {
        backgroundColor: COLORS.black,
        height: 1,
        marginTop: 10,
        marginBottom: 20,
    },
    bottomBtn: {
        flexDirection: "row",
        width: '100%',
        justifyContent: "space-between",
        marginTop: 20,
    },
    btnPosition: {
        width: '100%',
    },
    button: {
        ...FONTS.p2,
        color: COLORS.white,
        backgroundColor: COLORS.blue,
        padding: SIZES.padding,
        borderRadius: 10,
        textAlign: "center",
    },
    inputTextArea: {
        ...FONTS.p2,
        textAlignVertical: 'top',
        borderColor: COLORS.blue,
        borderWidth: 1.5,
        borderRadius: 6,
        marginBottom: 15,
        padding: 10,
    },
    inputTextArea2: {
        ...FONTS.p2,
        textAlignVertical: 'top',
        borderColor: COLORS.blue,
        borderWidth: 1.5,
        borderRadius: 6,
        marginBottom: 15,
        padding: 10,
        height: 200,
    },
    photoUpdate: {
        // ...FONTS.p2,
        color: COLORS.blue,
        paddingBottom: SIZES.padding,
        borderRadius: 10,
        textAlign: 'right',
    },
});

