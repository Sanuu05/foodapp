import { StyleSheet, Text, View, FlatList, TouchableHighlight, Image, TextInput, ScrollView,ActivityIndicator ,Dimensions, TouchableOpacity, Platform} from 'react-native'
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
        <View style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>Explore Categories</Text>
            <FlatList
                horizontal
                keyExtractor={(item, index) => index.toString()}
                data={category}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryList}
                ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
                renderItem={(element) => {
                    return <TouchableOpacity style={[styles.cathcard, styles.modernShadow, data===element.item?.name?styles.activec:null]} activeOpacity={1} onPress={() => navigation.navigate('Cath', element.item?.key)} >
                        <View style={styles.cathcard1}>
                            <View style={[styles.iconContainer, { backgroundColor: '#FF6B6B' + '25' }]}>
                                <Image
                                    source={element.item.icon}
                                    style={styles.categoryIcon}
                                />
                            </View>
                            <Text style={styles.categoryText}>{element.item?.name}</Text>
                        </View>
                    </TouchableOpacity>
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
                <Text style={styles.popularTitle}>{data}</Text>
              
                <View style={styles.popularGrid}>
    
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    data={fildata}
                    scrollEnabled
                    contentContainerStyle={styles.popularList}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                  
                    renderItem={(element) => {
                        return <TouchableOpacity style={[styles.cathcardp, styles.modernShadow]} activeOpacity={1} onPress={() => navigation.navigate('Detail', element.item)}>
                            <View style={styles.productCard}>
                                <Image
                                    source={{
                                        uri: element.item.productimg
                                    }}
                                    style={styles.productImage}
                                />
                                <View style={styles.productInfo}>
                                    <Text style={styles.productName}>{element.item?.name?.slice(0, 15)}</Text>
                                    <Text style={styles.productCategory}>{element.item?.cath}</Text>
                                    <View style={styles.priceContainer}>
                                        <Text style={styles.priceText}>₹ {element.item?.price}</Text>
                                        <View style={styles.addButton}>
                                            <Icon name="add" size={16} color="white" />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
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
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FF6B6B" />
                <Text style={styles.loadingText}>Loading delicious food...</Text>
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
        <SafeAreaView style={styles.container}>
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
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        paddingVertical: 0,
    },
    categoryContainer: {
        marginBottom: 35,
        paddingTop: 10,
    },
    categoryTitle: {
        marginLeft: 20,
        fontSize: 24,
        fontFamily: 'Alegreya_700Bold',
        color: '#333',
        marginBottom: 20,
    },
    categoryList: {
        paddingVertical: 15,
    },
    cathcard: {
        padding: 15,
        marginHorizontal: 12,
        backgroundColor: 'white',
        width: 100,
        height: 100,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cathcard1: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    categoryIcon: {
        height: 28,
        width: 28,
        resizeMode: 'contain',
    },
    categoryText: {
        fontSize: 13,
        fontFamily: 'Alegreya_700Bold',
        color: '#333',
        textAlign: 'center',
    },
    popularTitle: {
        marginLeft: 20,
        fontSize: 24,
        fontFamily: 'Alegreya_700Bold',
        color: '#333',
        marginBottom: 20,
        textTransform: 'capitalize',
    },
    popularGrid: {
        display: 'flex',
        height: height,
        flexDirection: 'column',
        alignItems: 'center',
        marginVertical: 0,
        paddingBottom: 10,
    },
    popularList: {
        paddingBottom: 400,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    cathcardp: {
        padding: 0,
        marginHorizontal: 8,
        marginVertical: 12,
        backgroundColor: 'white',
        width: cardwidth,
        height: 220,
        borderRadius: 20,
        overflow: 'hidden',
    },
    productCard: {
        flex: 1,
    },
    productImage: {
        height: 120,
        width: '100%',
        resizeMode: 'cover',
    },
    productInfo: {
        padding: 12,
        flex: 1,
        justifyContent: 'space-between',
    },
    productName: {
        fontSize: 14,
        fontFamily: 'Alegreya_700Bold',
        color: '#333',
    },
    productCategory: {
        fontSize: 12,
        color: '#999',
        fontFamily: 'Alegreya_400Regular',
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceText: {
        fontSize: 16,
        color: '#FF6B6B',
        fontFamily: 'Alegreya_700Bold',
        fontWeight: 'bold',
    },
    addButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#FF6B6B',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingContainer: {
        height: 400,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
    },
    loadingText: {
        marginTop: 15,
        fontSize: 16,
        color: '#666',
        fontFamily: 'Alegreya_400Regular',
    },
    activec: {
        backgroundColor: '#FF6B6B'
    },
    modernShadow: {
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
    }
})