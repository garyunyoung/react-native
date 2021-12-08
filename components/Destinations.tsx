import React from 'react'
import {
  View,
  Text,
  FlatList,
  Alert,
  TouchableHighlight
} from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'

import CONSTANTS from '../variables/constants'
import { COLOURS } from '../variables/theme'
import { styles } from '../styles/Destinations'

export default function Destinations({
  locations,
  setLocations,
  setMapRegion,
  setIsDirectionsVisible
}: any) {
  const notEnoughLocations =
    locations.length < CONSTANTS.LOCATIONS_LIMIT_MIN

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
        ? CONSTANTS.AUCKLAND_MAP_REGION
        : newlocations[newlocations.length - 1].coordinates

    setLocations(newlocations)
    setMapRegion(lastLocation)
  }

  const showDeleteButton = () => {
    return (
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor={COLOURS.underlayGrey}
        style={styles.destinationListItemDelete}
        onPress={() => removeLocation(location.key)}
      >
        <Text style={styles.destinationListItemDeleteText}>
          DELETE
        </Text>
      </TouchableHighlight>
    )
  }

  return (
    <Swipeable renderLeftActions={showDeleteButton}>
      <View style={styles.destinationListItem}>
        <Text style={styles.destinationListItemNumber}>
          {index + 1}
        </Text>
        <View>
          <Text style={styles.destinationListItemAddress}>
            {location.address}
          </Text>
          <Text style={styles.destinationListItemCity}>
            {location.city}
          </Text>
        </View>
      </View>
    </Swipeable>
  )
}

function triggerAlert() {
  Alert.alert(
    'Hello',
    `'You need at least ${CONSTANTS.LOCATIONS_LIMIT_MIN} locations, please add another location'`,
    [{ text: 'OK' }]
  )
}
