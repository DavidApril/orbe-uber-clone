import React from 'react';
import {Pressable} from 'react-native';
import {CViewAlpha} from './custom-view-alpha';
import {globalDimensions} from '../../theme/styles';
import {CText} from './custom-text';
import {useDeliveryStore} from '../../../store';

interface Props {
  onPress: () => void;
}

export const ImHereButton = ({onPress}: Props) => {
  const {deliveryArrived} = useDeliveryStore();

  return (
    <Pressable
      onPress={() => onPress()}
      style={{
        bottom: 120,
        position: 'absolute',
        left: 30,
        right: 30,
        height: !deliveryArrived ? 140 : 700,
      }}>
      <CViewAlpha
        style={{
          flex: 1,
          borderRadius: globalDimensions.cardBorderRadius,
          justifyContent: 'center',
          opacity: !deliveryArrived ? 0.77 : 0.8,
          borderWidth: 1,
          alignItems: 'center',
        }}>
        <CText style={{fontWeight: 'bold', fontSize: 18}}>Estoy aquí</CText>
      </CViewAlpha>
    </Pressable>
  );
};
