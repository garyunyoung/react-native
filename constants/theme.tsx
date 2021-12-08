import { Dimensions } from 'react-native'

const sizes = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width
}

const colours = {
  errorRed: '#e80e0f',
  selectBlue: '#84c9e8'
}

const fonts = {
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    colour: 'black'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  body: {
    fontSize: 14,
    color: 'gray'
  }
}

export { sizes, colours, fonts }
