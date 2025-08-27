import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Dimensions, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { addtocart, delCart, getcart } from '../action/user';
import { useIsFocused, useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'
import Icons from 'react-native-vector-icons/Entypo'
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

const { width, height } = Dimensions.get('screen')

const Cart = () => {
  const dispatch = useDispatch()
  const cartdata = useSelector(state => state.cart.allcart)
  const del = useSelector(state => state.acart.del)
  const add = useSelector(state => state.acart.add)
  const isfocused = useIsFocused()
  const navigation = useNavigation()
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

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
      const fetchCart = async () => {
        setLoading(true)
        try {
          await dispatch(getcart())
        } finally {
          setLoading(false)
        }
      }
      fetchCart()
    }, [dispatch, del, add])
  )

  const gettotal = () => {
    return cartdata?.reduce((price, item) => (item.price * item.qyt) + price, 0) || 0
  }

  const getTax = () => {
    return gettotal() * 0.05 // 5% tax (2.5% CGST + 2.5% SGST)
  }

  const getFinalTotal = () => {
    return gettotal() + getTax()
  }

  const CartItem = ({ item, index }) => {
    const [count, setcount] = useState(item?.qyt || 1)
    
    const updateQuantity = async (newQty) => {
      if (newQty > 0) {
        setUpdating(true)
        setcount(newQty)
        try {
          await dispatch(addtocart({ 
            cart: { 
              cartitem: item?.cartitem, 
              cath: item?.cath, 
              pimg: item?.pimg, 
              pname: item?.pname, 
              stock: item?.stock, 
              price: item?.price, 
              qyt: newQty 
            } 
          }))
          Toast.show({
            type: 'success',
            text1: 'Quantity Updated',
            text2: `${item?.pname} quantity changed to ${newQty}`,
            position: 'top',
            visibilityTime: 1500,
          })
        } catch (error) {
          Toast.show({
            type: 'error',
            text1: 'Update Failed',
            text2: 'Could not update quantity',
            position: 'top',
            visibilityTime: 2500,
          })
        } finally {
          setUpdating(false)
        }
      }
    }

    const removeItem = async () => {
      setUpdating(true)
      try {
        await dispatch(delCart(item?.cartitem))
        Toast.show({
          type: 'success',
          text1: 'Item Removed',
          text2: `${item?.pname} removed from cart`,
          position: 'top',
          visibilityTime: 2000,
        })
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Remove Failed',
          text2: 'Could not remove item from cart',
          position: 'top',
          visibilityTime: 2500,
        })
      } finally {
        setUpdating(false)
      }
    }

    return (
      <View style={styles.cartItemCard}>
        <View style={styles.itemImageContainer}>
          <Image 
            source={{ uri: item?.pimg }} 
            style={styles.itemImage}
            resizeMode="cover"
          />
        </View>
        
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item?.pname}</Text>
          <Text style={styles.itemCategory}>{item?.cath}</Text>
          <Text style={styles.itemPrice}>₹{item?.price}</Text>
          
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              style={[styles.quantityButton, count <= 1 && styles.quantityButtonDisabled]}
              onPress={() => updateQuantity(count - 1)}
              disabled={count <= 1}
            >
              <Icons name='minus' size={18} color={count <= 1 ? '#CCC' : '#FF6B6B'} />
            </TouchableOpacity>
            
            <View style={styles.quantityDisplay}>
              <Text style={styles.quantityText}>{count}</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => updateQuantity(count + 1)}
            >
              <Icons name='plus' size={18} color='#FF6B6B' />
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.removeButton}
          onPress={removeItem}
          activeOpacity={0.7}
        >
          <Icon name='trash-outline' size={24} color='#FF6B6B' />
        </TouchableOpacity>
      </View>
    )
  }

  const EmptyCart = () => (
    <View style={styles.emptyCartContainer}>
      <View style={styles.emptyCartContent}>
        <View style={styles.emptyCartIcon}>
          <Icon name="cart-outline" size={80} color="#CCC" />
        </View>
        <Text style={styles.emptyCartTitle}>Your Cart is Empty</Text>
        <Text style={styles.emptyCartSubtitle}>
          Looks like you haven't added any delicious food to your cart yet.
        </Text>
        <TouchableOpacity 
          style={styles.browseButton}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.8}
        >
          <Text style={styles.browseButtonText}>Browse Restaurant</Text>
          <Icon name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  )

  const CartSummary = () => (
    <View style={styles.summaryContainer}>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Order Summary</Text>
        
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>₹{gettotal().toFixed(2)}</Text>
        </View>
        
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>CGST (2.5%)</Text>
          <Text style={styles.summaryValue}>₹{(gettotal() * 0.025).toFixed(2)}</Text>
        </View>
        
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>SGST (2.5%)</Text>
          <Text style={styles.summaryValue}>₹{(gettotal() * 0.025).toFixed(2)}</Text>
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
  )

  const CheckoutButton = () => (
    <View style={styles.checkoutContainer}>
      <TouchableOpacity 
        style={styles.checkoutButton}
        onPress={() => navigation.navigate('Razo')}
        activeOpacity={0.8}
      >
        <Text style={styles.checkoutButtonText}>Proceed to Payment</Text>
        <Icon name="card-outline" size={20} color="white" />
      </TouchableOpacity>
    </View>
  )

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <LoadingSpinner 
          fullScreen={true}
          text="Loading your cart..."
          backgroundColor="#F8F9FA"
        />
      ) : (
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Cart</Text>
          <Text style={styles.headerSubtitle}>
            {cartdata?.length || 0} {cartdata?.length === 1 ? 'item' : 'items'} in your cart
          </Text>
        </View>

        {cartdata?.length > 0 ? (
          <>
            {/* Cart Items */}
            <View style={styles.cartItemsContainer}>
              {cartdata?.map((item, index) => (
                <CartItem key={index} item={item} index={index} />
              ))}
            </View>

            {/* Order Summary */}
            <CartSummary />

            {/* Checkout Button */}
            <CheckoutButton />
          </>
        ) : (
          <EmptyCart />
        )}
        </ScrollView>
      )}
      {updating && (
        <LoadingSpinner 
          fullScreen={true}
          text="Updating cart..."
          backgroundColor="rgba(248, 249, 250, 0.8)"
        />
      )}
    </SafeAreaView>
  )
}

export default Cart

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 50,
  },
  
  // Header Styles
  header: {
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
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Alegreya_800ExtraBold',
    color: '#333',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Alegreya_400Regular',
    color: '#666',
  },
  
  // Cart Items Styles
  cartItemsContainer: {
    paddingHorizontal: 25,
    marginBottom: 20,
    paddingBottom: 10,
  },
  cartItemCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 110,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  itemImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 15,
    overflow: 'hidden',
    marginRight: 15,
    flexShrink: 0,
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
    height: 80,
    marginRight: 10,
  },
  itemName: {
    fontSize: 18,
    fontFamily: 'Alegreya_700Bold',
    color: '#333',
    marginBottom: 4,
  },
  itemCategory: {
    fontSize: 14,
    fontFamily: 'Alegreya_400Regular',
    color: '#999',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontFamily: 'Alegreya_700Bold',
    color: '#FF6B6B',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    padding: 4,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
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
        elevation: 2,
      },
    }),
  },
  quantityButtonDisabled: {
    backgroundColor: '#F0F0F0',
  },
  quantityDisplay: {
    width: 40,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  quantityText: {
    fontSize: 16,
    fontFamily: 'Alegreya_700Bold',
    color: '#333',
  },
  removeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  
  // Empty Cart Styles
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    minHeight: height * 0.6,
  },
  emptyCartContent: {
    alignItems: 'center',
  },
  emptyCartIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  emptyCartTitle: {
    fontSize: 24,
    fontFamily: 'Alegreya_700Bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyCartSubtitle: {
    fontSize: 16,
    fontFamily: 'Alegreya_400Regular',
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  browseButton: {
    backgroundColor: '#FF6B6B',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 25,
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
  browseButtonText: {
    fontSize: 16,
    fontFamily: 'Alegreya_700Bold',
    color: 'white',
    marginRight: 8,
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
  
  // Checkout Button Styles
  checkoutContainer: {
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
  checkoutButton: {
    backgroundColor: '#FF6B6B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 25,
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
  checkoutButtonText: {
    fontSize: 18,
    fontFamily: 'Alegreya_700Bold',
    color: 'white',
    marginRight: 8,
  },
})