import {
  Platform,
  StyleSheet,
  StatusBar
} from 'react-native'

import { ANDROID } from '../constants/constants'

import { colours, sizes } from '../constants/theme'

export const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top:
      Platform.OS === ANDROID ? StatusBar.currentHeight : 0,
    width: sizes.width
  },

  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16
  },

  addButton: {
    width: 44,
    height: 44,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: colours.selectBlue,
    borderRadius: 100,

    marginRight: 16
  },

  addButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },

  listItemTextContainer: {
    maxWidth: sizes.width - 100
  },

  listItemTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2
  },

  listItemBody: {
    flex: 1,
    fontSize: 14,
    color: 'gray'
  },

  searchLeftButton: {
    width: 44,
    height: 44,

    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 8,
    marginRight: 8
  }
})
