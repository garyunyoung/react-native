import React from 'react'

import MapView, {
  PROVIDER_GOOGLE,
  Marker
} from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'

import CONSTANTS from '../variables/constants'
import { styles } from '../styles/HomeScreenStyle'

export default function Map(props: any) {
  return (
    <MapView
      style={styles.map}
      initialRegion={props.mapRegion}
      provider={PROVIDER_GOOGLE}
    >
      {props.showDirections ? (
        <Directions directions={props.directions} />
      ) : null}

      {props.addressess.map(
        (address: any, index: number) => (
          <Marker
            key={index}
            coordinate={address.coordinates}
            title={address.streetAddress}
          />
        )
      )}
    </MapView>
  )
}

function Directions(props: any) {
  const origin = props.directions[0]
  const waypoints = props.directions.slice(1, -1)

  return (
    <MapViewDirections
      origin={origin}
      waypoints={waypoints}
      destination={origin}
      apikey={CONSTANTS.GOOGLE_PLACES_API_KEY}
      optimizeWaypoints={true}
      onReady={(result) => {
        console.log(`Distance: ${result.distance} km`)
        console.log(`Duration: ${result.duration} min.`)
        console.log(`Waypoint: ${result.waypointOrder}.`)
      }}
    />
  )
}
