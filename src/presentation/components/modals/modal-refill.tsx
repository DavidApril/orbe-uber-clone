import React, {useEffect, useState} from 'react';
import {CModal} from '../ui/custom-modal';
import {CViewAlpha} from '../ui/custom-view-alpha';
import {FlatList, Pressable, Text, TextInput, View} from 'react-native';
import {parseNumberToText, parseTextToNumber} from '../../../utils';
import {globalColors, stateColors} from '../../theme/styles';
import {CTextHeader} from '../ui/custom-text-header';
import {CreditCard} from '../wallet/credit-card';
import {useAuthStore, usePaymentStore, useUIStore} from '../../../store';
import {Spinner} from '@ui-kitten/components';
import {ModalPaying} from './modal-paying-loader';
import {PaymentService} from '../../../services';

interface Props {
  isOpenRefillModal: boolean;
  setIsOpenRefillModals: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalRefill = ({
  isOpenRefillModal,
  setIsOpenRefillModals,
}: Props) => {
  const {isDarkMode} = useUIStore();

  const {userByUid} = useAuthStore();
  const [isRecharging, setIsRecharging] = useState<boolean>(false);
  const {rechargeValue, setRechargeValue, creditCardsTokens} =
    usePaymentStore();

  const handleRecharge = async () => {
    setIsRecharging(true);
    await PaymentService.rechagePoints({
      value: '50000',
      docType: 'CC',
      docNumber: '123456789',
      name: 'Juan',
      lastName: 'Pérez',
      email: 'juan.perez@example.com',
      cellPhone: '3001234567',
      phone: '1234567',
      cardNumber: '123323123123123',
      cardExpYear: '2025',
      cardExpMonth: '12',
      cardCvc: '123',
      dues: '12',
      userUid: userByUid?.uid_firebase,
      description: 'Pago de prueba',
      typeTransaction: 'Compra',
      methodPay: 'Tarjeta de Crédito',
      details: [],
    });
    // setIsRecharging(false);
  };

  return (
    <CModal isOpen={isOpenRefillModal} setIsOpen={setIsOpenRefillModals}>
      <CViewAlpha
        style={{
          height: '75%',
          width: '90%',
          borderRadius: 20,
          padding: 30,
        }}>
        <TextInput
          value={rechargeValue}
          keyboardType="numeric"
          onChangeText={value => {
            if (!isNaN(+value)) {
              setRechargeValue(value);
            }
          }}
          cursorColor={globalColors.primaryColors.primary}
          placeholderTextColor={
            isDarkMode
              ? globalColors.fontColor.textColorDark
              : globalColors.fontColor.textColor
          }
          style={{
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            fontSize: 60,
            textAlign: 'right',
            fontWeight: 'bold',
            letterSpacing: 2,
          }}
        />

        <View
          style={[
            {
              height: 1,
              width: '100%',
              backgroundColor: isDarkMode ? '#424241' : 'white',
              borderRadius: 50,
              marginBottom: 40,
            },
            // globalStyles.boxShadow,
            {
              shadowColor: '#000000',
              shadowOffset: {
                width: 20,
                height: 10,
              },
              shadowOpacity: 0.15,
              shadowRadius: 0.1,
              elevation: 5,
            },
          ]}
        />

        <CTextHeader style={{fontSize: 20, fontWeight: 'bold'}}>
          Método
        </CTextHeader>
        <View>
          <FlatList
            data={creditCardsTokens}
            horizontal
            renderItem={({item: creditCard}) => (
              <CreditCard creditCard={creditCard} />
            )}
          />
        </View>

        <ModalPaying />

        <Pressable
          onPress={handleRecharge}
          style={{
            overflow: 'hidden',
            height: 50,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20,
            backgroundColor: stateColors.success,
          }}>
          {isRecharging ? (
            <Spinner status="basic" />
          ) : (
            <Text style={{fontWeight: 'bold', fontSize: 17}}>Recargar</Text>
          )}
        </Pressable>
        <Pressable
          onPress={() => setIsOpenRefillModals(false)}
          style={{
            position: 'absolute',
            bottom: 0,
            right: 30,
            left: 30,
            height: 50,
          }}>
          <Text
            style={{
              textAlign: 'right',
              color: isDarkMode ? 'white' : 'black',
            }}>
            Cerrar
          </Text>
        </Pressable>
      </CViewAlpha>
    </CModal>
  );
};
