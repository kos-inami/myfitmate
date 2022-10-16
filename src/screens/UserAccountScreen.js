import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, Image, ImageBackground, Alert, TextInput} from 'react-native'
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native'

import SelectList from 'react-native-dropdown-select-list'

import { COLORS, FONTS, SIZES } from '../designSet';

export default function UserAccountScreen( props ) {

    // Set navigation ----------
    const navigation = useNavigation()

    // const route = useRoute()
    // const { id, trainerListId, firstName, lastName, email, phone, location, gender, age, trainGender, professional, availableDate, details, photo } = route.params


    // Each Items ----------
    const [firstName, setFirstName] = useState(props.data[0].firstName)
    const [lastName, setLastName] = useState(props.data[0].lastName)
    const [phone, setPhone] = useState(props.data[0].phone)

    const [locationSelected, setLocationSelected] = useState(props.data[0].location)
    const dataLocation = [
        {key:'1',value:'City - CBD'},
        {key:'2',value:'Eastern Suburbs'},
        {key:'3',value:'South-Eastern Sydney'},
        {key:'4',value:'Inner West'},
        {key:'5',value:'Western Sydney'},
        {key:'6',value:'Canterbury-Bankstown'},
        {key:'7',value:'Hills District'},
        {key:'8',value:'Macarthur'},
        {key:'9',value:'South Western Sydney'},
        {key:'10',value:'Northern Beaches'},
        {key:'11',value:'Forest district'},
        {key:'12',value:'Lower North Shore'},
        {key:'13',value:'Upper North Shore'},
        {key:'14',value:'St George'},
        {key:'15',value:'Sutherland Shire'},
        {key:'16',value:'Blue Mountains'},
    ]
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

    useEffect( () => {
        console.log( props.data )
        console.log( props.data[0].photo )
    }, [props.data])

    // Update user account -------------
    const updateAccount = (
        path, 
        locationSelected, 
        firstName, 
        lastName, 
        phone,
        ) => {
        const dataObj = {
            id: props.data[0].id, 
            locationSelected: locationSelected, 
            firstName: firstName, 
            lastName: lastName, 
            phone: phone,
        }
        props.updateAccount( path, dataObj )

        navigation.reset( {index: 0, routes: [{name: "UserSettingScreen"}]})
    }

    return (
        <ScrollView style={styles.container}>
        <View style={styles.detailView}>
            <View>
                <Text>location</Text>
                <SelectList inputStyles={FONTS.p2} placeholder={renderLocation(props.data[0].locationSelected)} setSelected={setLocationSelected} data={dataLocation} onChangeText={(selected) => setLocationSelected(selected)} search={false} />
            </View>
            <View>
                <Text>First name</Text>
                <TextInput style={styles.name} onChangeText={ (value) => setFirstName(value) } >{ props.data[0].firstName }</TextInput>
            </View>
            <View>
                <Text>Last name</Text>
                <TextInput style={styles.name} onChangeText={ (value) => setLastName(value) } >{ props.data[0].lastName }</TextInput>
            </View>
            <View>
                <Text>Phone number</Text>
                <TextInput style={styles.name} onChangeText={ (value) => setPhone(value) } >{ props.data[0].phone }</TextInput>
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
                <TouchableOpacity onPress={ () => { updateAccount(
                    `user/${props.auth.uid}/profile`,
                    locationSelected, 
                    firstName, 
                    lastName,
                    phone,
                    ) }}>
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
        padding: SIZES.padding-5,
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

