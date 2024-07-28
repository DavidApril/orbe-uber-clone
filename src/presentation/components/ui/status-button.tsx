import React from 'react';
import {globalColors, globalDimensions} from '../../theme/styles';
import {Pressable, Text, useColorScheme, View} from 'react-native';

export const StatusButton = ({isActive}: {isActive: boolean}) => {
  const colorSchema = useColorScheme();

  return (
    <Pressable
      style={{
        paddingVertical: 10,
        paddingHorizontal: 25,
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        borderRadius: globalDimensions.borderRadiusButtom,
        backgroundColor:
          colorSchema === 'light'
            ? globalColors.neutralColors.backgroundAlpha
            : globalColors.neutralColors.backgroundDarkAlpha,
      }}>
      <View
        style={{
          height: 5,
          width: 5,
          borderRadius: 100,
          backgroundColor: isActive
            ? globalColors.stateColors.success
            : globalColors.stateColors.error,
        }}
      />
      <Text
        style={{
          color:
            colorSchema === 'light'
              ? globalColors.fontColor.textColorHeader
              : globalColors.fontColor.textColorHeaderDark,
        }}>
        status
      </Text>
    </Pressable>
  );
};
