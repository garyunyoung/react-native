import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { View, Text } from 'react-native'
import { styles } from '../styles/SearchStyle'

export default function SearchResult({ title, body }: any) {
  return (
    <View style={styles.listItem}>
      <View style={styles.addButton}>
        <Ionicons name="add" size={22} color="white" />
      </View>
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
