import React, { useState } from 'react'

import { StatusBar as ExpoStatusBar } from 'expo-status-bar'

import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Alert
} from 'react-native'

import Map from '../components/Map'
import SearchBar from '../components/SearchBar'

import { styles } from '../styles/HomeScreenStyle'

export default function HomeScreen() {
  const [addressess, setAddresses] = useState([])
  const [mapRegion, setMapRegion] = useState({
    latitude: -36.848461,
    longitude: 174.763336,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })
  const [showDirections, setShowDirections] =
    useState(false)

  const directions = addressess.map(
    (address) => address.coordinates
  )

  return (
    <View style={styles.container}>
      <Map
        mapRegion={mapRegion}
        showDirections={showDirections}
        directions={directions}
        addressess={addressess}
      />
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
          <Text
            onPress={() => {
              if (directions.length <= 1) {
                Alert.alert(
                  'Hello',
                  'You need at least two addresses, please select one more address',
                  [
                    {
                      text: 'OK',
                      onPress: () =>
                        console.log('Alert Dismissed')
                    }
                  ]
                )
              } else {
                setShowDirections(!showDirections)
              }
            }}
          >
            {showDirections ? 'hide' : 'show'} directions
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
