import { StyleSheet } from 'react-native'

import { colours, fonts, sizes } from '../constants/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgray',

    paddingHorizontal: sizes.paddingHorizontalEdge,
    paddingVertical: 16
  },

  headingText: {
    fontSize: fonts.h1.fontSize,
    fontWeight: 'bold',
    color: fonts.h1.color
  },

  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',

    paddingVertical: 16,
    paddingHorizontal: sizes.paddingHorizontalEdge
  },

  listItemTitle: {
    fontSize: fonts.title.fontSize,
    fontWeight: 'bold',
    color: fonts.title.color,

    marginBottom: 2
  },

  listItemBody: {
    fontSize: fonts.body.fontSize,
    fontWeight: 'normal',
    color: fonts.body.color
  },

  deleteButton: {
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: colours.errorRed,
    paddingHorizontal: 24
  },

  deleteButtonText: {
    fontSize: fonts.button.fontSize,
    fontWeight: 'bold',
    color: 'white'
  },

  listItemIndex: {
    fontSize: 16,
    fontWeight: 'bold',

    backgroundColor: 'lightgray',

    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 24
  }
})
