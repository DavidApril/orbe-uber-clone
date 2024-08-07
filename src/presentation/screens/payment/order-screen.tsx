import React, {useEffect, useState} from 'react';
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
import {useOrderStore} from '../../../store';
import {ProductsRequestDTO} from '../../../interfaces';

export const OrderScreen = () => {
  const {socket, online} = useSocket(`${API_SOCKET_URL}/products-delivery`);

  const {order} = useOrderStore();

  useEffect(() => {
    console.log(order?.products);
  }, [order]);

  useEffect(() => {
    if (order) {
      socket.emit('products-request', order);
    }
  }, []);

  useEffect(() => {
    socket.on('products-response', response => {
      console.log('request => ', response);
    });
  }, []);

  return (
    <CView style={{flex: 1}}>
      <ScrollView>
        <OpenDrawerMenu />
        <FABGoBackButton />

        <TextHeaderScreen
          title="Comunicandose con el restaurante"
          description="Mientras tanto completa la información de envío... "
        />

        <View style={{alignItems: 'center', marginTop: 40}}>
          <Spinner status="success" />
        </View>

        <View style={{height: 300}} />
      </ScrollView>
    </CView>
  );
};
