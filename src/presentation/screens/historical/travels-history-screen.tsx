import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {useUIStore} from '../../../store';
import {globalColors} from '../../theme/styles';
import {OpenDrawerMenu} from '../../components';

export const TravelsHistoryScreen = () => {
  const {isDarkMode} = useUIStore();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkMode
          ? globalColors.neutralColors.backgroundDark
          : globalColors.neutralColors.background,
      }}>
      <OpenDrawerMenu />
      <View style={{flex: 1, paddingTop: 90}}>
        <Text
          style={{
            paddingLeft: 30,
            fontSize: 28,
            color: isDarkMode
              ? globalColors.fontColor.textColorHeaderDark
              : globalColors.fontColor.textColorHeader,
          }}>
          Carreras
        </Text>
        <Text
          style={{
            paddingHorizontal: 30,
            color: isDarkMode
              ? globalColors.fontColor.textColorDark
              : globalColors.fontColor.textColor,
          }}>
          Aquí podrás encontrar todos los recorridos que has hecho.
        </Text>
        {/* <FlatList
          style={{paddingHorizontal: 30, marginVertical: 30}}
          data={[0, 1, 2]}
          renderItem={() => <></>}
        /> */}
      </View>
    </View>
  );
};
