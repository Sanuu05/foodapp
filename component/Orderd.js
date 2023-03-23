import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { trackorder } from '../action/user'

const Orderd = (props) => {
    // console.log(props?.route?.params)
    const dispatch = useDispatch()
    useFocusEffect(
        React.useCallback(() => {
            //   console.log('vvbbvvv')
            dispatch(trackorder(props?.route?.params))
        }, [dispatch])


    )
    const orderlist = useSelector((state) => state.track)
    console.log("List", orderlist)
    return (
        <View style={{ margin: 10, backgroundColor: 'white', padding: 5 }}>
            <View>
                <Text style={{fontFamily:'Alegreya_400Regular',fontSize:15}}>Order id: {orderlist?._id}</Text>
                <View style={{ padding: 5 ,}}>
                    <Text style={{fontFamily:'Alegreya_400Regular',fontSize:15}}>Name : {orderlist?.customerDetail?.name}</Text>
                    <Text style={{fontFamily:'Alegreya_400Regular',fontSize:15}}>Email : {orderlist?.customerDetail?.email}</Text>
                    <Text style={{fontFamily:'Alegreya_400Regular',fontSize:15}}>Mobile : {orderlist?.customerDetail?.mobile}</Text>
                    <Text style={{fontFamily:'Alegreya_400Regular',fontSize:15}}>Address : {orderlist?.customerDetail?.address} , {orderlist?.customerDetail?.pincode}</Text>

                </View>
                <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', borderBottomColor: 'black', borderBottomWidth: 0.5 }}>
                    <Text style={{fontFamily:'Alegreya_400Regular',fontSize:10}}>Ordered on : {orderlist?.ordertime} </Text>
                    <Text style={{fontFamily:'Alegreya_400Regular',fontSize:10}}>Delivered on : {orderlist?.deliverytime}</Text>
                </View>
                <View>
                    {
                        orderlist?.customerOrder?.map((v, i) => {
                            return <View key={i} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                                <Image source={{
                                    uri: v?.pimg
                                }} style={{ width: 50, height: 50 }} />
                                <Text style={{fontFamily:'Alegreya_400Regular',fontSize:15,marginLeft:5}}>{v?.pname} * {v?.qyt}</Text>
                            </View>
                        })
                    }
                </View>
                <View>
                    <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row',marginTop:15 }}>
                        <Text style={{fontFamily:'Alegreya_400Regular',fontSize:15}}>Item Total :</Text>
                        <Text style={{fontFamily:'Alegreya_400Regular',fontSize:15}}>₹ {(orderlist?.totolPrice)?.toFixed(2)}</Text>
                    </View>
                    <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text style={{fontFamily:'Alegreya_400Regular',fontSize:15}}>CGST :</Text>
                        <Text style={{fontFamily:'Alegreya_400Regular',fontSize:15}}>₹ {(orderlist?.totolPrice * 0.05)?.toFixed(2)}</Text>
                    </View>
                    <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row',borderBottomColor: 'black', borderBottomWidth: 0.5 }}>
                        <Text style={{fontFamily:'Alegreya_400Regular',fontSize:15}}>SGST :</Text>
                        <Text style={{fontFamily:'Alegreya_400Regular',fontSize:15}}>₹ {(orderlist?.totolPrice * 0.05)?.toFixed(2)}</Text>
                    </View>
                    <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text style={{fontFamily:'Alegreya_400Regular',fontSize:15,fontWeight:'bold'}}>Total :</Text>
                        <Text style={{fontFamily:'Alegreya_400Regular',fontSize:15,fontWeight:'bold'}}>₹ {(orderlist?.totolPrice + (orderlist?.totolPrice * 0.05) + (orderlist?.totolPrice * 0.05))?.toFixed(2)}</Text>
                    </View>

                </View>

            </View>
        </View>
    )
}

export default Orderd

const styles = StyleSheet.create({})