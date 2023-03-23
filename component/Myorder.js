import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getorderlist } from '../action/user'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

const Myorder = () => {
    const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(getorderlist())

    // }, [])
    const navigation = useNavigation()
    useFocusEffect(
        React.useCallback(() => {
            //   console.log('vvbbvvv')
            dispatch(getorderlist())
        }, [dispatch])


    )
    const orderlist = useSelector((state) => state.orderlist)
    // console.log("ooo", orderlist)
    return (
        <ScrollView>
        <View style={{marginHorizontal:8}}>
            {
                orderlist.reverse().map((val, index) => {
                    return <View key={index} style={{ paddingVertical: 10,paddingHorizontal:8, backgroundColor: 'white', marginVertical: 5 }}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 10 }}>Ordered on {val?.data?.ordertime}</Text>
                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Total : ₹ {(val?.data?.total + (val?.data?.total * 0.05))?.toFixed(2)}</Text>
                        </View>
                        <View style={{display:'flex',flexDirection:'row'}}>
                            <View style={{width:'50%'}}>
                        {
                                            val?.data?.list?.map((d, ii) => {
                                                return <Text key={ii}> {d?.pname} * {d?.qyt} ,</Text>
                                                
                                            })
                                        }
                                        </View>
                                        <View style={{width:'50%',display:'flex',alignItems:'flex-end',justifyContent:'flex-end'}}>
                                            <TouchableOpacity style={{backgroundColor:'orange',width:80,marginVertical:5,elevation:2,borderRadius:5}} onPress={()=>navigation.navigate('Myorderd',val.data?.trackid)}>
                                                <Text style={{textAlign:'center',padding:5,fontSize:12,color:'white'}}>Details</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{backgroundColor:'orange',width:80,elevation:2,borderRadius:5}}>
                                                <Text style={{textAlign:'center',padding:5,fontSize:12,color:'white'}}>Track</Text>
                                            </TouchableOpacity>
                                            </View>
                        </View>
                    </View>

                })
            }
        </View>
        </ScrollView>
    )
}

export default Myorder

const styles = StyleSheet.create({})