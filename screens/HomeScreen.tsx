import React, { useState } from 'react'
import { StatusBar as ExpoStatusBar } from 'expo-status-bar'
import { View } from 'react-native'

import Map from '../components/Map'
import SearchBar from '../components/SearchBar'
import Destinations from '../components/Destinations'

import CONSTANTS from '../variables/constants'
import { styles } from '../styles/HomeScreenStyle'

export default function HomeScreen() {
  const [locations, setLocations] = useState([])
  const [mapRegion, setMapRegion] = useState(
    CONSTANTS.AUCKLAND_MAP_REGION
  )
  const [isDirectionsVisible, setIsDirectionsVisible] =
    useState(false)

  return (
    <View style={styles.container}>
      <Map
        locations={locations}
        mapRegion={mapRegion}
        isDirectionsVisible={isDirectionsVisible}
      />
      <SearchBar
        locations={locations}
        setLocations={setLocations}
        setMapRegion={setMapRegion}
      />
      <Destinations
        locations={locations}
        setLocations={setLocations}
        isDirectionsVisible={isDirectionsVisible}
        setIsDirectionsVisible={setIsDirectionsVisible}
      />
      <ExpoStatusBar style="auto" />
    </View>
  )
}
