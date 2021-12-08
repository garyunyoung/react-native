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
    backgroundColor: 'white',
    position: 'relative'
  },

  header: {
    position: 'absolute',
    top:
      Platform.OS === CONSTANTS.ANDROID
        ? StatusBar.currentHeight
        : 0,
    width: width
  },

  map: {
    height: height * 0.5,
    width: width
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

  searchResultListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16
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

  searchResultListItemTextContainer: {
    maxWidth: width - 100
  },

  searchResultListItemMainText: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2
  },

  searchResultListItemSecondaryText: {
    flex: 1,
    fontSize: 14,
    color: 'gray'
  }
})

export const searchResultStyles = {
  container: {},

  textInputContainer: {
    marginHorizontal: 16,
    marginBottom: 16
  },

  textInput: {
    fontSize: 16,

    backgroundColor: 'white',

    borderRadius: 40,
    borderWidth: 0.5,
    borderColor: 'lightgray',

    padding: 16
  },

  listView: {
    width: width,
    backgroundColor: 'white'
  }
}
