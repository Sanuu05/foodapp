import { StyleSheet, Text, View, FlatList, TouchableHighlight, Image, TextInput, ScrollView,ActivityIndicator ,Dimensions} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { SafeAreaView } from 'react-native-safe-area-context';
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
  import * as SplashScreen from 'expo-splash-screen';
const { width ,height} = Dimensions.get('screen')
const cardwidth = width / 2 - 30;
const category = [
    {
        name: "Staters",
        icon: require('../assets/kebab.png'),
        key:'starters'
    },
    {
        name: "Main Course",
        icon: require('../assets/biri1.png'),
        key:'main course'
    },
    {
        name: "Dessert",
        icon: require('../assets/ice.png'),
        key:'dessert'
    },
    {
        name: "Beverages",
        icon: require('../assets/drinks.png'),
        key:'beverages'
    }
]

const Cathn = ({data}) => {
    const navigation = useNavigation()
    return (
        <View>
            <Text style={{ marginLeft: 15, fontSize: 19, fontWeight: 'bold', marginTop: 5 }}>Explore Categories</Text>
            <FlatList
                horizontal
                keyExtractor={(item, index) => index.toString()}
                data={category}
                renderItem={(element) => {
                    return <TouchableHighlight style={[styles.cathcard, styles.shadowProp, data===element.item?.name?styles.activec:null]} underlayColor="orange" activeOpacity={0.9} onPress={() => navigation.navigate('Cath', element.item?.key)} >
                        <View style={[styles.cathcard1]} >
                            {/* <Icon name={element.item.icon} size={50} color="orange" /> */}
                            <Image
                                source={element.item.icon}
                                style={{ height: 60, width: 60, resizeMode: 'contain' }}
                            />
                            <Text style={{ fontSize: 13, fontFamily:'Alegreya_700Bold',textAlign:'center', marginTop: 2 }}>{element.item?.name}</Text>
                        </View>
                    </TouchableHighlight>
                }}
            />
        </View>
    )
}
const Input = () => {
    return (

        <View style={{ marginVertical: 10 }} >
            <View style={{ backgroundColor: 'white',elevation:5, display: 'flex', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 8, marginHorizontal: 15 }} >
                <TextInput placeholder='Search' style={{ flex: 1 }} />
                <Icon name='search' size={25} color="orange" />
            </View>
        </View>

    )
}


const Popular = ({ head, data }) => {
    const [list, setlist] = useState()
    useEffect(() => {
        getdata()
    }, [])
    const getdata = async () => {
        try {
            const data = await fetch('https://resturant-backend-f921.onrender.com/product/get')
            const res = await data.json()
            setlist(res)


        } catch (error) {

        }

    }
    const navigation = useNavigation()
    
    const fildata =  list?.filter(p=>p?.cath===data)
    // console.log('dd',fildata)
    return (
        <View>
            {
                fildata?.length>0?
                <View style={{ minHeight: 0 }}>
                <Text style={{ marginLeft: 20, fontSize: 25,textTransform:'capitalize', fontWeight: 'bold', marginTop: 0 }}>{data} </Text>
              
                <View style={{display:'flex',height:height,flexDirection:'column',alignItems:'center',marginVertical:0,paddingBottom:10} }>
    
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    data={fildata}
                    scrollEnabled
                    contentContainerStyle={{paddingBottom:400,alignItems:'center'}}
                  
                    renderItem={(element) => {
                        return <TouchableHighlight style={[styles.cathcardp]} underlayColor="whitesmoke" activeOpacity={0.9} onPress={() => navigation.navigate('Detail', element.item)}  >
                            <View >
    
                                <Image
                                    source={{
                                        uri: element.item.productimg
                                    }}
                                    style={{ height: undefined, width: '100%', aspectRatio: 1, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                                />
                                <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', marginLeft: 2 }}>
                                    <Text style={{ fontSize: 16, fontFamily:'Alegreya_700Bold', marginTop: 2 }}>{element.item?.name?.slice(0, 15)}</Text>
                                    <Text style={{ fontSize: 13, color: 'grey',fontFamily:'Alegreya_400Regular', marginTop: 1 }}>{element.item?.cath}</Text>
                                    <Text style={{ fontSize: 16, color: 'black', fontFamily:'Alegreya_700Bold', marginTop: 1 }}>₹ {element.item?.price}</Text>
                                </View>
    
                            </View>
                        </TouchableHighlight>
                    }}
                />
                {/* {
                    fildata?.map((element,i)=>{
                        return <TouchableHighlight style={[styles.cathcardp, styles.shadowProp]} underlayColor="whitesmoke" activeOpacity={0.9} onPress={() => navigation.navigate('Detail', element.item)}  >
                        <View >

                            <Image
                                source={{
                                    uri: element.productimg
                                }}
                                style={{ height: undefined, width: '100%', aspectRatio: 1, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                            />
                            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', marginLeft: 2 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 2 }}>{element?.name?.slice(0, 15)}</Text>
                                <Text style={{ fontSize: 13, color: 'grey', marginTop: 1 }}>{element?.cath}</Text>
                                <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold', marginTop: 1 }}>₹ {element?.price}</Text>
                            </View>

                        </View>
                    </TouchableHighlight>
                    })
                } */}
                </View>
    
            </View>:
            <View style={{height:400, display:'flex',justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size="large" color="orange" />
                </View>
            }
          

        </View>
        
    )
}
const Cath = (props) => {
    console.log('props', props.route?.params)
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
      if (!fontsLoaded) {
        return null;
      } else {
    
    return (
        // <ScrollView>
        <SafeAreaView style={{flex:1,paddingVertical:0}}>
            <View >
                <Cathn  data={props.route?.params}/>
                {/* <Input /> */}
                <Popular data={props.route?.params} />
            </View>
            </SafeAreaView>
        //  </ScrollView>
    )
      }
}

export default Cath

const styles = StyleSheet.create({
    cathcard: {
        padding: 10,
        margin: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: 100,
        height: 100,
        borderRadius: 8,
        elevation:1


    },
    cathcardp: {
        padding: 10,
        marginHorizontal: 10,
        marginTop:20,
        marginBottom:10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        width: cardwidth,
        minHeight : 220,
        borderRadius: 12,
        elevation:1



    },
    activec:{
        backgroundColor:'orange'
    }
})