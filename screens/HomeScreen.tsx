import React, { useState } from 'react'
import { StatusBar as ExpoStatusBar } from 'expo-status-bar'
import { View } from 'react-native'

import Map from '../components/Map'
import SearchBar from '../components/SearchBar'
import Destinations from '../components/Destinations'
import Directions from '../components/Directions'

import { AUCKLAND_MAP_REGION } from '../variables/constants'
import { styles } from '../styles/HomeScreenStyle'

export default function HomeScreen() {
  const [locations, setLocations] = useState([])
  const [mapRegion, setMapRegion] = useState(
    AUCKLAND_MAP_REGION
  )

  const [isDirectionsVisible, setIsDirectionsVisible] =
    useState(false)

  const [isKeyboardVisible, setIsKeyboardVisible] =
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
        isKeyboardVisible={isKeyboardVisible}
        setIsKeyboardVisible={setIsKeyboardVisible}
      />

      {isDirectionsVisible ? (
        <Directions
          locations={locations}
          setIsDirectionsVisible={setIsDirectionsVisible}
        />
      ) : (
        <Destinations
          locations={locations}
          setLocations={setLocations}
          setMapRegion={setMapRegion}
          setIsDirectionsVisible={setIsDirectionsVisible}
        />
      )}

      <ExpoStatusBar style="auto" />
    </View>
  )
}
