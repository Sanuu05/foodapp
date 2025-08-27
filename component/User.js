import { Button, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View, Dimensions, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { getorderlist, loadNormalUser, nlogout } from '../action/user'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icons from 'react-native-vector-icons/Ionicons'
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

const User = () => {
  const [token, settoken] = useState()
  const dispatch = useDispatch()
  const navigation = useNavigation()
  
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
  
  useEffect(() => {
    getTheme()
  }, [])
  
  const getTheme = async () => {
    try {
      const value = await AsyncStorage.getItem('normaluser');
      settoken(JSON.parse(value))
    } catch (error) {
      console.log('error', error);
    };
  };
  
  const user = useSelector(state => state?.normal?.user)
  const orderlist = useSelector((state) => state.orderlist)
  
  useFocusEffect(
    React.useCallback(() => {
      dispatch(loadNormalUser())
      dispatch(getorderlist())
    }, [dispatch, user?.name])
  )
  if (!fontsLoaded) {
    return null;
  }

  const UserHeader = () => (
    <View style={styles.headerCard}>
      {user ? (
        <View style={styles.userInfoContainer}>
          <View style={styles.avatarContainer}>
            <Icons name="person" size={40} color="#FF6B6B" />
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName} numberOfLines={1}>{user?.name}</Text>
            <Text style={styles.userEmail} numberOfLines={1} ellipsizeMode="tail">{user?.email}</Text>
            <Text style={styles.userMobile} numberOfLines={1} ellipsizeMode="tail">{user?.mobile}</Text>
          </View>
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={() => dispatch(nlogout())}
            activeOpacity={0.8}
          >
            <Icons name="log-out-outline" size={20} color="white" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.welcomeContainer}>
          <View style={styles.welcomeContent}>
            <Text style={styles.welcomeTitle}>Welcome!</Text>
            <Text style={styles.welcomeSubtitle}>Login to access your account</Text>
          </View>
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.8}
          >
            <Icons name="log-in-outline" size={20} color="white" />
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )

  const OrderItem = ({ order, index }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderNumber}>Order #{order?.data?.trackid?.slice(-6) || `${index + 1}`}</Text>
          <Text style={styles.orderDate}>Ordered on {order?.data?.ordertime}</Text>
        </View>
        <View style={styles.orderStatus}>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Delivered</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.orderContent}>
        <View style={styles.orderItems}>
          <Text style={styles.itemsTitle}>Items:</Text>
          {order?.data?.list?.slice(0, 3).map((item, idx) => (
            <Text key={idx} style={styles.orderItemText}>
              {item?.pname} × {item?.qyt}
            </Text>
          ))}
          {order?.data?.list?.length > 3 && (
            <Text style={styles.moreItemsText}>+{order?.data?.list?.length - 3} more items</Text>
          )}
        </View>
        
        <View style={styles.orderSummary}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>₹{(order?.data?.total + (order?.data?.total * 0.05))?.toFixed(2)}</Text>
          
          <View style={styles.orderActions}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('Myorderd', order.data?.trackid)}
              activeOpacity={0.8}
            >
              <Icons name="receipt-outline" size={16} color="white" />
              <Text style={styles.actionButtonText}>Details</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.trackButton]}
              onPress={() => navigation.navigate('Track', order.data?.trackid)}
              activeOpacity={0.8}
            >
              <Icons name="location-outline" size={16} color="white" />
              <Text style={styles.actionButtonText}>Track</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )

  const EmptyOrders = () => (
    <View style={styles.emptyOrdersContainer}>
      <View style={styles.emptyOrdersIcon}>
        <Icons name="receipt-outline" size={60} color="#CCC" />
      </View>
      <Text style={styles.emptyOrdersTitle}>No Orders Yet</Text>
      <Text style={styles.emptyOrdersSubtitle}>Start exploring delicious food and place your first order!</Text>
      <TouchableOpacity 
        style={styles.browseButton}
        onPress={() => navigation.navigate('Bottom')}
        activeOpacity={0.8}
      >
        <Text style={styles.browseButtonText}>Browse Menu</Text>
        <Icons name="arrow-forward" size={18} color="white" />
      </TouchableOpacity>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <UserHeader />
        
        {orderlist?.length > 0 ? (
          <View style={styles.ordersSection}>
            <View style={styles.ordersSectionHeader}>
              <Text style={styles.ordersSectionTitle}>Recent Orders</Text>
              {orderlist?.length > 4 && (
                <TouchableOpacity onPress={() => navigation.navigate('Myorder')}>
                  <Text style={styles.viewAllText}>View All</Text>
                </TouchableOpacity>
              )}
            </View>
            
            <View style={styles.ordersContainer}>
              {orderlist.reverse().slice(0, 4).map((order, index) => (
                <OrderItem key={index} order={order} index={index} />
              ))}
            </View>
          </View>
        ) : user ? (
          <EmptyOrders />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  )
}

export default User

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
  
  // Header Card Styles
  headerCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 25,
    borderRadius: 20,
    padding: 25,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  
  // User Info Styles
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarContainer: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: '#FFF5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  userDetails: {
    flex: 1,
    marginRight: 15,
    minWidth: 0,
    overflow: 'hidden',
  },
  userName: {
    fontSize: 20,
    fontFamily: 'Alegreya_800ExtraBold',
    color: '#333',
    marginBottom: 4,
    flexShrink: 1,
  },
  userEmail: {
    fontSize: 14,
    fontFamily: 'Alegreya_500Medium',
    color: '#666',
    marginBottom: 2,
    numberOfLines: 1,
    flexShrink: 1,
  },
  userMobile: {
    fontSize: 14,
    fontFamily: 'Alegreya_500Medium',
    color: '#666',
    numberOfLines: 1,
    flexShrink: 1,
  },
  logoutButton: {
    backgroundColor: '#FF6B6B',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    alignSelf: 'flex-end',
    ...Platform.select({
      ios: {
        shadowColor: '#FF6B6B',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  logoutText: {
    fontSize: 14,
    fontFamily: 'Alegreya_700Bold',
    color: 'white',
    marginLeft: 6,
  },
  
  // Welcome Styles
  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  welcomeContent: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 28,
    fontFamily: 'Alegreya_800ExtraBold',
    color: '#333',
    marginBottom: 6,
  },
  welcomeSubtitle: {
    fontSize: 16,
    fontFamily: 'Alegreya_500Medium',
    color: '#666',
  },
  loginButton: {
    backgroundColor: '#FF6B6B',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#FF6B6B',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  loginText: {
    fontSize: 16,
    fontFamily: 'Alegreya_700Bold',
    color: 'white',
    marginLeft: 6,
  },
  
  // Orders Section Styles
  ordersSection: {
    paddingHorizontal: 20,
  },
  ordersSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  ordersSectionTitle: {
    fontSize: 22,
    fontFamily: 'Alegreya_700Bold',
    color: '#333',
  },
  viewAllText: {
    fontSize: 16,
    fontFamily: 'Alegreya_700Bold',
    color: '#FF6B6B',
  },
  ordersContainer: {
    marginBottom: 20,
  },
  
  // Order Card Styles
  orderCard: {
    backgroundColor: 'white',
    // marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 20,
    padding: 25,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 18,
    fontFamily: 'Alegreya_700Bold',
    color: '#333',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 14,
    fontFamily: 'Alegreya_500Medium',
    color: '#666',
  },
  orderStatus: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Alegreya_700Bold',
    color: 'white',
  },
  orderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  orderItems: {
    flex: 1,
    marginRight: 20,
  },
  itemsTitle: {
    fontSize: 16,
    fontFamily: 'Alegreya_700Bold',
    color: '#333',
    marginBottom: 8,
  },
  orderSummary: {
    alignItems: 'flex-end',
    minWidth: 120,
  },
  totalLabel: {
    fontSize: 14,
    fontFamily: 'Alegreya_500Medium',
    color: '#666',
    marginBottom: 4,
  },
  totalAmount: {
    fontSize: 20,
    fontFamily: 'Alegreya_800ExtraBold',
    color: '#FF6B6B',
    marginBottom: 15,
  },
  orderItemText: {
    fontSize: 15,
    fontFamily: 'Alegreya_500Medium',
    color: '#555',
    marginBottom: 4,
  },
  moreItemsText: {
    fontSize: 14,
    fontFamily: 'Alegreya_500Medium',
    color: '#999',
    fontStyle: 'italic',
    marginTop: 4,
  },
  orderActions: {
    alignItems: 'flex-end',
  },
  actionButton: {
    backgroundColor: '#FF6B6B',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 15,
    marginBottom: 8,
    minWidth: 90,
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#FF6B6B',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  trackButton: {
    marginBottom: 0,
  },
  actionButtonText: {
    fontSize: 13,
    fontFamily: 'Alegreya_700Bold',
    color: 'white',
    marginLeft: 6,
  },
  
  // Empty Orders Styles
  emptyOrdersContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyOrdersIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  emptyOrdersTitle: {
    fontSize: 24,
    fontFamily: 'Alegreya_700Bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyOrdersSubtitle: {
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
})