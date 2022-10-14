import { Text, View, StyleSheet, Image, ImageBackground, TextInput, TouchableOpacity, FlatList, Alert, Keyboard, KeyboardAvoidingView, Platform, RefreshControl } from 'react-native'
import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native'
import { useHeaderHeight } from '@react-navigation/elements'

// Import FontAwesome Component
import FontAwesome from '@expo/vector-icons/FontAwesome';

// Design set ----------
import { COLORS, SIZES, FONTS, SHADOW } from "../designSet"

export default function UserWorkoutListScreen( props ) {

    // Set navigation ----------
    const navigation = useNavigation()

    // Add New task ---------
    const [input, setInput] = useState("")
    const submit = (path, data) => {
        const dataObj = {
            name: data,
            weight: "",
            rap: "",
            details: "",
            date: new Date()}
        setInput("")
        Keyboard.dismiss()
        console.log("add new task: " +
            path,
            data
        );
        props.addWorkout( path, dataObj )
    }

    // Get data ----------
    useEffect( () => {
        console.log( props.data )
    }, [props.data])

    // Pass data detail screen ----------
    const clickHandler = (data) => {
        navigation.navigate('UserWorkoutDetailsScreen', data )
    }
    const renderItem = ({item}) => (    // Render to items 
        <View style={styles.taskListBlockShadow}>
            <View style={styles.taskListBlock}>
                <Text style={styles.taskListText} onPress={ () => clickHandler(item) }>
                    { item.name }
                </Text>
                <FontAwesome name="angle-right" style={styles.listArrow}/>
            </View>
            {/* <View style={styles.borderBottom}></View> */}
        </View>
    )

    return (
        <View style={styles.homeView}>
            <View style={{padding: SIZES.padding}}>
                <FlatList 
                    data={ props.data } 
                    renderItem= {renderItem}
                    keyExtractor={ item => item.id }
                />
            </View>
            <KeyboardAvoidingView style={styles.inputBlock}>
                <TextInput style={styles.input} value={input} onChangeText={(val) => setInput(val)} placeholder="Create a new workout!"/>
                <TouchableOpacity 
                    style={ (input.length > 0) ? styles.button : styles.buttonDisabled }
                    disabled={ (input.length > 0) ? false : true }
                    onPress={() => {
                        submit(`user/${props.auth.uid}/workout`, input)
                    }}
                >
                    <Text style={ (input.length > 0) ? styles.buttonText : styles.buttonTextDisabled }>+</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
            <View style={styles.nav}>
                <View style={styles.navMenu}>
                    <Image source={ require('../../assets/iconWorkout.png') } style={styles.navBtnActive} />
                    <Text style={styles.navBtnActive}>Workout</Text>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={ () => { navigation.navigate('UserHomeScreen') }}
                        style={styles.navMenu}
                    >
                        <Image source={ require('../../assets/iconTrainer.png') } style={styles.navBtn} />
                        <Text style={styles.navBtn}>Trainer</Text>
                    </TouchableOpacity>
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

}

const styles = StyleSheet.create( {
    homeView: {
        backgroundColor: COLORS.white,
        flex: 1,
        width: '100%',
        paddingBottom: 130,
    },
    inputBlock: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        left: 0,
        right: 0,
        bottom: 100,
        width: '100%',
    },
    input: {
        ...FONTS.p2,
        backgroundColor: COLORS.white,
        borderColor: COLORS.orange,
        borderWidth: 3,
        borderRadius: 100,
        padding: 10,
        marginRight: 10,
        paddingLeft: SIZES.padding,
        width: '80%',
        zIndex: 3, // works on ios
        elevation: 3, // works on android
    },
    button: {
        backgroundColor: COLORS.white,
        width: 46,
        borderColor: COLORS.orange,
        borderWidth: 2,
        borderRadius: 100,
        zIndex: 3, // works on ios
        elevation: 3, // works on android
    },
    buttonDisabled: {
        backgroundColor: COLORS.white,
        width: 46,
        borderColor: COLORS.gray,
        borderWidth: 2,
        borderRadius: 100,
        zIndex: 3, // works on ios
        elevation: 3, // works on android
    },
    buttonText: {
        color: COLORS.orange,
        fontSize: 30,
        paddingLeft: 12,
        paddingTop: 0,
    },
    buttonTextDisabled: {
        color: COLORS.gray,
        fontSize: 30,
        paddingLeft: 12,
        paddingTop: 0,
    },
    taskListBlock: {
        borderColor: COLORS.orange,
        borderRadius: 20,
        borderWidth: 2,
        marginBottom: 15,
        backgroundColor: COLORS.white,
        zIndex: 6, // works on ios
        elevation: 6, // works on android
    },
    taskListText: {
        ...FONTS.p2,
        padding: SIZES.padding,
        width: '100%',
        // borderBottomColor: COLORS.orange,
        // borderBottomWidth: 2,
    },
    listArrow: {
        position: 'absolute',
        right: SIZES.padding,
        top: 20,
        fontSize: 20,
        color: COLORS.orange,
    },
    borderBottom: {
        backgroundColor: COLORS.orange,
        height: 2,
        width: '100%',
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