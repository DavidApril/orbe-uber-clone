import {
  Button,
  Divider,
  Input,
  Radio,
  RadioGroup,
  Text,
} from '@ui-kitten/components';
import React, {useState} from 'react';
import {View} from 'react-native';
import {CustomIcon} from '../ui/custom-icon';
import {BillInfoTotals} from '../../../interfaces';
import {currencyFormat} from '../../../utils';

interface Props {
  billInfo: BillInfoTotals;
  shipping: number;
}

export const PaymentControllers = ({billInfo, shipping}: Props) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  return (
    <View style={{margin: 20}}>
      <Input
        style={{borderRadius: 20}}
        accessoryLeft={<CustomIcon fill="gray" name="award" />}
        placeholder="Promo code"
      />

      <Divider style={{marginVertical: 20}} />

      <Text style={{}}>Subtotal: {currencyFormat(billInfo?.subtotal)}</Text>
      <Text style={{}}>Envío: {currencyFormat(shipping)} </Text>

      <Divider style={{marginVertical: 10}} />

      <Text style={{}}>
        Total:{' '}
        <Text style={{fontWeight: 'bold', fontSize: 24, color: 'black'}}>
          {currencyFormat(billInfo?.total ?? 0)}
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
