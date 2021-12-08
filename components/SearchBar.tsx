import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Keyboard
} from 'react-native'

import {
  GOOGLE_API_KEY,
  LOCATIONS_MAX,
  LATITUDE_DELTA,
  LONGITUDE_DELTA
} from '../constants/constants'

import renderAlert from './Alert'

import {
  styles,
  searchResultStyles
} from '../styles/HomeScreenStyle'

export default function SearchBar({
  locations,
  setLocations,
  setMapRegion,
  isKeyboardVisible,
  setIsKeyboardVisible
}: any) {
  function handleSearchResultOnPress(
    data: any,
    details: any
  ) {
    const locationData = {
      id: data.place_id,
      lat: details?.geometry.location.lat,
      lng: details?.geometry.location.lng,
      mainText: data.structured_formatting.main_text,
      secondaryText:
        data.structured_formatting.secondary_text
    }
    const { location, mapRegion } =
      constructLocationAndMapRegionData(locationData)

    setMapRegion(mapRegion)
    addLocation(location)
  }

  function addLocation(newLocation: any) {
    const locationLimitReached =
      locations.length >= LOCATIONS_MAX

    const locationAlreadyExists = locations.some(
      (location: any) => location.key === newLocation.key
    )

    if (locationLimitReached) {
      renderAlert(
        'Hello',
        'The current location limit is ' + LOCATIONS_MAX,
        'OK'
      )
    } else if (locationAlreadyExists) {
      renderAlert(
        'Hello',
        'Location is already added, please select another location',
        'OK'
      )
    } else {
      setLocations([...locations, newLocation])
    }
  }

  const dismissKeyboard = () => {
    Keyboard.dismiss()
    setIsKeyboardVisible(false)
  }

  return (
    <SafeAreaView style={styles.header}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        query={{
          key: GOOGLE_API_KEY,
          language: 'en',
          components: 'country:nz'
        }}
        fetchDetails={true}
        onPress={(data, details = null) =>
          handleSearchResultOnPress(data, details)
        }
        renderRow={(data) => (
          <SearchResultRow
            mainText={data.structured_formatting.main_text}
            secondaryText={
              data.structured_formatting.secondary_text
            }
          />
        )}
        renderLeftButton={() => (
          <SearchLeftButton
            isKeyboardVisible={isKeyboardVisible}
            dismissKeyboard={dismissKeyboard}
          />
        )}
        suppressDefaultStyles={true}
        enablePoweredByContainer={false}
        styles={searchResultStyles}
      />
    </SafeAreaView>
  )
}

function SearchResultRow({ mainText, secondaryText }: any) {
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
          {mainText}
        </Text>
        <Text
          style={styles.searchResultListItemSecondaryText}
          numberOfLines={1}
        >
          {secondaryText}
        </Text>
      </View>
    </View>
  )
}

function SearchLeftButton({
  isKeyboardVisible,
  dismissKeyboard
}: any) {
  return isKeyboardVisible ? (
    <View style={styles.searchInputLeftButton}>
      <Ionicons
        name="md-chevron-back"
        size={32}
        color="black"
        onPress={dismissKeyboard}
      />
    </View>
  ) : (
    <View style={styles.searchInputLeftButton}>
      <Ionicons
        name="md-search-outline"
        size={24}
        color="gray"
      />
    </View>
  )
}

function constructLocationAndMapRegionData({
  id,
  lat,
  lng,
  mainText,
  secondaryText
}: any) {
  return {
    location: {
      key: id,
      mainText: mainText,
      secondaryText: secondaryText,
      coordinates: {
        latitude: lat,
        longitude: lng,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
    },
    mapRegion: {
      latitude: lat,
      longitude: lng,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }
  }
}
