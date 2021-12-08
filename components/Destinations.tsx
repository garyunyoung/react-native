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
  DEFAULT_MAP_REGION
} from '../constants/constants'

import { colours, fonts, sizes } from '../constants/theme'

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
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Destinations</Text>
        <Text onPress={() => showDirections()}>
          show directions
        </Text>
      </View>
      <View style={styles.listContainer}>
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
        <View>
          <Text style={styles.listItemTitle}>
            {props.location.mainText}
          </Text>
          <Text style={styles.listItemBody}>
            {props.location.secondaryText}
          </Text>
        </View>
      </View>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgray',

    paddingHorizontal: sizes.paddingHorizontalEdge,
    paddingVertical: 16
  },

  headingText: {
    fontSize: fonts.h1.fontSize,
    fontWeight: 'bold',
    color: fonts.h1.color
  },

  listContainer: {
    flex: 1
  },

  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',

    paddingVertical: 16,
    paddingHorizontal: sizes.paddingHorizontalEdge
  },

  listItemTitle: {
    fontSize: fonts.title.fontSize,
    fontWeight: 'bold',
    color: fonts.title.color,

    marginBottom: 2
  },

  listItemBody: {
    fontSize: fonts.body.fontSize,
    fontWeight: 'normal',
    color: fonts.body.color
  },

  deleteButton: {
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: colours.errorRed,
    paddingHorizontal: 24
  },

  deleteButtonText: {
    fontSize: fonts.button.fontSize,
    fontWeight: 'bold',
    color: 'white'
  },

  listItemIndex: {
    fontSize: 16,
    fontWeight: 'bold',

    backgroundColor: 'lightgray',

    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 24
  }
})
