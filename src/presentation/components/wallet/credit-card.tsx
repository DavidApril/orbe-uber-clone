import {CheckBox, Radio, Text} from '@ui-kitten/components';
import {Pressable, View} from 'react-native';
import {fontColor, globalStyles} from '../../theme/styles';
import {usePaymentStore, useUIStore} from '../../../store';
import {ICreditCard} from '../../../interfaces';

interface Props {
  creditCard: ICreditCard;
}

export const CreditCard = ({creditCard}: Props) => {

  const {creditCardsSelected, setCreditCardsSelected} = usePaymentStore();

  const {isDarkMode} = useUIStore();

  const isSelected = creditCard.id === creditCardsSelected?.id;

  return (
    <Pressable style={{flexDirection: 'row'}}>
      <Pressable
        onPress={() => setCreditCardsSelected(creditCard)}
        style={[
          {
            opacity: isSelected ? 1 : 0.4,
            backgroundColor: isDarkMode ? 'black' : 'white',
            overflow: 'visible',
            padding: 15,
            height: 180,
            width: 260,
            position: 'relative',
            margin: 15,
            borderRadius: 11,
            shadowColor: '#000000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.19,
            shadowRadius: 5.62,
            elevation: 11,
          },
          globalStyles.boxShadow,
        ]}>
        <Text style={{position: 'absolute', top: 25, left: 28}}>
          VISA
        </Text>
        <Text
          style={{
            color: isDarkMode
              ? fontColor.textColorHeaderDark
              : fontColor.textColorHeader,
            position: 'absolute',
            left: 28,
            bottom: 60,
            fontWeight: 'bold',
            letterSpacing: 1,
            fontSize: 15,
          }}>
            **** **** **** ****
        </Text>
        <Text
          style={{
            position: 'absolute',
            left: 28,
            bottom: 35,
            color: isDarkMode ? fontColor.textColorDark : fontColor.textColor,
          }}>
          {creditCard.bank}
        </Text>

        <Text
          style={{
            position: 'absolute',
            color: isDarkMode ? fontColor.textColorDark : fontColor.textColor,
            right: 28,
            bottom: 35,
          }}>
          {creditCard.id}
        </Text>
      </Pressable>
      <Radio checked={isSelected} />
    </Pressable>
  );
};
