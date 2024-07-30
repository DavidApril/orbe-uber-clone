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

interface Props
  extends StackScreenProps<RootStackParams, 'ShoppingHistoryScreen'> {}

export const HistoryShoppingScreen = ({navigation}: Props) => {
  const {isDarkMode} = useUIStore();
  const {userByUid} = useAuthStore();

  const {transactionsByUser, setTransactionsByUser} = usePaymentStore();

  const getTransactionsByUser = async (user_uid: string) => {
    const transactions = await PaymentService.getTransactionsByUser(user_uid);
    setTransactionsByUser(transactions);
  };

  useEffect(() => {
    if (userByUid) {
      getTransactionsByUser(userByUid?.uid_firebase);
    }
  }, [userByUid]);

  useEffect(() => {
    console.log({transactionsByUser});
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
          // <Pressable
          //   onPress={() => navigation.navigate('ShoppingHistoryItemScreen')}
          //   style={{
          //     flexDirection: 'row',
          //     justifyContent: 'space-between',
          //     alignItems: 'center',
          //     borderBottomWidth: 1,
          //     borderBottomColor: 'gray',
          //     paddingVertical: 15,
          //   }}>
          //   <View>
          //     <CTextHeader>Titulo</CTextHeader>
          //     <CText>Mensaje</CText>
          //   </View>

          //   <Pressable
          //     onPress={() => navigation.navigate('ShoppingHistoryItemScreen')}>
          //     <CustomIcon
          //       fill={isDarkMode ? 'white' : primaryColors.primary}
          //       name="arrow-ios-forward-outline"
          //     />
          //   </Pressable>
          // </Pressable>
        )}
      />
    </CView>
  );
};
