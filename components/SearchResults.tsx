import React from 'react'
import { View, Text, FlatList, Button } from 'react-native'

import { styles } from '../styles/SearchResults'

export default function SearchResults() {
  const mock = [
    {
      text: 'list item'
    },
    {
      text: 'list item'
    },
    {
      text: 'list item'
    }
  ]

  return (
    <View style={styles.searchResultsContainer}>
      <FlatList
        data={mock}
        renderItem={({ item, index }) => (
          <View style={styles.searchResultListItem}>
            <Button title="ADD" onPress={() => null} />
            <Text style={styles.searchResultListItemText}>
              {index} {item.text}
            </Text>
          </View>
        )}
      />
    </View>
  )
}
