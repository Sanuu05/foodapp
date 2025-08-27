import { ScrollView, StyleSheet, Text, View, RefreshControl, Dimensions, Platform, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { trackorder } from '../action/user'
import {
  useFonts,
  Alegreya_400Regular,
  Alegreya_500Medium,
  Alegreya_700Bold,
  Alegreya_800ExtraBold,
} from '@expo-google-fonts/alegreya'

const { width, height } = Dimensions.get('screen')

const Track = (props) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const orderlist = useSelector((state) => state.track)
    const [refreshing, setRefreshing] = useState(false)
    
    let [fontsLoaded] = useFonts({
        Alegreya_400Regular,
        Alegreya_500Medium,
        Alegreya_700Bold,
        Alegreya_800ExtraBold,
    })
    
    useFocusEffect(
        React.useCallback(() => {
            dispatch(trackorder(props?.route?.params))
        }, [dispatch])
    )
    
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
    if (!fontsLoaded) {
        return null;
    }

    const trackingSteps = [
        {
            id: 'placed',
            title: 'Order Placed',
            subtitle: 'We received your order',
            icon: 'receipt-outline',
            completed: orderlist?.orderPlaced,
            color: '#FF6B6B'
        },
        {
            id: 'confirmed',
            title: 'Order Confirmed',
            subtitle: 'Restaurant confirmed your order',
            icon: 'checkmark-circle-outline',
            completed: orderlist?.confirmOrder,
            color: '#4CAF50'
        },
        {
            id: 'processing',
            title: 'Being Prepared',
            subtitle: 'Chef is preparing your food',
            icon: 'restaurant-outline',
            completed: orderlist?.processing,
            color: '#FF9800'
        },
        {
            id: 'dispatched',
            title: 'Out for Delivery',
            subtitle: 'Your order is on the way',
            icon: 'bicycle-outline',
            completed: orderlist?.dispatch,
            color: '#2196F3'
        },
        {
            id: 'delivered',
            title: 'Delivered',
            subtitle: 'Enjoy your meal!',
            icon: 'home-outline',
            completed: orderlist?.delivered,
            color: '#9C27B0'
        }
    ]

    const TrackingStep = ({ step, index, isLast }) => (
        <View style={styles.stepContainer}>
            <View style={styles.stepContent}>
                <View style={[styles.stepIcon, { backgroundColor: step.completed ? step.color : '#E0E0E0' }]}>
                    <Icons 
                        name={step.icon} 
                        size={24} 
                        color={step.completed ? 'white' : '#999'} 
                    />
                </View>
                <View style={styles.stepInfo}>
                    <Text style={[styles.stepTitle, { color: step.completed ? '#333' : '#999' }]}>
                        {step.title}
                    </Text>
                    <Text style={[styles.stepSubtitle, { color: step.completed ? '#666' : '#CCC' }]}>
                        {step.subtitle}
                    </Text>
                </View>
            </View>
            {!isLast && (
                <View style={[styles.connector, { backgroundColor: step.completed ? step.color : '#E0E0E0' }]} />
            )}
        </View>
    )

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#FF6B6B']}
                        tintColor={'#FF6B6B'}
                    />
                }
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
                            <Text style={styles.headerTitle}>Track Your Order</Text>
                            <Text style={styles.headerSubtitle}>Real-time order tracking</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.timelineCard}>
                    <View style={styles.timelineHeader}>
                        <Icons name="time-outline" size={24} color="#FF6B6B" />
                        <Text style={styles.timelineTitle}>Order Timeline</Text>
                    </View>
                    <View style={styles.timelineContent}>
                        <View style={styles.timelineRow}>
                            <Text style={styles.timelineLabel}>Ordered:</Text>
                            <Text style={styles.timelineValue}>{orderlist?.ordertime}</Text>
                        </View>
                        {orderlist?.deliverytime && (
                            <View style={styles.timelineRow}>
                                <Text style={styles.timelineLabel}>Delivered:</Text>
                                <Text style={styles.timelineValue}>{orderlist?.deliverytime}</Text>
                            </View>
                        )}
                    </View>
                </View>

                <View style={styles.trackingCard}>
                    <View style={styles.trackingHeader}>
                        <Icons name="location-outline" size={24} color="#FF6B6B" />
                        <Text style={styles.trackingTitle}>Order Status</Text>
                    </View>
                    
                    <View style={styles.stepsContainer}>
                        {trackingSteps.map((step, index) => (
                            <TrackingStep 
                                key={step.id} 
                                step={step} 
                                index={index} 
                                isLast={index === trackingSteps.length - 1}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Track

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
    headerSubtitle: {
        fontSize: 16,
        fontFamily: 'Alegreya_400Regular',
        color: '#666',
    },
    
    // Timeline Card
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
    timelineHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    timelineTitle: {
        fontSize: 20,
        fontFamily: 'Alegreya_700Bold',
        color: '#333',
        marginLeft: 10,
    },
    timelineContent: {
        marginLeft: 34,
    },
    timelineRow: {
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
    
    // Tracking Card
    trackingCard: {
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
    trackingHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    trackingTitle: {
        fontSize: 20,
        fontFamily: 'Alegreya_700Bold',
        color: '#333',
        marginLeft: 10,
    },
    
    // Steps
    stepsContainer: {
        marginLeft: 34,
    },
    stepContainer: {
        position: 'relative',
    },
    stepContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    stepIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 8,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    stepInfo: {
        flex: 1,
    },
    stepTitle: {
        fontSize: 18,
        fontFamily: 'Alegreya_700Bold',
        marginBottom: 4,
    },
    stepSubtitle: {
        fontSize: 14,
        fontFamily: 'Alegreya_500Medium',
    },
    connector: {
        position: 'absolute',
        left: 24,
        top: 50,
        width: 2,
        height: 40,
        marginBottom: 10,
    },
})