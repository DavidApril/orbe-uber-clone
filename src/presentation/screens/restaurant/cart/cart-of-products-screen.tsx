import {useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  useWindowDimensions,
  Pressable,
  TouchableOpacity,
} from 'react-native';

import {RootStackParams} from '../../../../interfaces';
import {StackScreenProps} from '@react-navigation/stack';
import {useCartStore, useUIStore} from '../../../../store';
import {
  CartItem,
  CustomIcon,
  FABGoBackButton,
  OpenDrawerMenu,
  PaymentControllers,
} from '../../../components';
import {globalColors, globalDimensions} from '../../../theme/styles';
import BottomSheet from '@gorhom/bottom-sheet';
import {Divider} from '@ui-kitten/components';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../../../../config/i18n/i18n';

interface Props
  extends StackScreenProps<RootStackParams, 'CartOfProductsScreen'> {}

export const CartOfProductsScreen = ({navigation}: Props) => {
  const {height} = useWindowDimensions();
  const {isDarkMode} = useUIStore();
  const {cart, getSummaryInformation} = useCartStore();

  const snapPoints = useMemo(() => ['28%', '80%'], []);
  const summaryBottomSheetRef = useRef<BottomSheet>(null);
  const {t} = useTranslation()

  return (
    <>
      <OpenDrawerMenu />
      <FABGoBackButton />
      <I18nextProvider i18n={i18n}>
      <View
        style={{
          flex: 1,
          backgroundColor: isDarkMode
            ? globalColors.neutralColors.backgroundDark
            : globalColors.neutralColors.background,
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: 50,
        }}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={{marginBottom: 20, marginHorizontal: 30}}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: !isDarkMode
                  ? globalColors.primaryColors.primary
                  : globalColors.primaryColors.primary,
              }}>
              {t('products')}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: !isDarkMode
                  ? globalColors.fontColor.textColor
                  : globalColors.fontColor.textColorDark,
              }}>
              {t('a-list-of-all-the-products-in-the-cart')}
            </Text>
          </View>
          <View
            style={{
              height: height * 0.74,
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              width: '100%',
              padding: 30,
              backgroundColor: isDarkMode
                ? globalColors.neutralColors.backgroundDarkAlpha
                : globalColors.neutralColors.backgroundAlpha,
            }}>
            {cart.length > 0 ? (
              <FlatList
                data={cart}
                style={{
                  gap: 10,
                  flexDirection: 'column',
                }}
                renderItem={({item}) => <CartItem item={item} />}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: !isDarkMode
                      ? globalColors.neutralColors.backgroundDarkAlpha
                      : globalColors.neutralColors.backgroundAlpha,
                  }}>
                  {t('there-are-no-products-in-the-cart')}
                </Text>
                <Pressable
                  onPress={() => navigation.navigate('HomeScreen')}
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 25,
                    borderRadius: globalDimensions.borderRadiusButtom,
                    backgroundColor: globalColors.primaryColors.primary,
                    marginVertical: 10,
                  }}>
                  <Text style={{color: '#eee'}}>{t('see-restaurants')}</Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>

        {cart.length > 0 && (
          <BottomSheet
            ref={summaryBottomSheetRef}
            backgroundStyle={{
              backgroundColor: isDarkMode
                ? globalColors.neutralColors.backgroundDark
                : globalColors.neutralColors.background,
            }}
            handleStyle={{
              borderTopRightRadius: 50,
              borderTopLeftRadius: 50,
              backgroundColor: isDarkMode
                ? globalColors.grayScale.black
                : globalColors.grayScale.white,
            }}
            style={{borderTopRightRadius: 100}}
            snapPoints={snapPoints}>
            <View
              style={{
                height: height * 0.8,
                backgroundColor: isDarkMode
                  ? globalColors.grayScale.black
                  : globalColors.grayScale.white,
              }}>
              <Text
                style={{
                  paddingLeft: 30,
                  marginVertical: 20,
                  fontSize: 30,
                  fontWeight: 'bold',
                  color: isDarkMode
                    ? globalColors.fontColor.textColorHeaderDark
                    : globalColors.fontColor.textColorHeader,
                }}>
                {t('pay-here')}
              </Text>

              <Divider style={{marginVertical: 10}} />

              <PaymentControllers />
            </View>
          </BottomSheet>
        )}
      </View>
      </I18nextProvider>
    </>
  );
};
