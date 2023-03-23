import { ScrollView, StyleSheet, Text, View, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import { trackorder } from '../action/user'
// import Pusher from 'pusher-js'

const Track = (props) => {
    const dispatch = useDispatch()
    const [resdata, setresdata] = useState()
    useFocusEffect(
        React.useCallback(() => {
            //   console.log('vvbbvvv')
            dispatch(trackorder(props?.route?.params))
        }, [dispatch])


    )
    // useFocusEffect(
    //     React.useCallback(() => {
    //         //   console.log('vvbbvvv')
    //         const pusher = new Pusher('acaefd0f6ede12677278', {
    //             cluster: 'ap2'
    //         });

    //         const channel = pusher.subscribe('order');
    //         channel.bind('inserted', function (data) {
    //             setresdata(JSON.stringify(data));
    //             // alert(JSON.stringify(data))


    //         });
    //         const channels = pusher.subscribe('orders');
    //         channels.bind('deleted', function (data) {
    //             setresdata(JSON.stringify(data));



    //         });
    //         const channel1 = pusher.subscribe('orderd');
    //         channel1.bind('updated', function (data) {
    //             setresdata(JSON.stringify(data));


    //         });
    //     }, [])


    // )
    const orderlist = useSelector((state) => state.track)
    console.log("List", orderlist)
    const [refreshing, setRefreshing] = useState(false);
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(2000).then(() => {
            dispatch(trackorder(props?.route?.params))
            setRefreshing(false)
        });
    }, []);
    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            <View style={{ marginBottom: 400, marginTop: 5 }}>
                <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 2 }}>
                    <Text style={{ fontFamily: 'Alegreya_400Regular', fontSize: 10, fontWeight: 'bold' }}>Ordered on : {orderlist?.ordertime} </Text>
                    <Text style={{ fontFamily: 'Alegreya_400Regular', fontSize: 10, fontWeight: 'bold' }}>Delivered on : {orderlist?.deliverytime}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 15 }}>
                    <View style={{ height: 100, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name='list-alt' color={orderlist?.orderPlaced ? 'orange' : 'gey'} size={50} />
                        <Text style={{ fontSize: 13, fontFamily: 'Alegreya_500Medium', marginLeft: 5, textAlign: 'center' }}>Order Placed</Text>
                    </View>
                    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 30, width: 100 }}>

                        <View style={{ width: 50, height: 70, borderLeftWidth: 2, borderLeftColor: orderlist?.confirmOrder ? 'orange' : 'grey', marginBottom: 3 }}>
                        </View>
                    </View>


                    <View style={{ height: 100, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name='check-square' color={orderlist?.confirmOrder ? 'orange' : 'grey'} size={55} />
                        <Text style={{ fontSize: 13, fontFamily: 'Alegreya_500Medium', marginLeft: 5, textAlign: 'center' }}>Confirmed Order</Text>
                    </View>
                    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 30, width: 100 }}>

                        <View style={{ width: 50, height: 70, borderLeftWidth: 2, borderLeftColor: orderlist?.processing ? 'orange' : 'grey', marginBottom: 3 }}>
                        </View>
                    </View>


                    <View style={{ height: 100, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon1 name='chef-hat' color={orderlist?.processing ? 'orange' : 'grey'} size={50} />
                        <Text style={{ fontSize: 13, fontFamily: 'Alegreya_500Medium', marginLeft: 5, textAlign: 'center' }}>Order Processed</Text>
                    </View>
                    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 30, width: 100 }}>

                        <View style={{ width: 50, height: 70, borderLeftWidth: 2, borderLeftColor: orderlist?.dispatch ? 'orange' : 'grey', marginBottom: 3 }}>
                        </View>
                    </View>


                    <View style={{ height: 100, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon1 name='bike' color={orderlist?.dispatch ? 'orange' : 'grey'} size={50} />
                        <Text style={{ fontSize: 13, fontFamily: 'Alegreya_500Medium', marginLeft: 5, textAlign: 'center' }}>Order Dispatched</Text>
                    </View>
                    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 30, width: 100 }}>

                        <View style={{ width: 50, height: 70, borderLeftWidth: 2, borderLeftColor: orderlist?.delivered ? 'orange' : 'grey', marginBottom: 3 }}>
                        </View>
                    </View>
                    <View style={{ height: 100, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon1 name='home' color={orderlist?.delivered ? 'orange' : 'grey'} size={50} />
                        <Text style={{ fontSize: 13, fontFamily: 'Alegreya_500Medium', marginLeft: 5, textAlign: 'center' }}>Order Delivered</Text>
                    </View>

                </View>
            </View>
        </ScrollView>
    )
}

export default Track

const styles = StyleSheet.create({})