import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { getorderlist } from '../action/user'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import Icons from 'react-native-vector-icons/Ionicons'
import LoadingSpinner from './LoadingSpinner'
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

const Myorder = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const orderlist = useSelector((state) => state.orderlist)
    const [loading, setLoading] = useState(true)
    
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
            const fetchOrders = async () => {
                setLoading(true)
                try {
                    await dispatch(getorderlist())
                } finally {
                    setLoading(false)
                }
            }
            fetchOrders()
        }, [dispatch])
    )
    if (!fontsLoaded) {
        return null;
    }

    const OrderCard = ({ order, index }) => (
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
        <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
                <Icons name="receipt-outline" size={80} color="#CCC" />
            </View>
            <Text style={styles.emptyTitle}>No Orders Found</Text>
            <Text style={styles.emptySubtitle}>
                You haven't placed any orders yet. Start exploring delicious food!
            </Text>
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
            {loading ? (
                <LoadingSpinner 
                    fullScreen={true}
                    text="Loading your orders..."
                    backgroundColor="#F8F9FA"
                />
            ) : (
                <ScrollView 
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {orderlist?.length > 0 ? (
                    <View style={styles.ordersContainer}>
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
                                    <Text style={styles.headerTitle}>Order History</Text>
                                    <Text style={styles.headerSubtitle}>{orderlist?.length} {orderlist?.length === 1 ? 'order' : 'orders'} found</Text>
                                </View>
                            </View>
                        </View>
                        
                        {orderlist.reverse().map((order, index) => (
                            <OrderCard key={index} order={order} index={index} />
                        ))}
                    </View>
                ) : (
                    <View>
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
                                    <Text style={styles.headerTitle}>Order History</Text>
                                    <Text style={styles.headerSubtitle}>No orders found</Text>
                                </View>
                            </View>
                        </View>
                        <EmptyOrders />
                    </View>
                    )}
                </ScrollView>
            )}
        </SafeAreaView>
    )
}

export default Myorder

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
    
    // Header Styles
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
    headerSubtitle: {
        fontSize: 16,
        fontFamily: 'Alegreya_400Regular',
        color: '#666',
    },
    
    // Orders Container
    ordersContainer: {
        flex: 1,
    },
    
    // Order Card Styles
    orderCard: {
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
    
    // Order Content
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
    
    // Order Summary
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
    
    // Action Buttons
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
    
    // Empty State Styles
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        minHeight: height * 0.7,
    },
    emptyIcon: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#F8F9FA',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    emptyTitle: {
        fontSize: 26,
        fontFamily: 'Alegreya_800ExtraBold',
        color: '#333',
        marginBottom: 12,
        textAlign: 'center',
    },
    emptySubtitle: {
        fontSize: 16,
        fontFamily: 'Alegreya_400Regular',
        color: '#666',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 35,
    },
    browseButton: {
        backgroundColor: '#FF6B6B',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 16,
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