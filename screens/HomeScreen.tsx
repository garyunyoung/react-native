import React, { useState } from 'react'
import { StatusBar as ExpoStatusBar } from 'expo-status-bar'
import { View } from 'react-native'

import Map from '../components/Map'
import SearchBar from '../components/SearchBar'
import Destinations from '../components/Destinations'

import { styles } from '../styles/HomeScreenStyle'

export default function HomeScreen() {
  const aucklandMapRegion = {
    latitude: -36.848461,
    longitude: 174.763336,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }

  const [locations, setLocations] = useState([])
  const [mapRegion, setMapRegion] = useState(
    aucklandMapRegion
  )
  const [isDirectionsVisible, setIsDirectionsVisible] =
    useState(false)

  const locationsCoordinates = locations.map(
    (location: any) => location.coordinates
  )

  return (
    <View style={styles.container}>
      <Map
        locations={locations}
        mapRegion={mapRegion}
        locationsCoordinates={locationsCoordinates}
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
        locationsCoordinates={locationsCoordinates}
        isDirectionsVisible={isDirectionsVisible}
        setIsDirectionsVisible={setIsDirectionsVisible}
      />
      <ExpoStatusBar style="auto" />
    </View>
  )
}
