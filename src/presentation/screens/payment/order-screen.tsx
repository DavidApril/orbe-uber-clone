import React, {useEffect} from 'react';
import {
  CInput,
  CTextHeader,
  CView,
  FABGoBackButton,
  OpenDrawerMenu,
  TextHeaderScreen,
} from '../../components';
import {useSocket} from '../../../hooks';
import {API_SOCKET_URL} from '@env';
import {Spinner} from '@ui-kitten/components';
import {ScrollView, View} from 'react-native';
import {ProductsRequestDTO} from '../../../interfaces';

export const OrderScreen = () => {
  const {socket} = useSocket(`${API_SOCKET_URL}/products-delivery`);

  useEffect(() => {
    const payload: ProductsRequestDTO = {
      // products:
    };

    socket.emit('products-request', payload);
  }, []);

  return (
    <CView style={{flex: 1}}>
      <OpenDrawerMenu />
      <FABGoBackButton />

      <TextHeaderScreen
        title="Comunicandose con el restaurante"
        description="Mientras tanto completa la información de envío... "
      />
      <ScrollView>
        <View
          style={{
            margin: 30,
          }}>
          <View style={{flexDirection: 'row', gap: 10}}>
            <CInput
              value=""
              handleValue={() => {}}
              label="Dirección de envío"
            />
            <CInput
              value=""
              handleValue={() => {}}
              label="Nombre de quién recibe"
            />
          </View>
          <CInput value="" handleValue={() => {}} label="Número de celular" />
        </View>
      </ScrollView>
    </CView>
  );
};
