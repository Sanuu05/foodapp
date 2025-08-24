import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, Platform, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PrimaryButton from './PrimaryButton'
import { useDispatch, useSelector } from 'react-redux'
import { loadNormalUser, Nloguser, userNormalSign } from '../action/user'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
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

const Login = () => {
    const [login, setlogin] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const dispatch = useDispatch()
    const [token, settoken] = useState()
    const [data, setdata] = useState({
        email: "", password: "", name: "", cpassword: "", mobile: ""
    })
    console.log(data)

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

    const submit = () => {
        if (!data.email) {
            alert('Please enter your email address')
            return
        }
        if (!data.password) {
            alert('Please enter your password')
            return
        }
        dispatch(Nloguser({ email: data.email, password: data.password }))
    }

    const sign = () => {
        if (!data.name) {
            alert('Please enter your name')
            return
        }
        if (!data.email) {
            alert('Please enter your email address')
            return
        }
        if (!data.password) {
            alert('Please enter your password')
            return
        }
        if (!data.cpassword) {
            alert('Please confirm your password')
            return
        }
        if (data.password !== data.cpassword) {
            alert('Passwords do not match')
            return
        }
        if (!data.mobile) {
            alert('Please enter your mobile number')
            return
        }
        dispatch(userNormalSign({ 
            email: data.email, 
            password: data.password,
            cpassword: data.cpassword,
            mobile: data.mobile,
            name: data.name 
        }))
    }

    const navigation = useNavigation()
    
    useEffect(() => {
        getTheme()
    })
    
    const getTheme = async () => {
        try {
            const value = await AsyncStorage.getItem('normaltoken');
            settoken(value)
        } catch (error) {
            console.log('error', error);
        };
    };
    
    const user = useSelector(state => state?.normal?.user)

    useEffect(() => {
        dispatch(loadNormalUser())
    }, [])
    
    useEffect(() => {
        if (user?.name) {
            navigation.navigate('Home')
        }
    }, [user?.name])

    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header Section */}
                <View style={styles.headerSection}>
                    <View style={styles.logoContainer}>
                        <View style={styles.logoCircle}>
                            <Icon name="restaurant" size={40} color="#FF6B6B" />
                        </View>
                    </View>
                    <Text style={styles.welcomeText}>
                        {login ? 'Welcome Back!' : 'Create Account'}
                    </Text>
                    <Text style={styles.subtitleText}>
                        {login ? 'Sign in to continue your food journey' : 'Join us for delicious food experiences'}
                    </Text>
                </View>

                {/* Form Section */}
                <View style={styles.formContainer}>
                    {login ? (
                        // Login Form
                        <View style={styles.formCard}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Email Address</Text>
                                <View style={styles.inputContainer}>
                                    <Icon name="email" size={20} color="#999" style={styles.inputIcon} />
                                    <TextInput 
                                        placeholder='Enter your email' 
                                        style={styles.textInput}
                                        value={data.email}
                                        onChangeText={(text) => setdata({ ...data, email: text })}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                    />
                                </View>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Password</Text>
                                <View style={styles.inputContainer}>
                                    <Icon name="lock" size={20} color="#999" style={styles.inputIcon} />
                                    <TextInput 
                                        placeholder='Enter your password' 
                                        style={styles.textInput}
                                        value={data.password}
                                        onChangeText={(text) =>{
                                            setdata({ ...data, password: text })
                                        }}
                                        secureTextEntry={!showPassword}
                                        // autoCapitalize="none"
                                        // autoCorrect={false}
                                        // editable={true}
                                        // pointerEvents="auto"
                                    />
                                    {/* <TouchableOpacity 
                                        onPress={() => setShowPassword(!showPassword)}
                                        style={styles.eyeIcon}
                                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                    >
                                        <Icon 
                                            name={showPassword ? "visibility" : "visibility-off"} 
                                            size={20} 
                                            color="#999" 
                                        />
                                    </TouchableOpacity> */}
                                </View>
                            </View>

                            <TouchableOpacity style={styles.loginButton} onPress={submit}>
                                <Text style={styles.loginButtonText}>Sign In</Text>
                                <Icon name="arrow-forward" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        // Signup Form
                        <View style={styles.formCard}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Full Name</Text>
                                <View style={styles.inputContainer}>
                                    <Icon name="person" size={20} color="#999" style={styles.inputIcon} />
                                    <TextInput 
                                        placeholder='Enter your full name' 
                                        style={styles.textInput}
                                        value={data.name}
                                        onChangeText={(text) => setdata({ ...data, name: text })}
                                    />
                                </View>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Email Address</Text>
                                <View style={styles.inputContainer}>
                                    <Icon name="email" size={20} color="#999" style={styles.inputIcon} />
                                    <TextInput 
                                        placeholder='Enter your email' 
                                        style={styles.textInput}
                                        value={data.email}
                                        onChangeText={(text) => setdata({ ...data, email: text })}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                    />
                                </View>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Password</Text>
                                <View style={styles.inputContainer}>
                                    <Icon name="lock" size={20} color="#999" style={styles.inputIcon} />
                                    <TextInput 
                                        placeholder='Create a password' 
                                        style={styles.textInput}
                                        value={data.password}
                                        onChangeText={(text) => setdata({ ...data, password: text })}
                                        secureTextEntry={!showPassword}
                                        // autoCapitalize="none"
                                        // autoCorrect={false}
                                        // editable={true}
                                        // pointerEvents="auto"
                                    />
                                    <TouchableOpacity 
                                        onPress={() => setShowPassword(!showPassword)}
                                        style={styles.eyeIcon}
                                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                        pointerEvents="auto"
                                    >
                                        <Icon 
                                            name={showPassword ? "visibility" : "visibility-off"} 
                                            size={20} 
                                            color="#999" 
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Confirm Password</Text>
                                <View style={styles.inputContainer}>
                                    <Icon name="lock" size={20} color="#999" style={styles.inputIcon} />
                                    <TextInput 
                                        placeholder='Confirm your password' 
                                        style={styles.textInput}
                                        value={data.cpassword}
                                        onChangeText={(text) => setdata({ ...data, cpassword: text })}
                                        secureTextEntry={!showConfirmPassword}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        editable={true}
                                        pointerEvents="auto"
                                    />
                                    <TouchableOpacity 
                                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                        style={styles.eyeIcon}
                                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                        pointerEvents="auto"
                                    >
                                        <Icon 
                                            name={showConfirmPassword ? "visibility" : "visibility-off"} 
                                            size={20} 
                                            color="#999" 
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Mobile Number</Text>
                                <View style={styles.inputContainer}>
                                    <Icon name="phone" size={20} color="#999" style={styles.inputIcon} />
                                    <TextInput 
                                        placeholder='Enter your mobile number' 
                                        style={styles.textInput}
                                        value={data.mobile}
                                        onChangeText={(text) => setdata({ ...data, mobile: text })}
                                        keyboardType="phone-pad"
                                    />
                                </View>
                            </View>

                            <TouchableOpacity style={styles.signupButton} onPress={sign}>
                                <Text style={styles.signupButtonText}>Create Account</Text>
                                <Icon name="person-add" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Toggle Section */}
                    <View style={styles.toggleSection}>
                        <Text style={styles.toggleText}>
                            {login ? "Don't have an account? " : "Already have an account? "}
                            <Text 
                                style={styles.toggleLink}
                                onPress={() => setlogin(!login)}
                            >
                                {login ? "Sign Up" : "Sign In"}
                            </Text>
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 30,
    },
    
    // Header Section
    headerSection: {
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 30,
        backgroundColor: 'white',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 20,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 12,
            },
            android: {
                elevation: 12,
            },
        }),
    },
    logoContainer: {
        marginBottom: 20,
    },
    logoCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#FF6B6B15',
        alignItems: 'center',
        justifyContent: 'center',
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
    welcomeText: {
        fontSize: 28,
        fontFamily: 'Alegreya_800ExtraBold',
        color: '#333',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitleText: {
        fontSize: 16,
        fontFamily: 'Alegreya_400Regular',
        color: '#666',
        textAlign: 'center',
        paddingHorizontal: 40,
    },
    
    // Form Section
    formContainer: {
        flex: 1,
        paddingHorizontal: 25,
    },
    formCard: {
        backgroundColor: 'white',
        borderRadius: 25,
        padding: 30,
        marginBottom: 20,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.15,
                shadowRadius: 15,
            },
            android: {
                elevation: 12,
            },
        }),
    },
    inputGroup: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 16,
        fontFamily: 'Alegreya_700Bold',
        color: '#333',
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#E9ECEF',
        minHeight: 50,
        position: 'relative',
        pointerEvents: 'box-none',
    },
    inputIcon: {
        marginRight: 12,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'Alegreya_400Regular',
        color: '#333',
        paddingVertical: 0,
        minHeight: 20,
        zIndex: 2,
    },
    eyeIcon: {
        padding: 5,
        zIndex: 1,
        position: 'absolute',
        right: 10,
    },
    
    // Login Button
    loginButton: {
        backgroundColor: '#FF6B6B',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 15,
        marginTop: 10,
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
    loginButtonText: {
        fontSize: 18,
        fontFamily: 'Alegreya_700Bold',
        color: 'white',
        marginRight: 8,
    },
    
    // Signup Button
    signupButton: {
        backgroundColor: '#4ECDC4',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 15,
        marginTop: 10,
        ...Platform.select({
            ios: {
                shadowColor: '#4ECDC4',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    signupButtonText: {
        fontSize: 18,
        fontFamily: 'Alegreya_700Bold',
        color: 'white',
        marginRight: 8,
    },
    
    // Toggle Section
    toggleSection: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    toggleText: {
        fontSize: 16,
        fontFamily: 'Alegreya_400Regular',
        color: '#666',
        textAlign: 'center',
    },
    toggleLink: {
        fontFamily: 'Alegreya_700Bold',
        color: '#FF6B6B',
    },
})