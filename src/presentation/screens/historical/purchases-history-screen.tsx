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
import { useTranslation } from 'react-i18next';

interface Props
  extends StackScreenProps<RootStackParams, 'PurchasesHistoryScreen'> {}

export const PurchasesHistoryScreen = ({navigation}: Props) => {
  // const {isDarkMode} = useUIStore();
  const {transactionsByUser, setTransactionsByUser} = usePaymentStore();
  const {userByUid} = useAuthStore();

  const isFocused = useIsFocused();
  const {t} = useTranslation()

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
        title={t("shopping-history")}
        description={t("a-list-of-all-your-purchases-made")}
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
