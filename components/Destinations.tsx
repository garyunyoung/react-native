import React from 'react'
import { View, Text, FlatList, Alert } from 'react-native'
import { styles } from '../styles/HomeScreenStyle'

export default function Destinations({
  locations,
  setLocations,
  locationsCoordinates,
  isDirectionsVisible,
  setIsDirectionsVisible
}) {
  return (
    <View>
      <View style={styles.heading}>
        <Text style={styles.headingText}>Destinations</Text>
        <Text
          onPress={() => {
            if (locationsCoordinates.length <= 1) {
              Alert.alert(
                'Hello',
                'You need at least two addresses, please add another address',
                [{ text: 'OK' }]
              )
            } else {
              setIsDirectionsVisible(!isDirectionsVisible)
            }
          }}
        >
          {`${
            isDirectionsVisible ? 'hide' : 'show'
          } directions`}
        </Text>
      </View>
      <FlatList
        data={locations}
        renderItem={({ item, index }) => (
          <DestinationListItem
            item={item}
            index={index}
            locations={locations}
            setLocations={setLocations}
          />
        )}
      />
    </View>
  )
}

function DestinationListItem({
  locations,
  setLocations,
  item,
  index
}) {
  function removeLocation(addressKey: any) {
    let newlocations = locations.filter(
      (address: any) => address.key !== addressKey
    )

    setLocations(newlocations)
  }

  return (
    <View style={styles.listItem}>
      <Text
        style={styles.listItemDelete}
        onPress={() => removeLocation(item.key)}
      >
        X
      </Text>
      <Text style={styles.listItemNumber}>{index + 1}</Text>
      <View>
        <Text>{item.streetAddress}</Text>
        <Text>{item.city}</Text>
      </View>
    </View>
  )
}
