import React, { useState, useEffect } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import {
  SafeAreaView,
  View,
  Text,
  Alert,
  TouchableOpacity,
  Keyboard
} from 'react-native'

import constants from '../variables/constants'
import {
  styles,
  searchResultStyles
} from '../styles/HomeScreenStyle'

const {
  GOOGLE_API_KEY,
  LOCATIONS_LIMIT_MAX,
  LATITUDE_DELTA,
  LONGITUDE_DELTA
} = constants

export default function SearchBar({
  locations,
  setLocations,
  setMapRegion,
  setKeyboardVisible
}: any) {
  function addNewLocation(newLocation: any) {
    const locationLimitReached =
      locations.length >= LOCATIONS_LIMIT_MAX

    const locationAlreadyExists = locations.some(
      (location: any) => location.key === newLocation.key
    )

    if (locationLimitReached) {
      Alert.alert(
        'Hello',
        'The current location limit is ' +
          LOCATIONS_LIMIT_MAX,
        [{ text: 'OK' }]
      )
    } else if (locationAlreadyExists) {
      Alert.alert(
        'Hello',
        'Location is already added, please select another location',
        [{ text: 'OK' }]
      )
    } else {
      setLocations([...locations, newLocation])
    }
  }

  function handleOnPress(details: any) {
    // TO DO: move this out of componenet - return object with new location and new map region
    let key = details?.place_id
    let streetNumber = getAddressComponentValue(
      details,
      'street_number'
    )
    let route = getAddressComponentValue(details, 'route')
    let sublocality = getAddressComponentValue(
      details,
      'sublocality'
    )
    let locality = getAddressComponentValue(
      details,
      'locality'
    )

    const newLocation = {
      key: key,
      address: `${streetNumber} ${route}`,
      city: `${sublocality} ${locality}`,
      coordinates: {
        latitude: details?.geometry.location.lat,
        longitude: details?.geometry.location.lng,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
    }

    const newMapRegion = {
      latitude: details?.geometry.location.lat,
      longitude: details?.geometry.location.lng,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }

    setMapRegion(newMapRegion)
    addNewLocation(newLocation)
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true)
      }
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false)
      }
    )

    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [])

  return (
    <SafeAreaView style={styles.header}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        onPress={(_data, details = null) =>
          handleOnPress(details)
        }
        query={{
          key: GOOGLE_API_KEY,
          language: 'en',
          components: 'country:nz'
        }}
        enablePoweredByContainer={false}
        renderRow={(data) => renderSearchResultRow(data)}
        suppressDefaultStyles={true}
        styles={searchResultStyles}
      />
    </SafeAreaView>
  )
}

function getAddressComponentValue(
  details: any,
  field: string
) {
  for (let addressComponent of details?.address_components) {
    if (addressComponent.types.includes(field)) {
      return addressComponent.long_name
    }
  }
}

function renderSearchResultRow(data: any) {
  const { main_text, secondary_text } =
    data.structured_formatting

  return (
    <View style={styles.searchResultListItem}>
      <TouchableOpacity
        style={styles.searchResultListItemAdd}
      >
        <Text style={styles.searchResultListItemAddText}>
          +
        </Text>
      </TouchableOpacity>
      <View
        style={styles.searchResultListItemTextContainer}
      >
        <Text
          style={styles.searchResultListItemMainText}
          numberOfLines={1}
        >
          {main_text}
        </Text>
        <Text
          style={styles.searchResultListItemSecondaryText}
          numberOfLines={1}
        >
          {secondary_text}
        </Text>
      </View>
    </View>
  )
}
