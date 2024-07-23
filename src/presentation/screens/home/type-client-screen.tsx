import {Button, Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {RootStackParams} from '../../../interfaces';
import {StackScreenProps} from '@react-navigation/stack';

interface Props extends StackScreenProps<RootStackParams, 'TypeClientScreen'> {}

export const TypeClientScreen = ({navigation}: Props) => {
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Layout style={{flexDirection: 'row', gap: 10}}>
        <Button onPress={() => navigation.navigate('HomeClientDeliveryScreen')}>
          Buscar repartidor
        </Button>
        <Button onPress={() => navigation.navigate('HomeClientDriverScreen')}>
          Buscar conductores
        </Button>
      </Layout>
    </Layout>
  );
};
