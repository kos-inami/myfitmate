import { Text, TextInput, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, StatusBar, ScrollView, SafeAreaView } from 'react-native'
import { React, useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

import SelectList from 'react-native-dropdown-select-list'

// Design set ----------
import { COLORS, SIZES, FONTS, SHADOW, LINE } from "../designSet"


export default function TrainerSignupProfScreen( props ) {

    // Set navigation ----------
    const navigation = useNavigation()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const route = useRoute();
    const { email } = route.params

    const [phone, setPhone] = useState('')

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

    const [trainGenderSelected, setTrainGenderSelected] = useState('')
    const dataTrainGender = [
        {key:'1',value:'Male'},
        {key:'2',value:'Female'},
        {key:'3',value:'Does not matter'},
    ]

    const [proSelected, setProSelected] = useState('')
    const dataPro = [
        {key:'1',value:'Weight loss'},
        {key:'2',value:'Build muscle'},
        {key:'3',value:'Keep healthy'},
        {key:'4',value:'Strength'},
        {key:'5',value:'Shred'},
    ]

    const [availableDate, setAvailableDate] = useState('')
    const [details, setDetails] = useState('')

    // Add user profile ---------
    const [input, setInput] = useState("")
    const saveProf = (
        path, 
        firstName, 
        lastName,
        email, 
        phone, 
        locationSelected, 
        genderSelected, 
        ageSelected, 
        trainGenderSelected, 
        proSelected, 
        availableDate, 
        details
        ) => {
        const dataObj = {
            firstName: firstName, 
            lastName: lastName, 
            email: email,
            phone: phone, 
            location: locationSelected, 
            gender: genderSelected, 
            age: ageSelected, 
            trainGender: trainGenderSelected, 
            professional: proSelected, 
            availableDate: availableDate, 
            details: details
        }
        props.add( path, dataObj )

        navigation.reset( {index: 0, routes: [{name: "TrainerHomeScreen"}]})
    }
    const saveProfList = (
        path, 
        firstName, 
        lastName,
        email, 
        phone, 
        locationSelected, 
        genderSelected, 
        ageSelected, 
        trainGenderSelected, 
        proSelected, 
        availableDate, 
        details
        ) => {
        const dataObjProf = {
            trainerListId: props.auth.uid,
            firstName: firstName, 
            lastName: lastName, 
            email: email,
            phone: phone, 
            location: locationSelected, 
            gender: genderSelected, 
            age: ageSelected, 
            trainGender: trainGenderSelected, 
            professional: proSelected, 
            availableDate: availableDate, 
            details: details,
            photo: "",
        }
        // console.log(
        //     "List = " + 
        //     path,
        //     firstName, 
        //     lastName,
        //     email, 
        //     phone, 
        //     locationSelected, 
        //     genderSelected, 
        //     ageSelected, 
        //     trainGenderSelected, 
        //     proSelected, 
        //     availableDate, 
        //     details,
        //     props.auth.uid
        // );
        props.addProfList( path, dataObjProf, email )
    }

    return (
        
        <KeyboardAvoidingView style={styles.signupView} behavior='padding'>
            <ScrollView style={styles.container}>
                <View style={styles.signupForm}>

                    <Text style={styles.label}>Please fill out to let us know about you.</Text>
                    <Text>{email}</Text>

                    <View style={LINE.line1} />

                    <Text style={styles.label}>Location (*Regions of Sydney)</Text>
                        <SelectList style={styles.trainerInput} setSelected={setLocationSelected} data={dataLocation} onChangeText={(selected) => setLocationSelected(selected)} search={false} />
                        {/* <Text>location: {locationSelected}</Text> */}

                    <Text style={styles.label}>First name</Text>
                        <TextInput style={styles.trainerInput} onChangeText={ (value) => setFirstName(value) }/>

                    <Text style={styles.label}>Last name</Text>
                        <TextInput style={styles.trainerInput} onChangeText={ (value) => setLastName(value) }/>

                    <Text style={styles.label}>Phone number</Text>
                        <TextInput style={styles.trainerInput} onChangeText={ (value) => setPhone(value) }/>

                    <View style={LINE.line1} />

                    <Text style={styles.title}>Details</Text>

                    <Text style={styles.label}>Gender</Text>
                        <SelectList style={styles.trainerInput} setSelected={setGenderSelected} data={dataGender} onChangeText={(selected) => setGenderSelected(selected)} />

                    <Text style={styles.label}>Age</Text>
                        <SelectList style={styles.trainerInput} setSelected={setAgeSelected} data={dataAge} onChangeText={(selected) => setAgeSelected(selected)} />

                    <Text style={styles.label}>Training gender for</Text>
                        <SelectList style={styles.trainerInput} setSelected={setTrainGenderSelected} data={dataTrainGender} onChangeText={(selected) => setTrainGenderSelected(selected)} />

                    <Text style={styles.label}>Professional for</Text>
                    <SelectList style={styles.trainerInput} setSelected={setProSelected} data={dataPro} onChangeText={(selected) => setProSelected(selected)} />

                    <Text style={styles.label}>Available date</Text>
                    <TextInput style={styles.inputTextArea} onChangeText={ (value) => setAvailableDate(value) } />

                    <Text style={styles.label}>Additional details</Text>
                    <TextInput
                        multiline={true}
                        textAlignVertical
                        numberOfLines={10}
                        style={styles.inputTextArea}
                        placeholder="Please write additional your information here."
                        onChangeText={ (value) => setDetails(value) }
                    />
                    
                    {/* Submit button */}
                    <TouchableOpacity 
                        style={ styles.button }
                        onPress={ () => { saveProf(
                            `trainer/${props.auth.uid}/profile`, 
                            firstName, 
                            lastName, 
                            email,
                            phone, 
                            locationSelected, 
                            genderSelected, 
                            ageSelected, 
                            trainGenderSelected, 
                            proSelected, 
                            availableDate, 
                            details
                        ),
                        saveProfList(
                            `trainerList`, 
                            firstName, 
                            lastName, 
                            email,
                            phone, 
                            locationSelected, 
                            genderSelected, 
                            ageSelected, 
                            trainGenderSelected, 
                            proSelected, 
                            availableDate, 
                            details
                        )
                    }}
                    >
                        <Text style={styles.buttonText}>Save</Text>
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