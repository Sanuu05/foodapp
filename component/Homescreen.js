import { FlatList, StyleSheet, Text, View, TouchableHighlight, Image, ScrollView, TextInput, Dimensions,ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
// import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { getProduct } from './../action/product'
import { useDispatch, useSelector } from 'react-redux';
import { loadNormalUser } from '../action/user';
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
import AppLoading from 'expo-app-loading';
const { width, height } = Dimensions.get('screen')
const cardwidth = width / 2 - 30;

const category = [
  {
    name: "Staters",
    icon: require('../assets/kebab.png'),
    key: 'starters'
  },
  {
    name: "Main Course",
    icon: require('../assets/biri1.png'),
    key: 'main course'
  },
  {
    name: "Dessert",
    icon: require('../assets/ice.png'),
    key: 'dessert'
  },
  {
    name: "Beverages",
    icon: require('../assets/drinks.png'),
    key: 'beverages'
  }
]

const Cath = () => {
  const navigation = useNavigation()
  return (
    <View>
      <Text style={{ marginLeft: 15, fontSize: 19, marginTop: 5,fontFamily: 'Alegreya_700Bold' }}>Explore Categories</Text>
      <FlatList
        horizontal
        keyExtractor={(item, index) => index.toString()}
        data={category}
        showsHorizontalScrollIndicator={false}
        renderItem={(element) => {
          return <TouchableHighlight style={[styles.cathcard, styles.shadowProp]} underlayColor="orange" activeOpacity={0.9} onPress={() => navigation.navigate('Cath', element.item?.key)} >
            <View style={[styles.cathcard1]} >
              {/* <Icon name={element.item.icon} size={50} color="orange" /> */}
              <Image
                source={element.item.icon}
                style={{ height: 60, width: 60, resizeMode: 'contain' }}
              />
              <Text style={{ fontSize: 13, fontFamily: 'Alegreya_700Bold', marginTop: 2 }}>{element.item?.name}</Text>
            </View>
          </TouchableHighlight>
        }}
      />
    </View>
  )
}

const Popular = ({ head, name, pdata }) => {

  const navigation = useNavigation()
  const fpopular = pdata?.filter(p => p?.popular === true)
  const fchef = pdata?.filter(p => p?.chef === true)
  const fspecial = pdata?.filter(p => p?.special === true)
  const alldata = [{ id: 'popular', d: fpopular }, { id: 'chef', d: fchef }, { id: 'special', d: fspecial }]
  const fildata = alldata?.filter(p => p.id === name)
  // console.log('mmm', fildata[0].d)
  return (
    <View style={{ minHeight: 270 }}>
      <Text style={{ marginLeft: 15, fontSize: 19, fontFamily: 'Alegreya_700Bold', marginTop: 5 }}>{head} </Text>
      {/* <View style={styles.pdiv}>
        {
          category?.map((v, i) => {
            return <View style={styles.spdiv}  >
   
              <Image
                source={v.icon}
                style={{ height: undefined, width: '100%', aspectRatio: 1 }}
              />
              <Text style={{ fontSize: 13, fontWeight: 'bold', marginTop: 2 }}>{v.name}</Text>
            </View>

          })
        }
      </View> */}
      {/* {
        list ? <Text>done</Text> : <Text>none</Text>
      } */}
      {
        pdata ? <FlatList

          keyExtractor={(item, index) => index.toString()}
          data={fildata[0].d}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={(element) => {
            return <TouchableHighlight style={[styles.cathcardp, styles.shadowProp]} underlayColor="whitesmoke" activeOpacity={0.9} onPress={() => navigation.navigate('Detail', element.item)}  >
              <View >

                <Image
                  source={{
                    uri: element.item.productimg
                  }}
                  style={{ height: undefined, width: '100%', aspectRatio: 1, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                />
                <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', marginLeft: 5 }}>
                  <Text style={{ fontSize: 15, fontFamily: 'Alegreya_700Bold', marginTop: 2 }}>{element.item?.name?.slice(0, 15)}</Text>
                  <Text style={{ fontSize: 13, color: 'grey',fontFamily:'Alegreya_400Regular', marginTop: 1 }}>{element.item?.cath}</Text>
                  <Text style={{ fontSize: 16, color: 'black', fontFamily: 'Alegreya_700Bold', marginTop: 1 }}>₹ {element.item?.price}</Text>
                </View>

              </View>
            </TouchableHighlight>
          }}
        /> : <ActivityIndicator />
      }

    </View>
  )
}
const Input = ({ word, sword, click }) => {
  // console.log('ss',sword)
  const navigation = useNavigation()
  return (
    <View style={{ marginVertical: 10 }} >
      <View style={{ backgroundColor: 'white', elevation: 7, display: 'flex', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 8, marginHorizontal: 15 }} >
        <TextInput placeholder='Search' value={sword} style={{ flex: 1 }} onChangeText={word} onPressIn={()=>navigation.navigate('Search')} />
        {
          sword ? <Icon name='close' size={25} color="orange" onPress={click} /> : <Icon name='search' size={25} color="orange" />
        }

      </View>
    </View>
  )
}

const Heading = ({ user }) => {
  return (
    <View style={styles.hdiv}>
      <Text style={styles.htext1}>Good evening <Text style={{fontFamily: 'Alegreya_700Bold'}}>{user?.name}</Text> </Text>
      <Text style={styles.htext2}>Grab your</Text>
      <Text style={styles.htext3}>delecious food !</Text>
    </View>
  )
}

const Popularnew = ({ head, data, word, sdata, pdata }) => {
  const [list, setlist] = useState()
  console.log('ww', word)
  const [fildata, setfildata] = useState()


  const navigation = useNavigation()

  // const fildata = list?.filter(p => p?.cath !== data)
  // console.log('dd', fildata)
  useEffect(() => {

    if (pdata && word !== "") {
      // console.log('aaa', word)
      const newlist = pdata.filter((con) => {
        return Object.values(con).join(" ").toLowerCase().includes(word?.toLowerCase())
      })
      setfildata(newlist)
      sdata(newlist)
    }

  }, [word, pdata])
  // console.log("ff",fildata)
  return (
    <View style={{ minHeight: 0 }}>
      <Text style={{ marginLeft: 20, fontSize: 20, textTransform: 'capitalize', fontFamily: 'Alegreya_700Bold', marginTop: 5 }}>Search for "{word}" </Text>

      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <FlatList
          // horizontal
          keyExtractor={(item, index) => index.toString()}
          data={fildata}
          numColumns={2}
          showsHorizontalScrollIndicator={false}

          renderItem={(element) => {
            return <TouchableHighlight style={[styles.cathcardpn]} underlayColor="whitesmoke" activeOpacity={0.9} onPress={() => navigation.navigate('Detail', element?.item)}  >
              <View >

                <Image
                  source={{
                    uri: element?.item?.productimg
                  }}
                  style={{ height: undefined, width: '100%', aspectRatio: 1, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                />
                <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', marginLeft: 2 }}>
                  <Text style={{ fontSize: 16, fontFamily: 'Alegreya_700Bold', marginTop: 2 }}>{element?.item?.name?.slice(0, 15)}</Text>
                  <Text style={{ fontSize: 13, color: 'grey',fontFamily:'Alegreya_400Regular', marginTop: 1 }}>{element?.item?.cath}</Text>
                  <Text style={{ fontSize: 16, color: 'black', fontFamily: 'Alegreya_700Bold', marginTop: 1 }}>₹ {element?.item?.price}</Text>
                </View>

              </View>
            </TouchableHighlight>
          }}
        />


      </View>

    </View>
  )
}

const Homescreen = () => {
  const [word, setword] = useState()
  const [sword, setsword] = useState()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProduct())
  }, [])
  const product = useSelector(state => state.product)
  const user = useSelector(state => state?.normal?.user)

  // console.log('all', product)

  useEffect(() => {
    dispatch(loadNormalUser())
  }, [])
  console.log('wwd', user?.name)
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
    return <AppLoading />;
  } else {

  return (
    <SafeAreaView>
      {/* <ScrollView> */}
      {
        product.length > 0 ?
          <View>




            {
              word === "" || sword === undefined || sword === [] ?
                <ScrollView>
                  <View style={{backgroundColor:'FEFEFE'}}>
                    <Heading user={user} />
                    {/* <Input word={(d) => setword(d)} click={(d) => setword("")} /> */}
                    <Cath />
                    <Popular head="Most Popular" pdata={product} name="popular" />
                    <Popular head="Special Offer" pdata={product} name="special" />
                    <Popular head="Chef Special" pdata={product} name="chef" />
                  </View>
                </ScrollView>
                : null
            }
            {/* </ScrollView> */}
            {
              word ?
                <View>
                  <Heading user={user} />
                  <Input word={(d) => setword(d)} sword={word} click={(d) => setword("")} />
                  <Popularnew word={word} pdata={product} sdata={(d) => setsword(d)} />
                </View>
                : null
            }


          </View>
          :
          <View style={{ height: height, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="orange" />
          </View>

      }

      {/* </ScrollView> */}
    </SafeAreaView>

  )
    }
}

export default Homescreen

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
    elevation: 1


  },
  cathcardp: {
    padding: 7,
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    width: 140,
    height: 200,
    borderRadius: 8,
    elevation: 1



  },
  // pdiv: {

  // },
  // spdiv: {
  //   width:'60%'
  // },
  cathcard1: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',



  },
  shadowProp: {
    shadowColor: 'black',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    // borderColor:'#000',
    // borderWidth:2
  },
  hdiv: {
    marginLeft: 15,
    marginTop: 15
  },
  htext1: {
    fontSize: 18,
    fontStyle: 'italic',
    letterSpacing: 1,
    fontFamily: 'Alegreya_400Regular'
  },
  htext2: {
    fontSize: 23,
    fontWeight: "600",
    letterSpacing: 1,
    marginTop: 2,
    fontFamily: 'Alegreya_400Regular'
  },
  htext3: {
    fontSize: 35,
    letterSpacing: 1,
    // fontWeight: 'bold',
    marginTop: 0,
    // fontFamily: 'notoserif',
    fontFamily: 'Alegreya_700Bold'


  },
  cathcardpn: {
    padding: 10,
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    width: cardwidth,
    minHeight: 220,
    borderRadius: 12,
    elevation: 13



  }
})