import React, {useEffect} from 'react';
import {
  CText,
  CTextHeader,
  CViewAlpha,
  FABGoBackButton,
  OpenDrawerMenu,
  TextHeaderScreen,
  TransactionItem,
} from '../../components';
import {RootStackParams} from '../../../interfaces';
import {StackScreenProps} from '@react-navigation/stack';
import {usePaymentStore} from '../../../store';
import {LoadingScreen} from '../loading/loading-screen';
import {Text, useWindowDimensions} from 'react-native';
import {parseDate, parseTextToNumber} from '../../../utils';
import {View} from 'react-native';
import {stateColors} from '../../theme/styles';

interface Props
  extends StackScreenProps<RootStackParams, 'ShoppingHistoryItemScreen'> {}

export const ShoppingHistoryItemScreen = ({navigation}: Props) => {
  const {transactionSelected: transaction} = usePaymentStore();
  const {fontScale} = useWindowDimensions();

  useEffect(() => {
    if (!transaction) {
      navigation.goBack();
    }
  }, [transaction]);

  return transaction ? (
    <CViewAlpha style={{flex: 1}}>
      <FABGoBackButton />
      <TextHeaderScreen
        title={transaction.id.toString().padStart(3, '0')}
        description={transaction.description}
      />

      <View style={{paddingHorizontal: 30, flex: 1}}>
        <CTextHeader style={{fontSize: fontScale * 90, fontWeight: 'bold'}}>
          {parseTextToNumber(transaction.TotalTransaction)}
          <Text style={{fontWeight: '300', fontSize: 20}}>COP</Text>
        </CTextHeader>

        <TransactionItem index={transaction.id} transaction={transaction} />

        <CTextHeader style={{color: stateColors.success}}>
          Productos
        </CTextHeader>

        {transaction.detailsPayment.map(detail => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <CText>{detail.key}</CText>
            <CText>{detail.value}</CText>
          </View>
        ))}
      </View>
      <CText
        style={{
          marginBottom: 30,
          marginHorizontal: 30,
          fontSize: fontScale * 14,
        }}>
        {parseDate(transaction.created_date)}
      </CText>
    </CViewAlpha>
  ) : (
    <LoadingScreen />
  );
};
