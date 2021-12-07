import React, { useState } from 'react'

import { StatusBar as ExpoStatusBar } from 'expo-status-bar'

import { View } from 'react-native'

import Map from '../components/Map'
import SearchBar from '../components/SearchBar'
import Destinations from '../components/Destinations'

import { styles } from '../styles/HomeScreenStyle'

export default function HomeScreen() {
  const [addressess, setAddresses] = useState([])
  const [mapRegion, setMapRegion] = useState({
    latitude: -36.848461,
    longitude: 174.763336,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })
  const [showDirections, setShowDirections] =
    useState(false)

  const directions = addressess.map(
    (address: any) => address.coordinates
  )

  return (
    <View style={styles.container}>
      <Map
        mapRegion={mapRegion}
        showDirections={showDirections}
        directions={directions}
        addressess={addressess}
      />
      <SearchBar
        addressess={addressess}
        setAddresses={setAddresses}
        setMapRegion={setMapRegion}
      />
      <Destinations
        addressess={addressess}
        setAddresses={setAddresses}
        directions={directions}
        showDirections={showDirections}
        setShowDirections={setShowDirections}
      />
      <ExpoStatusBar style="auto" />
    </View>
  )
}
