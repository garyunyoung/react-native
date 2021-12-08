import React from 'react'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native'

import renderAlert from './Alert'

import {
  LOCATIONS_MIN,
  AUCKLAND_MAP_REGION
} from '../constants/constants'

import { colours } from '../constants/theme'

export default function Destinations(props: any) {
  function showDirections() {
    props.locations.length < LOCATIONS_MIN
      ? renderAlert(
          'Hello',
          `'You need at least ${LOCATIONS_MIN}, locations, please add another location'`,
          'OK'
        )
      : props.setIsDirectionsVisible(true)
  }

  return (
    <View style={styles.destinations}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>Destinations</Text>
        <Text onPress={() => showDirections()}>
          show directions
        </Text>
      </View>
      <View style={styles.destinationsList}>
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
    </View>
  )
}

function DestinationListItem(props: any) {
  function renderDeleteButton() {
    return (
      <TouchableOpacity
        style={styles.destinationListItemDelete}
        onPress={() =>
          removeLocation(props.location.placeId)
        }
      >
        <Text style={styles.destinationListItemDeleteText}>
          DELETE
        </Text>
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
        ? AUCKLAND_MAP_REGION
        : filteredLocations[filteredLocations.length - 1]
            .coordinates

    props.setLocations(filteredLocations)
    props.setMapRegion(lastLocation)
  }

  return (
    <Swipeable
      renderLeftActions={() => renderDeleteButton()}
    >
      <View style={styles.destinationListItem}>
        <Text style={styles.destinationListItemNumber}>
          {props.index + 1}
        </Text>
        <View>
          <Text style={styles.destinationListItemAddress}>
            {props.location.mainText}
          </Text>
          <Text style={styles.destinationListItemCity}>
            {props.location.secondaryText}
          </Text>
        </View>
      </View>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  destinations: {
    flex: 1
  },

  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingVertical: 16,
    paddingHorizontal: 16,

    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgray'
  },

  headingText: {
    fontSize: 24,
    fontWeight: 'bold'
  },

  destinationsList: {
    flex: 1
  },

  destinationListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',

    paddingVertical: 16,
    paddingHorizontal: 16
  },

  destinationListItemAddress: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2
  },

  destinationListItemCity: {
    fontSize: 14,
    color: 'gray'
  },

  destinationListItemDelete: {
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: colours.errorRed,

    paddingHorizontal: 24
  },

  destinationListItemDeleteText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white'
  },

  destinationListItemNumber: {
    fontWeight: 'bold',
    fontSize: 16,

    backgroundColor: 'lightgray',

    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 24
  }
})
