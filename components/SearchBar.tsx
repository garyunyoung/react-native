import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { SafeAreaView, View, Alert } from 'react-native'

import CONSTANTS from '../variables/constants'
import { styles } from '../styles/HomeScreenStyle'

export default function SearchBar(props: any) {
  function addNewLocation(newLocation: any) {
    const locationLimitReached =
      props.locations.length >
      CONSTANTS.LOCATIONS_MAX_AMOUNT

    const locationIsAlreadyInList =
      props.locations !== [] &&
      props.locations.some(
        (location: any) => location.key === newLocation.key
      )

    switch (true) {
      case locationLimitReached:
        Alert.alert(
          'Hello',
          'The current location limit is ' +
            CONSTANTS.LOCATIONS_MAX_AMOUNT,
          [{ text: 'OK' }]
        )
        break
      case locationIsAlreadyInList:
        Alert.alert(
          'Hello',
          'Location is already added, please select another location',
          [{ text: 'OK' }]
        )
        break
      default:
        props.setLocations([
          ...props.locations,
          newLocation
        ])
        break
    }
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
      streetAddress: `${streetNumber} ${route}`,
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

    props.setMapRegion(newMapRegion)
    addNewLocation(newLocation)
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