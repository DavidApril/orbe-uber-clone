import React, {useEffect} from 'react';

import {
  CView,
  OpenDrawerMenu,
  TextHeaderScreen,
  TransactionItem,
} from '../../components';
import {FlatList, Pressable, View} from 'react-native';
import {primaryColors} from '../../theme/styles';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../../interfaces';
import {useAuthStore, usePaymentStore, useUIStore} from '../../../store';
import {PaymentService} from '../../../services';
import {useIsFocused} from '@react-navigation/native';

interface Props
  extends StackScreenProps<RootStackParams, 'PurchasesHistoryScreen'> {}

export const PurchasesHistoryScreen = ({navigation}: Props) => {
  // const {isDarkMode} = useUIStore();
  const {transactionsByUser, setTransactionsByUser} = usePaymentStore();
  const {userByUid} = useAuthStore();

  const isFocused = useIsFocused();

  useEffect(() => {
    PaymentService.getTransactionsByUser(userByUid!.uid_firebase).then(
      transactions => {
        setTransactionsByUser(transactions);
      },
    );
  }, [isFocused]);

  useEffect(() => {
    console.log(userByUid?.uid_firebase);
  }, [transactionsByUser]);

  return (
    <CView style={{flex: 1}}>
      <OpenDrawerMenu />
      <TextHeaderScreen
        title="Historial de compras"
        description="Un listado de todas tus compras realizadas..."
      />
      <FlatList
        data={transactionsByUser}
        style={{marginHorizontal: 30, marginVertical: 30}}
        renderItem={({item, index}) => (
          <TransactionItem index={index} transaction={item} />
        )}
      />
    </CView>
  );
};
