import React from 'react'
import { View, ActivityIndicator, Text, StyleSheet, Dimensions } from 'react-native'
import {
  useFonts,
  Alegreya_400Regular,
  Alegreya_700Bold,
} from '@expo-google-fonts/alegreya'

const { width, height } = Dimensions.get('screen')

const LoadingSpinner = ({ 
  size = 'large', 
  color = '#FF6B6B', 
  text = 'Loading...', 
  fullScreen = false,
  backgroundColor = 'transparent' 
}) => {
  let [fontsLoaded] = useFonts({
    Alegreya_400Regular,
    Alegreya_700Bold,
  })

  if (!fontsLoaded) {
    return (
      <View style={[styles.container, fullScreen && styles.fullScreen, { backgroundColor }]}>
        <ActivityIndicator size={size} color={color} />
      </View>
    )
  }

  return (
    <View style={[styles.container, fullScreen && styles.fullScreen, { backgroundColor }]}>
      <ActivityIndicator size={size} color={color} />
      {text && (
        <Text style={[styles.loadingText, { color: color === '#FF6B6B' ? '#666' : color }]}>
          {text}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(248, 249, 250, 0.9)',
    zIndex: 1000,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    fontFamily: 'Alegreya_400Regular',
    textAlign: 'center',
  },
})

export default LoadingSpinner
