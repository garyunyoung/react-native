import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import * as Location from 'expo-location'

import triggerAlert from './Alert'
import { styles } from '../styles/GeolocationStyle'

export default function Geolocation() {
  const [savedPermissions, setSavedPermissions] =
    useState('none')
  const [
    currentLocationCoordinates,
    setCurrentLocationCoordinates
  ] = useState({})

  const handleOnPress = () => {
    if (savedPermissions === 'none') {
      getPermissionsAndCoordinates()
    } else {
      const {
        latitude = 'waiting...',
        longitude = 'waiting...'
      }: any = currentLocationCoordinates

      triggerAlert(
        'Hello',
        `These are your coordinates. Latitude: ${latitude} Longitude: ${longitude}`,
        'OK'
      )
    }
  }

  const getPermissionsAndCoordinates = async () => {
    let { status } =
      await Location.requestForegroundPermissionsAsync()

    setSavedPermissions(status)

    if (status === 'denied') {
      triggerAlert(
        'Hello',
        'Please enable location permissions in your settings to use this feature',
        'OK'
      )
      return
    } else {
      let locationData =
        await Location.getCurrentPositionAsync()

      const coordinates = {
        longitude: locationData.coords.longitude,
        latitude: locationData.coords.latitude
      }

      triggerAlert(
        'Hello',
        `These are your coordinates. Latitude: ${coordinates.latitude} Longitude: ${coordinates.longitude}`,
        'OK'
      )

      setCurrentLocationCoordinates(coordinates)
    }
  }

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handleOnPress}
    >
      <Ionicons name="locate" size={30} color="white" />
    </TouchableOpacity>
  )
}
