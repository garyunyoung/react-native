import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native'
import { styles } from '../styles/SharedStyle'

export default function Directions({
  locations,
  setIsDirectionsVisible
}: any) {
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Directions</Text>
        <TouchableOpacity
          style={styles.directionsButton}
          onPress={() => {
            setIsDirectionsVisible(false)
          }}
        >
          <Ionicons
            name="arrow-back"
            size={30}
            color="white"
          />
          <Text style={styles.directionsButtonText}>
            Back
          </Text>
        </TouchableOpacity>
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

function DestinationListItem({ location, index }: any) {
  return (
    <View style={styles.listItem}>
      <Text style={styles.listItemIndex}>{index + 1}</Text>
      <View style={styles.listItemTextContainer}>
        <Text
          style={styles.listItemTitle}
          numberOfLines={1}
        >
          {location.mainText}
        </Text>
        <Text style={styles.listItemBody} numberOfLines={1}>
          {location.secondaryText}
        </Text>
      </View>
    </View>
  )
}
