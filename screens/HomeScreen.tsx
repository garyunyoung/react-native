import React from 'react'
import { StatusBar as ExpoStatusBar } from 'expo-status-bar'

import CONSTANTS from '../variables/constants'
import { height, width } from '../variables/theme'

import {
  Platform,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  StatusBar
} from 'react-native'

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.map}>
        <Text>Map</Text>
      </View>
      <ExpoStatusBar style="auto" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop:
      Platform.OS === CONSTANTS.android
        ? StatusBar.currentHeight
        : 0
  },
  map: {
    height: height * 0.5,
    backgroundColor: 'lightblue'
  }
})
