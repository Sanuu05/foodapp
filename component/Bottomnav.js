import { StyleSheet, Text, View, Platform } from 'react-native'
import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon1 from 'react-native-vector-icons/FontAwesome5'
import Homescreen from './Homescreen';
import Cart from './Cart';
import User from './User';
import Login from './Login';
import { useDispatch, useSelector } from 'react-redux';
import { getcart, loadNormalUser } from '../action/user';
import Search from './Search';

const Tab = createBottomTabNavigator();

const Bottomnav = () => {
  const dispatch = useDispatch()
  const cartdata = useSelector(state => state.cart.allcart)
  const user = useSelector(state => state?.normal?.user)
  
  useEffect(() => {
    dispatch(loadNormalUser())
    dispatch(getcart())
  }, [])

  return (
    <Tab.Navigator 
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#FF6B6B',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={Homescreen} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, color, size }) => (
            <View style={styles.iconContainer}>
              <Icon1 
                name='home' 
                size={focused ? 24 : 22} 
                color={focused ? '#FF6B6B' : '#999'} 
              />
            </View>
          )
        }} 
      />
      
      <Tab.Screen 
        name="Search" 
        component={Search} 
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ focused, color, size }) => (
            <View style={styles.iconContainer}>
              <Icon1 
                name='search' 
                size={focused ? 24 : 22} 
                color={focused ? '#FF6B6B' : '#999'} 
              />
            </View>
          )
        }} 
      />
      
      <Tab.Screen 
        name="Cart" 
        component={Cart} 
        options={{
          tabBarLabel: 'Cart',
          tabBarBadge: cartdata?.length > 0 ? cartdata.length : null,
          tabBarBadgeStyle: styles.badge,
          tabBarIcon: ({ focused, color, size }) => (
            <View style={styles.iconContainer}>
              <Icon1 
                name='shopping-cart' 
                size={focused ? 24 : 22} 
                color={focused ? '#FF6B6B' : '#999'} 
              />
            </View>
          )
        }} 
      />
      
      <Tab.Screen 
        name="Profile" 
        component={user?.name ? User : Login} 
        options={{
          tabBarLabel: user?.name ? 'Profile' : 'Login',
          tabBarIcon: ({ focused, color, size }) => (
            <View style={styles.iconContainer}>
              <Icon1 
                name={user?.name ? 'user-alt' : 'sign-in-alt'} 
                size={focused ? 24 : 22} 
                color={focused ? '#FF6B6B' : '#999'} 
              />
            </View>
          )
        }} 
      />
    </Tab.Navigator>
  )
}

export default Bottomnav

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'ios' ? 90 : 70,
    backgroundColor: 'white',
    borderTopWidth: 0,
    paddingTop: Platform.OS === 'ios' ? 10 : 5,
    paddingBottom: Platform.OS === 'ios' ? 25 : 10,
    paddingHorizontal: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 20,
      },
    }),
  },
  tabBarLabel: {
    fontSize: 12,
    fontFamily: 'Alegreya_700Bold',
    marginTop: 2,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  badge: {
    backgroundColor: '#FF6B6B',
    color: 'white',
    fontSize: 10,
    fontFamily: 'Alegreya_700Bold',
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: Platform.OS === 'ios' ? 5 : 0,
    marginLeft: Platform.OS === 'ios' ? 10 : 5,
  },
})