// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, FlatList } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homescreen from './component/Homescreen';
import Bottomnav from './component/Bottomnav';
import Welcome from './component/Welcome';
import Detail from './component/Detail';
import Cart from './component/Cart';
import Cath from './component/Cath';
import Search from './component/Search';
import {Provider, useDispatch} from 'react-redux';
import { createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import Login from './component/Login';
import Razopay from './component/Razopay';
import {StripeProvider} from '@stripe/stripe-react-native'
import Myorder from './component/Myorder';
import Orderd from './component/Orderd';
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
import Track from './component/Track';



const store = createStore(reducers, compose(applyMiddleware(thunk)))

const Stack = createNativeStackNavigator();

export default function App() {
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
    <Provider store={store}>
      <StripeProvider publishableKey='pk_test_51IAFjHFZnHGlURw8dYebYcJacHakNRkwXjksn3HBKS893bIrXYU5jYsQCto4xe8iVvD8QoMj5BUKoW58pkeSnfSh008Z2vxn88'   >
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} options={{
          headerShown:false
        }} />
        <Stack.Screen name="Bottom" component={Bottomnav} options={{
          headerShown:false
        }} />
        <Stack.Screen name="Detail" component={Detail} options={{
          headerShown:true
        }} />
         <Stack.Screen name="Cath" component={Cath} options={{
          headerShown:true,
          title:'Category'
        }} />
         {/* <Stack.Screen name="Search" component={Search} options={{
          headerShown:true,
          title:'Search'
        }} /> */}
         <Stack.Screen name="Myorder" component={Myorder} options={{
          headerShown:true,
          title:'My Orders'
        }} />
        <Stack.Screen name="Myorderd" component={Orderd} options={{
          headerShown:true,
          title:'Order Details'
        }} />
            <Stack.Screen name="Login" component={Login} options={{
          headerShown:false,
          title:'Search'
        }} />
         <Stack.Screen name="Razo" component={Razopay} options={{
          headerShown:false,
          title:'Search'
        }} />
        <Stack.Screen name="Track" component={Track} options={{
          headerShown:true,
          title:''
        }} />
      </Stack.Navigator>
    </NavigationContainer>
    </StripeProvider>
  
    </Provider>
  );
      }
}

const styles = StyleSheet.create({

});
