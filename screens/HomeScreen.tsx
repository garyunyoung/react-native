import React, { useState } from 'react'
import { StatusBar as ExpoStatusBar } from 'expo-status-bar'

import CONSTANTS from '../variables/constants'
import { height, width } from '../variables/theme'

import {
  Platform,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  FlatList,
  TextInput,
  StatusBar
  // TouchableOpacity
} from 'react-native'

const MOCK_DATA = [
  {
    id: 1,
    streetAddress: '205 Great South Road',
    city: 'Auckland'
  },
  {
    id: 2,
    streetAddress: '205 Great South Road',
    city: 'Auckland'
  },
  {
    id: 3,
    streetAddress: '205 Great South Road',
    city: 'Auckland'
  },
  {
    id: 4,
    streetAddress: '205 Great South Road',
    city: 'Auckland'
  },
  {
    id: 5,
    streetAddress: '205 Great South Road',
    city: 'Auckland'
  },
  {
    id: 6,
    streetAddress: '205 Great South Road',
    city: 'Auckland'
  },
  {
    id: 7,
    streetAddress: '205 Great South Road',
    city: 'Auckland'
  },
  {
    id: 8,
    streetAddress: '205 Great South Road',
    city: 'Auckland'
  },
  {
    id: 9,
    streetAddress: '205 Great South Road',
    city: 'Auckland'
  },
  {
    id: 10,
    streetAddress: '205 Great South Road',
    city: 'Auckland'
  }
]

export default function HomeScreen() {
  const [addressess, setAddresses] = useState([])

  return (
    <View style={styles.container}>
      <View style={styles.map}></View>
      <SafeAreaView style={styles.header}>
        <SearchBar
          addressess={addressess}
          setAddresses={setAddresses}
        />
      </SafeAreaView>
      <View>
        <View style={styles.heading}>
          <Text style={styles.headingText}>
            Destinations
          </Text>
        </View>
        <FlatList
          data={addressess}
          renderItem={({ item }) => (
            <ListItem item={item} />
          )}
        />
      </View>
      <ExpoStatusBar style="auto" />
    </View>
  )
}

function SearchBar(props: any) {
  const [isTextInputFocused, setIsTextInputFocused] =
    useState(false)
  const [textInput, setTextInput] = useState('')

  const addAddressToList = ({ nativeEvent: { text } }) => {
    props.setAddresses([...props.addressess, text])
    setTextInput('')
  }

  const clearTextInput = () => {
    setTextInput('')
  }

  return (
    <View style={styles.searchBar}>
      <Text style={styles.searchBarBack}>
        {isTextInputFocused ? 'Back' : 'Search'}
      </Text>
      <View style={styles.searchBarTextInputWrapper}>
        <TextInput
          style={styles.searchBarTextInput}
          placeholder="Search here"
          value={textInput}
          onFocus={() => setIsTextInputFocused(true)}
          onChangeText={setTextInput}
          onSubmitEditing={addAddressToList}
          autoCorrect={false}
        />
      </View>
      {textInput !== '' ? (
        <Text
          style={styles.searchBarDeleteTextInput}
          onPress={clearTextInput}
        >
          X
        </Text>
      ) : null}
    </View>
  )
}

function ListItem(props: any) {
  return (
    <View style={styles.listItem}>
      <Text style={styles.listItemDelete}>X</Text>
      <Text style={styles.listItemNumber}>
        {props.item.id}
      </Text>
      <View>
        <Text>{props.item.streetAddress}</Text>
        <Text>{props.item.city}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },

  header: {
    position: 'absolute',
    top:
      Platform.OS === CONSTANTS.android
        ? StatusBar.currentHeight
        : 0,
    left: 0,
    right: 0,

    marginHorizontal: 16
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: 'white',

    paddingHorizontal: 16,

    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'lightgray',

    position: 'relative'
  },

  searchBarBack: {},

  searchBarTextInputWrapper: {
    flexShrink: 1,
    width: '100%'
  },

  searchBarTextInput: {
    fontSize: 18,

    paddingVertical: 12,
    paddingHorizontal: 8
  },

  searchBarDeleteTextInput: {
    color: 'red',
    paddingLeft: 16
  },

  map: {
    height: height * 0.5,
    backgroundColor: 'lightblue'
  },

  heading: {
    paddingVertical: 16,
    paddingHorizontal: 16,

    borderBottomWidth: 2,
    borderBottomColor: 'black'
  },

  headingText: {
    fontSize: 24
  },

  listItem: {
    flexDirection: 'row',

    paddingVertical: 8,
    paddingHorizontal: 16,

    borderBottomWidth: 1,
    borderBottomColor: 'black'
  },

  listItemDelete: {
    marginRight: 16,
    color: 'red'
  },

  listItemNumber: {
    marginRight: 16
  }
})
