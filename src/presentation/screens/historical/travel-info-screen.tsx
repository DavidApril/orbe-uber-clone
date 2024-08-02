import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {globalColors, globalDimensions} from '../../theme/styles';
import {useUIStore} from '../../../store';
import {CustomIcon} from '../../components';

export const TravelInfoScreen = () => {
  const {isDarkMode} = useUIStore();

  return (
    <View
      style={{
        marginBottom: 5,
        borderRadius: globalDimensions.borderRadiusButtom,
        height: 180,
        paddingHorizontal: 30,
        position: 'relative',
        paddingVertical: 10,
        overflow: 'hidden',
        backgroundColor: isDarkMode
          ? globalColors.neutralColors.backgroundDarkAlpha
          : globalColors.neutralColors.backgroundAlpha,
      }}>
      <Pressable
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          paddingHorizontal: 10,
          backgroundColor: isDarkMode
            ? globalColors.grayScale.gray
            : globalColors.grayScale.gray,
          justifyContent: 'center',
        }}>
        <CustomIcon name="arrow-ios-forward-outline" />
      </Pressable>

      <Text
        style={{
          fontSize: 14,
          color: isDarkMode
            ? globalColors.fontColor.textColorHeaderDark
            : globalColors.fontColor.textColorHeader,
        }}>
        03 Octubre
      </Text>

      <View
        style={{
          paddingLeft: 15,
          marginVertical: 10,
          flexDirection: 'column',
          gap: 8,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
          <Text
            style={{
              height: 30,
              width: 30,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
              backgroundColor: 'black',
              fontWeight: 'bold',
              textAlign: 'center',
              textAlignVertical: 'center',
            }}>
            A
          </Text>
          <CustomIcon name="pin" />
          <Text>Cra13 #11-23</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
          <Text
            style={{
              height: 30,
              width: 30,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
              backgroundColor: 'black',
              fontWeight: 'bold',
              textAlignVertical: 'center',
              textAlign: 'center',
            }}>
            B
          </Text>
          <CustomIcon name="pin" />
          <Text>Cra13 #11-23</Text>
        </View>
      </View>
    </View>
  );
};
