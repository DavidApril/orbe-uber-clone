import {Layout, Text} from '@ui-kitten/components';
import { useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';
import i18n from '../../../config/i18n/i18n';
import { neutralColors, primaryColors } from '../../theme/styles';
import { changeLanguage } from '../../../config/i18n/change-language';

export const SettingsScreen = () => {
  const [english, setEnglish] = useState<boolean>(false)
  const {t} = useTranslation()

  const handleLanguage = () => {
    setEnglish(!english)
    if (english) {
      changeLanguage('en')
    } else {
      changeLanguage('es')
    }
  }
  
  return (
    <I18nextProvider i18n={i18n}>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Pressable onPress={handleLanguage} style={{ backgroundColor: primaryColors.primary, padding: 20, borderRadius: 25 }}>
          <Text style={{ color: neutralColors.background, fontWeight: 'bold' }}>{t('change-language')}</Text>
        </Pressable>
      </Layout>
    </I18nextProvider>
  );
};
