import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from '../styles/SearchBarStyle'

export default function SearchResult({ title, body }: any) {
  return (
    <View style={styles.listItem}>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <View style={styles.listItemTextContainer}>
        <Text
          style={styles.listItemTitle}
          numberOfLines={1}
        >
          {title}
        </Text>
        <Text style={styles.listItemBody} numberOfLines={1}>
          {body}
        </Text>
      </View>
    </View>
  )
}
