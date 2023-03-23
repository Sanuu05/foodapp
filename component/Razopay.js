import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity,ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import RazorpayCheckout from 'react-native-razorpay';
import { CardField, PaymentIntents, useConfirmPayment } from '@stripe/stripe-react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getcart,deleted, loadNormalUser } from '../action/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  Axios  from 'axios';
import PrimaryButton from './PrimaryButton';

const Razopay = () => {
 
  const [cardDetails, setcardDetails] = useState()
  const { confirmPayment, loading } = useConfirmPayment()
  const navigation = useNavigation()
  let options = {
    description: 'Online Fee',
    image: 'https://i.imgur.com/3g7nmJC.png',
    currency: 'INR',
    amount: '25000',
    key: "rzp_test_fvOAKuvkkgRaoU",
    name: 'Test',
    prefill: {
      email: 'test@email.com',
      contact: '9191919191',
      name: 'ReactNativeForYou',
    },
    theme: { color: '#528FF0' },
  };
  const dispatch = useDispatch()
  useFocusEffect(
    React.useCallback(() => {
      console.log('vvbbvvv')
      dispatch(getcart())
      dispatch(loadNormalUser())
    }, [dispatch])


  )
  
  const cartdata = useSelector(state => state.cart.allcart)
  const user = useSelector(state => state?.normal?.user)
  console.log("bbbccc",user?.mobile)
  const [userdata, setuserdata] = useState({
    name: user?.name, email: user?.email, address: "", pincode: "", mobile: user?.mobile
  })
  

  const gettotal = () => {
    return cartdata?.reduce((price, item) => (item.price * item.qyt) + price, 0)
  }
  // console.log("cvc",gettotal())
  // const onPressButton = () => {
  //   RazorpayCheckout.open(options)
  //     .then((data) => {
  //       // handle success
  //       Alert.alert(`Success: ${data.razorpay_payment_id}`);
  //     })
  //     .catch((error) => {
  //       // handle failure
  //       Alert.alert(`Error: ${error.code} | ${error.description}`);
  //     });
  // };
  const stripepay = async () => {
    console.log('cvcvx',userdata)

    if (!cardDetails && userdata.address==="" && !userdata.email && !userdata.mobile && !userdata.name && userdata.pincode==="") {
      Alert.alert('Please Enter Complete card Details & Address Field');
      return;

    } else {
      const response = await fetch("https://cautious-dog-swimsuit.cyclic.app/normal/sorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: gettotal() }),
      });
      const { clientSecret, error } = await response.json();
      if (error) {
        console.log('Unable to process payment')
      }
      else {
        const { paymentIntent, error } = await confirmPayment(
          clientSecret, {
          type: "Card", billingDetails: userdata

        })
        if (error) {
          alert('payemnt error')
          console.log('ee',error)
        } else if (paymentIntent) {
          //  alert('succed')
           const token = await AsyncStorage.getItem('normaltoken');
           console.log('cvcv',token)
          const response = await Axios.post("https://cautious-dog-swimsuit.cyclic.app/normal/successnew", {cart:cartdata,user:userdata,total:gettotal()},{ headers: { "x-auth-token": token } })
          // console.log(response)
          if(response){
            dispatch(deleted())
            alert("order placed sucesfully")
            navigation.navigate('Home')
          }
        }
      }
      // console.log('data',data)
      // if (!response.ok) {
      //   return Alert.alert(data.message);
      // }
      // const initSheet = await stripe.initPaymentSheet({
      //   paymentIntentClientSecret: data.clientSecret,
      // });
      // if (initSheet.error) {
      //   console.error(initSheet.error);
      //   return Alert.alert(initSheet.error.message);
      // }
      // const presentSheet = await stripe.presentPaymentSheet({
      //   clientSecret: data.clientSecret,
      // });
      // if (presentSheet.error) {
      //   console.error(presentSheet.error);
      //   return Alert.alert(presentSheet.error.message);
      // }
      // Alert.alert("Donated successfully! Thank you for the donation.");
    }

  }
  return (
    <SafeAreaView>
      <View>
        <View>
          <Text style={{ marginLeft: 10, marginTop: 10,marginBottom:20, fontFamily:'Alegreya_700Bold', fontSize: 25 }}>Delivery Address</Text>
          {/* <TextInput placeholder='Name' style={{ paddingVertical: 8,elevation:1, paddingHorizontal: 5, marginHorizontal: 8, marginVertical: 7, backgroundColor: 'white' }} onChangeText={(text) => setuserdata({ ...userdata, name: text })} />
          <TextInput placeholder='Email' style={{ paddingVertical: 5, paddingHorizontal: 5, marginHorizontal: 8, marginVertical: 7, backgroundColor: 'white' }} onChangeText={(text) => setuserdata({ ...userdata, email: text })} /> */}
          <Text style={{ marginLeft: 10, marginTop: 10, fontFamily:'Alegreya_700Bold', fontSize: 15 }}>Address</Text>
          <TextInput placeholder='Address' style={{ paddingVertical: 10,borderRadius:10, paddingHorizontal: 7,fontSize:15, marginHorizontal: 8, marginVertical: 1, backgroundColor: 'white' }} onChangeText={(text) => setuserdata({ ...userdata, address: text })} />
          <Text style={{ marginLeft: 10, marginTop: 10, fontFamily:'Alegreya_700Bold', fontSize: 15 }}>Pincode</Text>
          <TextInput placeholder='Pincode' style={{ paddingVertical: 10,borderRadius:10, paddingHorizontal: 7,fontSize:15, marginHorizontal: 8, marginVertical: 7, backgroundColor: 'white' }} onChangeText={(text) => setuserdata({ ...userdata, pincode: text })} />
          {/* <TextInput placeholder='Mobile' style={{ paddingVertical: 5, paddingHorizontal: 5, marginHorizontal: 8, marginVertical: 7, backgroundColor: 'white' }} onChangeText={(text) => setuserdata({ ...userdata, mobile: text })} /> */}
        </View>
        {/* <Button title='pay' onPress={onPressButton} /> */}
        <CardField
          postalCodeEnabled={false}
          placeholder={{
            number: '4242 4242 4242 4242'
          }}
          cardStyle={styles.card}
          style={styles.cardcon}
          onCardChange={cardDetails => {
            setcardDetails(cardDetails)
          }}
        />
        {/* <TouchableOpacity ><Text>Pay</Text></TouchableOpacity> */}
        {/* <Button title={`pay- ₹ ${gettotal() + gettotal()*0.05}`} onPress={stripepay} disabled={loading} /> */}
        <TouchableOpacity activeOpacity={0.8} onPress={stripepay} >
            <View style={styles.btncontainer} >
              {loading?
              <ActivityIndicator size='large' color='white' />:
              <Text style={{fontSize:20,fontFamily:'Alegreya_700Bold' }}>{`pay- ₹ ${gettotal() + gettotal()*0.05}`}</Text>
              }
              

            </View>

        </TouchableOpacity>
      </View>
    </SafeAreaView>

  )
}

export default Razopay

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
  },
  cardcon: {
    height: 50,
    marginVertical: 50,
    marginHorizontal: 10
  },
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