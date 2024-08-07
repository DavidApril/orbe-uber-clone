import {Text} from '@ui-kitten/components';
import React from 'react';
import {useColorScheme, View} from 'react-native';
import {globalColors} from '../../theme/styles';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../../../config/i18n/i18n';

export const Stats = () => {
  const {t} = useTranslation()
  return (
    <I18nextProvider i18n={i18n}>
      <View
      style={{
        height: 100,
        marginVertical: 10,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{flexDirection: 'column'}}>
        <Text
          style={{fontWeight: 'bold', color: globalColors.primaryColors.primary, textAlign: 'center', fontSize: 18}}>
          15.34k
        </Text>
        <Text style={{textAlign: 'center'}}>{t('sales')}</Text>
      </View>

      <View
        style={{
          height: '100%',
          marginHorizontal: 25,
          borderRadius: 100,
        }}></View>

      <View style={{flexDirection: 'column'}}>
        <Text
          style={{fontWeight: 'bold', color: globalColors.primaryColors.primary, textAlign: 'center', fontSize: 18}}>
          15.34k
        </Text>
        <Text style={{textAlign: 'center'}}>{t('followers')}</Text>
      </View>

      <View
        style={{
          height: '100%',
          marginHorizontal: 25,
          borderRadius: 100,
        }}></View>

      <View style={{flexDirection: 'column'}}>
        <Text
          style={{fontWeight: 'bold', color: globalColors.primaryColors.primary, textAlign: 'center', fontSize: 18}}>
          15.34k
        </Text>
        <Text style={{textAlign: 'center'}}>{t('products')}</Text>
      </View>
    </View>
    </I18nextProvider>
  );
};
