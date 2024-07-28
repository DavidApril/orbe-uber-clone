import {Text} from '@ui-kitten/components';
import {View} from 'react-native';
import {fontColor, globalStyles} from '../../theme/styles';
import {useUIStore} from '../../../store';

interface Props {
  selected?: boolean;
}

export const CreditCard = ({selected}: Props) => {
  var creditCardInfo = {
    'card[number]': '**** **** **** 0326',
    'card[exp_year]': '2025',
    'card[exp_month]': '12',
    'card[cvc]': '123',
    hasCvv: true, //hasCvv: validar codigo de seguridad en la transacción
  };

  const {isDarkMode} = useUIStore();

  return (
    <View
      style={[
        {
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
          // backgroundColor: 'white',

          elevation: 11,
        },
        globalStyles.boxShadow,
      ]}>
      <Text style={{position: 'absolute', top: 25, left: 28}}>
        {creditCardInfo['card[exp_year]']}
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
        {creditCardInfo['card[number]']}
      </Text>
      <Text
        style={{
          position: 'absolute',
          left: 28,
          bottom: 35,
          color: isDarkMode ? fontColor.textColorDark : fontColor.textColor,
        }}>
        {creditCardInfo['card[exp_year]']}
      </Text>

      <Text
        style={{
          position: 'absolute',
          color: isDarkMode ? fontColor.textColorDark : fontColor.textColor,
          right: 28,
          bottom: 35,
        }}>
        {creditCardInfo['card[cvc]']}
      </Text>
    </View>
  );
};
