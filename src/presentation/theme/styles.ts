import {StyleSheet} from 'react-native';

export const grayScale = {
  black: 'black',
  gray: 'gray',
  white: 'white',
};

export const primaryColors = {
  primary: '#3fc1f2',
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

  backgroundAlpha: '#e8e8e8',
  backgroundDarkAlpha: '#171717',

  surface: '#ffffff',
  onSurface: '#000000',
  border: '#d1d1d1',
  borderDark: 'gray',

  bottomTabFillIcon: '#d6d6d6',
  bottomTabFillIconDark: 'white',

  bottomTabBackground: 'white',
  bottomTabBackgroundDark: '#171717',

  bottomTabFocusBackground: '#f5f5f5',
  bottomTabFocusBackgroundDark: '#e0e0e0',

  bottomTabContainerBackground: 'white',
  bottomTabContainerBackgroundDark: 'black',

  textInputBackground: '#e8e8e8',
  textInputBackgroundDark: 'black',

  placeholderColor: 'gray',
  placeholderColorDark: 'white',

  messageChatBackground: '#3498db',
  messageChatBackgroundDark: 'black',

  messageReceptChatBackground: '#a6a6a6',
  messageReceptChatBackgroundDark: '#292929',
};

export const fontColor = {
  textColor: 'balck',
  textColorDark: 'gray',
  textColorHeader: 'black',
  textColorHeaderDark: 'white',
};

export const stateColors = {
  success: '#05ed43',
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

export const globalDimensions = {
  borderRadiusButtom: 20,
};

export const globalStyles = StyleSheet.create({
  boxShadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.05,
    elevation: 1,
  },

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
