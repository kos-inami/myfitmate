import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, Image, ImageBackground, Alert, TextInput} from 'react-native'
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native'

import { COLORS, FONTS, SIZES } from '../designSet';

export default function UserAccountScreen( props ) {

    // Set navigation ----------
    const navigation = useNavigation()

    // const route = useRoute()
    // const { id, trainerListId, firstName, lastName, email, phone, location, gender, age, trainGender, professional, availableDate, details, photo } = route.params


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
    const renderRegime = ( regime ) => {
        if (regime == 1) {
            return <Text>I don’t really do any exercise</Text>
        }
        if (regime == 2) {
            return <Text>Some times in the month</Text>
        }
        if (regime == 3) {
            return <Text>A few days in every week</Text>
        }
        if (regime == 4) {
            return <Text>Very active - more than 4 days per week</Text>
        }
    }
    const renderGoal = ( pro ) => {
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
        console.log( props.data )
        console.log( props.data[0].photo )
    }, [props.data])

    return (
        <ScrollView style={styles.container}>
        <View style={styles.detailView}>
            <View>
                <Text>location</Text>
                <Text style={styles.name} >{ renderLocation(props.data[0].locationSelected) }</Text>
            </View>
            <View>
                <Text>First name</Text>
                <Text style={styles.name} >{ props.data[0].firstName }</Text>
            </View>
            <View>
                <Text>Last name</Text>
                <Text style={styles.name} >{ props.data[0].lastName }</Text>
            </View>
            <View>
                <Text>Phone number</Text>
                <Text style={styles.name} >{ props.data[0].phone }</Text>
            </View>
            <View>
                <Text>Email</Text>
                <Text style={styles.name} >{ props.data[0].email }</Text>
            </View>
            <View>
                <Text>Password</Text>
                <Text style={styles.name} >**********</Text>
            </View>
            <View style={styles.btnPosition}>
                <TouchableOpacity onPress={ () => { update() }}>
                    <Text style={styles.button}>Update</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={ () => { update() }}>
                    <Text style={styles.deleteBtn}>delete account</Text>
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
        ...FONTS.p2,
        borderColor: COLORS.orange,
        borderWidth: 1,
        borderRadius: 10,
        padding: SIZES.padding,
        marginTop: 10,
        marginBottom: 20,

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
    },
    textBold: {
        ...FONTS.p1,
        marginBottom: 20,
    },
    limitLength: {
        width: 80,
        opacity: 0.3,
    },
    table: {
        marginBottom: SIZES.padding - 5,
        backgroundColor: COLORS.gray,
        padding: SIZES.padding - 5,
        borderRadius: 6,
    },
    tableTitle: {
        ...FONTS.p2,
        opacity: 0.5,
        marginBottom: 5,
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
        ...FONTS.p1,
        color: COLORS.white,
        backgroundColor: COLORS.orange,
        padding: SIZES.padding,
        borderRadius: 10,
        textAlign: "center",
    },
    deleteBtn: {
        opacity: 0.4,
        marginTop: 40,
    },
});

