import React from 'react'
import MapView, {
  PROVIDER_GOOGLE,
  Marker
} from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'

import CONSTANTS from '../variables/constants'
import { styles } from '../styles/HomeScreenStyle'

export default function Map({
  locations,
  mapRegion,
  isDirectionsVisible
}) {
  return (
    <MapView
      style={styles.map}
      initialRegion={mapRegion}
      provider={PROVIDER_GOOGLE}
    >
      {isDirectionsVisible ? (
        <MapDirections locations={locations} />
      ) : null}

      {locations.map((address: any, index: number) => (
        <Marker
          key={index}
          coordinate={address.coordinates}
          title={address.address}
        />
      ))}
    </MapView>
  )
}

function MapDirections({ locations }) {
  const coordinates = locations.map(
    (location: any) => location.coordinates
  )

  // TO DO: Test conditionals
  const origin = coordinates[0]
  const destination =
    coordinates.length === 2 ? coordinates[1] : origin

  const waypoints = coordinates.slice(1, -1)

  return (
    <MapViewDirections
      origin={origin}
      waypoints={waypoints}
      destination={destination}
      apikey={CONSTANTS.GOOGLE_PLACES_API_KEY}
      // optimizeWaypoints={true}
      onReady={({ distance, duration }) => {
        console.log(`Distance: ${distance} km`)
        console.log(`Duration: ${duration} min.`)
        // console.log(`Waypoint: ${result.waypointOrder}.`)
      }}
    />
  )
}
