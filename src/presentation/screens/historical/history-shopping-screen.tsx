import React from 'react';

import {
  CText,
  CTextHeader,
  CustomIcon,
  CView,
  OpenDrawerMenu,
  TextHeaderScreen,
} from '../../components';
import {FlatList, Pressable, View} from 'react-native';
import {primaryColors} from '../../theme/styles';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../../interfaces';
import {useUIStore} from '../../../store';

interface Props
  extends StackScreenProps<RootStackParams, 'ShoppingHistoryScreen'> {}

export const HistoryShoppingScreen = ({navigation}: Props) => {
  const {isDarkMode} = useUIStore();

  return (
    <CView style={{flex: 1}}>
      <OpenDrawerMenu />
      <TextHeaderScreen
        title="Historial de compras"
        description="Un listado de todas tus compras realizadas..."
      />
      <FlatList
        data={[{title: 'Título 01', message: 'Mensaje 01'}]}
        style={{marginHorizontal: 30, marginVertical: 30}}
        renderItem={({item}) => (
          <Pressable
            onPress={() => navigation.navigate('ShoppingHistoryItemScreen')}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderBottomColor: 'gray',
              paddingVertical: 15,
            }}>
            <View>
              <CTextHeader>Titulo</CTextHeader>
              <CText>Mensaje</CText>
            </View>

            <Pressable
              onPress={() => navigation.navigate('ShoppingHistoryItemScreen')}>
              <CustomIcon
                fill={isDarkMode ? 'white' : primaryColors.primary}
                name="arrow-ios-forward-outline"
              />
            </Pressable>
          </Pressable>
        )}
      />
    </CView>
  );
};
