import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {
  CText,
  CTextHeader,
  CustomIcon,
  CView,
  CViewAlpha,
  OpenDrawerMenu,
} from '../../components';
import {useUIStore} from '../../../store';
import {
  fontColor,
  globalColors,
  globalDimensions,
  grayScale,
} from '../../theme/styles';

export const RefillsScreen = () => {
  const {isDarkMode} = useUIStore();

  return (
    <CView style={{flex: 1, paddingTop: 100, paddingHorizontal: 30}}>
      <OpenDrawerMenu />
      <CTextHeader style={{fontSize: 20, fontWeight: 'bold'}}>
        Cuentas
      </CTextHeader>
      <CViewAlpha
        style={{
          marginVertical: 15,
          height: 200,
          padding: 30,
          borderRadius: globalDimensions.cardBorderRadius,
          backgroundColor: isDarkMode
            ? globalColors.neutralColors.backgroundDarkAlpha
            : globalColors.neutralColors.backgroundAlpha,
        }}>
        <View>
          <CView
            style={{
              height: 45,
              width: 45,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomIcon name="trending-up-outline" />
          </CView>
          <CTextHeader style={{fontSize: 35, fontWeight: 'bold'}}>
            1.430.300
            <CText style={{fontSize: 18, fontWeight: 'normal'}}>cop</CText>
          </CTextHeader>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Pressable
            style={{
              // width: 100,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 8,
              backgroundColor: globalColors.stateColors.success,
            }}>
            <View
              style={{
                // color: grayScale.white,
                flexDirection: 'row',
                gap: 10,
              }}>
              <CustomIcon name="plus-circle-outline" />
              <Text style={{fontWeight: 'bold'}}>Recargar</Text>
            </View>
          </Pressable>
        </View>
      </CViewAlpha>
    </CView>
  );
};
