import { Button, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { getorderlist, loadNormalUser, nlogout } from '../action/user'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const User = () => {
  const [token, settoken] = useState()
  const dispatch = useDispatch()
  useEffect(() => {
    getTheme()
  }, [])
  const navigation = useNavigation()
  const getTheme = async () => {
    try {
      const value = await AsyncStorage.getItem('normaluser');

      settoken(JSON.parse(value))
    } catch (error) {
      console.log('error', error);
    };
  };
  const user = useSelector(state => state?.normal?.user)

  // console.log('all', product)

  // useEffect(() => {
  //   dispatch(loadNormalUser())
  // }, [])
  useFocusEffect(
    React.useCallback(() => {
      // console.log('vvbbvvv')
      dispatch(loadNormalUser())
      dispatch(getorderlist())
    }, [dispatch,user?.name])

  )
  console.log('value', user?.name);
  const orderlist = useSelector((state) => state.orderlist)
  return (
    <SafeAreaView>
      <ScrollView>
      <View>
        {
          user ? <View style={{ display: 'flex', flexDirection: 'row', borderBottomWidth: 1, borderColor: 'grey', paddingHorizontal: 15, justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{
              marginVertical: 20, flex: 1
            }}>
              <Text style={{ fontSize: 30, fontFamily:'Alegreya_700Bold'}}>{user?.name}</Text>
              <Text style={{ fontSize: 15, fontFamily:'Alegreya_500Medium'}}>{user?.email} . {user?.mobile}</Text>
            </View>
            <View>
              <Text style={{ fontSize: 18,color:'red', fontFamily:'Alegreya_700Bold'}} onPress={() => dispatch(nlogout())} >Logout</Text>
            </View>

          </View>
            :
            <View style={{ display: 'flex', flexDirection: 'row', borderBottomWidth: 0.5, borderColor: 'grey', paddingHorizontal: 15, justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{
                marginVertical: 20, flex: 1
              }}>
                <Text style={{ fontSize: 30, fontFamily:'Alegreya_700Bold' }}>Welcome</Text>
                <Text  style={{ fontSize: 15, fontFamily:'Alegreya_500Medium'}}>Login To your account</Text>
              </View>
              <View>
                <Text style={{ fontSize: 18,color:'orange', fontFamily:'Alegreya_700Bold'}} onPress={() => navigation.navigate('Login')} >Login</Text>
              </View>

            </View>
        }
        {/* <View style={{ paddingHorizontal: 8,marginVertical:5 }} >
          <TouchableOpacity style={{display:'flex',flexDirection:'row',alignItems:'center'}} onPress={() => navigation.navigate('Myorder')} >
       
            <Text  style={{ fontSize: 16 ,fontFamily:'Alegreya_500Medium'}}>Past Orders</Text>
          </TouchableOpacity >
        </View> */}
         {
          orderlist?.length>0?
        <Text  style={{ fontSize: 16,marginLeft:8 ,fontFamily:'Alegreya_500Medium'}}>Past Orders</Text>:null
         }
        {
          orderlist?.length>0?
        
        <View style={{marginHorizontal:8}}>
            {
                orderlist.reverse().slice(0,4).map((val, index) => {
                    return <View key={index} style={{ paddingVertical: 10,paddingHorizontal:8, backgroundColor: 'white', marginVertical: 5 }}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 12,fontFamily:'Alegreya_500Medium' }}>Ordered on {val?.data?.ordertime}</Text>
                            <Text style={{ fontSize: 14, fontFamily:'Alegreya_700Bold' }}>Total : ₹ {(val?.data?.total + (val?.data?.total * 0.05))?.toFixed(2)}</Text>
                        </View>
                        <View style={{display:'flex',flexDirection:'row'}}>
                            <View style={{width:'50%'}}>
                        {
                                            val?.data?.list?.map((d, ii) => {
                                                return <Text key={ii} style={{fontFamily:'Alegreya_500Medium',fontSize:14}} > {d?.pname} * {d?.qyt} ,</Text>
                                                
                                            })
                                        }
                                        </View>
                                        <View style={{width:'50%',display:'flex',alignItems:'flex-end',justifyContent:'flex-end'}}>
                                            <TouchableOpacity style={{backgroundColor:'orange',width:80,marginVertical:5,elevation:2,borderRadius:5}} onPress={()=>navigation.navigate('Myorderd',val.data?.trackid)}>
                                                <Text style={{textAlign:'center',padding:5,fontSize:12,color:'white',fontFamily:'Alegreya_700Bold' }}>Details</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{backgroundColor:'orange',width:80,elevation:2,borderRadius:5}} onPress={()=>navigation.navigate('Track',val.data?.trackid)}>
                                                <Text style={{textAlign:'center',padding:5,fontSize:12,color:'white',fontFamily:'Alegreya_700Bold' }}>Track</Text>
                                            </TouchableOpacity>
                                            </View>
                        </View>
                    </View>

                })
            }
            <Text style={{ fontSize: 15,textAlign:'right',marginVertical:5,color:'orange', fontFamily:'Alegreya_700Bold'}} onPress={()=>navigation.navigate('Myorder')}>VIEW MORE ORDERS</Text>
        </View>:null}

      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default User

const styles = StyleSheet.create({})