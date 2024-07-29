import {CViewAlpha} from '../ui/custom-view-alpha';
import {Pressable, View} from 'react-native';
import {CustomIcon} from '../ui/custom-icon';
import {globalColors} from '../../theme/styles';
import {CText} from '../ui/custom-text';
import {CTextHeader} from '../ui/custom-text-header';
import {ITransaction, RootStackParams} from '../../../interfaces';
import {currencyFormat} from '../../../utils';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {usePaymentStore} from '../../../store';
import {useEffect} from 'react';

interface Props {
  index: number;
  transaction: ITransaction;
}

export const TransactionItem = ({transaction, index}: Props) => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, 'ShoppingHistoryScreen'>
    >();

  const {transactionSelected, setTransactionSelected} = usePaymentStore();

  useEffect(() => {
    console.log(transaction);
  }, [transactionSelected]);

  return (
    <Pressable
      onPress={() => {
        setTransactionSelected(transaction);
        navigation.navigate('ShoppingHistoryItemScreen');
      }}>
      <CViewAlpha
        style={{
          borderRadius: 3,
          paddingVertical: 15,
          paddingHorizontal: 30,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 5,
        }}>
        <View
          style={{
            gap: 20,
            flexDirection: 'row',
          }}>
          <CustomIcon
            fill={globalColors.stateColors.error}
            height={17}
            name="trending-down-outline"
          />
          <View>
            <CTextHeader style={{fontWeight: 'bold'}}>
              {transaction.description}
            </CTextHeader>
            <CText style={{fontWeight: 'bold'}}>
              - {currencyFormat(+transaction.TotalTransaction)}
            </CText>
          </View>
        </View>
        <CText>{index.toString().padStart(3, '0')}</CText>
      </CViewAlpha>
    </Pressable>
  );
};
