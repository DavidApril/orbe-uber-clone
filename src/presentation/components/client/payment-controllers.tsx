import {
  Button,
  Divider,
  Input,
  Radio,
  RadioGroup,
  Text,
} from '@ui-kitten/components';
import React, {useState} from 'react';
import {useWindowDimensions, View} from 'react-native';
import {CustomIcon} from '../ui/custom-icon';
import {currencyFormat} from '../../../utils';
import {useUIStore} from '../../../store';
import {globalColors} from '../../theme/styles';

interface Props {
  subtotal: number;
  total: number;
  shipping: number;
  itemsInCart: number;
  tax: number;
}

export const PaymentControllers = ({subtotal, total, shipping}: Props) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const {width} = useWindowDimensions();
  const {isDarkMode} = useUIStore();

  return (
    <View
      style={{
        padding: 30,
        backgroundColor: isDarkMode
          ? globalColors.grayScale.black
          : globalColors.grayScale.white,
        width,
        bottom: 0,
      }}>
      <Input
        style={{borderRadius: 20}}
        accessoryLeft={<CustomIcon fill="gray" name="award" />}
        placeholder="Promo code"
      />

      <Divider style={{marginVertical: 20}} />

      <Text style={{}}>Subtotal: {currencyFormat(subtotal)}</Text>
      <Text style={{}}>Envío: {currencyFormat(shipping)} </Text>

      <Divider style={{marginVertical: 10}} />

      <Text style={{}}>
        Total:{' '}
        <Text style={{fontWeight: 'bold', fontSize: 24, color: 'black'}}>
          {currencyFormat(total ?? 0)}
        </Text>
      </Text>

      <View style={{flexDirection: 'column', gap: 10, marginVertical: 10}}>
        <View>
          <RadioGroup
            selectedIndex={selectedIndex}
            onChange={index => setSelectedIndex(index)}
            style={{flexDirection: 'row', gap: 10}}>
            <Radio
              style={{
                flex: 1,
                paddingVertical: 20,
                paddingHorizontal: 20,
                borderRadius: 10,
                shadowColor: '#717171',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.18,
                shadowRadius: 4.59,
                elevation: 2,
                backgroundColor: 'white',
              }}>
              <Text>Crédito</Text>
            </Radio>
            <Radio
              style={{
                flex: 1,
                paddingVertical: 20,
                paddingHorizontal: 20,
                borderRadius: 10,
                shadowColor: '#717171',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.18,
                shadowRadius: 4.59,
                elevation: 2,
                backgroundColor: 'white',
              }}>
              <Text>Efectivo</Text>
            </Radio>
          </RadioGroup>
        </View>

        <Button status="success">Pagar</Button>
      </View>
    </View>
  );
};
