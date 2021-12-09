import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { colours, sizes } from '../constants/theme'

export const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 24,
    right: sizes.paddingHorizontalEdge,

    borderRadius: 100,
    backgroundColor: colours.selectBlue,

    shadowColor: colours.shadowGrey,
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,

    padding: 12
  }
})
