import React from 'react'

import { View, Text, FlatList, Alert } from 'react-native'

import { styles } from '../styles/HomeScreenStyle'

export default function Destinations(props) {
  return (
    <View>
      <View style={styles.heading}>
        <Text style={styles.headingText}>Destinations</Text>
        <Text
          onPress={() => {
            if (props.directions.length <= 1) {
              Alert.alert(
                'Hello',
                'You need at least two addresses, please select one more address',
                [{ text: 'OK' }]
              )
            } else {
              props.setShowDirections(!props.showDirections)
            }
          }}
        >
          {`${
            props.showDirections ? 'hide' : 'show'
          } directions`}
        </Text>
      </View>
      <FlatList
        data={props.addressess}
        renderItem={({ item, index }) => (
          <ListItem
            item={item}
            index={index}
            addressess={props.addressess}
            setAddresses={props.setAddresses}
          />
        )}
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
