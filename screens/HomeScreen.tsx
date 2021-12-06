import React from 'react'
import { StatusBar } from 'expo-status-bar'

import { StyleSheet, View, Text } from 'react-native'

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>HomeScreen!</Text>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
})
