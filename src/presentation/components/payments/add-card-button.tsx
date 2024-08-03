import React from 'react';
import {Pressable} from 'react-native';
import {CustomIcon} from '../ui/custom-icon';
import {CTextHeader} from '../ui/custom-text-header';
import {CViewAlpha} from '../ui/custom-view-alpha';
import {usePaymentStore} from '../../../store';

interface Props {
  onAddButtonPress: any;
}

export const AddCardButton = ({onAddButtonPress}: Props) => {
  const {setCreditCardsSelected} = usePaymentStore();

  return (
    <Pressable
      onPress={() => {
        onAddButtonPress();
        setCreditCardsSelected(null);
      }}
      style={{
        height: 80,
        margin: 30,
      }}>
      <CViewAlpha
        style={{
          borderRadius: 10,
          opacity: 0.7,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          gap: 10,
        }}>
        <CustomIcon name="plus-circle-outline" />
        <CTextHeader style={{fontWeight: 'bold', letterSpacing: 1}}>
          AÑADIR
        </CTextHeader>
      </CViewAlpha>
    </Pressable>
  );
};
