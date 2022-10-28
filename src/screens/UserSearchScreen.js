import { Text, TextInput, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, StatusBar, ScrollView, SafeAreaView } from 'react-native'
import { React, useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

import SelectList from 'react-native-dropdown-select-list'

import { COLORS, FONTS, SIZES } from '../designSet';

export default function UserSearchScreen( props ) {

    // Set navigation ----------
    const navigation = useNavigation()

    const [locationSelected, setLocationSelected] = useState('')
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

    const [genderSelected, setGenderSelected] = useState('')
    const dataGender = [
        {key:'1',value:'Male'},
        {key:'2',value:'Female'},
        {key:'3',value:'Others'},
    ]

    const [ageSelected, setAgeSelected] = useState('')
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

    const [proSelected, setProSelected] = useState('')
    const dataPro = [
        {key:'1',value:'Weight loss'},
        {key:'2',value:'Build muscle'},
        {key:'3',value:'Keep healthy'},
        {key:'4',value:'Strength'},
        {key:'5',value:'Shred'},
    ]


    // Pass submit to home -----------
    const submitSearch = ( 
        locationSelected, 
        genderSelected, 
        ageSelected,
        proSelected
    ) => {
        navigation.navigate("UserHomeScreen",  {
            locationSelected, 
            genderSelected, 
            ageSelected,
            proSelected
        })
    }

    return (
        <KeyboardAvoidingView style={styles.signupView} behavior='padding'>
            <ScrollView style={styles.container}>
                <View style={styles.signupForm}>

                    <Text style={{color: COLORS.red, marginBottom:10}}>* Location and Professional are required.</Text>

                    <Text style={styles.label}>Location<Text style={{color: COLORS.red}}> * </Text>(Regions of Sydney)</Text>
                        <SelectList boxStyles={styles.trainerInput} setSelected={setLocationSelected} data={dataLocation} onChangeText={(selected) => setLocationSelected(selected)} search={false} />

                    <Text style={styles.label}>Professional for <Text style={{color: COLORS.red}}>*</Text></Text>
                        <SelectList boxStyles={styles.trainerInput} setSelected={setProSelected} data={dataPro} onChangeText={(selected) => setProSelected(selected)} search={false} />

                    <Text style={styles.label}>Gender</Text>
                        <SelectList boxStyles={styles.trainerInputGray} setSelected={setGenderSelected} data={dataGender} onChangeText={(selected) => setGenderSelected(selected)} search={false} />

                    <Text style={styles.label}>Age</Text>
                        <SelectList boxStyles={styles.trainerInputGray} setSelected={setAgeSelected} data={dataAge} onChangeText={(selected) => setAgeSelected(selected)} search={false} />

                    <TouchableOpacity 
                        style={ styles.button }
                        onPress={ () => { submitSearch(
                            locationSelected, 
                            genderSelected, 
                            ageSelected, 
                            proSelected
                        )
                    }}
                    >
                        <Text style={styles.buttonText}>Submit</Text>
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
    trainerInput: {
        borderColor: COLORS.blue,
        borderWidth: 1.5,
        borderRadius: 6,
        marginBottom: 15,
        padding: 10,
    },
    trainerInputGray: {
        borderColor: COLORS.black,
        borderWidth: 1.5,
        borderRadius: 6,
        marginBottom: 15,
        padding: 10,
        opacity: 0.5,
    },
    inputTextArea: {
        textAlignVertical: 'top',
        borderColor: COLORS.blue,
        borderWidth: 1.5,
        borderRadius: 6,
        marginBottom: 15,
        padding: 10,
    },
    form: {
        alignItems: 'flex-start',
    },
    button: {
        backgroundColor: COLORS.blue,
        padding: 10,
        marginTop: 10,
        marginBottom: 30,
        borderRadius: 6,
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