import {
  Platform,
  StyleSheet,
  StatusBar
} from 'react-native'

import { ANDROID } from '../constants/constants'
import { colours, fonts, sizes } from '../constants/theme'

const styles = StyleSheet.create({
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
    width: sizes.button,
    height: sizes.button,

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

  searchLeftButton: {
    width: sizes.button,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const googlePlacesAutocomplete = {
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: 'white',

    borderRadius: 40,
    borderWidth: 0.5,
    borderColor: 'lightgray',

    marginHorizontal: 16
  },

  textInput: {
    fontSize: 16,
    width:
      sizes.width -
      (sizes.paddingHorizontalEdge * 2 + sizes.button + 8),
    paddingVertical: 16
  },

  listView: {
    width: sizes.width,
    backgroundColor: 'white'
  }
}

export { styles, googlePlacesAutocomplete }
