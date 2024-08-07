import {Divider, Radio, RadioGroup, Text} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {Pressable, useWindowDimensions, View} from 'react-native';
import {currencyFormat, parseDate} from '../../../utils';
import {
  useCartStore,
  useCouponStore,
  usePaymentStore,
  useUIStore,
} from '../../../store';
import {
  fontColor,
  globalColors,
  globalDimensions,
  neutralColors,
  stateColors,
} from '../../theme/styles';
import {CustomIcon} from '../ui/custom-icon';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../../../interfaces';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../../../config/i18n/i18n';

export const PaymentControllers = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParams, 'ProductScreen'>>();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const {width} = useWindowDimensions();
  const {isDarkMode} = useUIStore();
  const {couponToUse} = useCouponStore();
  const {getSummaryInformation} = useCartStore();
  const {
    subTotal: subtotal,
    tax,
    total,
    discount,
  } = getSummaryInformation(couponToUse?.value);

  const {setPayWithCard} = usePaymentStore();
  const {t} = useTranslation()

  useEffect(() => {
    if (selectedIndex === 0) {
      setPayWithCard(true);
    } else {
      setPayWithCard(false);
    }
  }, [selectedIndex]);

  return (
    <I18nextProvider i18n={i18n}>
      <View
      style={{
        padding: 30,
        backgroundColor: isDarkMode
          ? globalColors.grayScale.black
          : globalColors.grayScale.white,
        width,
        bottom: 0,
      }}>
      <View
        style={{
          height: 140,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          borderWidth: 10,
          borderColor: isDarkMode
            ? globalColors.neutralColors.backgroundDarkAlpha
            : neutralColors.backgroundAlpha,
          backgroundColor: isDarkMode
            ? globalColors.neutralColors.backgroundDarkAlpha
            : neutralColors.backgroundAlpha,
          borderRadius: globalDimensions.borderRadiusButtom,
          position: 'relative',
        }}>
        {couponToUse ? (
          <Pressable
            style={{
              height: 120,
              width: '100%',
              borderWidth: 2,
              borderColor: stateColors.success,

              right: 0,
              borderRadius: globalDimensions.borderRadiusButtom,
              backgroundColor: isDarkMode
                ? neutralColors.backgroundDark
                : neutralColors.background,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                paddingTop: 50,
                paddingLeft: 20,
                color: stateColors.error,
              }}>
              {couponToUse?.name}
            </Text>
            <View
              style={{
                paddingHorizontal: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: isDarkMode
                    ? fontColor.textColorDark
                    : fontColor.textColor,
                }}>
                {parseDate(couponToUse?.endDate)}
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: isDarkMode
                    ? fontColor.textColorDark
                    : fontColor.textColor,
                }}>
                {couponToUse.value}%
              </Text>
            </View>
            <View style={{position: 'absolute', right: 14, top: 14}}>
              <CustomIcon fill={stateColors.warning} name="award" />
            </View>
          </Pressable>
        ) : (
          <Text>{t('there-are-no-coupons-in-use')}</Text>
        )}
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <Pressable
          onPress={() => navigation.navigate('CouponsScreen')}
          style={{
            borderRadius: globalDimensions.borderRadiusButtom,
            paddingHorizontal: 30,
            paddingTop: 10,
            width: 180,
            flex: 0,
          }}>
          <Text
            style={{
              textAlign: 'right',
              color: globalColors.primaryColors.primary,
              fontWeight: 'bold',
            }}>
            {t('view-coupons')}
          </Text>
        </Pressable>
      </View>

      {discount !== 0 && (
        <>
          <Divider style={{marginVertical: 20}} />
          <Text>
            {t('coupon-discount')}:{' '}
            <Text style={{color: stateColors.warning, fontWeight: 'bold'}}>
              {currencyFormat(discount)}
            </Text>
          </Text>
          <Divider style={{marginVertical: 20}} />
        </>
      )}

      <Text style={{}}>IVA: {currencyFormat(tax)}</Text>
      <Text style={{}}>Subtotal: {currencyFormat(subtotal)}</Text>

      <Divider style={{marginVertical: 10}} />

      <Text style={{fontWeight: 'bold'}}>
        Total:{' '}
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 24,
            color: isDarkMode
              ? globalColors.fontColor.textColorHeaderDark
              : globalColors.fontColor.textColorHeader,
          }}>
          {currencyFormat(total ?? 0)}
        </Text>
      </Text>

      <View style={{flexDirection: 'column', gap: 10, marginVertical: 10}}>
        <View>
          <RadioGroup
            selectedIndex={selectedIndex}
            onChange={index => setSelectedIndex(index)}
            style={{flexDirection: 'row', gap: 10}}>
            <Radio
              style={{
                flex: 1,
                paddingVertical: 20,
                paddingHorizontal: 20,
                borderRadius: 10,
                shadowColor: '#717171',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.18,
                shadowRadius: 4.59,
                elevation: 2,
                backgroundColor: isDarkMode
                  ? globalColors.neutralColors.backgroundDarkAlpha
                  : globalColors.neutralColors.backgroundAlpha,
              }}>
              <Text>{t('credit')}</Text>
            </Radio>
            <Radio
              style={{
                flex: 1,
                paddingVertical: 20,
                paddingHorizontal: 20,
                borderRadius: 10,
                shadowColor: '#717171',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.18,
                shadowRadius: 4.59,
                elevation: 2,
                backgroundColor: isDarkMode
                  ? globalColors.neutralColors.backgroundDarkAlpha
                  : globalColors.neutralColors.backgroundAlpha,
              }}>
              <Text>{t('cash')}</Text>
            </Radio>
          </RadioGroup>
        </View>

        <Pressable
          onPress={() => navigation.navigate('CheckoutScreen')}
          style={{
            backgroundColor: globalColors.primaryColors.primary,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 20,
            borderRadius: globalDimensions.borderRadiusButtom,
          }}>
          <Text
            style={{
              fontSize: 17,
              color: globalColors.neutralColors.background,
            }}>
            {t('pay')}
          </Text>
        </Pressable>
      </View>
    </View>
    </I18nextProvider>
  );
};
