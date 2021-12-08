import React from 'react'
import { View, Text, FlatList, Alert } from 'react-native'

import CONSTANTS from '../variables/constants'
import { styles } from '../styles/HomeScreenStyle'

export default function Destinations({
  locations,
  setLocations,
  setIsDirectionsVisible
}) {
  const needsMoreLocations =
    locations.length < CONSTANTS.LOCATIONS_LIMIT_MIN

  return (
    <View>
      <View style={styles.heading}>
        <Text style={styles.headingText}>Destinations</Text>
        <Text
          onPress={() => {
            if (needsMoreLocations) {
              Alert.alert(
                'Hello',
                `'You need at least ${CONSTANTS.LOCATIONS_LIMIT_MIN} locations, please add another location'`,
                [{ text: 'OK' }]
              )
            } else {
              setIsDirectionsVisible(true)
            }
          }}
        >
          show directions
        </Text>
      </View>
      <FlatList
        data={locations}
        renderItem={({ item, index }) => (
          <DestinationListItem
            location={item}
            index={index}
            existingLocations={locations}
            setLocations={setLocations}
          />
        )}
      />
    </View>
  )
}

function DestinationListItem({
  existingLocations,
  setLocations,
  location,
  index
}) {
  function removeLocation(locationKey: any) {
    let newlocations = existingLocations.filter(
      (existingLocation: any) =>
        existingLocation.key !== locationKey
    )

    setLocations(newlocations)
  }

  return (
    <View style={styles.listItem}>
      <Text
        style={styles.listItemDelete}
        onPress={() => removeLocation(location.key)}
      >
        X
      </Text>
      <Text style={styles.listItemNumber}>{index + 1}</Text>
      <View>
        <Text>{location.address}</Text>
        <Text>{location.city}</Text>
      </View>
    </View>
  )
}
