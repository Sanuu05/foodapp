import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const PrimaryButton = ({title, onpress}) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onpress}>
            <View style={styles.btncontainer} >
                <Text style={{fontSize:20,fontFamily:'Alegreya_700Bold' }}>{title}</Text>

            </View>

        </TouchableOpacity>
    )
}

export default PrimaryButton

const styles = StyleSheet.create({
    btncontainer:{
        backgroundColor:'orange',
        height:60,
        borderRadius:30,
        justifyContent:'center',
        alignItems:'center',
        marginVertical:20,
        marginHorizontal:20
    }
})
