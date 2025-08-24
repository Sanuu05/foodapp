import { FlatList, StyleSheet, Text, View, TouchableHighlight, Image, ScrollView, TextInput, Dimensions,ActivityIndicator, LinearGradient, Platform } from 'react-native'
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
import * as SplashScreen from 'expo-splash-screen';
const { width, height } = Dimensions.get('screen')
const cardwidth = width / 2 - 30;

const category = [
  {
    name: "Starters",
    icon: require('../assets/kebab.png'),
    key: 'starters',
    color: '#FF6B6B'
  },
  {
    name: "Main Course",
    icon: require('../assets/biri1.png'),
    key: 'main course',
    color: '#4ECDC4'
  },
  {
    name: "Dessert",
    icon: require('../assets/ice.png'),
    key: 'dessert',
    color: '#FF9FF3'
  },
  {
    name: "Beverages",
    icon: require('../assets/drinks.png'),
    key: 'beverages',
    color: '#54A0FF'
  }
]
const greet = new Date().getHours() < 12 ? 'Good morning' : new Date().getHours() < 18 ? 'Good afternoon' : 'Good evening'
const Cath = () => {
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
          return (
            <TouchableHighlight 
              style={[styles.cathcard, styles.modernShadow]} 
              underlayColor="transparent" 
              activeOpacity={0.8} 
              onPress={() => navigation.navigate('Cath', element.item?.key)}
            >
              <View style={styles.cathcard1}>
                <View style={[styles.iconContainer, { backgroundColor: element.item.color + '25' }]}>
                  <Image
                    source={element.item.icon}
                    style={styles.categoryIcon}
                  />
                </View>
                <Text style={styles.categoryText}>{element.item?.name}</Text>
              </View>
            </TouchableHighlight>
          )
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
  
  return (
    <View style={styles.popularContainer}>
      <Text style={styles.popularTitle}>{head}</Text>
      {
        pdata ? (
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={fildata[0].d}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.popularList}
            ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
            renderItem={(element) => {
              return (
                <TouchableHighlight 
                  style={[styles.cathcardp, styles.modernShadow]} 
                  underlayColor="transparent" 
                  activeOpacity={0.8} 
                  onPress={() => navigation.navigate('Detail', element.item)}
                >
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
                </TouchableHighlight>
              )
            }}
          />
        ) : (
          <ActivityIndicator size="large" color="#FF6B6B" />
        )
      }
    </View>
  )
}

const Input = ({ word, sword, click }) => {
  const navigation = useNavigation()
  return (
    <View style={styles.searchContainer}>
      <View style={[styles.searchBox, styles.modernShadow]}>
        <Icon name='search' size={24} color="#FF6B6B" style={styles.searchIcon} />
        <TextInput 
          placeholder='Search delicious food...' 
          placeholderTextColor="#999"
          value={sword} 
          style={styles.searchInput} 
          onChangeText={word} 
          onPressIn={()=>navigation.navigate('Search')} 
        />
        {
          sword ? (
            <TouchableHighlight onPress={click} underlayColor="transparent">
              <Icon name='close' size={24} color="#FF6B6B" />
            </TouchableHighlight>
          ) : null
        }
      </View>
    </View>
  )
}

const Heading = ({ user }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>
          {user?.name ? `${greet} ${user?.name}` : greet}
        </Text>
        <Text style={styles.subtitleText}>Grab your</Text>
        <Text style={styles.mainTitle}>delicious food!</Text>
      </View>
      <View style={styles.headerDecoration}>
        <View style={styles.decorationCircle} />
        <View style={[styles.decorationCircle, styles.decorationCircle2]} />
      </View>
    </View>
  )
}

const Popularnew = ({ head, data, word, sdata, pdata }) => {
  const [list, setlist] = useState()
  const [fildata, setfildata] = useState()
  const navigation = useNavigation()

  useEffect(() => {
    if (pdata && word !== "") {
      const newlist = pdata.filter((con) => {
        return Object.values(con).join(" ").toLowerCase().includes(word?.toLowerCase())
      })
      setfildata(newlist)
      sdata(newlist)
    }
  }, [word, pdata])

  return (
    <View style={styles.searchResultsContainer}>
      <Text style={styles.searchResultsTitle}>Search for "{word}"</Text>
      <View style={styles.searchResultsGrid}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={fildata}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.searchResultsList}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          renderItem={(element) => {
            return (
              <TouchableHighlight 
                style={[styles.cathcardpn, styles.modernShadow]} 
                underlayColor="transparent" 
                activeOpacity={0.8} 
                onPress={() => navigation.navigate('Detail', element?.item)}
              >
                <View style={styles.searchProductCard}>
                  <Image
                    source={{
                      uri: element?.item?.productimg
                    }}
                    style={styles.searchProductImage}
                  />
                  <View style={styles.searchProductInfo}>
                    <Text style={styles.searchProductName}>{element?.item?.name?.slice(0, 15)}</Text>
                    <Text style={styles.searchProductCategory}>{element?.item?.cath}</Text>
                    <View style={styles.searchPriceContainer}>
                      <Text style={styles.searchPriceText}>₹ {element?.item?.price}</Text>
                      <View style={styles.searchAddButton}>
                        <Icon name="add" size={16} color="white" />
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableHighlight>
            )
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

  useEffect(() => {
    dispatch(loadNormalUser())
  }, [])

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
      <SafeAreaView style={styles.container}>
        {product.length > 0 ? (
          <View style={styles.mainContainer}>
            {word === "" || sword === undefined || sword.length === 0 ? (
              <ScrollView 
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
              >
                <View style={styles.contentContainer}>
                  <Heading user={user} />
                  <Cath />
                  <Popular head="🔥 Most Popular" pdata={product} name="popular" />
                  <Popular head="🎉 Special Offer" pdata={product} name="special" />
                  <Popular head="👨‍🍳 Chef Special" pdata={product} name="chef" />
                </View>
              </ScrollView>
            ) : null}
            
            {word ? (
              <View style={styles.searchView}>
                <Heading user={user} />
                <Input word={(d) => setword(d)} sword={word} click={(d) => setword("")} />
                <Popularnew word={word} pdata={product} sdata={(d) => setsword(d)} />
              </View>
            ) : null}
          </View>
        ) : (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF6B6B" />
            <Text style={styles.loadingText}>Loading delicious food...</Text>
          </View>
        )}
      </SafeAreaView>
    )
  }
}

export default Homescreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  mainContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  contentContainer: {
    backgroundColor: '#F8F9FA',
    paddingBottom: 20,
  },
  searchView: {
    flex: 1,
  },
  loadingContainer: {
    height: height,
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
  
  // Header Styles
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 35,
    backgroundColor: 'white',
    marginBottom: 15,
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
        elevation: 12,
      },
    }),
  },
  greetingContainer: {
    flex: 1,
  },
  greetingText: {
    fontSize: 18,
    color: '#666',
    fontFamily: 'Alegreya_400Regular',
    marginBottom: 8,
  },
  userName: {
    fontFamily: 'Alegreya_700Bold',
    color: '#FF6B6B',
  },
  subtitleText: {
    fontSize: 22,
    color: '#333',
    fontFamily: 'Alegreya_500Medium',
    marginBottom: 4,
  },
  mainTitle: {
    fontSize: 36,
    color: '#FF6B6B',
    fontFamily: 'Alegreya_700Bold',
    fontWeight: 'bold',
  },
  headerDecoration: {
    position: 'relative',
    width: 80,
    height: 80,
  },
  decorationCircle: {
    position: 'absolute',
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#FF6B6B',
    opacity: 0.15,
    top: 8,
    right: 8,
  },
  decorationCircle2: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#4ECDC4',
    opacity: 0.12,
    top: 22,
    right: 22,
  },

  // Category Styles
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
    // paddingHorizontal: 20,
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

  // Popular Styles
  popularContainer: {
    marginBottom: 35,
    paddingTop: 5,
  },
  popularTitle: {
    marginLeft: 20,
    fontSize: 24,
    fontFamily: 'Alegreya_700Bold',
    color: '#333',
    marginBottom: 20,
  },
  popularList: {
    // paddingHorizontal: 20,
    paddingVertical: 10,
  },
  cathcardp: {
    padding: 0,
    marginHorizontal: 12,
    backgroundColor: 'white',
    width: 150,
    height: 200,
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
    // marginBottom: 4,
  },
  productCategory: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'Alegreya_400Regular',
    // marginBottom: 8,
  },
  priceContainer: {
    // backgroundColor: 'red',
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

  // Search Styles
  searchContainer: {
    marginVertical: 15,
    paddingHorizontal: 20,
  },
  searchBox: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 15,
    borderRadius: 30,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Alegreya_400Regular',
    color: '#333',
  },

  // Search Results Styles
  searchResultsContainer: {
    flex: 1,
  },
  searchResultsTitle: {
    marginLeft: 20,
    fontSize: 20,
    fontFamily: 'Alegreya_700Bold',
    color: '#333',
    marginBottom: 15,
  },
  searchResultsGrid: {
    flex: 1,
  },
  searchResultsList: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  cathcardpn: {
    padding: 0,
    marginHorizontal: 8,
    marginVertical: 12,
    backgroundColor: 'white',
    width: cardwidth,
    height: 220,
    borderRadius: 20,
    overflow: 'hidden',
  },
  searchProductCard: {
    flex: 1,
  },
  searchProductImage: {
    height: 120,
    width: '100%',
    resizeMode: 'cover',
  },
  searchProductInfo: {
    padding: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  searchProductName: {
    fontSize: 13,
    fontFamily: 'Alegreya_700Bold',
    color: '#333',
    marginBottom: 3,
  },
  searchProductCategory: {
    fontSize: 11,
    color: '#999',
    fontFamily: 'Alegreya_400Regular',
    marginBottom: 6,
  },
  searchPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchPriceText: {
    fontSize: 15,
    color: '#FF6B6B',
    fontFamily: 'Alegreya_700Bold',
    fontWeight: 'bold',
  },
  searchAddButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Modern Shadow
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
  },
})