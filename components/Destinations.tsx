import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native'

import triggerAlert from './Alert'

import {
  LOCATIONS_MIN,
  DEFAULT_MAP_REGION
} from '../constants/constants'

import { styles } from '../styles/SharedStyle'

export default function Destinations(props: any) {
  function showDirections() {
    props.locations.length < LOCATIONS_MIN
      ? triggerAlert(
          'Hello',
          `'You need at least ${LOCATIONS_MIN}, locations, please add another location'`,
          'OK'
        )
      : props.setIsDirectionsVisible(true)
  }

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Destinations</Text>
        <TouchableOpacity
          style={styles.directionsButton}
          onPress={() => showDirections()}
        >
          <Ionicons
            onPress={props.dismissKeyboard}
            name="car"
            size={30}
            color="white"
          />
          <Text style={styles.directionsButtonText}>
            Directions
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={props.locations}
        renderItem={({ item, index }) => (
          <DestinationListItem
            location={item}
            index={index}
            existingLocations={props.locations}
            setLocations={props.setLocations}
            setMapRegion={props.setMapRegion}
          />
        )}
      />
    </View>
  )
}

function DestinationListItem(props: any) {
  function renderDeleteButton() {
    return (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => removeLocation(props.location.key)}
      >
        <Text style={styles.deleteButtonText}>DELETE</Text>
      </TouchableOpacity>
    )
  }

  function removeLocation(locationKey: any) {
    let filteredLocations = props.existingLocations.filter(
      (existingLocation: any) =>
        existingLocation.key !== locationKey
    )

    const lastLocation =
      filteredLocations.length < 1
        ? DEFAULT_MAP_REGION
        : filteredLocations[filteredLocations.length - 1]
            .coordinates

    props.setLocations(filteredLocations)
    props.setMapRegion(lastLocation)
  }

  return (
    <Swipeable
      renderLeftActions={() => renderDeleteButton()}
    >
      <View style={styles.listItem}>
        <Text style={styles.listItemIndex}>
          {props.index + 1}
        </Text>
        <View style={styles.listItemTextContainer}>
          <Text
            style={styles.listItemTitle}
            numberOfLines={1}
          >
            {props.location.mainText}
          </Text>
          <Text
            style={styles.listItemBody}
            numberOfLines={1}
          >
            {props.location.secondaryText}
          </Text>
        </View>
      </View>
    </Swipeable>
  )
}
