import React from 'react'
import { View, Text, FlatList, Alert } from 'react-native'
import { styles } from '../styles/HomeScreenStyle'

export default function Destinations(props: any) {
  return (
    <View>
      <View style={styles.heading}>
        <Text style={styles.headingText}>Destinations</Text>
        <Text
          onPress={() => {
            if (props.locationsCoordinates.length <= 1) {
              Alert.alert(
                'Hello',
                'You need at least two addresses, please add another address',
                [{ text: 'OK' }]
              )
            } else {
              props.setIsDirectionsVisible(
                !props.isDirectionsVisible
              )
            }
          }}
        >
          {`${
            props.isDirectionsVisible ? 'hide' : 'show'
          } directions`}
        </Text>
      </View>
      <FlatList
        data={props.locations}
        renderItem={({ item, index }) => (
          <DestinationListItem
            item={item}
            index={index}
            locations={props.locations}
            setLocations={props.setLocations}
          />
        )}
      />
    </View>
  )
}

function DestinationListItem(props: any) {
  function removeAddressFromList(addressKey: any) {
    let newlocations = props.locations.filter(
      (address: any) => address.key !== addressKey
    )

    props.setLocations(newlocations)
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
