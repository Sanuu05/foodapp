import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Button ,Dimensions} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import img from '../assets/biri.png'
import { useDispatch, useSelector } from 'react-redux';
import { addtocart, delCart, getcart } from '../action/user';
import { useIsFocused, useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'
import Icons from 'react-native-vector-icons/Entypo'
import PrimaryButton from './PrimaryButton';

const { width ,height} = Dimensions.get('screen')
const Cart = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(getcart())
    console.log('bb')
  }, [isfocused])
  const cartdata = useSelector(state => state.cart.allcart)
  const del = useSelector(state => state.acart.del)
  const add = useSelector(state => state.acart.add)
  const isfocused = useIsFocused()
  const navigation = useNavigation()
  useFocusEffect(
    React.useCallback(() => {
      console.log('vvbbvvv')
      dispatch(getcart())
    }, [dispatch, cartdata?.lenth, del, add])


  )
  console.log(isfocused)
  const gettotal = () => {
    return cartdata?.reduce((price, item) => (item.price * item.qyt) + price, 0)
  }

  const Card = ({ v, i }) => {
    const [count, setcount] = useState(v?.qyt)
    console.log(`${i}`, count)
    const dispatch = useDispatch()
    return (
      <View key={i} style={{ backgroundColor: 'white', height: 120, elevation: 2, shadowColor: 'grey', borderRadius: 6, marginVertical: 10, display: 'flex', flexDirection: 'row', marginHorizontal: 20 }}>
        <View style={{ width: '35%', padding: 10 }}>
          <Image source={
            {
              uri: v?.pimg
            }
          } style={{ width: 90, height: 90 }} />
        </View>
        <View style={{ width: '55%', marginTop: 8 }}>
          <Text style={{ fontSize: 20,fontFamily:'Alegreya_700Bold' }}>{v?.pname}</Text>
          <Text style={{ fontSize: 13, color: 'grey' ,fontFamily:'Alegreya_400Regular' }}>{v?.cath}</Text>
          <Text style={{ fontSize: 16, marginLeft: 3 ,fontFamily:'Alegreya_700Bold'}}>₹ {v?.price}</Text>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', width: '100%', }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 130 }}>
              <TouchableOpacity onPress={() => {
                if (count >= 0) {

                  dispatch(addtocart({ cart: { cartitem: v?.cartitem, cath: v?.cath, pimg: v?.pimg, pname: v?.pname, stock: v?.stock, price: v?.price, qyt: count + 1 } }))
                }
              }} >
                <Icons name='plus' size={20} />
              </TouchableOpacity >

              <View
                style={{ backgroundColor: 'orange', width: 70, height: 23, borderRadius: 3, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}

              ><Text style={{ fontSize: 13, fontFamily:'Alegreya_700Bold', color: 'white' }} >{count}</Text>
                {/* <Text style={{fontSize:18,fontWeight:'bold',color:'white'}} >Add To Cart </Text> */}
              </View>
              <TouchableOpacity onPress={() => {
                if (count > 1) {

                  dispatch(addtocart({ cart: { cartitem: v?.cartitem, cath: v?.cath, pimg: v?.pimg, pname: v?.pname, stock: v?.stock, price: v?.price, qyt: count - 1 } }))
                }
              }} >
                <Icons name='minus' size={20} />
              </TouchableOpacity>
            </View>
          </View>


        </View>
        <View style={{ width: '10%', marginTop: 8 }}>
          <TouchableOpacity>
            <Icon name='trash-sharp' size={23} onPress={() => dispatch(delCart(v?.cartitem))} />
          </TouchableOpacity>


        </View>

      </View>
    )
  }
  
  return (
    <SafeAreaView>
      <ScrollView>
        {
          cartdata?.length > 0 ? <View style={{ paddingTop: 15, minHeight: height,marginBottom:100 }}>
            <View >
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 25,fontFamily:'Alegreya_700Bold' }}>Your Food Cart</Text>
              </View>
              <View>
                {
                  cartdata?.map((v, i) => {
                    return <Card v={v} key={i} />
                  })
                }



              </View>
            </View>
            <View >
              <View style={{ padding: 20, marginTop: 15 }} >
                <View style={{ width: '100%', height: 190, backgroundColor: 'white', elevation: 2, shadowColor: 'grey', borderRadius: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ width: '100%', display: 'flex', flexDirection: 'row', borderBottomColor: 'grey', borderColor: 'grey', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 5 }}>
                    <Text style={{ fontSize: 18,fontFamily:'Alegreya_400Regular' }}>Subtotal</Text>
                    <Text style={{ fontSize: 18,fontFamily:'Alegreya_400Regular' }}>₹ {gettotal()}</Text>
                  </View>
                  <View style={{ width: '100%', display: 'flex', flexDirection: 'row', borderBottomColor: 'grey', borderColor: 'grey', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 5 }}>
                    <Text style={{ fontSize: 18,fontFamily:'Alegreya_400Regular' }}>CGST</Text>
                    <Text style={{ fontSize: 18,fontFamily:'Alegreya_400Regular' }}>₹ {gettotal()*0.025}</Text>
                  </View>
                  <View style={{ width: '100%', display: 'flex', flexDirection: 'row', borderBottomColor: 'grey', borderColor: 'grey', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 5 }}>
                    <Text style={{ fontSize: 18,fontFamily:'Alegreya_400Regular' }}>SGST</Text>
                    <Text style={{ fontSize: 18,fontFamily:'Alegreya_400Regular' }}>₹ {gettotal()*0.025}</Text>
                  </View>
                  <View style={{ width: '100%', display: 'flex', flexDirection: 'row', borderBottomColor: 'grey', borderColor: 'grey', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 5 }}>
                    <Text style={{ fontSize: 18,fontFamily:'Alegreya_400Regular' }}>Delivery</Text>
                    <Text style={{ fontSize: 18,fontFamily:'Alegreya_400Regular' }}>₹ 0</Text>
                  </View>
                  <View style={{ width: '100%', display: 'flex', flexDirection: 'row', borderBottomColor: 'grey', borderColor: 'grey', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 5 }}>
                    <Text style={{ fontSize: 18,fontFamily:'Alegreya_700Bold' }}>Total</Text>
                    <Text style={{ fontSize: 18,fontFamily:'Alegreya_700Bold' }}>₹ {gettotal()+ gettotal()*0.05}</Text>
                  </View>

                </View>

              </View>
            </View>
            <PrimaryButton title="Proceed to Payment" onpress={()=>navigation.navigate('Razo')} />

          </View> :
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Image source={require('../assets/cook.png')} style={{ width: 250, height: 250, marginVertical: 15 }} />
              <Text style={{ fontSize: 18, fontFamily:'Alegreya_700Bold', width: '70%', textAlign: 'center' }}>Good Food Always Cooking</Text>
              <Text style={{ fontSize: 16, fontWeight: '200',fontFamily:'Alegreya_400Regular', width: '80%', textAlign: 'center' }}>Your Cart is empty. Add somethings to the cart.</Text>
              <Text style={{ fontSize: 14, fontFamily:'Alegreya_700Bold', width: '50%', textAlign: 'center', color: 'orange', padding: 5, borderColor: 'orange', marginTop: 10, borderWidth: 1 }} onPress={() => navigation.navigate('Home')}>BROWSE RESTAURANT</Text>

            </View>
        }


      </ScrollView>
    </SafeAreaView>

  )
}

export default Cart

const styles = StyleSheet.create({})