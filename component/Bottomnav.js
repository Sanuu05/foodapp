import { StyleSheet, Text, View } from 'react-native'
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
  useEffect(() => {
    dispatch(loadNormalUser())
    dispatch(getcart())
  }, [])
  return (
    <Tab.Navigator screenOptions={
     {
       tabBarShowLabel:false,
       tabBarActiveTintColor:'red',
       tabBarInactiveTintColor:'blue'
     }
    }  >
      <Tab.Screen name="Home" component={Homescreen} options={{
        headerShown: false,
        tabBarIcon: () =>
          <Icon1 name='home' size={22} color="orange" />


      }} />
      <Tab.Screen name="Search" component={Search} options={{
        headerShown: false,
        tabBarIcon: () =>
          <Icon1 name='search' size={22} color="orange" />


      }} />
      <Tab.Screen name="Cart" component={Cart} options={{
        headerShown: false,
        tabBarBadge:cartdata?.length,
        tabBarIcon: () =>
          <Icon1 name='shopping-cart' size={22} color="orange" />
      }} />
      <Tab.Screen name="User" component={User} options={{
        headerShown: false,
        tabBarIcon: () =>
          <Icon1 name='user-alt' size={22} color="orange" />
      }} />
      {/* <Tab.Screen name="Login" component={Login} options={{
        headerShown: false,
        tabBarIcon: () =>
          <Icon1 name='user-alt' size={22} color="orange" />
      }} /> */}
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  )
}

export default Bottomnav

const styles = StyleSheet.create({})