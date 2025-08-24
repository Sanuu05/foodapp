import { StyleSheet, Text, View, FlatList, TouchableHighlight, Image, TextInput, ScrollView, Dimensions, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../action/product';
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

// Search Input Component
const SearchInput = ({ word, sword, click }) => {
  const navigation = useNavigation()
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchBox}>
        <Icon name='search' size={24} color="#FF6B6B" style={styles.searchIcon} />
        <TextInput 
          placeholder='Search delicious food...' 
          placeholderTextColor="#999"
          value={sword} 
          style={styles.searchInput} 
          onChangeText={word} 
          onPressIn={() => navigation.navigate('Search')} 
        />
        {sword ? (
          <TouchableHighlight onPress={click} underlayColor="transparent">
            <Icon name='close' size={24} color="#FF6B6B" />
          </TouchableHighlight>
        ) : null}
      </View>
    </View>
  )
}

// Category Grid Component
const CategoryGrid = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>Explore Categories</Text>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={category}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={{ gap: 10 }}
        contentContainerStyle={styles.categoryGrid}
        renderItem={(element) => {
          return (
            <TouchableHighlight 
              style={[styles.categoryCard, styles.modernShadow]} 
              underlayColor="transparent" 
              activeOpacity={0.8} 
              onPress={() => navigation.navigate('Cath', element.item?.key)}
            >
              <View style={styles.categoryCardContent}>
                <View style={[styles.categoryIconContainer, { backgroundColor: element.item.color + '25' }]}>
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

// Search Results Component
const SearchResults = ({ word, pdata, sdata }) => {
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
                style={[styles.searchProductCard, styles.modernShadow]} 
                underlayColor="transparent" 
                activeOpacity={0.8} 
                onPress={() => navigation.navigate('Detail', element?.item)}
              >
                <View style={styles.productCard}>
                  <Image
                    source={{
                      uri: element?.item?.productimg
                    }}
                    style={styles.productImage}
                  />
                  <View style={styles.productInfo}>
                    <Text style={styles.productName}>{element?.item?.name?.slice(0, 15)}</Text>
                    <Text style={styles.productCategory}>{element?.item?.cath}</Text>
                    <View style={styles.priceContainer}>
                      <Text style={styles.priceText}>₹{element?.item?.price}</Text>
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
      </View>
    </View>
  )
}

const Search = (props) => {
  const [word, setword] = useState()
  const [sword, setsword] = useState()
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getProduct())
  }, [])
  
  const product = useSelector(state => state.product)

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
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Search</Text>
          <Text style={styles.headerSubtitle}>Find your favorite dishes</Text>
        </View>

        {/* Search Input */}
        <SearchInput 
          word={(d) => setword(d)} 
          sword={word} 
          click={(d) => setword("")} 
        />

        {/* Content */}
        {word ? (
          <SearchResults 
            word={word} 
            pdata={product} 
            sdata={(d) => setsword(d)} 
          />
        ) : (
          <CategoryGrid />
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  
  // Header Styles
  header: {
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 15,
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
  headerTitle: {
    fontSize: 32,
    fontFamily: 'Alegreya_800ExtraBold',
    color: '#333',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Alegreya_400Regular',
    color: '#666',
  },
  
  // Search Styles
  searchContainer: {
    marginVertical: 15,
    paddingHorizontal: 25,
  },
  searchBox: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 15,
    borderRadius: 25,
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
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Alegreya_400Regular',
    color: '#333',
  },
  
  // Category Styles
  categoryContainer: {
    paddingHorizontal: 25,
  },
  categoryTitle: {
    fontSize: 24,
    fontFamily: 'Alegreya_700Bold',
    color: '#333',
    marginBottom: 20,
  },
  categoryGrid: {
    paddingBottom: 20,
  },
  categoryCard: {
    backgroundColor: 'white',
    width: cardwidth,
    height: 160,
    borderRadius: 20,
    // marginHorizontal: 8,
    marginVertical: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryCardContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  categoryIcon: {
    height: 35,
    width: 35,
    resizeMode: 'contain',
  },
  categoryText: {
    fontSize: 16,
    fontFamily: 'Alegreya_700Bold',
    color: '#333',
    textAlign: 'center',
  },
  
  // Search Results Styles
  searchResultsContainer: {
    flex: 1,
    paddingHorizontal: 25,
  },
  searchResultsTitle: {
    fontSize: 20,
    fontFamily: 'Alegreya_700Bold',
    color: '#333',
    marginBottom: 15,
  },
  searchResultsGrid: {
    flex: 1,
  },
  searchResultsList: {
    paddingBottom: 20,
  },
  searchProductCard: {
    backgroundColor: 'white',
    width: cardwidth - 10,
    height: 240,
    borderRadius: 20,
    marginHorizontal: 8,
    marginVertical: 12,
    overflow: 'hidden',
  },
  productCard: {
    flex: 1,
  },
  productImage: {
    height: 140,
    width: '100%',
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 15,
    flex: 1,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 16,
    fontFamily: 'Alegreya_700Bold',
    color: '#333',
    // marginBottom: 4,
  },
  productCategory: {
    fontSize: 14,
    color: '#999',
    fontFamily: 'Alegreya_400Regular',
    // marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 18,
    color: '#FF6B6B',
    fontFamily: 'Alegreya_700Bold',
    fontWeight: 'bold',
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
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