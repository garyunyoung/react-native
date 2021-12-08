import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { SafeAreaView, View, Alert } from 'react-native'

import CONSTANTS from '../variables/constants'
import { styles } from '../styles/HomeScreenStyle'

export default function SearchBar({
  locations,
  setLocations,
  setMapRegion
}: any) {
  function addNewLocation(newLocation: any) {
    const locationLimitReached =
      locations.length >= CONSTANTS.LOCATIONS_LIMIT_MAX

    const locationAlreadyExists = locations.some(
      (location: any) => location.key === newLocation.key
    )

    if (locationLimitReached) {
      Alert.alert(
        'Hello',
        'The current location limit is ' +
          CONSTANTS.LOCATIONS_LIMIT_MAX,
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
        latitudeDelta: CONSTANTS.LATITUDE_DELTA,
        longitudeDelta: CONSTANTS.LONGITUDE_DELTA
      }
    }

    const newMapRegion = {
      latitude: details?.geometry.location.lat,
      longitude: details?.geometry.location.lng,
      latitudeDelta: CONSTANTS.LATITUDE_DELTA,
      longitudeDelta: CONSTANTS.LONGITUDE_DELTA
    }

    setMapRegion(newMapRegion)
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
            key: CONSTANTS.GOOGLE_API_KEY,
            language: 'en',
            components: 'country:nz'
          }}
        />
      </View>
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
