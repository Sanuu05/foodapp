import { Button, StyleSheet, Text, View ,Image} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from './PrimaryButton';

const Welcome = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={styles.container}>
            <View style={{height:400}}>
                <Image style={{width:'100%',resizeMode:'contain',top:10}} source={require('./../assets/food1.png')}/>
            </View>
            <View style={{}}>
                <Text style={{fontSize:38,fontFamily: 'Alegreya_700Bold',textAlign:'center'}} >Delicious Food</Text>
                <Text style={{fontSize:20,marginTop:15,textAlign:'center',fontFamily: 'Alegreya_400Regular'}}>We help you to find best and delicous food.</Text>
            </View>
            <PrimaryButton title="Get Started" onpress = {()=>navigation.navigate('Bottom')}/>

        </SafeAreaView>
            

    )
}

export default Welcome

const styles = StyleSheet.create({})