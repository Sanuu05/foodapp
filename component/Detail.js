import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Entypo'
import { addtocart, getcart, loadNormalUser } from '../action/user';
import { useDispatch, useSelector } from 'react-redux';
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import {
  useFonts,
  Alegreya_400Regular,
  Alegreya_400Regular_Italic,
  Alegreya_500Medium,
  Alegreya_500Medium_Italic,
  Alegreya_700Bold,
  Alegreya_700Bold_Italic,
  Alegreya_800ExtraBold,
  Alegreya_800ExtraBold_Italic,
  Alegreya_900Black,
  Alegreya_900Black_Italic
} from '@expo-google-fonts/alegreya'
import * as SplashScreen from 'expo-splash-screen';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('screen')
const Detail = (props) => {
  const dispatch = useDispatch()
  const [count, setcount] = useState(1)
  const [count1, setcount1] = useState(1)
  let [fontsLoaded] = useFonts({
    Alegreya_400Regular,
    Alegreya_400Regular_Italic,
    Alegreya_500Medium,
    Alegreya_500Medium_Italic,
    Alegreya_700Bold,
    Alegreya_700Bold_Italic,
    Alegreya_800ExtraBold,
    Alegreya_800ExtraBold_Italic,
    Alegreya_900Black,
    Alegreya_900Black_Italic

  })
  useFocusEffect(
    React.useCallback(() => {

      dispatch(getcart())
      dispatch(loadNormalUser())
    }, [dispatch, count, count1,cartdata?.length])


  )
  const navigation = useNavigation()
  const cartdata = useSelector(state => state.cart.allcart)
  const user = useSelector(state => state?.normal?.user)
  const gettotal = () => {
    return cartdata?.reduce((price, item) => (item.price * item.qyt) + price, 0)
  }
  console.log('vvbbvvv', cartdata?.length)
  if (!fontsLoaded) {
    return null;
  } else {

    return (
      // <SafeAreaView>
      <View style={{ height: height, position: 'relative' }}>
        <View style={{ height: 260, width: '100%' }}>
          <Image
            source={{
              uri: props?.route?.params?.productimg
            }}
            style={{ height: '100%', width: '100%', resizeMode: 'cover' }}
          />
        </View>
        <View style={{ height: 360, width: '100%', paddingHorizontal: 15, zIndex: 1, position: 'relative' }}>
          <View style={{ height: 360, width: '100%', backgroundColor: 'white', elevation: 2, shadowColor: 'grey', marginTop: -50, borderRadius: 15 }}>
            <View style={{ display: 'flex', flexDirection: 'row', padding: 15 }}>
              <View style={{ width: '75%' }}>
                <Text style={{ fontSize: 30, fontFamily: 'Alegreya_800ExtraBold' }} >{props?.route?.params?.name}</Text>
                <Text style={{ fontSize: 18, color: 'grey', fontFamily: "Alegreya_400Regular" }} >{props?.route?.params?.cath}</Text>
              </View>
              <View style={{ width: '25%' }}>
                <Text style={{ fontSize: 25, fontFamily: 'Alegreya_800ExtraBold' }} >₹ {props?.route?.params?.price}</Text>
              </View>

            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => {
                if (count >= 0) {
                  setcount(count + 1)
                }
              }} >
                <Icon name='plus' size={40} />
              </TouchableOpacity >

              <TouchableOpacity
                style={{ backgroundColor: 'orange', width: 150, height: 50, borderRadius: 5, elevation: 5, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                onPress={() => {
                  if(user){
                  setcount1(count + 1)
                  dispatch(addtocart({ cart: { cartitem: props?.route?.params?._id, pimg: props?.route?.params?.productimg, pname: props?.route?.params?.name, stock: props?.route?.params?.stock, cath: props?.route?.params?.cath, price: props?.route?.params?.price, qyt: count } }))
                }else{
                  navigation.navigate('Login')
                }
              }


                }
              >
                {/* <Text style={{fontSize:15,fontWeight:'bold',color:'white'}} >{count}</Text>  */}
                <Text style={{ fontSize: 18, fontFamily: 'Alegreya_800ExtraBold', color: 'white' }} >Add To Cart ({count}) </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                if (count > 1) {
                  setcount(count - 1)
                }
              }} >
                <Icon name='minus' size={40} />
              </TouchableOpacity>
            </View>
            <View style={{ zIndex: 1, position: 'relative' }}>
              <Text style={{ padding: 15, fontSize: 15, fontFamily: 'Alegreya_400Regular' }}>{props?.route?.params?.des}</Text>
            </View>

          </View>

        </View>
        {
          cartdata?.length > 0 ? <View style={{ position: 'absolute', bottom: 150, zIndex: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', width: width }} >
            <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', height: 50, width: width - 30, backgroundColor: 'orange', borderRadius: 6 }} activeOpacity={0.8} onPress={()=>navigation.navigate('Cart')} >
              <View style={{ width: '50%' }}>
                <View>
                  <Text style={{ color: 'white', fontSize: 15, fontFamily: 'Alegreya_700Bold', textAlign: 'center', marginTop: 6 }}>{cartdata?.length} items | ₹ {gettotal()}</Text>
                  <Text style={{ color: 'white', fontSize: 10, fontFamily: 'Alegreya_700Bold', textAlign: 'center', marginTop: 1 }}>Extra charges may apply</Text>
                </View>
              </View>
              <View style={{ width: '50%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly',alignItems:'center' }}>
                <Text style={{ color: 'white', fontSize: 18, fontFamily: 'Alegreya_700Bold', textAlign: 'right', marginTop: 1 }}>View Cart</Text>
                <Icon1 name='shopping-bag' size={25} color="white" />

              </View>

            </TouchableOpacity>

          </View> : null
        }


      </View>
      // </SafeAreaView>
    )
  }
}

export default Detail

const styles = StyleSheet.create({})