import React, { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
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
  isKeyboardVisible,
  setIsKeyboardVisible
}: any) {
  function selectSearchResult(details: any, data: any) {
    const { location, mapRegion } = locationAndMapData(
      details,
      data
    )

    setMapRegion(mapRegion)
    addLocation(location)
  }

  function addLocation(newLocation: any) {
    const locationLimitReached =
      locations.length >= LOCATIONS_LIMIT_MAX

    const locationAlreadyExists = locations.some(
      (location: any) => location.key === newLocation.key
    )

    if (locationLimitReached) {
      triggerAlert(
        'Hello',
        'The current location limit is ' +
          LOCATIONS_LIMIT_MAX,
        'OK'
      )
    } else if (locationAlreadyExists) {
      triggerAlert(
        'Hello',
        'Location is already added, please select another location',
        'OK'
      )
    } else {
      setLocations([...locations, newLocation])
    }
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true)
      }
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false)
      }
    )

    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [])

  const dismissKeyboard = () => {
    Keyboard.dismiss()
    setIsKeyboardVisible(false)
  }

  return (
    <SafeAreaView style={styles.header}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        onPress={(data, details = null) =>
          selectSearchResult(details, data)
        }
        query={{
          key: GOOGLE_API_KEY,
          language: 'en',
          components: 'country:nz'
        }}
        enablePoweredByContainer={false}
        renderRow={(data) => (
          <SearchResultRow data={data} />
        )}
        renderLeftButton={() => (
          <SearchInputIcon
            isKeyboardVisible={isKeyboardVisible}
            dismissKeyboard={dismissKeyboard}
          />
        )}
        suppressDefaultStyles={true}
        styles={searchResultStyles}
      />
    </SafeAreaView>
  )
}

function SearchInputIcon({
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

function SearchResultRow({ data }: any) {
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

function triggerAlert(
  mainText: string,
  secondaryText: string,
  buttonText: string
) {
  return Alert.alert(mainText, secondaryText, [
    { text: buttonText }
  ])
}

function locationAndMapData(details: any, data: any) {
  const { lat, lng } = details.geometry.location
  const { main_text, secondary_text } =
    data.structured_formatting

  return {
    location: {
      key: details.place_id,
      mainText: main_text,
      secondaryText: secondary_text,
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
