import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, ActivityIndicator, ScrollView, Platform } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getcart, deleted, loadNormalUser } from '../action/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons'
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

const Razopay = () => {
  const [cardDetails, setcardDetails] = useState()
  const [paymentMethod, setPaymentMethod] = useState('card') // 'card' or 'cod'
  const { confirmPayment, loading } = useConfirmPayment()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  
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
    }, [dispatch])
  )
  
  const cartdata = useSelector(state => state.cart.allcart)
  const user = useSelector(state => state?.normal?.user)
  
  const [userdata, setuserdata] = useState({
    name: user?.name || '', 
    email: user?.email || '', 
    address: "", 
    pincode: "", 
    mobile: user?.mobile || ''
  })

  const gettotal = () => {
    return cartdata?.reduce((price, item) => (item.price * item.qyt) + price, 0) || 0
  }

  const getTax = () => {
    return gettotal() * 0.05 // 5% tax
  }

  const getFinalTotal = () => {
    return gettotal() + getTax()
  }

  const validateForm = () => {
    if (!userdata.address.trim()) {
      Alert.alert('Error', 'Please enter your delivery address');
      return false;
    }
    if (!userdata.pincode.trim()) {
      Alert.alert('Error', 'Please enter your pincode');
      return false;
    }
    if (paymentMethod === 'card' && !cardDetails?.complete) {
      Alert.alert('Error', 'Please enter complete card details');
      return false;
    }
    return true;
  }

  const processPayment = async () => {
    if (!validateForm()) return;

    if (paymentMethod === 'cod') {
      // Process COD order
      try {
        const token = await AsyncStorage.getItem('normaltoken');
        const response = await Axios.post(
          "https://resturant-backend-f921.onrender.com/normal/successnew", 
          {
            cart: cartdata, 
            user: userdata, 
            total: getFinalTotal(),
            paymentMethod: 'cod'
          },
          { headers: { "x-auth-token": token } }
        );
        
        if (response.status === 200) {
          dispatch(deleted());
          Alert.alert(
            'Order Placed Successfully!', 
            'Your order has been placed. You will pay ₹' + getFinalTotal().toFixed(2) + ' on delivery.',
            [{ text: 'OK', onPress: () => navigation.navigate('Home') }]
          );
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to place order. Please try again.');
      }
    } else {
      // Process card payment
      try {
        const response = await fetch("https://resturant-backend-f921.onrender.com/normal/sorder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: getFinalTotal() * 100 }), // Convert to paise
        });
        
        const { clientSecret, error } = await response.json();
        if (error) {
          Alert.alert('Error', 'Unable to process payment');
          return;
        }

        const { paymentIntent, error: paymentError } = await confirmPayment(
          clientSecret, 
          {
            type: "Card", 
            billingDetails: userdata
          }
        );

        if (paymentError) {
          Alert.alert('Payment Error', paymentError.message || 'Payment failed');
        } else if (paymentIntent) {
          const token = await AsyncStorage.getItem('normaltoken');
          const orderResponse = await Axios.post(
            "https://resturant-backend-f921.onrender.com/normal/successnew", 
            {
              cart: cartdata, 
              user: userdata, 
              total: getFinalTotal(),
              paymentMethod: 'card',
              paymentIntent: paymentIntent.id
            },
            { headers: { "x-auth-token": token } }
          );
          
          if (orderResponse.status === 200) {
            dispatch(deleted());
            Alert.alert(
              'Payment Successful!', 
              'Your order has been placed successfully.',
              [{ text: 'OK', onPress: () => navigation.navigate('Home') }]
            );
          }
        }
      } catch (error) {
        Alert.alert('Error', 'Payment failed. Please try again.');
      }
    }
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Checkout</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Order Summary */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Order Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>₹{gettotal().toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax (5%)</Text>
              <Text style={styles.summaryValue}>₹{getTax().toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery</Text>
              <Text style={styles.summaryValue}>₹0.00</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>₹{getFinalTotal().toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Delivery Address */}
        <View style={styles.addressContainer}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Address</Text>
            <TextInput 
              placeholder='Enter your complete delivery address' 
              style={styles.textInput}
              value={userdata.address}
              onChangeText={(text) => setuserdata({ ...userdata, address: text })}
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Pincode</Text>
            <TextInput 
              placeholder='Enter your pincode' 
              style={styles.textInput}
              value={userdata.pincode}
              onChangeText={(text) => setuserdata({ ...userdata, pincode: text })}
              keyboardType="numeric"
              maxLength={6}
            />
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.paymentContainer}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          
          <View style={styles.paymentOptions}>
            <TouchableOpacity 
              style={[
                styles.paymentOption, 
                paymentMethod === 'card' && styles.paymentOptionSelected
              ]}
              onPress={() => setPaymentMethod('card')}
            >
              <Icon 
                name="credit-card" 
                size={24} 
                color={paymentMethod === 'card' ? '#FF6B6B' : '#999'} 
              />
              <Text style={[
                styles.paymentOptionText,
                paymentMethod === 'card' && styles.paymentOptionTextSelected
              ]}>
                Credit/Debit Card
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.paymentOption, 
                paymentMethod === 'cod' && styles.paymentOptionSelected
              ]}
              onPress={() => setPaymentMethod('cod')}
            >
              <Icon 
                name="local-shipping" 
                size={24} 
                color={paymentMethod === 'cod' ? '#FF6B6B' : '#999'} 
              />
              <Text style={[
                styles.paymentOptionText,
                paymentMethod === 'cod' && styles.paymentOptionTextSelected
              ]}>
                Cash on Delivery
              </Text>
            </TouchableOpacity>
          </View>

          {paymentMethod === 'card' && (
            <View style={styles.cardContainer}>
              <Text style={styles.inputLabel}>Card Details</Text>
              <CardField
                postalCodeEnabled={false}
                placeholder={{
                  number: '4242 4242 4242 4242'
                }}
                cardStyle={styles.card}
                style={styles.cardField}
                onCardChange={cardDetails => {
                  setcardDetails(cardDetails)
                }}
              />
            </View>
          )}
        </View>

        {/* Payment Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.paymentButton}
            onPress={processPayment}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <>
                <Text style={styles.paymentButtonText}>
                  {paymentMethod === 'cod' ? 'Place Order' : 'Pay Now'}
                </Text>
                <Text style={styles.paymentButtonAmount}>
                  ₹{getFinalTotal().toFixed(2)}
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Razopay

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  
  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 15,
    backgroundColor: 'white',
    marginBottom: 15,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Alegreya_700Bold',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  
  // Summary Styles
  summaryContainer: {
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 15,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  summaryTitle: {
    fontSize: 20,
    fontFamily: 'Alegreya_700Bold',
    color: '#333',
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    fontFamily: 'Alegreya_400Regular',
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontFamily: 'Alegreya_500Medium',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#E9ECEF',
    marginVertical: 15,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 18,
    fontFamily: 'Alegreya_700Bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 20,
    fontFamily: 'Alegreya_800ExtraBold',
    color: '#FF6B6B',
  },
  
  // Address Styles
  addressContainer: {
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Alegreya_700Bold',
    color: '#333',
    marginBottom: 15,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'Alegreya_700Bold',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Alegreya_400Regular',
    color: '#333',
    borderWidth: 1,
    borderColor: '#E9ECEF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  
  // Payment Styles
  paymentContainer: {
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  paymentOptions: {
    marginBottom: 20,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#E9ECEF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  paymentOptionSelected: {
    borderColor: '#FF6B6B',
    backgroundColor: '#FFF5F5',
  },
  paymentOptionText: {
    fontSize: 16,
    fontFamily: 'Alegreya_500Medium',
    color: '#666',
    marginLeft: 15,
  },
  paymentOptionTextSelected: {
    color: '#FF6B6B',
    fontFamily: 'Alegreya_700Bold',
  },
  cardContainer: {
    marginTop: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
  },
  cardField: {
    height: 50,
    marginTop: 10,
  },
  
  // Button Styles
  buttonContainer: {
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
  paymentButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 25,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#FF6B6B',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  paymentButtonText: {
    fontSize: 18,
    fontFamily: 'Alegreya_700Bold',
    color: 'white',
    marginBottom: 4,
  },
  paymentButtonAmount: {
    fontSize: 16,
    fontFamily: 'Alegreya_500Medium',
    color: 'rgba(255,255,255,0.9)',
  },
})