import React, { useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { StatusBar as ExpoStatusBar } from 'expo-status-bar'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import CONSTANTS from '../variables/constants'
import { height, width } from '../variables/theme'

import {
  Platform,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  FlatList,
  TextInput,
  StatusBar
} from 'react-native'

export default function HomeScreen() {
  const [addressess, setAddresses] = useState([])
  const [mapRegion, setMapRegion] = useState({
    latitude: -36.848461,
    longitude: 174.763336,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={mapRegion}>
        <Marker coordinate={mapRegion} title="Marker" />
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
          renderItem={({ item }) => (
            <ListItem item={item} />
          )}
        />
      </View>
      <ExpoStatusBar style="auto" />
    </View>
  )
}

function SearchBar(props: any) {
  const [isTextInputFocused, setIsTextInputFocused] =
    useState(false)
  const [textInput, setTextInput] = useState('')

  function addAddressToList(address: any) {
    props.setAddresses([...props.addressess, address])
  }

  function getAddressComponentValue(
    details: any,
    component: string
  ) {
    for (let addressComponent of details?.address_components) {
      if (addressComponent.types.includes(component)) {
        return addressComponent.short_name
      }
    }
  }

  return (
    <View style={styles.searchBar}>
      <Text style={styles.searchBarBack}>
        {isTextInputFocused ? 'Back' : 'Search'}
      </Text>
      <View style={styles.searchBarTextInputWrapper}>
        {/* <TextInput
          style={styles.searchBarTextInput}
          placeholder="Search here"
          value={textInput}
          onFocus={() => setIsTextInputFocused(true)}
          onChangeText={setTextInput}
          onSubmitEditing={addAddressToList}
          autoCorrect={false}
        /> */}
        <GooglePlacesAutocomplete
          placeholder="Search"
          fetchDetails={true}
          onPress={(_data, details = null) => {
            let key = details?.place_id
            let streetNumber = getAddressComponentValue(
              details,
              'street_number'
            )
            let route = getAddressComponentValue(
              details,
              'route'
            )
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
              city: `${sublocality} ${locality}`
            }

            const region = {
              latitude: details?.geometry.location.lat,
              longitude: details?.geometry.location.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }

            props.setMapRegion(region)
            addAddressToList(address)
          }}
          query={{
            key: CONSTANTS.GOOGLE_PLACES_API_KEY,
            language: 'en'
          }}
        />
      </View>
    </View>
  )
}

function ListItem(props: any) {
  return (
    <View style={styles.listItem}>
      <Text style={styles.listItemDelete}>X</Text>
      <Text style={styles.listItemNumber}>
        {props.item.id}
      </Text>
      <View>
        <Text>{props.item.streetAddress}</Text>
        <Text>{props.item.city}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },

  header: {
    position: 'absolute',
    top:
      Platform.OS === CONSTANTS.ANDROID
        ? StatusBar.currentHeight
        : 0,
    left: 0,
    right: 0,

    marginHorizontal: 16
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: 'white',

    paddingHorizontal: 16,

    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'lightgray',

    position: 'relative'
  },

  searchBarBack: {},

  searchBarTextInputWrapper: {
    flexShrink: 1,
    width: '100%'
  },

  searchBarTextInput: {
    fontSize: 18,

    paddingVertical: 12,
    paddingHorizontal: 8
  },

  searchBarDeleteTextInput: {
    color: 'red',
    paddingLeft: 16
  },

  map: {
    height: height * 0.5,
    width: width,
    backgroundColor: 'lightblue'
  },

  heading: {
    paddingVertical: 16,
    paddingHorizontal: 16,

    borderBottomWidth: 2,
    borderBottomColor: 'black'
  },

  headingText: {
    fontSize: 24
  },

  listItem: {
    flexDirection: 'row',

    paddingVertical: 8,
    paddingHorizontal: 16,

    borderBottomWidth: 1,
    borderBottomColor: 'black'
  },

  listItemDelete: {
    marginRight: 16,
    color: 'red'
  },

  listItemNumber: {
    marginRight: 16
  }
})
