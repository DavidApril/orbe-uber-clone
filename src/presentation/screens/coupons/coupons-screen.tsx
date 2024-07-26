import React from 'react';
import {FlatList, ScrollView, Text, View} from 'react-native';
import {globalColors} from '../../theme/styles';
import {CouponCard, FABGoBackButton} from '../../components';
import {useAuthStore, useUIStore} from '../../../store';

export const CouponsScreen = () => {
  const {isDarkMode} = useUIStore();
  const {userByUid} = useAuthStore();
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: !isDarkMode
            ? globalColors.neutralColors.background
            : globalColors.neutralColors.backgroundDark,
        }}>
        <FABGoBackButton />
        <View
          style={{
            flex: 1,
            paddingTop: 90,
          }}>
          <View
            style={{
              flex: 1,
              padding: 30,
            }}>
            <View
              style={{
                height: 100,
                justifyContent: 'flex-end',

                gap: 10,
              }}>
              <Text
                style={{
                  fontWeight: 'black',
                  fontSize: 20,
                  color: !isDarkMode
                    ? globalColors.fontColor.textColor
                    : globalColors.fontColor.textColorDark,
                }}>
                {userByUid?.cliente.name},
              </Text>
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: 'bold',
                  color: !isDarkMode
                    ? globalColors.fontColor.textColorHeader
                    : globalColors.fontColor.textColorHeaderDark,
                }}>
                Tienes{' '}
                <Text
                  style={{
                    color: globalColors.stateColors.warning,
                    marginHorizontal: 10,
                    paddingHorizontal: 10,
                    fontSize: 50,
                  }}>
                  45
                </Text>{' '}
                creditos
              </Text>
            </View>
            <FlatList
              horizontal
              data={['1', '2', '3']}
              renderItem={() => <CouponCard />}></FlatList>
          </View>
        </View>
      </View>
    </>
  );
};
