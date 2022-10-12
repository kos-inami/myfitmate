import { Text, View, StyleSheet, Image, ImageBackground, TextInput, TouchableOpacity, FlatList, Alert, Keyboard, KeyboardAvoidingView, Platform, RefreshControl } from 'react-native'
import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native'
import { useHeaderHeight } from '@react-navigation/elements'

// Design set ----------
import { COLORS, SIZES, FONTS, SHADOW } from "../designSet"

export default function UserWorkoutList( props ) {

    // Set navigation ----------
    const navigation = useNavigation()

    return (
        <View style={styles.homeView}>
            <View style={{padding: SIZES.padding}}>
                <FlatList 
                    // data={ trainerList } 
                    // renderItem= {renderItem}
                    // keyExtractor={ item => item.id }
                />
            </View>
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
        padding: 10,
    },
    nameBlock: {
        padding: 10,
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
});