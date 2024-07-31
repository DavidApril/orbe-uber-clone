import {BSAddCreditCard, CreditCardSelector, CView} from '../../components';

import {usePaymentStore} from '../../../store';
import {View} from 'react-native';

export const MyCardsScreen = () => {
  const {addTarjetBottomSheetRef} = usePaymentStore();

  return (
    <CView
      style={{
        // paddingTop: globalDimensions.paddingTopCheckoutScreens,
        flex: 1,
        flexDirection: 'column',
      }}>
      <CreditCardSelector
        showAddButton
        horizontal={false}
        onAddButtonPress={() => addTarjetBottomSheetRef?.current?.expand()}
      />

      <BSAddCreditCard />

      <View style={{height: 300}} />
    </CView>
  );
};
