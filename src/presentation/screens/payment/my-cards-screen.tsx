import {BSAddCreditCard, CreditCardSelector, CView} from '../../components';

import {useAuthStore, usePaymentStore} from '../../../store';
import {useEffect} from 'react';
import {PaymentService} from '../../../services';
import {ScrollView} from 'react-native';
import {View} from 'react-native';

export const MyCardsScreen = () => {
  const {userByUid} = useAuthStore();
  const {creditCardsTokens, setCreditCardsTokens, addTarjetBottomSheetRef} =
    usePaymentStore();

  useEffect(() => {
    if (userByUid) {
      PaymentService.GetPayMethodsUser(userByUid?.uid_firebase).then(
        cardsTokens => {
          // setCreditCardsTokens(cardsTokens)
        },
      );
    }
  }, [userByUid]);

  useEffect(() => {
    console.log({creditCardsTokens});
  }, [creditCardsTokens]);

  return (
    <CView
      style={{
        // paddingTop: globalDimensions.paddingTopCheckoutScreens,
        flex: 1,
        flexDirection: 'column',
      }}>
      <ScrollView style={{flex: 1}}>
        <CreditCardSelector
          horizontal={false}
          onAddButtonPress={() => addTarjetBottomSheetRef?.current?.expand()}
        />

        <BSAddCreditCard />

        <View style={{height: 300}} />
      </ScrollView>
    </CView>
  );
};
