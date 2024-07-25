import {Text} from '@ui-kitten/components';
import React from 'react';
import {View} from 'react-native';
import {globalColors} from '../../theme/styles';

export const Stats = () => {
  return (
    <View
      style={{
        height: 100,
        marginVertical: 10,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{flexDirection: 'column'}}>
        <Text
          status="success"
          style={{fontWeight: 'bold', textAlign: 'center', fontSize: 18}}>
          15.34k
        </Text>
        <Text style={{textAlign: 'center'}}>ventas</Text>
      </View>
      <View
        style={{
          height: '100%',
          marginHorizontal: 25,
          borderRadius: 100,
          borderWidth: 1,
          borderColor: globalColors.border,
          backgroundColor: globalColors.border,
        }}></View>

      <View style={{flexDirection: 'column'}}>
        <Text
          status="success"
          style={{fontWeight: 'bold', textAlign: 'center', fontSize: 18}}>
          15.34k
        </Text>
        <Text style={{textAlign: 'center'}}>Seguidores</Text>
      </View>

      <View
        style={{
          height: '100%',
          marginHorizontal: 25,
          borderRadius: 100,
          borderWidth: 1,
          borderColor: globalColors.border,
          backgroundColor: globalColors.border,
        }}></View>
      <View style={{flexDirection: 'column'}}>
        <Text
          status="success"
          style={{fontWeight: 'bold', textAlign: 'center', fontSize: 18}}>
          15.34k
        </Text>
        <Text style={{textAlign: 'center'}}>Productos</Text>
      </View>
    </View>
  );
};
