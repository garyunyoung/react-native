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
}: any) {
  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      provider={PROVIDER_GOOGLE}
    >
      {isDirectionsVisible ? (
        <MapDirections locations={locations} />
      ) : null}

      {locations.map((location: any, index: number) => (
        <Marker
          key={index}
          coordinate={location.coordinates}
          title={location.location}
        />
      ))}
    </MapView>
  )
}

function MapDirections({ locations }: any) {
  const coordinates = locations.map(
    (location: any) => location.coordinates
  )

  const origin = coordinates[0]
  const waypoints = coordinates.slice(1)

  return (
    <MapViewDirections
      origin={origin}
      waypoints={waypoints}
      destination={origin}
      apikey={CONSTANTS.GOOGLE_API_KEY}
      // optimizeWaypoints={true}
      onReady={({ distance, duration }) => {
        console.log(`Distance: ${distance} km`)
        console.log(`Duration: ${duration} min.`)
        // console.log(`Waypoint: ${result.waypointOrder}.`)
      }}
    />
  )
}
