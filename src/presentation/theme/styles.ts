import {StyleSheet, useColorScheme} from 'react-native';

export const grayScale = {
  black: 'black',
  gray: 'gray',
  white: 'white',
};

export const primaryColors = {
  primary: '#3498db',
  primaryLight: '#5dade2',
  primaryDark: '#2e86c1',
  primaryText: '#ffffff',
};

export const secondaryColors = {
  secondary: '#e74c3c',
  secondaryLight: '#ec7063',
  secondaryDark: '#cb4335',
  secondaryText: '#ffffff',
};

export const neutralColors = {
  background: '#f5f5f5',
  backgroundDark: 'black',
  surface: '#ffffff',
  onSurface: '#000000',
  border: '#d1d1d1',
  borderDark: 'gray',
};

export const fontColor = {
  textColor: 'gray',
  textColorDark: 'gray',
  textColorHeader: 'black',
  textColorHeaderDark: 'white',
};

export const stateColors = {
  success: '#28a745',
  error: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8',
};

export const globalColors = {
  grayScale,
  primaryColors,
  secondaryColors,
  neutralColors,
  stateColors,
  fontColor,
};

export const globalStyles = StyleSheet.create({
  primaryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  FABBackButton: {
    height: 80,
    width: 80,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    gap: 10,
  },
  primaryInput: {},
});
