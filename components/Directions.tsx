import React from 'react'
import { View, Text, FlatList } from 'react-native'

import { styles } from '../styles/HomeScreenStyle'

export default function Directions({
  locations,
  setIsDirectionsVisible
}) {
  return (
    <View>
      <View style={styles.heading}>
        <Text style={styles.headingText}>Directions</Text>
        <Text
          onPress={() => {
            setIsDirectionsVisible(false)
          }}
        >
          back to destinations
        </Text>
      </View>
      <FlatList
        data={locations}
        renderItem={({ item, index }) => (
          <DestinationListItem
            location={item}
            index={index}
          />
        )}
      />
    </View>
  )
}

function DestinationListItem({ location, index }) {
  return (
    <View style={styles.listItem}>
      <Text style={styles.listItemNumber}>{index + 1}</Text>
      <View>
        <Text>{location.address}</Text>
        <Text>{location.city}</Text>
      </View>
    </View>
  )
}
