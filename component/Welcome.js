import { Button, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, Platform } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icons from 'react-native-vector-icons/Ionicons'
import {
  useFonts,
  Alegreya_400Regular,
  Alegreya_500Medium,
  Alegreya_700Bold,
  Alegreya_800ExtraBold,
} from '@expo-google-fonts/alegreya'

const { width, height } = Dimensions.get('screen')

const Welcome = () => {
    const navigation = useNavigation()
    
    let [fontsLoaded] = useFonts({
        Alegreya_400Regular,
        Alegreya_500Medium,
        Alegreya_700Bold,
        Alegreya_800ExtraBold,
    })
    
    if (!fontsLoaded) {
        return null;
    }
    
    return (
        <SafeAreaView style={styles.container}>
            {/* Hero Image Section */}
            <View style={styles.heroSection}>
                <View style={styles.imageContainer}>
                    <Image 
                        style={styles.heroImage} 
                        source={require('./../assets/food1.png')}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.decorativeElements}>
                    <View style={[styles.floatingElement, styles.element1]} />
                    <View style={[styles.floatingElement, styles.element2]} />
                    <View style={[styles.floatingElement, styles.element3]} />
                </View>
            </View>
            
            {/* Content Section */}
            <View style={styles.contentSection}>
                <View style={styles.textContainer}>
                    <Text style={styles.mainTitle}>Delicious Food</Text>
                    <Text style={styles.subtitle}>
                        Discover amazing flavors and get your favorite meals delivered right to your doorstep
                    </Text>
                </View>
                
                {/* Features */}
                <View style={styles.featuresContainer}>
                    <View style={styles.feature}>
                        <View style={styles.featureIcon}>
                            <Icons name="restaurant-outline" size={24} color="#FF6B6B" />
                        </View>
                        <Text style={styles.featureText}>Quality Food</Text>
                    </View>
                    
                    <View style={styles.feature}>
                        <View style={styles.featureIcon}>
                            <Icons name="bicycle-outline" size={24} color="#FF6B6B" />
                        </View>
                        <Text style={styles.featureText}>Fast Delivery</Text>
                    </View>
                    
                    <View style={styles.feature}>
                        <View style={styles.featureIcon}>
                            <Icons name="star-outline" size={24} color="#FF6B6B" />
                        </View>
                        <Text style={styles.featureText}>Best Service</Text>
                    </View>
                </View>
                
                {/* Get Started Button */}
                <TouchableOpacity 
                    style={styles.getStartedButton}
                    onPress={() => navigation.navigate('Bottom')}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>Get Started</Text>
                    <Icons name="arrow-forward" size={20} color="white" style={styles.buttonIcon} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    
    // Hero Section
    heroSection: {
        flex: 0.55,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
    },
    imageContainer: {
        width: width * 0.8,
        height: height * 0.4,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    decorativeElements: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 1,
    },
    floatingElement: {
        position: 'absolute',
        borderRadius: 50,
        opacity: 0.1,
    },
    element1: {
        width: 80,
        height: 80,
        backgroundColor: '#FF6B6B',
        top: '20%',
        left: '10%',
    },
    element2: {
        width: 60,
        height: 60,
        backgroundColor: '#4CAF50',
        top: '60%',
        right: '15%',
    },
    element3: {
        width: 40,
        height: 40,
        backgroundColor: '#FF9800',
        top: '30%',
        right: '25%',
    },
    
    // Content Section
    contentSection: {
        flex: 0.45,
        paddingHorizontal: 30,
        paddingTop: 10,
        justifyContent: 'space-between',
        paddingBottom: 30,
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    mainTitle: {
        fontSize: 42,
        fontFamily: 'Alegreya_800ExtraBold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 15,
        lineHeight: 50,
    },
    subtitle: {
        fontSize: 18,
        fontFamily: 'Alegreya_400Regular',
        color: '#666',
        textAlign: 'center',
        lineHeight: 26,
        paddingHorizontal: 10,
    },
    
    // Features
    featuresContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 25,
        paddingHorizontal: 10,
    },
    feature: {
        alignItems: 'center',
        flex: 1,
    },
    featureIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFF5F5',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
        ...Platform.select({
            ios: {
                shadowColor: '#FF6B6B',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    featureText: {
        fontSize: 14,
        fontFamily: 'Alegreya_700Bold',
        color: '#333',
        textAlign: 'center',
    },
    
    // Button
    getStartedButton: {
        backgroundColor: '#FF6B6B',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 30,
        borderRadius: 30,
        marginTop: 10,
        marginBottom: 25,
        ...Platform.select({
            ios: {
                shadowColor: '#FF6B6B',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.3,
                shadowRadius: 12,
            },
            android: {
                elevation: 12,
            },
        }),
    },
    buttonText: {
        fontSize: 20,
        fontFamily: 'Alegreya_800ExtraBold',
        color: 'white',
        marginRight: 10,
    },
    buttonIcon: {
        marginLeft: 5,
    },
})