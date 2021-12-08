import React from 'react'
import {
  View,
  Text,
  FlatList,
  Alert,
  TouchableOpacity
} from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'

import {
  LOCATIONS_LIMIT_MIN,
  AUCKLAND_MAP_REGION
} from '../variables/constants'

import { styles } from '../styles/Destinations'

export default function Destinations({
  locations,
  setLocations,
  setMapRegion,
  setIsDirectionsVisible
}: any) {
  const notEnoughLocations =
    locations.length < LOCATIONS_LIMIT_MIN

  const showDirections = () =>
    notEnoughLocations
      ? triggerAlert()
      : setIsDirectionsVisible(true)

  return (
    <View style={styles.destinations}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>Destinations</Text>
        <Text onPress={showDirections}>
          show directions
        </Text>
      </View>
      <View style={styles.destinationsList}>
        <FlatList
          data={locations}
          renderItem={({ item, index }) => (
            <DestinationListItem
              location={item}
              index={index}
              existingLocations={locations}
              setLocations={setLocations}
              setMapRegion={setMapRegion}
            />
          )}
        />
      </View>
    </View>
  )
}

function DestinationListItem({
  existingLocations,
  setMapRegion,
  setLocations,
  location,
  index
}: any) {
  function removeLocation(locationKey: any) {
    let newlocations = existingLocations.filter(
      (existingLocation: any) =>
        existingLocation.key !== locationKey
    )

    const lastLocation =
      newlocations.length < 1
        ? AUCKLAND_MAP_REGION
        : newlocations[newlocations.length - 1].coordinates

    setLocations(newlocations)
    setMapRegion(lastLocation)
  }

  const renderDeleteButton = () => {
    return (
      <TouchableOpacity
        style={styles.destinationListItemDelete}
        onPress={() => removeLocation(location.key)}
      >
        <Text style={styles.destinationListItemDeleteText}>
          DELETE
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <Swipeable renderLeftActions={renderDeleteButton}>
      <View style={styles.destinationListItem}>
        <Text style={styles.destinationListItemNumber}>
          {index + 1}
        </Text>
        <View>
          <Text style={styles.destinationListItemAddress}>
            {location.mainText}
          </Text>
          <Text style={styles.destinationListItemCity}>
            {location.secondaryText}
          </Text>
        </View>
      </View>
    </Swipeable>
  )
}

function triggerAlert() {
  Alert.alert(
    'Hello',
    `'You need at least ${LOCATIONS_LIMIT_MIN} locations, please add another location'`,
    [{ text: 'OK' }]
  )
}
