import {Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {RootStackParams} from '../../../interfaces';
import {StackScreenProps} from '@react-navigation/stack';
import { Pressable, StyleSheet } from 'react-native';
import { globalColors } from '../../theme/styles';
import { Image } from 'react-native';

interface Props extends StackScreenProps<RootStackParams, 'TypeClientScreen'> {}

export const TypeClientScreen = ({navigation}: Props) => {
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Layout style={{flexDirection: 'column', gap: 20}}>
        <Pressable style={styles.button} onPress={() => navigation.navigate('HomeClientDeliveryScreen')}>
          <Image style={styles.image} source={{ uri: 'https://orbeapi.devzeros.com/api_v1/storage?fileName=profile%2FdeliveryIcon.png' }} />
          <Text style={styles.text_button}>Buscar repartidor</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate('HomeClientDriverScreen')}>
        <Image style={styles.image} source={{ uri: 'https://orbeapi.devzeros.com/api_v1/storage?fileName=profile%2FdriverIcon.png' }} />
          <Text style={styles.text_button}>Buscar conductores</Text>
        </Pressable>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 50,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: globalColors.primary,
    justifyContent: 'center',
    gap: 20,
    alignItems: 'center'
  },
  text_button: {
    color: globalColors.primary,
    fontSize: 20
  },
  image: {
    width: 150,
    height: 150
  },
})