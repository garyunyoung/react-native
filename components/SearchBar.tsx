import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import { SafeAreaView, View, Alert } from 'react-native'

import CONSTANTS from '../variables/constants'
import { styles } from '../styles/HomeScreenStyle'

export default function SearchBar(props: any) {
  function addAddressToList(address: any) {
    if (props.addressess.length === 5) {
      Alert.alert('Hello', 'Current address limit is 5', [
        {
          text: 'OK',
          onPress: () => console.log('Alert Dismissed')
        }
      ])
    } else if (
      props.addressess !== [] &&
      props.addressess.some(
        (existingAddress) =>
          existingAddress.key === address.key
      )
    ) {
      Alert.alert(
        'Hello',
        'Address is already added, please select another address',
        [
          {
            text: 'OK',
            onPress: () => console.log('Alert Dismissed')
          }
        ]
      )
    } else {
      props.setAddresses([...props.addressess, address])
    }
  }

  function getAddressComponentValue(
    details: any,
    component: string
  ) {
    for (let addressComponent of details?.address_components) {
      if (addressComponent.types.includes(component)) {
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

    const address = {
      key: key,
      streetAddress: `${streetNumber} ${route}`,
      city: `${sublocality} ${locality}`,
      coordinates: {
        latitude: details?.geometry.location.lat,
        longitude: details?.geometry.location.lng
      }
    }

    const region = {
      latitude: details?.geometry.location.lat,
      longitude: details?.geometry.location.lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }

    props.setMapRegion(region)
    addAddressToList(address)
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
