import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { SafeAreaView, View, Alert } from 'react-native'

import CONSTANTS from '../variables/constants'
import { styles } from '../styles/HomeScreenStyle'

export default function SearchBar({
  locations,
  setLocations,
  setMapRegion
}) {
  function addNewLocation(newLocation: any) {
    const locationLimitReached =
      locations.length >= CONSTANTS.LOCATIONS_LIMIT_MAX

    const locationAlreadyExists =
      locations !== [] &&
      locations.some(
        (location: any) => location.key === newLocation.key
      )

    switch (true) {
      case locationLimitReached:
        Alert.alert(
          'Hello',
          'The current location limit is ' +
            CONSTANTS.LOCATIONS_LIMIT_MAX,
          [{ text: 'OK' }]
        )
        break
      case locationAlreadyExists:
        Alert.alert(
          'Hello',
          'Location is already added, please select another location',
          [{ text: 'OK' }]
        )
        break
      default:
        setLocations([...locations, newLocation])
        break
    }
  }

  function handleOnPress(details: any) {
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
        longitude: details?.geometry.location.lng
      }
    }

    const newMapRegion = {
      latitude: details?.geometry.location.lat,
      longitude: details?.geometry.location.lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }

    setMapRegion(newMapRegion)
    addNewLocation(newLocation)
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

  return (
    <SafeAreaView style={styles.header}>
      <View style={styles.searchBar}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          fetchDetails={true}
          onPress={(_data, details = null) =>
            handleOnPress(details)
          }
          query={{
            key: CONSTANTS.GOOGLE_PLACES_API_KEY,
            language: 'en',
            components: 'country:nz'
          }}
        />
      </View>
    </SafeAreaView>
  )
}
