import React, { useState } from 'react'
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Polyline
} from 'react-native-maps'
import { StatusBar as ExpoStatusBar } from 'expo-status-bar'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Alert
} from 'react-native'

import CONSTANTS from '../variables/constants'
import { styles } from '../styles/HomeScreenStyle'

export default function HomeScreen() {
  const [addressess, setAddresses] = useState([])
  const [mapRegion, setMapRegion] = useState({
    latitude: -36.848461,
    longitude: 174.763336,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })

  console.log(
    addressess.map((address) => address.coordinates)
  )

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={mapRegion}
        provider={PROVIDER_GOOGLE}
      >
        <Polyline
          coordinates={addressess.map(
            (address) => address.coordinates
          )}
        />

        {addressess.map((address) => (
          <Marker
            coordinate={address.coordinates}
            title={address.streetAddress}
          />
        ))}
      </MapView>
      <SafeAreaView style={styles.header}>
        <SearchBar
          addressess={addressess}
          setAddresses={setAddresses}
          setMapRegion={setMapRegion}
        />
      </SafeAreaView>

      <View>
        <View style={styles.heading}>
          <Text style={styles.headingText}>
            Destinations
          </Text>
        </View>
        <FlatList
          data={addressess}
          renderItem={({ item, index }) => (
            <ListItem
              item={item}
              index={index}
              addressess={addressess}
              setAddresses={setAddresses}
            />
          )}
        />
      </View>
      <ExpoStatusBar style="auto" />
    </View>
  )
}

function SearchBar(props: any) {
  function addAddressToList(address: any) {
    if (
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
  )
}

function ListItem(props: any) {
  function removeAddressFromList(addressKey: any) {
    let newAddressess = props.addressess.filter(
      (address) => address.key !== addressKey
    )

    props.setAddresses(newAddressess)
  }

  return (
    <View style={styles.listItem}>
      <Text
        style={styles.listItemDelete}
        onPress={() =>
          removeAddressFromList(props.item.key)
        }
      >
        X
      </Text>
      <Text style={styles.listItemNumber}>
        {props.index + 1}
      </Text>
      <View>
        <Text>{props.item.streetAddress}</Text>
        <Text>{props.item.city}</Text>
      </View>
    </View>
  )
}
