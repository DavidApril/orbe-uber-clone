import React, {useEffect} from 'react';
import {CTextHeader} from '../ui/custom-text-header';
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {CreditCard} from '../wallet/credit-card';
import {CViewAlpha} from '../ui/custom-view-alpha';
import {CustomIcon} from '../ui/custom-icon';
import {globalDimensions} from '../../theme/styles';
import {usePaymentStore} from '../../../store';
import {CText} from '../ui/custom-text';

interface Props {
  onAddButtonPress: () => void;
  horizontal?: boolean;
}

export const CreditCardSelector = ({
  onAddButtonPress,
  horizontal = true,
}: Props) => {
  const {creditCardsTokens} = usePaymentStore();

  useEffect(() => {
    console.log({creditCardsTokens});
  }, []);

  return (
    <ScrollView style={{marginHorizontal: 30, position: 'relative', flex: 1}}>
      <CTextHeader style={{fontWeight: '100', fontSize: 20, marginBottom: 15}}>
        Método de pago
      </CTextHeader>

      <View
        style={{
          height: creditCardsTokens.length === 0 ? 200 : 500,
          width: '100%',
          flex: 1,
        }}>
        <View
          style={{
            position: 'absolute',
            flex: 1,
            height: 390,
            alignSelf: 'center',
          }}>
          {creditCardsTokens.length === 0 && (
            <CText style={{marginTop: 30}}>No hay métodos agregados...</CText>
          )}
          <FlatList
            horizontal={horizontal}
            data={creditCardsTokens}
            renderItem={({item: creditCard}) => (
              <CreditCard creditCard={creditCard} />
            )}
          />
        </View>

        <Pressable
          onPress={() => onAddButtonPress()}
          style={{
            height: 80,
            flex: 1,
            position: 'absolute',
            zIndex: 999,
            bottom: 15,
            left: 15,
            right: 15,
          }}>
          <CViewAlpha
            style={{
              borderRadius: 10,
              opacity: 0.7,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              gap: 10,
            }}>
            <CustomIcon name="plus-circle-outline" />
            <CTextHeader style={{fontWeight: 'bold', letterSpacing: 1}}>
              AÑADIR
            </CTextHeader>
          </CViewAlpha>
        </Pressable>

        <ImageBackground
          style={{
            borderRadius: globalDimensions.cardBorderRadius,
            zIndex: -10,
            height: '100%',
            overflow: 'hidden',
          }}>
          <Image
            source={require('../../../assets/white-gradient.webp')}
            style={{width: '100%', height: '100%'}}
          />
        </ImageBackground>
      </View>
    </ScrollView>
  );
};
