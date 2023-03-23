import { StyleSheet, Text, View, FlatList, TouchableHighlight, Image, TextInput, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../action/product';
import { SafeAreaView } from 'react-native-safe-area-context';
const { width } = Dimensions.get('screen')
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

const Cathn = () => {
  const navigation = useNavigation()
  return (
    <View>
      <Text style={{ marginLeft: 15, fontSize: 19, fontWeight: 'bold', marginTop: 5 }}>Explore Categories</Text>
      <FlatList
        horizontal
        keyExtractor={(item, index) => index.toString()}
        data={category}
        renderItem={(element) => {
          return <TouchableHighlight style={[styles.cathcard, styles.shadowProp]} underlayColor="orange" activeOpacity={0.9} onPress={() => navigation.navigate('Cath', element.item?.key)} >
            <View style={[styles.cathcard1]} >
              {/* <Icon name={element.item.icon} size={50} color="orange" /> */}
              <Image
                source={element.item.icon}
                style={{ height: 60, width: 60, resizeMode: 'contain' }}
              />
              <Text style={{ fontSize: 13, fontWeight: 'bold', marginTop: 2 }}>{element.item?.name}</Text>
            </View>
          </TouchableHighlight>
        }}
      />
    </View>
  )
}
const Input = ({ word, sword, click }) => {
  // console.log('ss',sword)
  const navigation = useNavigation()
  return (
    <View style={{ marginVertical: 20 }} >
      <View style={{ backgroundColor: 'white', elevation: 4, display: 'flex', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 8, marginHorizontal: 15 }} >
        <TextInput placeholder='Search' value={sword} style={{ flex: 1 }} onChangeText={word} onPressIn={() => navigation.navigate('Search')} />
        {
          sword ? <Icon name='close' size={25} color="orange" onPress={click} /> : <Icon name='search' size={25} color="orange" />
        }

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
      const data = await fetch('https://cautious-dog-swimsuit.cyclic.app/product/get')
      const res = await data.json()
      setlist(res)


    } catch (error) {

    }

  }
  const navigation = useNavigation()

  const fildata = list?.filter(p => p?.cath === data)
  console.log('dd', fildata)
  return (
    <View style={{ minHeight: 0 }}>
      <Text style={{ marginLeft: 20, fontSize: 25, textTransform: 'capitalize', fontWeight: 'bold', marginTop: 5 }}>{data} </Text>

      <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        <FlatList

          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          data={fildata}

          renderItem={(element) => {
            return <TouchableHighlight style={[styles.cathcardp, styles.shadowProp]} underlayColor="whitesmoke" activeOpacity={0.9} onPress={() => navigation.navigate('Detail', element.item)}  >
              <View >

                <Image
                  source={{
                    uri: element.item.productimg
                  }}
                  style={{ height: undefined, width: '100%', aspectRatio: 1, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                />
                <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', marginLeft: 2 }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 2 }}>{element.item?.name?.slice(0, 15)}</Text>
                  <Text style={{ fontSize: 13, color: 'grey', marginTop: 1 }}>{element.item?.cath}</Text>
                  <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold', marginTop: 1 }}>₹ {element.item?.price}</Text>
                </View>

              </View>
            </TouchableHighlight>
          }}
        />
      </View>

    </View>
  )
}
const Cath = () => {
  const navigation = useNavigation()
  return (
    <View>
      <Text style={{ marginLeft: 18, fontSize: 24, marginTop: 5, fontFamily: 'Alegreya_700Bold' }}>Explore Categories</Text>
      <FlatList
        // horizontal
        keyExtractor={(item, index) => index.toString()}
        data={category}
        showsHorizontalScrollIndicator={false}
        numColumns={2}
        contentContainerStyle={{ display: 'flex', alignItems: 'center' }}
        renderItem={(element) => {
          return <TouchableHighlight style={[styles.cathcard, styles.shadowProp]} underlayColor="orange" activeOpacity={0.9} onPress={() => navigation.navigate('Cath', element.item?.key)} >
            <View style={[styles.cathcard1]} >
              {/* <Icon name={element.item.icon} size={50} color="orange" /> */}
              <Image
                source={element.item.icon}
                style={{ height: 90, width: 90, resizeMode: 'contain' }}
              />
              <Text style={{ fontSize: 17, fontFamily: 'Alegreya_700Bold', marginTop: 2, textAlign: 'center' }}>{element.item?.name}</Text>
            </View>
          </TouchableHighlight>
        }}
      />
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
          contentContainerStyle={{paddingBottom:400,alignItems:'center'}}

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
                  <Text style={{ fontSize: 13, color: 'grey', fontFamily: 'Alegreya_400Regular', marginTop: 1 }}>{element?.item?.cath}</Text>
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
const Search = (props) => {
  // console.log('props', props.route?.params)
  const [word, setword] = useState()
  const [sword, setsword] = useState()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProduct())
  }, [])
  const product = useSelector(state => state.product)

  return (
    // <ScrollView>
    <SafeAreaView>
      <View>

        {/* <Cathn /> */}
        <Input word={(d) => setword(d)} sword={word} click={(d) => setword("")} />
        {/* <Popular data={props.route?.params} /> */}
        {
          word ?

              <Popularnew word={word} pdata={product} sdata={(d) => setsword(d)} />
     
            : null
        }
        {
          word ? null :
            <Cath />
        }
      </View>
    </SafeAreaView>
    // </ScrollView>
  )
}

export default Search

const styles = StyleSheet.create({
  cathcard: {
    padding: 10,
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: cardwidth,
    height: 140,
    borderRadius: 8,
    elevation: 2


  },
  cathcardp: {
    padding: 10,
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    width: cardwidth,
    height: 220,
    borderRadius: 12,
    elevation: 2



  },
  cathcardpn: {
    padding: 10,
    marginHorizontal: 10,
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
    elevation: 2



  }
})