import { StyleSheet, Text, View, Image, ScrollView, Dimensions, Platform, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { trackorder } from '../action/user'
import Icons from 'react-native-vector-icons/Ionicons'
import Toast from 'react-native-toast-message'
import LoadingSpinner from './LoadingSpinner'
import {
  useFonts,
  Alegreya_400Regular,
  Alegreya_500Medium,
  Alegreya_700Bold,
  Alegreya_800ExtraBold,
} from '@expo-google-fonts/alegreya'

const { width, height } = Dimensions.get('screen')

const Orderd = (props) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const orderlist = useSelector((state) => state.track)
    const [loading, setLoading] = useState(true)
    
    let [fontsLoaded] = useFonts({
        Alegreya_400Regular,
        Alegreya_500Medium,
        Alegreya_700Bold,
        Alegreya_800ExtraBold,
    })
    
    useFocusEffect(
        React.useCallback(() => {
            const fetchOrderDetails = async () => {
                setLoading(true)
                try {
                    await dispatch(trackorder(props?.route?.params))
                    Toast.show({
                        type: 'success',
                        text1: 'Order Details Loaded',
                        text2: 'Order information retrieved successfully',
                        position: 'top',
                        visibilityTime: 2000,
                    })
                } catch (error) {
                    Toast.show({
                        type: 'error',
                        text1: 'Loading Failed',
                        text2: 'Could not load order details',
                        position: 'top',
                        visibilityTime: 3000,
                    })
                } finally {
                    setLoading(false)
                }
            }
            fetchOrderDetails()
        }, [dispatch])
    )
    if (!fontsLoaded) {
        return null;
    }

    const CustomerInfo = () => (
        <View style={styles.infoCard}>
            <View style={styles.cardHeader}>
                <Icons name="person-outline" size={24} color="#FF6B6B" />
                <Text style={styles.cardTitle}>Customer Information</Text>
            </View>
            <View style={styles.infoContent}>
                <Text style={styles.infoText}>{orderlist?.customerDetail?.name}</Text>
                <Text style={styles.infoSubtext}>{orderlist?.customerDetail?.email}</Text>
                <Text style={styles.infoSubtext}>{orderlist?.customerDetail?.mobile}</Text>
                <Text style={styles.addressText}>
                    {orderlist?.customerDetail?.address}, {orderlist?.customerDetail?.pincode}
                </Text>
            </View>
        </View>
    )

    const OrderTimeline = () => (
        <View style={styles.timelineCard}>
            <View style={styles.cardHeader}>
                <Icons name="time-outline" size={24} color="#FF6B6B" />
                <Text style={styles.cardTitle}>Order Timeline</Text>
            </View>
            <View style={styles.timelineContent}>
                <View style={styles.timelineItem}>
                    <Text style={styles.timelineLabel}>Ordered on:</Text>
                    <Text style={styles.timelineValue}>{orderlist?.ordertime}</Text>
                </View>
                <View style={styles.timelineItem}>
                    <Text style={styles.timelineLabel}>Delivered on:</Text>
                    <Text style={styles.timelineValue}>{orderlist?.deliverytime}</Text>
                </View>
            </View>
        </View>
    )

    const OrderItems = () => (
        <View style={styles.itemsCard}>
            <View style={styles.cardHeader}>
                <Icons name="restaurant-outline" size={24} color="#FF6B6B" />
                <Text style={styles.cardTitle}>Order Items</Text>
            </View>
            <View style={styles.itemsContent}>
                {orderlist?.customerOrder?.map((item, index) => (
                    <View key={index} style={styles.orderItem}>
                        <View style={styles.itemImageContainer}>
                            <Image source={{ uri: item?.pimg }} style={styles.itemImage} />
                        </View>
                        <View style={styles.itemDetails}>
                            <Text style={styles.itemName}>{item?.pname}</Text>
                            <Text style={styles.itemQuantity}>Quantity: {item?.qyt}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    )

    const OrderSummary = () => (
        <View style={styles.summaryCard}>
            <View style={styles.cardHeader}>
                <Icons name="receipt-outline" size={24} color="#FF6B6B" />
                <Text style={styles.cardTitle}>Order Summary</Text>
            </View>
            <View style={styles.summaryContent}>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Item Total</Text>
                    <Text style={styles.summaryValue}>₹{orderlist?.totolPrice?.toFixed(2)}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>CGST (5%)</Text>
                    <Text style={styles.summaryValue}>₹{(orderlist?.totolPrice * 0.05)?.toFixed(2)}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>SGST (5%)</Text>
                    <Text style={styles.summaryValue}>₹{(orderlist?.totolPrice * 0.05)?.toFixed(2)}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total Amount</Text>
                    <Text style={styles.totalValue}>
                        ₹{(orderlist?.totolPrice + (orderlist?.totolPrice * 0.1))?.toFixed(2)}
                    </Text>
                </View>
            </View>
        </View>
    )

    return (
        <SafeAreaView style={styles.container}>
            {loading ? (
                <LoadingSpinner 
                    fullScreen={true}
                    text="Loading order details..."
                    backgroundColor="#F8F9FA"
                />
            ) : (
                <ScrollView 
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                <View style={styles.header}>
                    <View style={styles.headerTop}>
                        <TouchableOpacity 
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                            activeOpacity={0.8}
                        >
                            <Icons name="arrow-back" size={24} color="#333" />
                        </TouchableOpacity>
                        <View style={styles.headerContent}>
                            <Text style={styles.headerTitle}>Order Details</Text>
                            <Text style={styles.orderNumber}>Order #{orderlist?._id?.slice(-8)}</Text>
                        </View>
                    </View>
                </View>
                
                <CustomerInfo />
                <OrderTimeline />
                <OrderItems />
                <OrderSummary />
                </ScrollView>
            )}
        </SafeAreaView>
    )
}

export default Orderd

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
    
    // Header
    header: {
        paddingHorizontal: 25,
        paddingTop: 20,
        paddingBottom: 15,
        backgroundColor: 'white',
        marginBottom: 20,
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
                elevation: 8,
            },
        }),
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F8F9FA',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
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
    headerContent: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 28,
        fontFamily: 'Alegreya_800ExtraBold',
        color: '#333',
        marginBottom: 5,
    },
    orderNumber: {
        fontSize: 16,
        fontFamily: 'Alegreya_500Medium',
        color: '#666',
    },
    
    // Card Styles
    infoCard: {
        backgroundColor: 'white',
        marginHorizontal: 20,
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
    timelineCard: {
        backgroundColor: 'white',
        marginHorizontal: 20,
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
    itemsCard: {
        backgroundColor: 'white',
        marginHorizontal: 20,
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
    summaryCard: {
        backgroundColor: 'white',
        marginHorizontal: 20,
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
    
    // Card Header
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 20,
        fontFamily: 'Alegreya_700Bold',
        color: '#333',
        marginLeft: 10,
    },
    
    // Info Content
    infoContent: {
        marginLeft: 34,
    },
    infoText: {
        fontSize: 18,
        fontFamily: 'Alegreya_700Bold',
        color: '#333',
        marginBottom: 8,
    },
    infoSubtext: {
        fontSize: 16,
        fontFamily: 'Alegreya_500Medium',
        color: '#666',
        marginBottom: 6,
    },
    addressText: {
        fontSize: 16,
        fontFamily: 'Alegreya_500Medium',
        color: '#666',
        lineHeight: 22,
        marginTop: 4,
    },
    
    // Timeline Content
    timelineContent: {
        marginLeft: 34,
    },
    timelineItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    timelineLabel: {
        fontSize: 16,
        fontFamily: 'Alegreya_500Medium',
        color: '#666',
    },
    timelineValue: {
        fontSize: 16,
        fontFamily: 'Alegreya_700Bold',
        color: '#333',
    },
    
    // Items Content
    itemsContent: {
        marginLeft: 34,
    },
    orderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    itemImageContainer: {
        width: 60,
        height: 60,
        borderRadius: 15,
        overflow: 'hidden',
        marginRight: 15,
    },
    itemImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontFamily: 'Alegreya_700Bold',
        color: '#333',
        marginBottom: 4,
    },
    itemQuantity: {
        fontSize: 14,
        fontFamily: 'Alegreya_500Medium',
        color: '#666',
    },
    
    // Summary Content
    summaryContent: {
        marginLeft: 34,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    summaryLabel: {
        fontSize: 16,
        fontFamily: 'Alegreya_500Medium',
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
})