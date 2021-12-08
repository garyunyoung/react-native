import {
  Platform,
  StyleSheet,
  StatusBar
} from 'react-native'

import CONSTANTS from '../variables/constants'
import { height, width, COLOURS } from '../variables/theme'

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
    // flexDirection: 'row',
    // alignItems: 'center',
    // backgroundColor: 'white',
    // paddingHorizontal: 16,
    // borderRadius: 50,
    // borderWidth: 1,
    // borderColor: 'lightgray',
    // position: 'relative'
  },

  map: {
    height: height * 0.5,
    width: width,
    backgroundColor: 'lightblue'
  },

  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  },

  // searchResultsContainer: {
  //   backgroundColor: 'white'
  // },

  searchResultListItem: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: 'white'
  },

  searchResultListItemAdd: {
    width: 44,
    height: 44,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: COLOURS.selectBlue,
    borderRadius: 100,

    marginRight: 16
  },

  searchResultListItemAddText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },

  searchResultListItemMainText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2
  },

  searchResultListItemSecondaryText: {
    fontSize: 14,
    color: 'gray'
  }
})
