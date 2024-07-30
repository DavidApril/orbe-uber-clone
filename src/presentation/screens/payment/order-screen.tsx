import React, {useEffect} from 'react';
import {CTextHeader, CView, TextHeaderScreen} from '../../components';
import {useSocket} from '../../../hooks';
import {API_SOCKET_URL} from '@env';
import {Spinner} from '@ui-kitten/components';
import {View} from 'react-native';

export const OrderScreen = () => {
  const {socket, online} = useSocket('products-delivery');
  console.log({API_SOCKET_URL});

  useEffect(() => {
    console.log({online});
  }, [online]);

  return (
    <CView style={{flex: 1}}>
      <TextHeaderScreen
        title="Comunicandose con el restaurante"
        description="En unos minutos tendrás respuesta... "
      />
      <View style={{margin: 30}}>
        <Spinner />
      </View>
    </CView>
  );
};
