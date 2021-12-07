import {
  Platform,
  StyleSheet,
  StatusBar
} from 'react-native'

import CONSTANTS from '../variables/constants'
import { height, width } from '../variables/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },

  header: {
    position: 'absolute',
    top:
      Platform.OS === CONSTANTS.ANDROID
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

  searchBarTextInputWrapper: {
    flex: 1
  },

  map: {
    height: height * 0.5,
    width: width,
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
