import React from 'react'
import { StatusBar as ExpoStatusBar } from 'expo-status-bar'

import {
  Platform,
  StyleSheet,
  SafeAreaView,
  Text,
  StatusBar
} from 'react-native'

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>HomeScreen!</Text>
      <ExpoStatusBar style="auto" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop:
      Platform.OS === 'android'
        ? StatusBar.currentHeight
        : 0
  }
})
