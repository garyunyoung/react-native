import { Dimensions } from 'react-native'

const sizes = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width,

  button: 44,
  paddingHorizontalEdge: 16
}

const colours = {
  errorRed: '#e80e0f',
  selectBlue: '#84c9e8'
}

const fonts = {
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black'
  },
  body: {
    fontSize: 14,
    fontWeight: 'normal',
    color: 'gray'
  },
  button: {
    fontSize: 14,
    fontWeight: 'bold'
  }
}

export { sizes, colours, fonts }
