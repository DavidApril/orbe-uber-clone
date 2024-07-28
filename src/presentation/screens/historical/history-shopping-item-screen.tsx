import React from 'react';
import {
  CText,
  CViewAlpha,
  FABGoBackButton,
  OpenDrawerMenu,
  TextHeaderScreen,
} from '../../components';
import {RootStackParams} from '../../../interfaces';
import {StackScreenProps} from '@react-navigation/stack';

interface Props
  extends StackScreenProps<RootStackParams, 'ShoppingHistoryItemScreen'> {}

export const ShoppingHistoryItemScreen = ({}: Props) => {
  return (
    <CViewAlpha style={{flex: 1}}>
      <FABGoBackButton />
      <TextHeaderScreen title="001" description="Esta es la compra 001" />
    </CViewAlpha>
  );
};
