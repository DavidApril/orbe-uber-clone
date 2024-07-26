import React from 'react';
import {Text, View} from 'react-native';
import {useUIStore} from '../../../store';
import {globalColors, globalStyles} from '../../theme/styles';

export const CouponCard = () => {
  const {isDarkMode} = useUIStore();

  return (
    <View
      style={[
        {
          marginVertical: 38,
          position: 'relative',
          borderRadius: 30,
          flex: 1,
          width: 340,
          backgroundColor: globalColors.stateColors.success,
          height: 230,
          marginRight: 30,
        },
        globalStyles.boxShadow,
      ]}>
      <View
        style={{
          top: 80,
          bottom: 80,
          borderRadius: 100,
          right: -40,
          width: 80,
          position: 'absolute',
          backgroundColor: !isDarkMode
            ? globalColors.neutralColors.background
            : globalColors.neutralColors.backgroundDark,
        }}
      />
      <View style={{marginLeft: 50, marginTop: 80}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', letterSpacing: 2}}>
          Nescafe
        </Text>
        <Text style={{fontSize: 18}}>Café Mocha</Text>
      </View>
    </View>
  );
};
