import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, Alert, TextInput} from 'react-native'
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS, SIZES } from '../designSet';

import { useRoute } from '@react-navigation/native'

import { BottomPopup } from '../../components/BottomPopup';
import { BottomPopupWeight } from '../../components/BottomPopupWeight';
import { BottomPopupRap } from '../../components/BottomPopupRap';
import { BottomPopupDetails } from '../../components/BottomPopupDetails';
import { Colors } from "react-native/Libraries/NewAppScreen";



export default function UserWorkoutDetailsScreen( props ) {

    // Set navigation ----------
    const navigation = useNavigation()

    const route = useRoute()
    const { id, name, weight, rap, details } = route.params

    const [ nameSet, setNameSet ] = useState(name)
    const [ weightSet, setWeightSet ] = useState(weight)
    const [ rapSet, setRapSet ] = useState(rap)
    const [ detailsSet, setDetailsSet ] = useState(details)

    // Get document id and navigate to home screen ----------
    const clickHandler = (del) => {
        Alert.alert(
            "DELETE A TASK",
            "Are you sure to delete this task?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                { 
                    text: "OK", 
                    onPress: () =>  clickAlert(del),
                }
            ]
        )
    }
    // When press okay through this function
    const clickAlert = (del) => {
        // console.log("OK Pressed")
        props.del( del )
        navigation.navigate('UserWorkoutListScreen', del )
    }

    // For pop up ---------
    let popupRef = React.createRef()
    const onShowPopup = () => {
        popupRef.show()
    }
    const onClosePopup = () => {
        popupRef.close()
    }

    let popupRefWeight = React.createRef()
    const onShowPopupWeight = () => {
        popupRefWeight.show()
    }
    const onClosePopupWeight = () => {
        popupRefWeight.close()
    }

    let popupRefRap = React.createRef()
    const onShowPopupRap = () => {
        popupRefRap.show()
    }
    const onClosePopupRap = () => {
        popupRefRap.close()
    }
    let popupRefDetails = React.createRef()
    const onShowPopupDetails = () => {
        popupRefDetails.show()
    }
    const onClosePopupDetails = () => {
        popupRefDetails.close()
    }

    // For update
    const updateName = (updateVal) => {
        console.log('updating... ' + updateVal + " where " + id )
        setNameSet(updateVal)
        props.updateName( updateVal, id )
        popupRef.close()
    }
    const updateWeight = (updateVal) => {
        // console.log('updating... ' + updateVal + " where " + id )
        setWeightSet(updateVal)
        props.updateWeight( updateVal, id )
        popupRefWeight.close()
    }
    const updateRap = (updateVal) => {
        // console.log('updating... ' + updateVal + " where " + id )
        setRapSet(updateVal)
        props.updateRap( updateVal, id )
        popupRefRap.close()
    }
    const updateDetails = (updateVal) => {
        // console.log('updating... ' + updateVal + " where " + id )
        setDetailsSet(updateVal)
        props.updateDetails( updateVal, id )
        popupRefDetails.close()
    }

    return (
        <View style={styles.detailView}>
            {/* <View style={styles.table}>
                <Text style={styles.tableLeft}>Task ID</Text>
                <Text>{ id }</Text>
            </View> */}
            <TouchableOpacity style={styles.table} onPress={onShowPopup}>
                <Text style={styles.tableLeft}>Name</Text>
                <Text style={styles.tableRight} >{ nameSet }</Text>
            </TouchableOpacity>      
            <TouchableOpacity style={styles.table} onPress={onShowPopupWeight}>
                <Text style={styles.tableLeft}>Weight</Text>
                <Text style={styles.tableRight} >{ weightSet }</Text>
            </TouchableOpacity>      
            <TouchableOpacity style={styles.table} onPress={onShowPopupRap}>
                <Text style={styles.tableLeft}>Rap</Text>
                <Text style={styles.tableRight} >{ rapSet }</Text>
            </TouchableOpacity>      
            <TouchableOpacity style={styles.table} onPress={onShowPopupDetails}>
                <Text style={styles.tableLeft}>Details</Text>
                <Text style={styles.tableRight} >{ detailsSet }</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                    style={styles.deleteBtn}
                    onPress={ () => clickHandler(id) }
                >
                <Text style={styles.deleteBtnText}>- delete</Text>
            </TouchableOpacity>
            <BottomPopup 
                title = "Name"
                ref={(target) => popupRef = target}
                onTouchOutside={onClosePopup}
                data={ nameSet }
                save={updateName}
            />
            <BottomPopupWeight 
                title = "Weight"
                ref={(target) => popupRefWeight = target}
                onTouchOutside={onClosePopupWeight}
                data={ weightSet }
                save={updateWeight}
            />
            <BottomPopupRap 
                title = "Rap"
                ref={(target) => popupRefRap = target}
                onTouchOutside={onClosePopupRap}
                data={ rapSet }
                save={updateRap}
            />
            <BottomPopupDetails 
                title = "Details"
                ref={(target) => popupRefDetails = target}
                onTouchOutside={onClosePopupDetails}
                data={ detailsSet }
                save={updateDetails}
            />
        </View>
    )
}


const styles = StyleSheet.create( {
    detailView: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: SIZES.padding,
    },
    table: {
        flexDirection: 'row',
        marginBottom: SIZES.padding,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.orange,
        paddingBottom: SIZES.padding,
    },
    tableLeft: {
        ...FONTS.p1,
        fontWeight: "700",
        width: '34%',
    },
    tableRight: {
        ...FONTS.p2,
        width: '66%',
    },
    deleteBtn: {
        marginTop: 10,
    },
    deleteBtnText: {
        opacity: 0.5,
    },
});