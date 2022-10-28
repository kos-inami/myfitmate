import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, Image, ImageBackground, Alert, TextInput } from 'react-native'
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native'

import SelectList from 'react-native-dropdown-select-list'

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

    // Each Items ----------
    const renderPhoto = (pho) => {
        if (pho == "") {
            return <ImageBackground source={ require('../../assets/photoNone.png') } resizeMode="cover" style={styles.photoSize} imageStyle={{ borderRadius: 10}}/>
        } else {
            return <ImageBackground source={ require('../../assets/iconLocation.png') } style={styles.photoSize}  imageStyle={{ borderRadius: 10}} resizeMode="cover" />
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
    }, [props.data])

    // update user profile ---------
    // const [input, setInput] = useState("")
    const updateProf = (
        path, 
        genderSelected, 
        ageSelected, 
        trainGenderSelected,
        proSelected, 
        availableDate, 
        details
        ) => {
        const dataObj = {
            id: props.data[0].id, 
            gender: genderSelected, 
            age: ageSelected, 
            trainGender: trainGenderSelected, 
            professional: proSelected, 
            availableDate: availableDate, 
            details: details,
        }
        props.update( path, dataObj )

        navigation.reset( {index: 0, routes: [{name: "TrainerHomeScreen"}]} )
    }
    const updateProfList = (
        path, 
        genderSelected, 
        ageSelected, 
        trainGenderSelected,
        proSelected, 
        availableDate, 
        details
        ) => {
        const dataObjProf = {
            id: props.auth.uid, 
            gender: genderSelected, 
            age: ageSelected, 
            trainGender: trainGenderSelected, 
            professional: proSelected, 
            availableDate: availableDate, 
            details: details,
        }
        props.updateList( path, dataObjProf )
    }

    return (
        <ScrollView style={styles.container}>
        <View style={styles.detailView}>
            <View>
                <View style={styles.photoArea}>{ renderPhoto(props.data[0].photo) }</View>
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
                        details
                    ),
                    updateProfList(
                        `trainerList`,
                        genderSelected, 
                        ageSelected, 
                        trainGenderSelected,
                        proSelected, 
                        availableDate, 
                        details
                    )
                }}>
                    <Text style={styles.button}>Update</Text>
                </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create( {
    container: {
        
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
});

