import { Text, TouchableOpacity, StyleSheet } from "react-native"
import { useNavigation, useRoute } from '@react-navigation/native'

import { COLORS, FONTS } from "../src/designSet"

export function DisplayAllButton( props ) {

    // Set navigation ----------
    const navigation = useNavigation()

    const displayAll = () => {
        navigation.navigate("UserHomeScreen")
        console.log("hello");
    }

    return (
        <TouchableOpacity onPress={ () => displayAll() }>
            <Text style={styles.button}>Display All</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    button: {
        backgroundColor: COLORS.blue,
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 10,
        color: COLORS.white,
    },

});