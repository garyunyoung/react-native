import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import { SafeAreaView, View, Keyboard } from 'react-native'
import triggerAlert from './Alert'
import SearchResult from './SearchResult'

import {
  GOOGLE_API_KEY,
  LOCATIONS_MAX,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
  SEARCH_RESULTS_LANGUAGE,
  SEARCH_RESULTS_REGION
} from '../constants/constants'
import {
  styles,
  googlePlacesAutocomplete
} from '../styles/SearchStyle'

export default function SearchBar(props: any) {
  function handleSearchResult(data: any, details: any) {
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

    props.setMapRegion(mapRegion)
    addLocation(location)
  }

  function addLocation(newLocation: any) {
    const locationLimitReached =
      props.locations.length >= LOCATIONS_MAX

    const locationAlreadyExists = props.locations.some(
      (location: any) => location.key === newLocation.key
    )

    if (locationLimitReached) {
      triggerAlert(
        'Hello',
        'The current location limit is ' + LOCATIONS_MAX,
        'OK'
      )
    } else if (locationAlreadyExists) {
      triggerAlert(
        'Hello',
        'Location is already added, please select another location',
        'OK'
      )
    } else {
      props.setLocations([...props.locations, newLocation])
    }
  }

  const dismissKeyboard = () => {
    Keyboard.dismiss()
    props.setIsKeyboardVisible(false)
  }

  return (
    <SafeAreaView style={styles.header}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        query={{
          key: GOOGLE_API_KEY,
          language: SEARCH_RESULTS_LANGUAGE,
          components: SEARCH_RESULTS_REGION
        }}
        fetchDetails={true}
        onPress={(data, details = null) =>
          handleSearchResult(data, details)
        }
        renderRow={(data) => (
          <SearchResult
            title={data.structured_formatting.main_text}
            body={data.structured_formatting.secondary_text}
          />
        )}
        renderLeftButton={() => (
          <SearchLeftButton
            isKeyboardVisible={props.isKeyboardVisible}
            dismissKeyboard={dismissKeyboard}
          />
        )}
        suppressDefaultStyles={true}
        enablePoweredByContainer={false}
        styles={googlePlacesAutocomplete}
      />
    </SafeAreaView>
  )
}

function SearchLeftButton(props: any) {
  return (
    <View style={styles.searchLeftButton}>
      {props.isKeyboardVisible ? (
        <Ionicons
          onPress={props.dismissKeyboard}
          name="md-chevron-back"
          size={32}
          color="black"
        />
      ) : (
        <Ionicons
          name="md-search-outline"
          size={24}
          color="gray"
        />
      )}
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
