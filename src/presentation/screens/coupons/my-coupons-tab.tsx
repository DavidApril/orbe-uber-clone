import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {globalColors} from '../../theme/styles';
import {BuyCouponSelected, CouponCard, FABGoBackButton} from '../../components';
import {useAuthStore, useCouponStore, useUIStore} from '../../../store';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../../interfaces';

export const MyCouponsTab = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const {isDarkMode} = useUIStore();
  const {userByUid} = useAuthStore();
  const {myCoupons, setMyCoupons, setCouponToUse, couponToUse} =
    useCouponStore();

  useEffect(() => {
    if (userByUid) {
      setMyCoupons(userByUid.cupons);
    }
  }, [userByUid]);

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
              data={myCoupons}
              style={{height: 300}}
              renderItem={({item}) => (
                <CouponCard
                  onPress={() => setCouponToUse(item)}
                  coupon={item}
                />
              )}></FlatList>

            {couponToUse && (
              <BuyCouponSelected
                bottomName="Utilizar cupón"
                onPressDelete={() => setCouponToUse(null)}
                couponSelected={couponToUse}
                onPress={() => {
                  navigation.goBack();
                }}
              />
            )}
          </View>
        </View>
      </View>
    </>
  );
};
