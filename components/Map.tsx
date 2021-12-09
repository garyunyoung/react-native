import React from 'react'
import MapViewDirections from 'react-native-maps-directions'
import MapView, {
  PROVIDER_GOOGLE,
  Marker
} from 'react-native-maps'

import { GOOGLE_API_KEY } from '../constants/constants'
import { styles } from '../styles/MapStyle'

export default function Map({
  locations,
  mapRegion,
  setOptimalRoute,
  isDirectionsVisible
}: any) {
  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      provider={PROVIDER_GOOGLE}
    >
      {isDirectionsVisible ? (
        <MapDirections
          locations={locations}
          setOptimalRoute={setOptimalRoute}
        />
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

function MapDirections({
  locations,
  setOptimalRoute
}: any) {
  const coordinates = locations.map(
    (location: any) => location.coordinates
  )

  const origin = coordinates[0]
  const waypoints = coordinates.slice(1)

  function setWaypoints(waypointOrder: number[][]) {
    let result = [locations[0]]

    for (let wayPoint of waypointOrder[0]) {
      result.push(locations[wayPoint + 1])
    }

    setOptimalRoute(result)
  }

  return (
    <MapViewDirections
      origin={origin}
      waypoints={waypoints}
      destination={origin}
      apikey={GOOGLE_API_KEY}
      optimizeWaypoints={true}
      onReady={({ waypointOrder }) => {
        setWaypoints(waypointOrder)
      }}
      lineDashPattern={[0]}
      strokeWidth={2}
      strokeColor="black"
    />
  )
}
