import {
  Platform,
  StyleSheet,
  StatusBar
} from 'react-native'

import CONSTANTS from '../variables/constants'
import { height, width } from '../variables/theme'

export const styles = StyleSheet.create({
  destinations: {
    flex: 1
  },

  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingVertical: 16,
    paddingHorizontal: 16,

    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgray'
  },

  headingText: {
    fontSize: 24,
    fontWeight: 'bold'
  },

  destinationsList: {
    flex: 1
  },

  destinationListItem: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: 16,
    paddingHorizontal: 16
  },

  destinationListItemAddress: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2
  },

  destinationListItemCity: {
    fontSize: 14,
    color: 'gray'
  },

  destinationListItemDelete: {
    marginRight: 16,
    color: 'red'
  },

  destinationListItemNumber: {
    fontWeight: 'bold',
    fontSize: 16,

    backgroundColor: 'lightgray',

    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 24
  }
})
