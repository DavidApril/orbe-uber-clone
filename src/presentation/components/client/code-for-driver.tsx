import React from 'react';
import {View} from 'react-native';
import {globalDimensions, neutralColors} from '../../theme/styles';
import {CText} from '../ui/custom-text';
import {CTextHeader} from '../ui/custom-text-header';
import {useUIStore} from '../../../store';

export const CodeForDriver = () => {
  const {isDarkMode} = useUIStore();

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 120,
        height: 120,
        left: 30,
        right: 30,
        flex: 1,
        justifyContent: 'center',
        opacity: 0.9,
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: globalDimensions.cardBorderRadius,
        backgroundColor: isDarkMode
          ? neutralColors.backgroundDarkAlpha
          : neutralColors.backgroundAlpha,
      }}>
      <CText>Código del cliente</CText>
      <CTextHeader style={{fontSize: 40, letterSpacing: 10}}>
        XJK5Z2
      </CTextHeader>
    </View>
  );
};
