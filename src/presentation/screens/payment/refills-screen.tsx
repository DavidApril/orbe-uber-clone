import React, {useState} from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  CModal,
  CreditCard,
  CText,
  CTextHeader,
  CustomIcon,
  CView,
  CViewAlpha,
  ModalRefill,
  OpenDrawerMenu,
  TransactionItem,
} from '../../components';
import {usePaymentStore, useUIStore} from '../../../store';
import {globalColors, globalDimensions, stateColors} from '../../theme/styles';
import {parseNumberToText, parseTextToNumber} from '../../../utils';

export const RefillsScreen = () => {
  const {isDarkMode} = useUIStore();
  const [isOpenRefillModal, setIsOpenRefillModals] = useState<boolean>(false);
  const [refillValue, setRefillValue] = useState<number>(0);

  const {transactionsByUser, creditCardsTokens} = usePaymentStore();
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: isDarkMode
          ? globalColors.neutralColors.backgroundDark
          : globalColors.neutralColors.background,
      }}>
      <CView style={{flex: 1, paddingTop: 100, paddingHorizontal: 30}}>
        <OpenDrawerMenu />
        <CTextHeader style={{fontSize: 20, fontWeight: 'bold'}}>
          Cuentas
        </CTextHeader>
        <CViewAlpha
          style={{
            marginVertical: 15,
            height: 200,
            padding: 30,
            borderRadius: globalDimensions.cardBorderRadius,
          }}>
          <View>
            <CView
              style={{
                height: 45,
                width: 45,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CustomIcon name="trending-up-outline" />
            </CView>
            <CTextHeader style={{fontSize: 35, fontWeight: 'bold'}}>
              1.430.300
              <CText style={{fontSize: 18, fontWeight: 'normal'}}>cop</CText>
            </CTextHeader>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Pressable
              onPress={() => setIsOpenRefillModals(true)}
              style={{
                // width: 100,
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 8,
                backgroundColor: globalColors.stateColors.success,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                }}>
                <CustomIcon fill="white" name="plus-circle-outline" />
                <Text style={{fontWeight: 'bold'}}>Recargar</Text>
              </View>
            </Pressable>
          </View>
        </CViewAlpha>

        <CText style={{marginBottom: 5, paddingLeft: 12}}>Transacciones</CText>

        <FlatList
          data={transactionsByUser}
          style={{height: 400}}
          renderItem={({item: transaction, index}) => (
            <TransactionItem index={index} transaction={transaction} />
          )}
        />

        <ModalRefill
          isOpenRefillModal={isOpenRefillModal}
          setIsOpenRefillModals={setIsOpenRefillModals}
        />
      </CView>
    </ScrollView>
  );
};
