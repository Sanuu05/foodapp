import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ScrollView, Platform } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Entypo'
import { addtocart, getcart, loadNormalUser } from '../action/user';
import { useDispatch, useSelector } from 'react-redux';
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import LoadingSpinner from './LoadingSpinner'
import Toast from 'react-native-toast-message'
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
  const [addingToCart, setAddingToCart] = useState(false)
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
    }, [dispatch, count, count1, cartdata?.length])
  )
  
  const navigation = useNavigation()
  const cartdata = useSelector(state => state.cart.allcart)
  const user = useSelector(state => state?.normal?.user)
  
  const gettotal = () => {
    return cartdata?.reduce((price, item) => (item.price * item.qyt) + price, 0)
  }

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Hero Image Section */}
          <View style={styles.heroContainer}>
            <Image
              source={{
                uri: props?.route?.params?.productimg
              }}
              style={styles.heroImage}
            />
            <View style={styles.heroOverlay}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Icon name="chevron-left" size={28} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Product Details Card */}
          <View style={styles.detailsCard}>
            <View style={styles.productHeader}>
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{props?.route?.params?.name}</Text>
                <Text style={styles.productCategory}>{props?.route?.params?.cath}</Text>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.priceText}>₹{props?.route?.params?.price}</Text>
              </View>
            </View>

            {/* Quantity Selector */}
            <View style={styles.quantitySection}>
              <Text style={styles.quantityLabel}>Select Quantity</Text>
              <View style={styles.quantityControls}>
                <TouchableOpacity 
                  style={[styles.quantityButton, count <= 1 && styles.quantityButtonDisabled]}
                  onPress={() => {
                    if (count > 1) {
                      setcount(count - 1)
                    }
                  }}
                  disabled={count <= 1}
                >
                  <Icon name='minus' size={24} color={count <= 1 ? '#CCC' : '#FF6B6B'} />
                </TouchableOpacity>
                
                <View style={styles.quantityDisplay}>
                  <Text style={styles.quantityText}>{count}</Text>
                </View>
                
                <TouchableOpacity 
                  style={styles.quantityButton}
                  onPress={() => setcount(count + 1)}
                >
                  <Icon name='plus' size={24} color='#FF6B6B' />
                </TouchableOpacity>
              </View>
            </View>

            {/* Add to Cart Button */}
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={async () => {
                if(user){
                  setAddingToCart(true)
                  setcount1(count + 1)
                  try {
                    await dispatch(addtocart({ 
                      cart: { 
                        cartitem: props?.route?.params?._id, 
                        pimg: props?.route?.params?.productimg, 
                        pname: props?.route?.params?.name, 
                        stock: props?.route?.params?.stock, 
                        cath: props?.route?.params?.cath, 
                        price: props?.route?.params?.price, 
                        qyt: count 
                      } 
                    }))
                    Toast.show({
                      type: 'success',
                      text1: 'Added to Cart',
                      text2: `${count} ${props?.route?.params?.name} added successfully`,
                      position: 'top',
                      visibilityTime: 2000,
                    })
                  } catch (error) {
                    Toast.show({
                      type: 'error',
                      text1: 'Failed to Add',
                      text2: 'Could not add item to cart',
                      position: 'top',
                      visibilityTime: 3000,
                    })
                  } finally {
                    setAddingToCart(false)
                  }
                } else {
                  navigation.navigate('Login')
                }
              }}
              activeOpacity={0.8}
              disabled={addingToCart}
            >
              <Icon1 name="shopping-cart" size={20} color="white" style={styles.cartIcon} />
              <Text style={styles.addToCartText}>Add to Cart ({count})</Text>
            </TouchableOpacity>

            {/* Description Section */}
            <View style={styles.descriptionSection}>
              <Text style={styles.descriptionTitle}>Description</Text>
              <Text style={styles.descriptionText}>{props?.route?.params?.des}</Text>
            </View>
          </View>
        </ScrollView>

        {/* Floating Cart Button */}
        {cartdata?.length > 0 && (
          <View style={styles.floatingCartContainer}>
            <TouchableOpacity 
              style={styles.floatingCartButton}
              activeOpacity={0.8} 
              onPress={() => navigation.navigate('Cart')}
            >
              <View style={styles.cartInfo}>
                <Text style={styles.cartItemsText}>{cartdata?.length} items</Text>
                <Text style={styles.cartTotalText}>₹{gettotal()}</Text>
                <Text style={styles.cartSubtext}>Extra charges may apply</Text>
              </View>
              <View style={styles.cartAction}>
                <Text style={styles.viewCartText}>View Cart</Text>
                <Icon1 name='shopping-bag' size={24} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        )}
        
        {/* Loading Overlay for Add to Cart */}
        {addingToCart && (
          <LoadingSpinner 
            fullScreen={true}
            text="Adding to cart..."
            backgroundColor="rgba(248, 249, 250, 0.8)"
          />
        )}
      </SafeAreaView>
    )
  }
}

export default Detail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  
  // Hero Section
  heroContainer: {
    height: 300,
    width: '100%',
    position: 'relative',
  },
  heroImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  
  // Details Card
  detailsCard: {
    backgroundColor: 'white',
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
      },
      android: {
        elevation: 15,
      },
    }),
  },
  
  // Product Header
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  productInfo: {
    flex: 1,
    marginRight: 15,
  },
  productName: {
    fontSize: 28,
    fontFamily: 'Alegreya_800ExtraBold',
    color: '#333',
    marginBottom: 8,
    lineHeight: 34,
  },
  productCategory: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'Alegreya_400Regular',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 32,
    fontFamily: 'Alegreya_800ExtraBold',
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  
  // Quantity Section
  quantitySection: {
    marginBottom: 30,
  },
  quantityLabel: {
    fontSize: 18,
    fontFamily: 'Alegreya_700Bold',
    color: '#333',
    marginBottom: 15,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 25,
    padding: 5,
  },
  quantityButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  quantityButtonDisabled: {
    backgroundColor: '#F0F0F0',
  },
  quantityDisplay: {
    width: 80,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  quantityText: {
    fontSize: 24,
    fontFamily: 'Alegreya_700Bold',
    color: '#333',
  },
  
  // Add to Cart Button
  addToCartButton: {
    backgroundColor: '#FF6B6B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 25,
    marginBottom: 30,
    ...Platform.select({
      ios: {
        shadowColor: '#FF6B6B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  cartIcon: {
    marginRight: 10,
  },
  addToCartText: {
    fontSize: 18,
    fontFamily: 'Alegreya_700Bold',
    color: 'white',
  },
  
  // Description Section
  descriptionSection: {
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 20,
    fontFamily: 'Alegreya_700Bold',
    color: '#333',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 16,
    fontFamily: 'Alegreya_400Regular',
    color: '#666',
    lineHeight: 24,
  },
  
  // Floating Cart Button
  floatingCartContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    zIndex: 10,
  },
  floatingCartButton: {
    backgroundColor: '#FF6B6B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingVertical: 18,
    borderRadius: 25,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  cartInfo: {
    flex: 1,
  },
  cartItemsText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Alegreya_700Bold',
    marginBottom: 2,
  },
  cartTotalText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Alegreya_800ExtraBold',
    marginBottom: 2,
  },
  cartSubtext: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    fontFamily: 'Alegreya_400Regular',
  },
  cartAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewCartText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Alegreya_700Bold',
    marginRight: 8,
  },
})