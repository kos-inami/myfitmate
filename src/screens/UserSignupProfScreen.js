import { Text, TextInput, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, StatusBar, ScrollView, SafeAreaView } from 'react-native'
import { React, useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

import SelectList from 'react-native-dropdown-select-list'

// Design set ----------
import { COLORS, SIZES, FONTS, SHADOW, LINE } from "../designSet"


export default function UserSignupProfScreen( props ) {

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

    const [trainerGenderSelected, setTrainerGenderSelected] = useState('')
    const dataTrainerGender = [
        {key:'1',value:'Male'},
        {key:'2',value:'Female'},
        {key:'3',value:'Does not matter'},
    ]

    const [regimeSelected, setRegimeSelected] = useState('')
    const dataRegime = [
        {key:'1',value:'I don’t really do any exercise'},
        {key:'2',value:'Some times in the month'},
        {key:'3',value:'A few days in every week'},
        {key:'4',value:'Very active - more than 4 days per week'},
    ]

    const [goalSelected, setGoalSelected] = useState('')
    const dataGoal = [
        {key:'1',value:'Weight loss'},
        {key:'2',value:'Build muscle'},
        {key:'3',value:'Keep healthy'},
        {key:'4',value:'Strength'},
        {key:'5',value:'Shred'},
    ]

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
        trainerGenderSelected, 
        regimeSelected, 
        goalSelected, 
        details
        ) => {
        const dataObj = {
            firstName: firstName, 
            lastName: lastName,
            email: email, 
            phone: phone, 
            locationSelected: locationSelected, 
            genderSelected: genderSelected, 
            ageSelected: ageSelected, 
            trainerGenderSelected: trainerGenderSelected, 
            regimeSelected: regimeSelected, 
            goalSelected: goalSelected, 
            details: details,
            photo: "",
        }
        props.add( path, dataObj )

        navigation.reset( {index: 0, routes: [{name: "UserHomeScreen"}]})
    }


    return (
        
        <KeyboardAvoidingView style={styles.signupView} behavior='padding'>
            <ScrollView style={styles.container}>
                <View style={styles.signupForm}>

                    <Text style={styles.label}>Please fill out the form below to help us to find a Pearsonal Trainer for you.</Text>
                    {/* <Text>{email}</Text> */}

                    <View style={LINE.line1} />

                    <Text style={styles.label}>Location (*Regions of Sydney)</Text>
                        <SelectList style={styles.input} setSelected={setLocationSelected} data={dataLocation} onChangeText={(selected) => setLocationSelected(selected)} search={false} />
                        {/* <Text>location: {locationSelected}</Text> */}

                    <Text style={styles.label}>First name</Text>
                        <TextInput style={styles.input} onChangeText={ (value) => setFirstName(value) }/>

                    <Text style={styles.label}>Last name</Text>
                        <TextInput style={styles.input} onChangeText={ (value) => setLastName(value) }/>

                    <Text style={styles.label}>Phone number</Text>
                        <TextInput style={styles.input} onChangeText={ (value) => setPhone(value) }/>

                    <View style={LINE.line1} />

                    <Text style={styles.title}>Details</Text>

                    <Text style={styles.label}>Gender</Text>
                        <SelectList style={styles.input} setSelected={setGenderSelected} data={dataGender} onChangeText={(selected) => setGenderSelected(selected)} search={false} />

                    <Text style={styles.label}>Age</Text>
                        <SelectList style={styles.input} setSelected={setAgeSelected} data={dataAge} onChangeText={(selected) => setAgeSelected(selected)} search={false} />

                    <Text style={styles.label}>Preference for the gender of the trainer</Text>
                        <SelectList style={styles.input} setSelected={setTrainerGenderSelected} data={dataTrainerGender} onChangeText={(selected) => setTrainerGenderSelected(selected)} search={false} />

                    <Text style={styles.label}>Describe your current exercise regime</Text>
                        <SelectList style={styles.input} setSelected={setRegimeSelected} data={dataRegime} onChangeText={(selected) => setRegimeSelected(selected)} search={false} />

                    <Text style={styles.label}>Goal</Text>
                        <SelectList style={styles.input} setSelected={setGoalSelected} data={dataGoal} onChangeText={(selected) => setGoalSelected(selected)} search={false} />

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
                            `user/${props.auth.uid}/profile`, 
                            firstName, 
                            lastName, 
                            email,
                            phone, 
                            locationSelected, 
                            genderSelected, 
                            ageSelected, 
                            trainerGenderSelected, 
                            regimeSelected, 
                            goalSelected, 
                            details
                        )}}
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
    input: {
        borderColor: COLORS.orange,
        borderWidth: 1.5,
        borderRadius: 6,
        marginBottom: 15,
        padding: 10,
    },
    inputTextArea: {
        textAlignVertical: 'top',
        borderColor: COLORS.orange,
        borderWidth: 1.5,
        borderRadius: 6,
        marginBottom: 15,
        padding: 10,
        height: 200,
    },
    form: {
        alignItems: 'flex-start',
    },
    button: {
        backgroundColor: COLORS.orange,
        padding: 10,
        marginTop: 10,
        marginBottom: 30,
        borderRadius: 10,
        overflow: 'hidden',
    },
    buttonDisabled: {
        backgroundColor: COLORS.gray,
        padding: 10,
        marginTop: 10,
        marginBottom: 30,
        borderRadius: 10,
        overflow: 'hidden',
    },
    buttonText: {
        ...FONTS.p1,
        color: 'white',
        textAlign: 'center',
    }

});