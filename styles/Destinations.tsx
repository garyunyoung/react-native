import { StyleSheet } from 'react-native'
import { COLOURS } from '../variables/theme'

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
    backgroundColor: 'white',

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
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: COLOURS.errorRed,

    paddingHorizontal: 24
  },

  destinationListItemDeleteText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white'
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
