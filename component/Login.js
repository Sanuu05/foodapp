import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PrimaryButton from './PrimaryButton'
import { useDispatch, useSelector } from 'react-redux'
import { loadNormalUser, Nloguser, userNormalSign } from '../action/user'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'

const Login = () => {
    const [login, setlogin] = useState(true)
    const dispatch = useDispatch()
    const [token, settoken] = useState()
    const [data, setdata] = useState({
        email: "", password: "", name: "", cpassword: "", mobile: ""
    })
    const submit = () => {
        if (data.email) {
            if (data.password) {
                dispatch(Nloguser({ email: data.email, password: data.password }))

            } else {
                alert('Enter Password')
            }
        } else {
            alert('Enter Email Id')
        }

    }
    const sign = () => {
        if (data.email) {
            if (data.password) {
                if (data.mobile) {
                    if (data.cpassword) {
                        dispatch(userNormalSign({ email: data.email, password: data.password,cpassword:data.cpassword,mobile:data.mobile,name:data.name }))
                    } else {
                        alert('Enter Confirm Password')
                    }
                } else {
                    alert('Enter Mobile Number')
                }


            } else {
                alert('Enter Password')
            }
        } else {
            alert('Enter Email Id')
        }

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

    console.log('alluu', user?.name)

    useEffect(() => {
        dispatch(loadNormalUser())
    }, [])
    useEffect(() => {
        if (user?.name) {
            navigation.navigate('Home')
            // history.push('/')
            // history('/')

        }


    }, [user?.name])
    return (
        <SafeAreaView>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:30 }}>
                {
                    login ? <View style={{ backgroundColor: 'white', width: '85%', alignContent: 'center', paddingVertical: 20, borderRadius: 15, elevation: 2 }}>
                        <Text style={{ textAlign: 'center', fontFamily:'Alegreya_700Bold', fontSize: 25 }}>Hello</Text>
                        <Text style={{ textAlign: 'center',fontFamily:'Alegreya_500Medium' }}>Sign into your Account</Text>
                        <TextInput placeholder='Email' style={{ paddingVertical: 5, paddingHorizontal: 5, marginHorizontal: 8, marginVertical: 7, backgroundColor: 'white', elevation: 1 ,fontFamily:'Alegreya_500Medium'}} onChangeText={(text) => setdata({ ...data, email: text })} />
                        <TextInput placeholder='Password' style={{ paddingVertical: 5, paddingHorizontal: 5, marginHorizontal: 8, marginVertical: 7, backgroundColor: 'white', elevation: 1,fontFamily:'Alegreya_500Medium' }} onChangeText={(text) => setdata({ ...data, password: text })} />
                        <PrimaryButton title="Login" onpress={submit} />
                    </View> : <View style={{ backgroundColor: 'white', width: '85%', alignContent: 'center', paddingVertical: 20, borderRadius: 15, elevation: 2 }}>
                        <Text style={{ textAlign: 'center',  fontSize: 25 ,fontFamily:'Alegreya_700Bold'}}>Hello</Text>
                        <Text style={{ textAlign: 'center',fontFamily:'Alegreya_500Medium' }}>SignUp your Account</Text>
                        <TextInput placeholder='Name' style={{ paddingVertical: 5, paddingHorizontal: 5, marginHorizontal: 8, marginVertical: 7, backgroundColor: 'white', elevation: 1,fontFamily:'Alegreya_500Medium' }} onChangeText={(text) => setdata({ ...data, name: text })} />
                        <TextInput placeholder='Email' style={{ paddingVertical: 5, paddingHorizontal: 5, marginHorizontal: 8, marginVertical: 7, backgroundColor: 'white', elevation: 1,fontFamily:'Alegreya_500Medium' }} onChangeText={(text) => setdata({ ...data, email: text })} />
                        <TextInput placeholder='Password' style={{ paddingVertical: 5, paddingHorizontal: 5, marginHorizontal: 8, marginVertical: 7, backgroundColor: 'white', elevation: 1,fontFamily:'Alegreya_500Medium' }} onChangeText={(text) => setdata({ ...data, password: text })} />
                        <TextInput placeholder='Confirm Password' style={{ paddingVertical: 5, paddingHorizontal: 5, marginHorizontal: 8, marginVertical: 7, backgroundColor: 'white', elevation: 1,fontFamily:'Alegreya_500Medium' }} onChangeText={(text) => setdata({ ...data, cpassword: text })} />
                        <TextInput placeholder='Mobile' style={{ paddingVertical: 5, paddingHorizontal: 5, marginHorizontal: 8, marginVertical: 7, backgroundColor: 'white', elevation: 1,fontFamily:'Alegreya_500Medium' }} onChangeText={(text) => setdata({ ...data, mobile: text })} />
                        <PrimaryButton title="Signup" onpress={sign} />
                    </View>
                }
                {
                    login ? <Text style={{ textAlign: 'center', marginTop: 15,fontFamily:'Alegreya_700Bold', fontSize: 15 }}>Dont have an Account? <Text onPress={() => setlogin(false)} style={{ color: 'orange' }}>Sign Up</Text></Text> :
                        <Text style={{ textAlign: 'center', marginTop: 15,fontFamily:'Alegreya_700Bold', fontSize: 15 }}>Have an Account? <Text onPress={() => setlogin(true)} style={{ color: 'orange' }}>Login</Text></Text>
                }

                {/* <Text onPress={() => navigation.navigate('Home')}>CLICK</Text> */}


            </View>
        </SafeAreaView>

    )
}

export default Login

const styles = StyleSheet.create({})